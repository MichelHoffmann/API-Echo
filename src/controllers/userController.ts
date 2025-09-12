import type { User } from "../models/user.js";
import type { IUsersController } from "./protocols.js";

export class UsersController implements IUsersController {
  index(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
