import { BadRequestException,ConflictException,Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'apps/roles/dto/create-role-dto';
import { Role } from 'apps/roles/entities/role.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class RolesService {
   constructor(@InjectRepository(Role) private readonly roleRepository : Repository<Role>){}

  
   async create(createRoleDto: CreateRoleDto) {
      try {
         return await this.roleRepository.save(createRoleDto);
      }catch (error) {
        if (
            error instanceof QueryFailedError &&
            (error as any).code === '23505' 
          ) {

        throw new ConflictException(
        `Role with name "${createRoleDto.name}" already exists`
        );
       }
    throw error;
    }
   }

   async getAllRoles(){
      return await this.roleRepository.find({
        select:{
          name: true,
          id:true,
          parentId:true
        }
      })
   }

    async getRoleHierarchy(){
      const allRoles = this.roleRepository.find()
      const roleMap = new Map<string | null,Role[]>();
      (await allRoles).forEach((role)=>{
        const parentKey = role.parentId ?? null
        if (!roleMap.has(parentKey)) roleMap.set(parentKey,[])
          roleMap.get(parentKey)?.push(role)
      })

      const BuildTree = (parentId:string | null)=>{
        const roles = roleMap.get(parentId) || []
        return roles.map((role)=>({
          id:role.id,
          name:role.name,
          description:role.description,
          children:BuildTree(role.id)
        }))
      }
      return BuildTree(null)
    }

   async getRoleChildrenById(id: string) {
        const role = await this.roleRepository.findOne({
             where: { id },
             relations: ['children'],
             });

          return role?.children || [];
       }



   async getRoleById(id: string) {
         const role = await this.roleRepository.findOne({
                 where: { id },
                relations: ['parentRole', 'children'],
             });
       if(!role) {
         throw new NotFoundException('Role not found');
         }
       return role;
    }
 
    
   
   async UpdateRole(id:string,input:{name?:string,description?:string,parentId?:string}){

      if (input.parentId === id) {
         throw new BadRequestException("A role cannot be its own parent");
       }
       return await this.roleRepository.update(id, {
             name: input.name,
            description: input.description,
            parentId: input.parentId,
          });

    }
        
    async deleteRole(id: string) {
       const result = await this.roleRepository.delete(id);

       if (result.affected === 0) {
           throw new NotFoundException('Role not found');
          }

        return { message: 'Role and all child roles deleted successfully' };
      }


}

