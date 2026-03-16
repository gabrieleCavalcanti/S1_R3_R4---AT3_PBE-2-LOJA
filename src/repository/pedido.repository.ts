import { db } from "../database/connection.database";
import { IPedido } from "../models/pedido.model";
import { ResultSetHeader } from "mysql2";

export class PedidoRepository {
    async findAll(): Promise<IPedido[]> {
        const [rows] = await db.execute<IPedido[]>(
            'SELECT * FROM pedidos;'
        );
        return rows;
    }

    async findId(id: number): Promise<IPedido[]> {
        const sql = 'SELECT * FROM pedidos WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<IPedido[]>(sql, values);
        return rows;
    }

    // Omit => Omite os campos discriminados
    async create(dados: Omit<IPedido, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO pedidos (idVendedor, idCliente) VALUES (?,?);';
        const values = [dados._idVendedor, dados._idCliente];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IPedido, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE pedidos SET status=? WHERE id=?;';
        const values = [dados._status, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}