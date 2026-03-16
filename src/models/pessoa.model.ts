import { IPessoa } from "./IPessoa.model";


export abstract class Pessoa implements IPessoa{
    protected _nome: string = '';
    protected _email: string = '';

    constructor(nome: string, email: string){
        this._nome = nome;
        this._email = email;
    }

    abstract mostrarDados(): string 
}
