import { Request, Response } from "express";
import { ItensPedidoService } from "../services/itensPedido.service";

export class ItensPedidoController {
    constructor(private _service = new ItensPedidoService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const id = req.query.id

            if (id) {
                const idPed = Number(id);
                const pedidoId = await this._service.selecionaId(idPed);
                if (pedidoId.length === 0) {
                    return res.status(200).json({ message: 'Pedido não localizada' });
                }
                return res.status(200).json({ pedidoId });
            }

            const pedidos = await this._service.selecionaTodos();
            res.status(200).json({ pedidos });

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
            const { idPedido, idProduto, qtd } = req.body;

            if (!idPedido || isNaN(idPedido) || !idProduto || isNaN(idProduto) || !qtd || isNaN(qtd)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const novo = await this._service.criar(idPedido, idProduto, qtd);
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
            const { idPedido, idProduto, qtd } = req.body;

            if (!idPedido || isNaN(idPedido) || !idProduto || isNaN(idProduto) || !qtd || isNaN(qtd)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, idPedido, idProduto, qtd);
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