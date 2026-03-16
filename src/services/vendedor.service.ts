import { VendedorRepository } from "../repository/vendedor.repository";
import { Vendedor } from "../models/vendedor.model";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) { }

    async selecionaId(id: number): Promise<string> {
        const vendedor = await this._repository.findId(id)
        return vendedor.mostrarDados();
    }

    async criar(nome: string, email: string) {
        const vendedor = Vendedor.inserir(nome, email);
        return await this._repository.create(vendedor);
    }

    async editar(id: number, nome: string, email: string) {
        const vendedor = Vendedor.alterar(nome, email, id);
        return await this._repository.update(id, vendedor)
    }
}