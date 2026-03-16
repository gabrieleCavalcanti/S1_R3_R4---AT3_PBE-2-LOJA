import { db } from "../database/connection.database";
import { Vendedor, IVendedor } from "../models/vendedor.model"; 
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class VendedorRepository {

    async findId(id: number): Promise<Vendedor> {
        const sql = 'SELECT * FROM vendedores WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<IVendedor[]>(sql, values);

        return new Vendedor(
            rows[0].nome ?? '',
            rows[0].email ?? ''
        );
    }

    // Omit => Omite os campos discriminados
    async create(dados: Omit<IVendedor, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO vendedores (nome, email) VALUES (?,?);';
        const values = [dados._nome, dados._email];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IVendedor, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE vendedores SET nome=?, email=? WHERE id=?;';
        const values = [dados._nome, dados._email, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}