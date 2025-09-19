import { UserService, type IUserService } from "../services/user.service.js";
import type { IUsersController } from "./protocols.js";
import type { Request, Response } from "express";

export class UsersController implements IUsersController {
  constructor(private userService: IUserService) {}
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing user data" });
    }
    if (!email) {
      return res.status(400).json({ error: "Missing user data" });
    }
    if (!password) {
      return res.status(400).json({ error: "Missing user data" });
    }
    const createdUser = await this.userService.createUser(name, email, password);
    return createdUser;
  }
  // index(req: Request, res: Response) {}
  // show(req: Request, res: Response) {}
  // update(req: Request, res: Response) {}
}
