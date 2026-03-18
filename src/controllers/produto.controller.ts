import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";
import fs from 'fs';

export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = req.query.id;

            if (id) {
                const idProd = Number(id);
                const produtoId = await this._service.selecionaId(idProd);
                if (produtoId.length === 0) {
                    return res.status(200).json({ message: 'Produto não localizado' });
                }
                return res.status(200).json({ produtoId });
            }

            const produtos = await this._service.selecionaTodos();
            res.status(200).json({ produtos });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro Desconhecido' });
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { nome, qtd, valor, idCategoria } = req.body;

            if (!nome || !isNaN(nome) || !valor || isNaN(valor) || !qtd || isNaN(qtd) || !idCategoria || isNaN(idCategoria)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const existeCategoria = await this._service.selecionaCategoriaAtiva(idCategoria);

            if (!req.file) {
                return res.status(400).json({ message: 'Imagem é obrigatória!' });
            }

            const img = req.file.filename;

            if (existeCategoria.length === 0) {
                fs.unlinkSync(req.file.path);
                return res.status(200).json({ message: `Não é existe essa categoria` });
            }

            if (!existeCategoria[0].ativo) {
                fs.unlinkSync(req.file.path);
                return res.status(200).json({ message: `Categoria não esta ativa` });
            }

            const novo = await this._service.criar(nome, img, qtd, valor, idCategoria);
            res.status(201).json({ novo });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro Desconhecido' });
        }
    }
    editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id)
            const {nome, qtd, valor, idCategoria } = req.body;

            if (!nome || !isNaN(nome) || !valor || isNaN(valor) || !qtd || isNaN(qtd) || !idCategoria || isNaN(idCategoria)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const existeCategoria = await this._service.selecionaCategoriaAtiva(idCategoria);

            if (!req.file) {
                return res.status(400).json({ message: 'Imagem é obrigatória!' });
            }

            const img = req.file.filename;

            if (existeCategoria.length === 0) {
                fs.unlinkSync(req.file.path);
                return res.status(200).json({ message: `Não é existe essa categoria` });
            }

            if (!existeCategoria[0].ativo) {
                fs.unlinkSync(req.file.path);
                return res.status(200).json({ message: `Categoria não esta ativa` });
            }

            const alterado = await this._service.editar(id, nome, img, qtd, valor, idCategoria);
            res.status(200).json({ alterado });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro Desconhecido' });
        }
    }
}