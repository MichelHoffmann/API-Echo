import type { UserRepository } from "../repositories/user.repository.js";
import { BcryptjsService } from "./bcrypsjs.service.js";
import { JwtService } from "./jwt.service.js";

export class AuthService {
  constructor(readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = BcryptjsService.comparePassword(password, user.props.password)
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = JwtService.generateToken(user.props.id)
    return {token, email}
  }
}
