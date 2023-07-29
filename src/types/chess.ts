export type BlackPiece = 'bp' | 'bb' | 'bk' | 'br' | 'bq' | 'bK';
export type WhitePiece = 'wp' | 'wb' | 'wk' | 'wr' | 'wq' | 'wK';
export type Piece = BlackPiece | WhitePiece;

export type Square = {
    key: string;
    value: null | Piece;
    isMove: boolean;
};

export type BoardRow = Array<Square>;
export type Board = Array<BoardRow>;
export type BoardHistory = string[];
