import { FILE_LETTERS, RANK_NUMBERS, KING_OFFSETS, ROOK_OFFSETS, BISHOP_OFFSETS, KNIGHT_OFFSETS } from 'src/constants/chess';

import type { Piece } from 'src/types/chess';

export function getPieceEmoji(pieceCode: Piece) {
    switch (pieceCode) {
        case 'bp':
            return '♟';
        case 'bb':
            return '♝';
        case 'bk':
            return '♞';
        case 'br':
            return '♜';
        case 'bq':
            return '♛';
        case 'bK':
            return '♚';
        case 'wp':
            return '♙';
        case 'wb':
            return '♗';
        case 'wk':
            return '♘';
        case 'wr':
            return '♖';
        case 'wq':
            return '♕';
        case 'wK':
            return '♔';
        default:
            return pieceCode;
    }
}

type Move = [number, number];
type EncryptedMove = number;

function keyToMove(key: string): Move {
    const fileIndex = FILE_LETTERS.indexOf(key.charAt(0));
    const rankIndex = RANK_NUMBERS.indexOf(key.charAt(1));

    return [fileIndex, rankIndex];
}

function moveToKey(move: Move): string {
    const fileIndex = move[0];
    const rankIndex = move[1];

    return FILE_LETTERS.charAt(fileIndex) + RANK_NUMBERS.charAt(rankIndex);
}

function decrypt(encryptedMove: EncryptedMove): Move {
    const fileIndex = encryptedMove % 8;
    const rankIndex = Math.floor(encryptedMove / 8);

    return [fileIndex, rankIndex];
}

function encrypt(move: Move): EncryptedMove {
    const fileIndex = move[0];
    const rankIndex = move[1];

    return fileIndex + rankIndex * 8;
}

export function getChessPieceMoves(
    squareKey: string,
    piece: Piece,
    takenKeys: { capturedKeys: string[]; occupiedKeys: string[] }
): string[] {
    // Convert square key to file and rank indices
    const fileIndex = FILE_LETTERS.indexOf(squareKey.charAt(0));
    const rankIndex = RANK_NUMBERS.indexOf(squareKey.charAt(1));

    const { capturedKeys, occupiedKeys } = takenKeys;
    const capturedMoves = capturedKeys.map(keyToMove);
    const occupiedMoves = occupiedKeys.map(keyToMove);

    const encryptedCapturedMoves = capturedMoves.map(encrypt);
    const encryptedOccupiedMoves = occupiedMoves.map(encrypt);

    const pieceColor = piece.charAt(0);
    const pieceName = piece.charAt(1);

    // Validate square key
    if (fileIndex === -1 || rankIndex === -1) {
        console.error('Invalid square key');
        return [];
    }

    // Determine possible moves based on piece name and color
    switch (pieceName) {
        case 'p':
            return getPawnMoves(fileIndex, rankIndex, pieceColor, {
                encryptedCapturedMoves,
                encryptedOccupiedMoves,
            }).map(moveToKey);
        case 'k':
            return getKnightMoves(fileIndex, rankIndex, encryptedOccupiedMoves).map(moveToKey);
        case 'b':
            return getBishopMoves(fileIndex, rankIndex, { encryptedCapturedMoves, encryptedOccupiedMoves }).map(moveToKey);
        case 'r':
            return getRookMoves(fileIndex, rankIndex, { encryptedCapturedMoves, encryptedOccupiedMoves }).map(moveToKey);
        case 'q':
            return getQueenMoves(fileIndex, rankIndex, { encryptedCapturedMoves, encryptedOccupiedMoves }).map(moveToKey);
        case 'K':
            return getKingMoves(fileIndex, rankIndex, encryptedOccupiedMoves).map(moveToKey);
        default:
            console.error('Invalid piece name');
            return [];
    }
}

