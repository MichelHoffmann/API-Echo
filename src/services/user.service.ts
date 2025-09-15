import type { UserRepository } from "../repositories/user.repository.js";

export class UserServicer {
    private constructor (readonly userRepository: UserRepository) {}

    async createUser(name: string, email: string, password: string) {
        
    }
}