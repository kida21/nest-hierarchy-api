import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalGuard } from '../guards/local-guard';
import { CurrentUser } from '../Decorator/current-user-decorator';
import { User } from '../entities/user.entity';
import type { Response } from 'express';
import { CreateUserDto } from '../dto/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user : User,
    @Res() response : Response
  ){
      this.userService.login(user,response)
     response.send(user)
  }

  @Post()
  async createUser(createDto:CreateUserDto){
      this.userService.createUser(createDto)
  }

}
