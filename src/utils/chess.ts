import {
    BISHOP_OFFSETS,
    FILE_LETTERS,
    KING_OFFSETS,
    KNIGHT_OFFSETS,
    RANK_NUMBERS,
    ROOK_OFFSETS,
} from 'src/constants/chess';

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

export function getChessPieceMoves(squareKey: string, piece: Piece, takenKeys?: string[]): string[] {
    // Convert square key to file and rank indices
    const fileIndex = FILE_LETTERS.indexOf(squareKey.charAt(0));
    const rankIndex = RANK_NUMBERS.indexOf(squareKey.charAt(1));

    const takenMoves: Move[] = (takenKeys || []).map((takenKey) => keyToMove(takenKey));
    const takenEncryptedMoves = takenMoves.map((move) => encrypt(move));

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
            return getPawnMoves(fileIndex, rankIndex, pieceColor, takenEncryptedMoves).map((move) => moveToKey(move));
        case 'k':
            return getKnightMoves(fileIndex, rankIndex, takenEncryptedMoves).map((move) => moveToKey(move));
        case 'b':
            return getBishopMoves(fileIndex, rankIndex, takenEncryptedMoves).map((move) => moveToKey(move));
        case 'r':
            return getRookMoves(fileIndex, rankIndex, takenEncryptedMoves).map((move) => moveToKey(move));
        case 'q':
            return getQueenMoves(fileIndex, rankIndex, takenEncryptedMoves).map((move) => moveToKey(move));
        case 'K':
            return getKingMoves(fileIndex, rankIndex, takenEncryptedMoves).map((move) => moveToKey(move));
        default:
            console.error('Invalid piece name');
            return [];
    }
}

function getPawnMoves(
    fileIndex: number,
    rankIndex: number,
    pieceColor: string,
    takenEncryptedMoves?: EncryptedMove[]
): Move[] {
    const encryptedMoves: EncryptedMove[] = [];
    const direction = pieceColor === 'w' ? 1 : -1;

    // Single move forward
    if (rankIndex + direction >= 0 && rankIndex + direction < 8) {
        const encryptedMove = encrypt([fileIndex, rankIndex + direction]);

        if (!takenEncryptedMoves?.includes(encryptedMove)) {
            encryptedMoves.push(encryptedMove);
        }
    }

    // Double move forward from the starting rank
    if ((rankIndex === 1 && pieceColor === 'w') || (rankIndex === 6 && pieceColor === 'b')) {
        const encryptedMove = encrypt([fileIndex, rankIndex + 2 * direction]);

        if (!takenEncryptedMoves?.includes(encryptedMove)) {
            encryptedMoves.push(encryptedMove);
        }
    }

    return encryptedMoves.map((encryptedMove) => decrypt(encryptedMove));
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

    return encryptedMoves.map((encryptedMove) => decrypt(encryptedMove));
}

function getBishopMoves(fileIndex: number, rankIndex: number, takenEncryptedMoves?: EncryptedMove[]): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of BISHOP_OFFSETS) {
        let targetFile = fileIndex + offsetFile;
        let targetRank = rankIndex + offsetRank;

        while (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (takenEncryptedMoves?.includes(encryptedMove)) {
                break;
            }

            encryptedMoves.push(encryptedMove);

            targetFile += offsetFile;
            targetRank += offsetRank;
        }
    }

    return encryptedMoves.map((encryptedMove) => decrypt(encryptedMove));
}

function getRookMoves(fileIndex: number, rankIndex: number, takenEncryptedMoves?: EncryptedMove[]): Move[] {
    const encryptedMoves: EncryptedMove[] = [];

    for (const [offsetFile, offsetRank] of ROOK_OFFSETS) {
        let targetFile = fileIndex + offsetFile;
        let targetRank = rankIndex + offsetRank;

        while (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            const encryptedMove = encrypt([targetFile, targetRank]);

            if (takenEncryptedMoves?.includes(encryptedMove)) {
                break;
            }

            encryptedMoves.push(encryptedMove);

            targetFile += offsetFile;
            targetRank += offsetRank;
        }
    }

    return encryptedMoves.map((encryptedMove) => decrypt(encryptedMove));
}

function getQueenMoves(fileIndex: number, rankIndex: number, takenEncryptedMoves?: EncryptedMove[]): Move[] {
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
            encryptedMoves.push(encrypt([targetFile, targetRank]));
        }
    }

    return encryptedMoves.map((encryptedMove) => decrypt(encryptedMove));
}
