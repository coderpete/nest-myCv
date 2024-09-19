import { Injectable, ConflictException } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
// import { Account as AccountModel } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async register({ email, password }: AuthRegisterDto) {
    const findAccount = await this.prisma.account.findFirst({
      where: { email },
    });
    if (findAccount) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await hash(password, await genSalt());
    const account = await this.prisma.account.create({
      data: {
        email,
        passwordHash,
      },
    });
    return { account };
  }

  // TODO: break up into login and validateUser?
  async validateUser({ username, password }: AuthLoginDto) {
    console.log({ username, password }, 'inside validateUser');
    const findAccount = await this.prisma.account.findFirst({
      where: { email: username },
    });
    console.log({ findAccount }, 'found account');
    if (!findAccount) {
      console.log(`account not found for ${username}`);
      return null;
    }

    const challenge = await compare(password, findAccount.passwordHash);
    if (challenge) {
      console.log({ findAccount }, 'User verified');
      const account = { ...findAccount, passwordHash: undefined };
      return {
        user: account,
        accessToken: await this.jwtService.signAsync(account),
      };
    }
    console.log('Invalid Password');
    return null;
  }
}
