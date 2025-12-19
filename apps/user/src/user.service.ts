import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import * as bcrypt from 'bcryptjs'



@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
  private readonly userRepository:Repository<User>,
  
){}

  async createUser(userDto:CreateUserDto){
    return this.userRepository.create({
      ...userDto,
      password: await bcrypt.hash(userDto.password,10)
    })
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
 
  

}
