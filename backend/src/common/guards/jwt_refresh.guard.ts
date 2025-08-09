import { Injectable,CanActivate,ExecutionContext,UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { UsersService } from "src/users/users.service";



@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.headers.authorization?.split(' ')[1];
    if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'jwt_refresh_token_secret',
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.usersService.findOne(payload.sub);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token invalid or revoked');
    }

    req.user = user;
    return true;
  }
}
