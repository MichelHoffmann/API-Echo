import jwt from "jsonwebtoken";

export class JwtService {
  static secretKey =
    process.env.JWT_SECRET ??
    "f9c7d8e316109c87b55e0d002b64451d7bc43f8cc60cecf8788a4d7e1026f429";

  static generateToken(id: string) {
    const token = jwt.sign({ sub: id }, this.secretKey, { expiresIn: "1h" });
    return token;
  }

  static verify(token: string) {
    return jwt.verify(token, this.secretKey)
  }
}