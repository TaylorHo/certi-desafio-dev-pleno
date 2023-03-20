import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Proteção de endpoints utilizando token JWT. A lógica aplicada por este AuthGuard está no arquivo
 * src/service/auth/jwt.strategy.ts (seguindo o padrão da documentação)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
