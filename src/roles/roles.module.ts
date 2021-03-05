import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { Role } from './models';
import { RoleController } from './roles.controller';

@Module({
	imports: [CommonModule.forFeature([Role])],
	controllers: [RoleController],
})
export class RolesModule {}
