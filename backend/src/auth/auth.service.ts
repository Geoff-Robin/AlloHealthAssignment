import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && await bcrypt.compare(String(password), String(user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    
    async verifyAccessToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async verifyRefreshToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async login(user: User | undefined) {
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id };
        const access_token = await this.jwtService.signAsync(payload, {
            'secret': process.env.JWT_ACCESS_SECRET || "jwt_access_token_secret",
            'expiresIn': '10m'
        })
        const refresh_token = await this.jwtService.signAsync(payload, {
            'secret': process.env.JWT_REFRESH_SECRET || "jwt_refresh_token_secret",
            'expiresIn': '3d'
        })
        await this.usersService.updateRefreshToken(Number(user.id), refresh_token);
        return {
            accessToken: access_token,
            refreshToken: refresh_token,
        };
    }
    async refreshTokens(id: number) {
        try {
            const refreshToken = await this.usersService.getRefreshToken(id);
            const payload = this.jwtService.verify(refreshToken ?? "refreshToken", {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
            });

            const user = await this.usersService.findById(payload.sub);

            return await this.login(user);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    async logout(accessToken: string) {
        const user: User | undefined = await this.usersService.findId(accessToken);
        if (user) {
            await this.usersService.removeRefreshToken(Number(user.id));
        }
    }
}
