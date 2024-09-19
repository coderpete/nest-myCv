import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from '../dto/auth.dto';
// import { AuthLoginDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log({ username, password }, 'inside local strategy');
    const authLoginDto: AuthLoginDto = { username, password };
    const signedUser = await this.authService.validateUser(authLoginDto);
    console.log({ signedUser }, 'inside local strategy');

    if (!signedUser) {
      throw new UnauthorizedException();
    }

    return signedUser;
  }
}
