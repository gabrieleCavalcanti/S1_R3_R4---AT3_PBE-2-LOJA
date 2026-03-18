import { ItensPedidoRepository } from "../repository/itensPedido.repository";
import { ItensPedido } from "../models/itensPedido.model";

export class ItensPedidoService {
    constructor(private _repository = new ItensPedidoRepository()) { }

    async selecionaTodos() {
        return await this._repository.findAll();
    }

    async selecionaId(id: number) {
        return await this._repository.findId(id);
    }

    async criar(idPedido: number, idProduto: number, qtd: number) {
        const pedido = ItensPedido.criar(idPedido, idProduto, qtd);
        return await this._repository.create(pedido);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}