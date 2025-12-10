import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'apps/roles/dto/create-role-dto';
import { Role } from 'apps/roles/entities/role.entity';
import { IsNull, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
   constructor(@InjectRepository(Role) private readonly roleRepository : Repository<Role>){}

  
   async create(createRoleDto:CreateRoleDto){
      return this.roleRepository.save(createRoleDto)
   }

   async getAllRoles(){
      return await this.roleRepository.find()
   }

   async getRoleChildrenById(id: string) {
       
         const children = await this.roleRepository.find({
              where: {
                 parentId: id,
                  id: Not(id),
                },
             });
         return children;
       }



  async getRoleById(id: string) {
         const role = await this.roleRepository.findOne({
                 where: { id },
                relations: ['parentRole', 'children'],
             });
       if (!role) {
         throw new NotFoundException('Role not found');
         }
       return role;
    }
 
    
   
   async UpdateRole(id:string,input:{name?:string,description?:string,parentId?:string}){
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
        
    async deleteRole(id: string){
        const role = await this.roleRepository.findOne({
            where: { id }
        });
    
        if (!role) {
            throw new NotFoundException('Role not found');
        }
       if (role.children.length > 0){
        role.children.forEach((role)=> this.roleRepository.update(role.id,{parentId:role.parentId}))
        this.roleRepository.delete(id)
        return { message: 'Role removed successfully' };
       }
       this.roleRepository.delete(id)
       return { message: 'Role removed successfully' }

   }


}

