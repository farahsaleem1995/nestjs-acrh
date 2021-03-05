import { Controller } from '@nestjs/common';
import { InjectService } from 'src/common/decorators';
import { Service } from 'src/common/services';
import { Role } from './models';

@Controller('roles')
export class RoleController {
	constructor(@InjectService(Role) private readonly rolesService: Service<Role>) {}
}
