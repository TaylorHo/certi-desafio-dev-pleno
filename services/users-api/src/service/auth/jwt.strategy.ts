import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

/**
 * Estratégia de segurança JWT para ser aplicada com AuthGuard para os endpoints.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  /**
   * Valida um token JWT enviado como cabeçalho de autorização na requisição.
   */
  async validate(payload: { email: string; id: string }): Promise<boolean> {
    try {
      const existingUser = await this.userService.getUser(payload.id);
      if (!existingUser) throw new UnauthorizedException();
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
