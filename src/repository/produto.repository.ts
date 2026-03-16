import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoRepository {
    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos;'
        );
        return rows;
    }

    async findId(id: number): Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        return rows;
    }

    async findCategoriaAtiva(id: number): Promise<IProduto[]> {
        const sql = 'SELECT ativo FROM categorias WHERE id= ?';
        const values = [id];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        return rows;
    }

    // Omit => Omite os campos discriminados
    async create(dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO produtos (nome, img, qtd, valor, idCategoria) VALUES (?,?,?,?,?);';
        const values = [dados._nome, dados._img, dados._qtd, dados._valor, dados._idCategoria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE produtos SET nome=?, img=?, qtd=?, valor=? , idCategoria=? WHERE id=?;';
        const values = [dados._nome, dados._img, dados._qtd, dados._valor, dados._idCategoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}