import { prisma } from "@server/lib/prisma";
import type { Prisma } from "../../generated/prisma/client.js";

export const userRepository = {
    findAll(params?: { skip?: number; take?: number }) {
        return prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            skip: params?.skip,
            take: params?.take,
        });
    },

    count() {
        return prisma.user.count();
    },

    findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    },

    create(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    },

    update(id: string, data: Prisma.UserUpdateInput) {
        return prisma.user.update({ where: { id }, data });
    },

    delete(id: string) {
        return prisma.user.delete({ where: { id } });
    },
};
