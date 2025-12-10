import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'apps/roles/dto/create-role-dto';

@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto : CreateRoleDto){
    return await this.rolesService.create(createRoleDto)
  }
  
  @Get()
  async getAllRoles(){
     return await this.rolesService.getAllRoles()
  }

  @Get(':id')
  async getRoleById(@Param('id') id:string){
    return await this.rolesService.getRoleById(id)
  }

  @Get(':id/children')
  async getRoleChildrenById(@Param('id') id:string){
    return await this.rolesService.getRoleChildrenById(id)
  }

  @Put(':id')
  async updateRole(@Param('id') id:string , 
             @Body() input:{name?:string,description?:string,parentId?:string}){
    return await this.rolesService.UpdateRole(id,input)
  }

  @Delete(':id')
  async deleterole(@Param('id') id:string){
    return await this.rolesService.deleteRole(id)
  }
}
