import { BISHOP_OFFSETS, FILE_LETTERS, KING_OFFSETS, KNIGHT_OFFSETS, RANK_LETTERS } from 'src/constants/chess';

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

export function getChessPieceMoves(squareKey: string, piece: Piece): string[] {
    // Convert square key to file and rank indices
    const fileIndex = FILE_LETTERS.indexOf(squareKey.charAt(0));
    const rankIndex = RANK_LETTERS.indexOf(squareKey.charAt(1));

    // Convert piece to color and name
    const pieceName = piece.charAt(1);
    const pieceColor = piece.charAt(0);

    // Validate square key
    if (fileIndex === -1 || rankIndex === -1) {
        console.error('Invalid square key');
        return [];
    }

    // Determine possible moves based on piece name and color
    switch (pieceName) {
        case 'p':
            return getPawnMoves(fileIndex, rankIndex, pieceColor);
        case 'k':
            return getKnightMoves(fileIndex, rankIndex);
        case 'b':
            return getBishopMoves(fileIndex, rankIndex);
        case 'r':
            return getRookMoves(fileIndex, rankIndex);
        case 'q':
            return getQueenMoves(fileIndex, rankIndex);
        case 'K':
            return getKingMoves(fileIndex, rankIndex);
        default:
            console.error('Invalid piece name');
            return [];
    }
}

function toKeys(moves: number[]): string[] {
    return moves.map((move) => {
        const fileIndex = move % 8;
        const rankIndex = Math.floor(move / 8);

        return FILE_LETTERS[fileIndex] + RANK_LETTERS[rankIndex];
    });
}

function getPawnMoves(fileIndex: number, rankIndex: number, pieceColor: string): string[] {
    const moves: number[] = [];
    const direction = pieceColor === 'w' ? 1 : -1;

    // Single move forward
    if (rankIndex + direction >= 0 && rankIndex + direction < 8) {
        moves.push(fileIndex + (rankIndex + direction) * 8);
    }

    // Double move forward from the starting rank
    if ((rankIndex === 1 && pieceColor === 'w') || (rankIndex === 6 && pieceColor === 'b')) {
        moves.push(fileIndex + (rankIndex + 2 * direction) * 8);
    }

    return toKeys(moves);
}

function getKnightMoves(fileIndex: number, rankIndex: number): string[] {
    const moves: number[] = [];

    for (const [offsetFile, offsetRank] of KNIGHT_OFFSETS) {
        const targetFile = fileIndex + offsetFile;
        const targetRank = rankIndex + offsetRank;

        if (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            moves.push(targetFile + targetRank * 8);
        }
    }

    return toKeys(moves);
}

function getBishopMoves(fileIndex: number, rankIndex: number): string[] {
    const moves: number[] = [];

    for (const [offsetFile, offsetRank] of BISHOP_OFFSETS) {
        let targetFile = fileIndex + offsetFile;
        let targetRank = rankIndex + offsetRank;

        while (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            moves.push(targetFile + targetRank * 8);
            targetFile += offsetFile;
            targetRank += offsetRank;
        }
    }

    return toKeys(moves);
}

function getRookMoves(fileIndex: number, rankIndex: number): string[] {
    const moves: number[] = [];

    // Horizontal moves
    for (let targetFile = 0; targetFile < 8; targetFile++) {
        if (targetFile !== fileIndex) {
            moves.push(targetFile + rankIndex * 8);
        }
    }

    // Vertical moves
    for (let targetRank = 0; targetRank < 8; targetRank++) {
        if (targetRank !== rankIndex) {
            moves.push(fileIndex + targetRank * 8);
        }
    }

    return toKeys(moves);
}

function getQueenMoves(fileIndex: number, rankIndex: number): string[] {
    return getRookMoves(fileIndex, rankIndex).concat(getBishopMoves(fileIndex, rankIndex));
}

function getKingMoves(fileIndex: number, rankIndex: number): string[] {
    const moves: number[] = [];

    for (const [offsetFile, offsetRank] of KING_OFFSETS) {
        const targetFile = fileIndex + offsetFile;
        const targetRank = rankIndex + offsetRank;

        if (targetFile >= 0 && targetFile < 8 && targetRank >= 0 && targetRank < 8) {
            moves.push(targetFile + targetRank * 8);
        }
    }

    return toKeys(moves);
}
