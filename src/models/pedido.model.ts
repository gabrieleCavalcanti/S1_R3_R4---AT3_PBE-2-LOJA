import { RowDataPacket } from "mysql2";

export interface IPedido extends RowDataPacket {
    id?: number;
    idVendedor?: number;
    idCliente?: number;
    dataCad?: Date;
    valorTotal?: number;
    status?: string;
}

export class Pedido {
    private _id?: number;
    private _idVendedor: number = 0;
    private _idCliente: number = 0;
    private _dataCad?: Date;
    private _valorTotal?: number;
    private _status?: string = '';

    //Construtor
    constructor(idVendedor: number, idCliente: number, status?: string, id?: number) {
        this._idVendedor = idVendedor;
        this._idCliente = idCliente;
        this._id = id;
        this._status = status;
    }

    //GETTERS
    public get Id(): number | undefined {
        return this._id;
    }

    public get IdVendedor(): number {
        return this._idVendedor;
    }

    public get IdCliente(): number {
        return this._idCliente;
    }

    public get DataCad(): Date | undefined {
        return this._dataCad;
    }

    public get ValorTotal(): number | undefined {
        return this._valorTotal;
    }

    public get Status(): string | undefined {
        return this._status;
    }

    // DP => FACTORY
    public static criar(idVendedor: number, idCliente: number): Pedido {
        return new Pedido(idVendedor, idCliente);
    }

    public static editar(idVendedor: number, idCliente: number, status: string, id: number) {
        return new Pedido(idVendedor, idCliente, status, id);
    }
}