import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(email: string, password: string, name: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new UnauthorizedException();
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(email, hash, salt, name);
    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
    });
    return { accessToken };
  }

  async isNameTaken(name: string) {
    const is = await this.prisma.user.findFirst({ where: { name: name } });
    if (!is) {
      return true;
    }
    return false;
  }

  async signIn(identifier: string, password: string) {
    const user = await this.userService.findByEmailOrName(identifier);
    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);
    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    return { accessToken };
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const resetToken = await this.jwtService.signAsync(
      { userEmail: user.email },
      { expiresIn: '1h' },
    );
    return { resetToken };
  }

  async resetPassword(token: string, newPassword: string) {
    const decodedToken = await this.jwtService.verifyAsync(token);
    if (!decodedToken) throw new UnauthorizedException('Invalid token');
    const { userEmail } = decodedToken;

    const user = await this.userService.findByEmail(userEmail);
    if (!user) throw new UnauthorizedException('Invalid token');

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(newPassword, salt);
    await this.userService.userUpdate(userEmail, hash, salt);
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    return { accessToken };
  }
}
