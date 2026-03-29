import { UserNotFoundError, userService } from "@server/services/user.service";
import type { Request, Response } from "express";
import { z } from "zod";
import { Prisma } from "../../generated/prisma/client.js";

const userCreateSchema = z.object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(1).max(100).optional(),
});

const userUpdateSchema = z.object({
    email: z.string().email("Invalid email format").optional(),
    name: z.string().min(1).max(100).optional(),
});

const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const userController = {
    async getAll(req: Request, res: Response) {
        const parsed = paginationSchema.safeParse(req.query);
        if (!parsed.success) {
            res.status(400).json({
                error: "Bad Request",
                message: parsed.error.issues[0]?.message ?? "Invalid query params",
            });
            return;
        }
        const { page, limit } = parsed.data;
        const skip = (page - 1) * limit;
        try {
            const [users, total] = await Promise.all([
                userService.getAllUsers({ skip, take: limit }),
                userService.countUsers(),
            ]);
            res.status(200).json({
                data: users,
                meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
            });
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
                res.status(404).json({ error: "Not Found", message: "User not found" });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async create(req: Request, res: Response) {
        const parsed = userCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                error: "Bad Request",
                message: parsed.error.issues[0]?.message ?? "Invalid request body",
            });
            return;
        }
        try {
            const user = await userService.createUser(parsed.data);
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
        const parsed = userUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                error: "Bad Request",
                message: parsed.error.issues[0]?.message ?? "Invalid request body",
            });
            return;
        }
        try {
            const user = await userService.updateUser(req.params.id, parsed.data);
            res.status(200).json({ data: user });
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({ error: "Not Found", message: "User not found" });
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
            res.status(204).send();
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).json({ error: "Not Found", message: "User not found" });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
