import bcrypt from "bcryptjs";

export class BcryptjsService {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
  static comparePassword(requestPassword: string, passwordDB: string) {
    return bcrypt.compareSync(requestPassword, passwordDB);
  }
}
