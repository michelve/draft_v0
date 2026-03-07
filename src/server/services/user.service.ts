import { userRepository } from "@server/repositories/user.repository";

export const userService = {
    async getAllUsers() {
        return userRepository.findAll();
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
        await this.getUserById(id);
        return userRepository.update(id, data);
    },

    async deleteUser(id: string) {
        await this.getUserById(id);
        return userRepository.delete(id);
    },
};

export class UserNotFoundError extends Error {
    constructor(id: string) {
        super(`User with id "${id}" not found`);
        this.name = "UserNotFoundError";
    }
}
