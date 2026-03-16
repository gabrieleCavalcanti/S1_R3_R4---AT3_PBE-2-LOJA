import { Request, Response } from "express";
import { PedidoService } from "../services/pedido.service";

export class PedidoController {
    constructor(private _service = new PedidoService()) { }

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
            const { idVendedor, idCliente } = req.body;

            if (!idVendedor || isNaN(idVendedor) || !idCliente || isNaN(idCliente)) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }

            const novo = await this._service.criar(idCliente, idVendedor);
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
            const { idVendedor, idCliente, status } = req.body;

            if (!idVendedor || isNaN(idVendedor) || !idCliente || isNaN(idCliente) ) {
                return res.status(200).json({ message: 'Valor invalido!' })
            }
            if(!status || (status != 'ANDAMENTO' && status != 'CONCLUIDO' && status != 'CANCELADO')){
                return res.status(200).json({ message: 'Valor invalido, Status deve ser `ANDAMENTO`, `CONCLUIDO` ou `CANCELADO` ' })
            }

            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, idVendedor, idCliente, status);
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