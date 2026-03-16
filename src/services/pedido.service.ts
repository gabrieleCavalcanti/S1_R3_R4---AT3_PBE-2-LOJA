import { PedidoRepository } from "../repository/pedido.repository";
import { Pedido } from "../models/pedido.model";

export class PedidoService {
    constructor(private _repository = new PedidoRepository()) { }

    async selecionaTodos() {
        return await this._repository.findAll();
    }

    async selecionaId(id: number) {
        return await this._repository.findId(id);
    }

    async criar(idVendedor: number, idCliente: number) {
        const pedido = Pedido.criar(idVendedor, idCliente);
        return await this._repository.create(pedido);
    }

    async editar(id: number, idVendedor: number, idCliente: number, status: string) {
        const pedido = Pedido.editar(idVendedor, idCliente, status, id);
        return await this._repository.update(id, pedido)
    }

}