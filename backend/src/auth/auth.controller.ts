import { Controller,Post,UnauthorizedException,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BSON } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private usersService: UsersService) {}

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.login(user);
        return tokens;
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        const tokens = await this.authService.refresh(refreshToken);
        if (!tokens) {
            throw new UnauthorizedException();
        }
        return tokens;
    }
}
