import { Controller,Post,UnauthorizedException,Body,Delete,Get,UseGuards,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtRefreshGuard } from 'src/common/guards/jwt_refresh.guard';


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
        if (!createUserDto.username || !createUserDto.password) {
            throw new UnauthorizedException('Username and password are required');
        }
        if (await this.usersService.findByUsername(createUserDto.username)) {
            throw new UnauthorizedException('Username already exists');
        }
        const user = await this.usersService.create(createUserDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.login(user);
        return tokens;
    }
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(@Request() req) {
        const tokens = await this.authService.refreshTokens(req.user.id);
        if (!tokens) {
            throw new UnauthorizedException();
        }
        return tokens;
    }

    @Delete('logout')
    async logout(@Request() req) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            throw new UnauthorizedException('Access token is required');
        }
        const user_id = await this.usersService.findId(accessToken);
        await this.authService.logout(accessToken);
        return {
            "message": "logout done"
        }
    }
}
