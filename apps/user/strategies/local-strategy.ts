import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../src/user.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

 async validate(req: Request, email: string, password: string) {
    try {
      const user = await this.userService.verifyUser(email, password);
      return user;
    } catch (err) {
      
      if (req.res) {
        req.res.clearCookie('Authentication');
      }
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
