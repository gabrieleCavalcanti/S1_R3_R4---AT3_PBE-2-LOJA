import { db } from "../database/connection.database";
import { IItensPedido } from "../models/itensPedido.model";
import { ResultSetHeader } from "mysql2";

export class ItensPedidoRepository {
    async findAll(): Promise<IItensPedido[]> {
        const [rows] = await db.execute<IItensPedido[]>(
            'SELECT * FROM ItensPedido;'
        );
        return rows;
    }

    async findId(id: number): Promise<IItensPedido[]> {
        const sql = 'SELECT * FROM ItensPedido WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<IItensPedido[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<IItensPedido, 'id'>): Promise<ResultSetHeader> {
        // TRIGGER
        // trg_atualiza_qtd_produto - diminui qtd estoque
        // trg_valor_produto_item - guarda valor atual do item
        // trg_atualiza_valor_pedido - calculo, valor atual * qtd
        const sql = 'INSERT INTO ItensPedido (idPedido, idProduto, qtd) VALUES (?,?,?);';
        const values = [dados._idPedido, dados._idProduto, dados._qtd];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
    async delete(id: number): Promise<ResultSetHeader> {
        // trg_update_valor_after_delete_itenspedido - volta o valor
        // trg_update_qtd_after_delete_itenspedido - volta qtd
        const sql = 'DELETE FROM ItensPedido WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}