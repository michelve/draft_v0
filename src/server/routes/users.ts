import { userController } from "@server/controllers/user.controller";
import { Router, type Router as RouterType } from "express";

export const usersRouter: RouterType = Router();

usersRouter.get("/", userController.getAll);
usersRouter.get("/:id", userController.getById);
usersRouter.post("/", userController.create);
usersRouter.put("/:id", userController.update);
usersRouter.delete("/:id", userController.delete);
