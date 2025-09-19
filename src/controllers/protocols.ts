import type { Request, Response } from 'express'

export interface IUsersController {
  store(req: Request, res: Response): void; //cria um novo usuário
  // index(): Promise<User[]>; //lista todos os usuários
  // show(): Promise<User | null>; //lista um usuário específico
  // update(): Promise<User | null>; //atualiza um usuário existente
}