import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import uploadImage from "../middleware/uploadImage.middleware";

const produtoController = new ProdutoController();
const produtoRoutes =Router();

produtoRoutes.get('/produtos', produtoController.selecionaTodos);
produtoRoutes.post('/produtos', uploadImage, produtoController.criar);
produtoRoutes.patch('/produtos', produtoController.editar);


export default produtoRoutes;