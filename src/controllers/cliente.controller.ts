import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";
import { cp } from "node:fs";

export class ClienteController {
    constructor(private _service = new ClienteService()) { }

    selecinaId = async (req: Request, res: Response) => {
        try {
            const id = req.query.id
            const clientes = await this._service.selecionaId(Number(id));
            console.log(`Resposta : ${clientes}`)
            res.status(200).json({ clientes })

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
            const { nome, email, cpf } = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nome || !isNaN(nome) || !email || !isNaN(email) || !emailRegex.test(email) || !cpf || !isNaN(cpf)) {
                return res.status(200).json({ message: `Valor invalido! ${nome}, ${email}, ${cpf}` })
            }

            const novo = await this._service.criar(nome, email, cpf);
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
            const { nome, email, cpf } = req.body;
            const id = Number(req.query.id)

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nome || !isNaN(nome) || !email || !isNaN(email) || !emailRegex.test(email) || !cpf || !isNaN(cpf)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const alterado = await this._service.editar(id, nome, email, cpf);
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