import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'apps/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
   constructor(@Inject(Repository) private readonly roleRepository : Repository<Role>){}

   
}
