import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";
import { cp } from "node:fs";

export class VendedorController {
    constructor(private _service = new VendedorService()) { }

    selecinaId = async (req: Request, res: Response) => {
        try {
            const id = req.query.id
            const vendedores = await this._service.selecionaId(Number(id));
            console.log(`Resposta : ${vendedores}`)

            res.status(200).json({ vendedores })

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
            const { nome, email } = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nome || !isNaN(nome) || !email || !isNaN(email) || !emailRegex.test(email)) {
                return res.status(200).json({ message: `Valor invalido! ${nome}, ${email}` })
            }

            const novo = await this._service.criar(nome, email);
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
            const { nome, email } = req.body;
            const id = Number(req.query.id)

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nome || !isNaN(nome) || !email || !isNaN(email) || !emailRegex.test(email)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const alterado = await this._service.editar(id, nome, email);
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