function getPawnMoves(
    fileIndex: number,
    rankIndex: number,
    pieceColor: string,
    takenEncryptedMoves: {
        encryptedCapturedMoves: EncryptedMove[];
        encryptedOccupiedMoves: EncryptedMove[];
    }
): Move[] {
    const encryptedMoves: EncryptedMove[] = [];
    const direction = pieceColor === 'w' ? 1 : -1;

    // Single move forward
    if (rankIndex + direction >= 0 && rankIndex + direction < 8) {
        const encryptedMove = encrypt([fileIndex, rankIndex + direction]);
        const encryptedLMove = encrypt([fileIndex - 1, rankIndex + direction]);
        const encryptedRMove = encrypt([fileIndex + 1, rankIndex + direction]);

        if (takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedLMove)) {
            encryptedMoves.push(encryptedLMove);
        }

        if (takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedRMove)) {
            encryptedMoves.push(encryptedRMove);
        }

        if (
            takenEncryptedMoves.encryptedOccupiedMoves.includes(encryptedMove) ||
            takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedMove)
        ) {
            return encryptedMoves.map(decrypt);
        }

        encryptedMoves.push(encryptedMove);
    }

    // Double move forward from the starting rank
    if ((rankIndex === 1 && pieceColor === 'w') || (rankIndex === 6 && pieceColor === 'b')) {
        const encryptedMove = encrypt([fileIndex, rankIndex + 2 * direction]);

        if (
            !takenEncryptedMoves.encryptedOccupiedMoves.includes(encryptedMove) &&
            !takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedMove)
        ) {
            encryptedMoves.push(encryptedMove);
        }
    }

    return encryptedMoves.map(decrypt);
}

function getKnightMoves(fileIndex: number, rankIndex: number, takenEncryptedMoves?: EncryptedMove[]): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of KNIGHT_OFFSETS) {
        const targetFile = fileIndex + offsetFile;
        const targetRank = rankIndex + offsetRank;

        if (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (!takenEncryptedMoves?.includes(encryptedMove)) {
                encryptedMoves.push(encryptedMove);
            }
        }
    }

    return encryptedMoves.map(decrypt);
}

function getBishopMoves(
    fileIndex: number,
    rankIndex: number,
    takenEncryptedMoves: {
        encryptedCapturedMoves: EncryptedMove[];
        encryptedOccupiedMoves: EncryptedMove[];
    }
): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of BISHOP_OFFSETS) {
        let targetFile = fileIndex + offsetFile;
        let targetRank = rankIndex + offsetRank;

        while (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedMove)) {
                encryptedMoves.push(encryptedMove);
                break;
            }

            if (takenEncryptedMoves.encryptedOccupiedMoves.includes(encryptedMove)) {
                break;
            }

            encryptedMoves.push(encryptedMove);

            targetFile += offsetFile;
            targetRank += offsetRank;
        }
    }

    return encryptedMoves.map(decrypt);
}

function getRookMoves(
    fileIndex: number,
    rankIndex: number,
    takenEncryptedMoves: {
        encryptedCapturedMoves: EncryptedMove[];
        encryptedOccupiedMoves: EncryptedMove[];
    }
): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of ROOK_OFFSETS) {
        let targetFile = fileIndex + offsetFile;
        let targetRank = rankIndex + offsetRank;

        while (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (takenEncryptedMoves.encryptedCapturedMoves.includes(encryptedMove)) {
                encryptedMoves.push(encryptedMove);
                break;
            }

            if (takenEncryptedMoves.encryptedOccupiedMoves.includes(encryptedMove)) {
                break;
            }

            encryptedMoves.push(encryptedMove);

            targetFile += offsetFile;
            targetRank += offsetRank;
        }
    }

    return encryptedMoves.map(decrypt);
}

function getQueenMoves(
    fileIndex: number,
    rankIndex: number,
    takenEncryptedMoves: {
        encryptedCapturedMoves: EncryptedMove[];
        encryptedOccupiedMoves: EncryptedMove[];
    }
): Move[] {
    const rookMoves = getRookMoves(fileIndex, rankIndex, takenEncryptedMoves);
    const bishopMoves = getBishopMoves(fileIndex, rankIndex, takenEncryptedMoves);

    return rookMoves.concat(bishopMoves);
}

function getKingMoves(fileIndex: number, rankIndex: number, takenEncryptedMoves?: EncryptedMove[]): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of KING_OFFSETS) {
        const targetFile = fileIndex + offsetFile;
        const targetRank = rankIndex + offsetRank;

        if (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (!takenEncryptedMoves?.includes(encryptedMove)) {
                encryptedMoves.push(encryptedMove);
            }
        }
    }

    return encryptedMoves.map(decrypt);
}
