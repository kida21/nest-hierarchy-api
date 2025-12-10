import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from 'apps/dto/create-role-dto';
import { Role } from 'apps/entities/role.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
   constructor(@Inject(Repository) private readonly roleRepository : Repository<Role>){}

  
   async create(createRoleDto:CreateRoleDto):Promise<Role>{
      return this.roleRepository.create(createRoleDto)
   }

   async getAllRoles():Promise<Role[]>{
      return await this.roleRepository.find()
   }

   async getRoleById(id: string): Promise<Role> {
        const role =  await this.roleRepository.findOne({
            where: { id },
            relations: ['parent', 'children'],
            });

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        return role
    } 
    
   async getRoleChildrenById(id: string): Promise<Role[]> {
        const children = await this.roleRepository.find({
            where: { parentId: id },
        });
        return children;
    }

    async UpdateRole(id:string,input:{name?:string,description?:string,parentId?:string}):Promise<UpdateResult>{
       const role = this.roleRepository.findOne({where:{id}})
       const parentRole = this.roleRepository.findOne({where:{id:input.parentId}})
       if (!role){
         throw new NotFoundException('role with this id not found')
       }
       if(!parentRole){
         throw new NotFoundException('parent role not found')
       }

       if(input.parentId && input.parentId === id){
         throw new BadRequestException('Role can not be a parent for itself')
       }
      return await this.roleRepository.update(id,input)
      
    }

}

