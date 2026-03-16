import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionaTodos() {
        return await this._repository.findAll();
    }

    async selecionaId(id: number) {
        return await this._repository.findId(id);
    }

    async selecionaCategoriaAtiva(id: number) {
        return await this._repository.findCategoriaAtiva(id);
    }

    async criar(nome: string, img: string, qtd: number, valor: number, idCategoria: number) {
        const produto = Produto.criar(nome, img, qtd, valor, idCategoria);
        return await this._repository.create(produto);
    }

    async editar(id: number, nome: string, img: string, qtd: number, valor: number, idCategoria: number) {
        const produto = Produto.editar(nome, img, qtd, valor, idCategoria, id);
        return await this._repository.update(id, produto)
    }
}