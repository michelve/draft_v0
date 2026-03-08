import { userRepository } from "@server/repositories/user.repository";

export const userService = {
    async getAllUsers(params?: { skip?: number; take?: number }) {
        return userRepository.findAll(params);
    },

    async countUsers() {
        return userRepository.count();
    },

    async getUserById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError(id);
        }
        return user;
    },

    async createUser(data: { email: string; name?: string }) {
        return userRepository.create(data);
    },

    async updateUser(id: string, data: { email?: string; name?: string }) {
        const user = await userRepository.update(id, data).catch((err) => {
            if (err?.code === "P2025") throw new UserNotFoundError(id);
            throw err;
        });
        return user;
    },

    async deleteUser(id: string) {
        await userRepository.delete(id).catch((err) => {
            if (err?.code === "P2025") throw new UserNotFoundError(id);
            throw err;
        });
    },
};

export class UserNotFoundError extends Error {
    constructor(id: string) {
        super(`User with id "${id}" not found`);
        this.name = "UserNotFoundError";
    }
}
