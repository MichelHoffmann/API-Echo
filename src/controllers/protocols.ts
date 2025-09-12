import type { User } from "../../src/models/user.js";

export interface IUsersController {
  index(): Promise<User[]>; //lista todos os usuários
  // show(): Promise<User | null>; //lista um usuário específico
  // create(): Promise<User>; //cria um novo usuário
}

export interface IUsersRepository {
  getUsers(): Promise<User[]>;
}
