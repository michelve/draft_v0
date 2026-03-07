import { Prisma } from "@prisma/client";
import { UserNotFoundError, userService } from "@server/services/user.service";
import type { Request, Response } from "express";

export const userController = {
    async getAll(_req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({ data: user });
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({
                    error: "Not Found",
                    message: "User not found",
                });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { email, name } = req.body;
            if (!email || typeof email !== "string") {
                res.status(400).json({
                    error: "Bad Request",
                    message: "Email is required",
                });
                return;
            }
            const user = await userService.createUser({ email, name });
            res.status(201).json({ data: user });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(409).json({
                        error: "Conflict",
                        message: "A user with this email already exists",
                    });
                    return;
                }
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async update(req: Request<{ id: string }>, res: Response) {
        try {
            const { email, name } = req.body;
            const user = await userService.updateUser(req.params.id, {
                email,
                name,
            });
            res.status(200).json({ data: user });
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({
                    error: "Not Found",
                    message: "User not found",
                });
                return;
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(409).json({
                        error: "Conflict",
                        message: "A user with this email already exists",
                    });
                    return;
                }
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async delete(req: Request<{ id: string }>, res: Response) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json({ data: { success: true } });
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({
                    error: "Not Found",
                    message: "User not found",
                });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
