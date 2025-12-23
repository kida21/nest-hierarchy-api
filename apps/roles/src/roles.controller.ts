import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'apps/roles/dto/create-role-dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common/auth';

@ApiTags('Roles')
@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary:'Create a Role'})
  @ApiBody({type:CreateRoleDto})
  @ApiResponse({status:201,description:'role created successfully'})
  async create(@Body() createRoleDto : CreateRoleDto){
    return await this.rolesService.create(createRoleDto)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary:'Fetch All Roles'})
  @ApiResponse({status:200,description:'list all roles'})
  async getAllRoles(){
     return await this.rolesService.getAllRoles()
  }
  @UseGuards(JwtAuthGuard)
  @Get('hierarchy')
  @ApiOperation({summary:'Build a tree of roles'})
  @ApiResponse({status:200,description:'list all roles in the form of tree'})
   getRoleHierarchy(){
    return this.rolesService.getRoleHierarchy()
   }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary:'get a Role by id'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'return a role with specified id'})
  async getRoleById(@Param('id') id:string){
    return await this.rolesService.getRoleById(id)
  }
   

  @UseGuards(JwtAuthGuard)
  @Get(':id/children')
  @ApiOperation({summary:'get children of a role'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'list children of a role'})
  async getRoleChildrenById(@Param('id') id:string){
    return await this.rolesService.getRoleChildrenById(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary:'update a role'})
  @ApiParam({name:'id',type:String})
  @ApiBody({type:PartialType(CreateRoleDto)})
  @ApiResponse({status:200,description:'return rows affected'})
  @Put(':id')
  async updateRole(@Param('id') id:string , 
             @Body() input:{name?:string,description?:string,parentId?:string}){
    return await this.rolesService.UpdateRole(id,input)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary:'delete a role'})
  @ApiParam({name:'id',type:String})
  @ApiResponse({status:200,description:'role removed successfully'})
  @Delete(':id')
  async deleterole(@Param('id') id:string){
    return await this.rolesService.deleteRole(id)
  }
}
