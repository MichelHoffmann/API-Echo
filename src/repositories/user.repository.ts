import type { User } from "../entities/user.js";

export interface UserRepository {
    create(user: User): Promise<User>,
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
    update(user: User): Promise<User>,
}