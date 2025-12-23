import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import * as bcrypt from 'bcryptjs'
import { Response } from 'express';
import { TokenPayload } from '../interfaces/Token-Payload-interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
  private readonly userRepository:Repository<User>,
  private readonly configService : ConfigService,
  private readonly jwtService : JwtService
  
){}

  async createUser(userDto:CreateUserDto){
    this.userRepository.create({
      ...userDto,
      password: await bcrypt.hash(userDto.password,10)
    })
    return this.userRepository.save(userDto)
  }

  async verifyUser(email:string,password:string){
     const user = await this.userRepository.findOneBy({email})
     if(!user){
      throw new NotFoundException('user not found')
     }
     const passwordIsValid = bcrypt.compare(password,user.password)
     if(!passwordIsValid){
        throw new UnauthorizedException('Credentials are invalid')
     }
     return user
  }
 
  async login(user:User,response:Response){
     const tokenPayload:TokenPayload = {
       userId:user.id.toString(),
       role:user.role
      }
      const expires = new Date()
      expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_EXPIRES_IN')
      )

      const token = this.jwtService.sign(tokenPayload)
      response.cookie('Authentication',token,{
        expires,
        secure:false,
        httpOnly:true
      })
  
    } 

    async getUser(id:string){
       return this.userRepository.findOne({where:{id}})
    }

}
