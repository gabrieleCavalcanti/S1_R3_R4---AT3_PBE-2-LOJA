import { Router } from "express";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produtos.routes";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import pedidoRoutes from "./pedido.routes";
import itensPedidosRoutes from "./itensPedido.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', pedidoRoutes);
router.use('/', itensPedidosRoutes);



export default router;