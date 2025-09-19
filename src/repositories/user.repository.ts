import type { UserPropsInterface } from "../entities/protocols.js";
import type { User } from "../entities/user.js";

export interface IUserRepository {
  create(user: UserPropsInterface): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(user: User): Promise<User>;
}

export class UserRepository {
    create(user: UserPropsInterface) {
        //LOGICA DO PRISMA
        //Esse return é apenas um mock, para evitar erro de compilação
        return Promise.resolve(user);
    }
    findByEmail(email: string) {
        //LOGICA DO PRISMA
        //Esse return é apenas um mock, para evitar erro de compilação
        return Promise.resolve(null);
    }
}