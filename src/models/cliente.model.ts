import { RowDataPacket } from 'mysql2';
import { Pessoa } from './pessoa.model';

export interface ICliente extends RowDataPacket {
    id?: number;
    nome?: string;
    email?: string;
    cpf?: string
}

export class Cliente extends Pessoa {

    private _id?: number;
    private _cpf: string = "";

    //Construtor
    constructor(nome: string, email: string, cpf: string, id?: number,) {
        super(nome, email);

        this._cpf = cpf;
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

    public get Cpf(): string | undefined {
        return this._cpf;
    }


    //SETTERS
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }


    mostrarDados(): string {
        return `Nome: ${this.Nome}| Email: ${this.Email} | Cpf: ${this.Cpf}`;
    }

    // DP => FACTORY
    public static inserir(nome: string, email: string, cpf: string): Cliente {
        return new Cliente(nome, email, cpf);
    }

    public static alterar(nome: string, email: string, cpf: string, id: number) {
        return new Cliente(nome, email, cpf, id);
    }


    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome do cliente deve ter pelo menos 3 caracteres')
        }
        if (value.trim().length > 45) {
            throw new Error('Nome deve ter no maximo 45 caracteres')
        }
    }

}