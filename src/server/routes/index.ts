import { usersRouter } from "@server/routes/users";
import { Router, type Router as RouterType } from "express";

export const apiRouter: RouterType = Router();

apiRouter.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

apiRouter.use("/users", usersRouter);
