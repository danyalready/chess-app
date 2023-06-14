import type { Board } from 'src/types/chess';

export const FILE_LETTERS = 'abcdefgh';
export const RANK_LETTERS = '12345678';

export const KNIGHT_OFFSETS = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
];

export const BISHOP_OFFSETS = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
];

export const KING_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export const initialBoard: Board = [
    [
        { key: 'a8', value: 'br', isMove: false },
        { key: 'b8', value: 'bk', isMove: false },
        { key: 'c8', value: 'bb', isMove: false },
        { key: 'd8', value: 'bq', isMove: false },
        { key: 'e8', value: 'bK', isMove: false },
        { key: 'f8', value: 'bb', isMove: false },
        { key: 'g8', value: 'bk', isMove: false },
        { key: 'h8', value: 'br', isMove: false },
    ],
    [
        { key: 'a7', value: 'bp', isMove: false },
        { key: 'b7', value: 'bp', isMove: false },
        { key: 'c7', value: 'bp', isMove: false },
        { key: 'd7', value: 'bp', isMove: false },
        { key: 'e7', value: 'bp', isMove: false },
        { key: 'f7', value: 'bp', isMove: false },
        { key: 'g7', value: 'bp', isMove: false },
        { key: 'h7', value: 'bp', isMove: false },
    ],
    [
        { key: 'a6', value: null, isMove: false },
        { key: 'b6', value: null, isMove: false },
        { key: 'c6', value: null, isMove: false },
        { key: 'd6', value: null, isMove: false },
        { key: 'e6', value: null, isMove: false },
        { key: 'f6', value: null, isMove: false },
        { key: 'g6', value: null, isMove: false },
        { key: 'h6', value: null, isMove: false },
    ],
    [
        { key: 'a5', value: null, isMove: false },
        { key: 'b5', value: null, isMove: false },
        { key: 'c5', value: null, isMove: false },
        { key: 'd5', value: null, isMove: false },
        { key: 'e5', value: null, isMove: false },
        { key: 'f5', value: null, isMove: false },
        { key: 'g5', value: null, isMove: false },
        { key: 'h5', value: null, isMove: false },
    ],
    [
        { key: 'a4', value: null, isMove: false },
        { key: 'b4', value: null, isMove: false },
        { key: 'c4', value: null, isMove: false },
        { key: 'd4', value: null, isMove: false },
        { key: 'e4', value: null, isMove: false },
        { key: 'f4', value: null, isMove: false },
        { key: 'g4', value: null, isMove: false },
        { key: 'h4', value: null, isMove: false },
    ],
    [
        { key: 'a3', value: null, isMove: false },
        { key: 'b3', value: null, isMove: false },
        { key: 'c3', value: null, isMove: false },
        { key: 'd3', value: null, isMove: false },
        { key: 'e3', value: null, isMove: false },
        { key: 'f3', value: null, isMove: false },
        { key: 'g3', value: null, isMove: false },
        { key: 'h3', value: null, isMove: false },
    ],
    [
        { key: 'a2', value: 'wp', isMove: false },
        { key: 'b2', value: 'wp', isMove: false },
        { key: 'c2', value: 'wp', isMove: false },
        { key: 'd2', value: 'wp', isMove: false },
        { key: 'e2', value: 'wp', isMove: false },
        { key: 'f2', value: 'wp', isMove: false },
        { key: 'g2', value: 'wp', isMove: false },
        { key: 'h2', value: 'wp', isMove: false },
    ],
    [
        { key: 'a1', value: 'wr', isMove: false },
        { key: 'b1', value: 'wk', isMove: false },
        { key: 'c1', value: 'wb', isMove: false },
        { key: 'd1', value: 'wq', isMove: false },
        { key: 'e1', value: 'wK', isMove: false },
        { key: 'f1', value: 'wb', isMove: false },
        { key: 'g1', value: 'wk', isMove: false },
        { key: 'h1', value: 'wr', isMove: false },
    ],
];
