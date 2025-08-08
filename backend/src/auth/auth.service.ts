import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && await bcrypt.compare(String(password), String(user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        const access_token = this.jwtService.sign(payload, {
            'secret': process.env.JWT_ACCESS_TOKEN || "jwt_access_token_secret",
            'expiresIn': '10m'
        })
        const refresh_token = this.jwtService.sign(payload, {
            'secret': process.env.JWT_REFRESH_TOKEN || "jwt_refresh_token_secret",
            'expiresIn': '3d'
        })
        await this.usersService.updateRefreshToken(user.id.toString(), refresh_token);
        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }
    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
            });

            const user = await this.usersService.findById(payload.sub);
            if (user?.refreshToken !== refreshToken) {
                throw new UnauthorizedException();
            }

            return this.login(user); // issue new tokens
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
