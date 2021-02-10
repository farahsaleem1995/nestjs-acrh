import { Module } from '@nestjs/common';
import { InputValidationPipe } from './pipes';

@Module({
	providers: [InputValidationPipe],
})
export class SharedModule {}
