import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'apps/roles/dto/create-role-dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary:'Create a Role'})
  @ApiBody({type:CreateRoleDto})
  @ApiResponse({status:201,description:'role created successfully'})
  async create(@Body() createRoleDto : CreateRoleDto){
    return await this.rolesService.create(createRoleDto)
  }
  
  @Get()
  @ApiOperation({summary:'Fetch All Roles'})
  @ApiResponse({status:200,description:'list all roles'})
  async getAllRoles(){
     return await this.rolesService.getAllRoles()
  }
  @Get('hierarchy')
  @ApiOperation({summary:'Build a tree of roles'})
  @ApiResponse({status:200,description:'list all roles in the form of tree'})
   getRoleHierarchy(){
    return this.rolesService.getRoleHierarchy()
   }

  @Get(':id')
  @ApiOperation({summary:'get a Role by id'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'return a role with specified id'})
  async getRoleById(@Param('id') id:string){
    return await this.rolesService.getRoleById(id)
  }
   

  
  @Get(':id/children')
  @ApiOperation({summary:'get children of a role'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'list children of a role'})
  async getRoleChildrenById(@Param('id') id:string){
    return await this.rolesService.getRoleChildrenById(id)
  }

  @ApiOperation({summary:'update a role'})
  @ApiParam({name:'id',type:String})
  @ApiBody({type:PartialType(CreateRoleDto)})
  @ApiResponse({status:200,description:'return rows affected'})
  @Put(':id')
  async updateRole(@Param('id') id:string , 
             @Body() input:{name?:string,description?:string,parentId?:string}){
    return await this.rolesService.UpdateRole(id,input)
  }

  @ApiOperation({summary:'delete a role'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'role removed successfully'})
  @Delete(':id')
  async deleterole(@Param('id') id:string){
    return await this.rolesService.deleteRole(id)
  }
}
