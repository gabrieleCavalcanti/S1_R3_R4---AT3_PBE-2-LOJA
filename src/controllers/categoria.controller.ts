import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";
import { error } from "node:console";

export class CategoriaController {
    constructor(private _service = new CategoriaService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = req.query.id

            if (id) {
                const idCat = Number(id);
                const categoriaId = await this._service.selecionaId(idCat);
                if (categoriaId.length === 0) {
                    return res.status(200).json({ message: 'Categoria não localizada' });
                }
                return res.status(200).json({ categoriaId});
            }

            const categorias = await this._service.selecionaTodos();
            res.status(200).json({ categorias });

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
            const { nome } = req.body;

            if (!nome || !isNaN(nome)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const novo = await this._service.criar(nome);
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
            const { nome, ativo } = req.body;

            if (!nome || !isNaN(nome) || typeof ativo !== "boolean") {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, nome, ativo);
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