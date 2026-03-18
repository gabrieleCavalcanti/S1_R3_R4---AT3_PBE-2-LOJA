import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    id?: number;
    nome?: string;
    dataCad?: Date;
    img?: string;
    qtd?: number;
    valor?: number;
    idCategoria?: number;
}

export class Produto {
    private _id?: number;
    private _nome: string = '';
    private _dataCad?: Date;
    private _img: string = '';
    private _qtd: number = 0;
    private _valor: number = 0;
    private _idCategoria: number = 0;

    //Construtor
    constructor(nome: string, img: string, qtd: number, valor: number, idCategoria: number, id?: number) {
        this.Nome = nome;
        this._img = img;
        this._qtd = qtd;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._id = id;
    }

    //GETTERS
    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Img(): string {
        return this._img;
    }

    public get Qtd(): number {
        return this._qtd;
    }

    public get DataCad(): Date | undefined {
        return this._dataCad;
    }

    public get Valor(): number {
        return this._valor;
    }

    public get IdCategoria(): number {
        return this._idCategoria;
    }


    //SETTERS
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    // DP => FACTORY
    public static criar(nome: string, img: string, qtd: number, valor: number, idCategoria: number): Produto {
        return new Produto(nome, img, qtd, valor, idCategoria);
    }

    public static editar(nome: string, img: string, qtd: number, valor: number, idCategoria: number, id: number) {
        return new Produto(nome, img, qtd, valor, idCategoria, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome da Produto deve ter pelo menos 3 caracteres')
        }
        if (value.trim().length > 45) {
            throw new Error('Nome deve ter no maximo 45 caracteres')
        }
    }
}