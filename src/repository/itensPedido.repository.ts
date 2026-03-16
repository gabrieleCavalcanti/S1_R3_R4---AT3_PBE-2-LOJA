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
        // trg_atualiza_qtd_produto
        // trg_valor_produto_item
        // trg_atualiza_valor_pedido
        const sql = 'INSERT INTO ItensPedido (idPedido, idProduto, qtd) VALUES (?,?,?);';
        const values = [dados._idPedido, dados._idProduto, dados._qtd];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IItensPedido, 'id'>): Promise<ResultSetHeader> {
        // trg_atualiza_valor_pedido_after_update_qtditens
        const sql = 'UPDATE ItensPedido SET idPedido=?, idProduto=?, qtd=? WHERE id=?;';
        const values = [dados._idPedido, dados._idProduto, dados._qtd, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}