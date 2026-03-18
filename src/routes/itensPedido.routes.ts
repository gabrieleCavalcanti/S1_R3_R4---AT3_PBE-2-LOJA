import { Router } from "express";
import { ItensPedidoController } from "../controllers/itensPedido.controller";

const itensPedidoController = new ItensPedidoController();
const itensPedidoRoutes =Router();

itensPedidoRoutes.get('/itensPedidos', itensPedidoController.selecionaTodos);
itensPedidoRoutes.post('/itensPedidos', itensPedidoController.criar);
itensPedidoRoutes.delete('/itensPedidos', itensPedidoController.deletar);



export default itensPedidoRoutes;