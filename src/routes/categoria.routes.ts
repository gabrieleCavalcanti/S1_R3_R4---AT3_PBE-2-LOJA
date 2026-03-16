import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes =Router();

categoriaRoutes.get('/categorias', categoriaController.selecionaTodos);
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias', categoriaController.editar);


export default categoriaRoutes;