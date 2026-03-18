import { RowDataPacket } from 'mysql2';
import { Pessoa } from './pessoa.model';

export interface IVendedor extends RowDataPacket {
    id?: number;
    nome?: string;
    email?: string;
}

export class Vendedor extends Pessoa {
    private _id?: number;

        //Construtor
    constructor(nome: string, email: string, id?: number) {
        super(nome, email);

        this._id = id;
    }

    //GETTERS
    public get Id(): number | undefined {
        return this._id;
    }

    public get Nome(): string | undefined {
        return this._nome;
    }

    public get Email(): string | undefined {
        return this._email;
    }

    mostrarDados(): string {
        return `Nome: ${this.Nome}| Email: ${this.Email}`;
    }

    // DP => FACTORY
    public static inserir(nome: string, email: string): Vendedor {
        return new Vendedor(nome, email);
    }

    public static alterar(nome: string, email: string, id: number) {
        return new Vendedor(nome, email, id);
    }

}