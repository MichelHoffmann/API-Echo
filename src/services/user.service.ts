import { User } from "../entities/user.js";
import type { UserRepository } from "../repositories/user.repository.js";
import { userSchema } from "../schemas/zod.schema.js";

export class UserServicer {
  private constructor(readonly userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string) {
    const hasErrorInShema = userSchema.safeParse({ name, email, password });

    if (!hasErrorInShema.success) {
      throw new Error("Invalid user data");
    }
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("This user already exist!");
    }
    const user = User.create({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    });
    return await this.userRepository.create(user);
  }
}
