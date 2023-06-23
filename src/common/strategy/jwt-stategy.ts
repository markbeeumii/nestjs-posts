
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy, JwtPayload} from 'passport-jwt'
import { AuthService } from "src/modules/auth/auth.service";

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.APP_SECRET_KEY),
    });
  }
  async validate(payload: any) {
    // Add your custom validation logic here
    // For example, you could check if the user exists in the database
    return { userId: payload.sub, username: payload.username };
  }
}
