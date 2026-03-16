import { ClienteRepository } from "../repository/cliente.repository";
import { Cliente } from "../models/cliente.model";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) { }

    async selecionaId(id: number): Promise<string> {
        const cliente = await this._repository.findId(id)
        return cliente.mostrarDados();
    }

    async criar(nome: string, email: string, cpf: string) {
        const cliente = Cliente.inserir(nome, email, cpf);
        return await this._repository.create(cliente);
    }

    async editar(id: number, nome: string, email: string, cpf: string) {
        const cliente = Cliente.alterar(nome, email, cpf, id);
        return await this._repository.update(id, cliente)
    }
}