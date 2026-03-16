import { RowDataPacket } from "mysql2";

export interface IItensPedido extends RowDataPacket {
    id?: number;
    idPedido?: number;
    idProduto?: number;
    qtd?: number;
    valorUni?: number;
}

export class ItensPedido {
    private _id?: number;
    private _idPedido: number = 0;
    private _idProduto: number = 0;
    private _qtd: number = 0;
    private _valorUni?: number;

    //Construtor
    constructor(idPedido: number, idProduto: number, qtd: number, id?: number) {
        this._idPedido = idPedido;
        this._idProduto = idProduto;
        this._qtd = qtd;
        this._id = id;
    }

    //GETTERS
    public get Id(): number | undefined {
        return this._id;
    }

    public get IdPedido(): number {
        return this._idPedido;
    }

    public get IdProduto(): number {
        return this._idProduto;
    }

    public get Qtd(): number {
        return this._qtd;
    }

    public get ValorUni(): number | undefined {
        return this._valorUni;
    }

    // DP => FACTORY
    public static criar(idPedido: number, idProduto: number, qtd: number): ItensPedido {
        return new ItensPedido(idPedido, idProduto, qtd);
    }

    public static editar(idPedido: number, idProduto: number, qtd: number,  id: number)  {
        return new ItensPedido(idPedido, idProduto, qtd, id);
    }

}