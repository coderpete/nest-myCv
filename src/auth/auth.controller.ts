import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request as RequestInterface } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authRegisterPayload: AuthRegisterDto) {
    return await this.authService.register(authRegisterPayload);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Request() req: RequestInterface) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Request() req: RequestInterface) {
    return { hello: 'hello', user: req.user };
  }
}
