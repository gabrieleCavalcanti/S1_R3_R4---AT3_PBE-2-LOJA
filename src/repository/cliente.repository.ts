import { db } from "../database/connection.database";
import { Cliente, ICliente } from "../models/cliente.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ClienteRepository {

    async findId(id: number): Promise<Cliente> {
        const sql = 'SELECT * FROM clientes WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<ICliente[]>(sql, values);

        return new Cliente(
            rows[0].nome ?? '',
            rows[0].email ?? '',
            rows[0].cpf ?? ''
        );
    }

    // Omit => Omite os campos discriminados
    async create(dados: Omit<ICliente, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO clientes (nome, email, cpf) VALUES (?,?,?);';
        const values = [dados._nome, dados._email, dados._cpf];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<ICliente, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE clientes SET nome=?, email=?, cpf=? WHERE id=?;';
        const values = [dados._nome, dados._email, dados._cpf, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}