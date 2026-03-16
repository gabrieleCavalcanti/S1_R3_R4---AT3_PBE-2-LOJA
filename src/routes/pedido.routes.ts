import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const pedidoController = new PedidoController();
const pedidoRoutes =Router();

pedidoRoutes.get('/pedidos', pedidoController.selecionaTodos);
pedidoRoutes.post('/pedidos', pedidoController.criar);
pedidoRoutes.patch('/pedidos', pedidoController.editar);

export default pedidoRoutes;