import { User } from "../entities/user.js";
import {
  UserRepository,
  type IUserRepository,
} from "../repositories/user.repository.js";
import { userSchema } from "../schemas/zod.schema.js";

export interface IUserService {
  createUser(name: string, email:string, password: string): Promise<User>;
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async createUser(name: string, email: string, password: string) {
    const hasErrorInShema = userSchema.safeParse({ name, email, password });

    if (!hasErrorInShema.success) {
      throw new Error("Invalid user data");
    }
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("This user already exist!");
    }
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }
    return await this.userRepository.create(user);
  }
}
