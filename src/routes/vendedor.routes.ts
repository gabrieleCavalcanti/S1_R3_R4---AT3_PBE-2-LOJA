import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorController = new VendedorController();
const vendedorRoutes = Router();

vendedorRoutes.get('/vendedores', vendedorController.selecinaId);
vendedorRoutes.post('/vendedores', vendedorController.criar);
vendedorRoutes.patch('/vendedores', vendedorController.editar);

export default vendedorRoutes;