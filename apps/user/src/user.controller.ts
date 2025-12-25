import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalGuard } from '../guards/local-guard';
import { CurrentUser } from '../Decorator/current-user-decorator';
import { User } from '../entities/user.entity';
import type { Response } from 'express';
import { CreateUserDto } from '../dto/create-user-dto';
import { JwtGuard } from '../guards/jwt-guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user : User,
    @Res() response : Response
  ){
      response.clearCookie('Authentication')
      this.userService.login(user,response)
      response.send(user)
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Res() response:Response){
     response.clearCookie('Authentication')
     return response.send({message:'Logged out successfully'})
  }

  @UseGuards(JwtGuard)
  @Post()
  async createUser(@Body() createDto:CreateUserDto){
     return this.userService.createUser(createDto)
  }

 
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@CurrentUser() user: User) {
  return this.userService.getUser(user.id)
   }


  @UseGuards(JwtGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data : any){
    return data.user
  }
}
