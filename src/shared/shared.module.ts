import { Module } from '@nestjs/common';
import { InputValidationPipe } from './pipes';
import { BaseRepository } from './repositories';

@Module({
	providers: [InputValidationPipe, BaseRepository],
	exports: [InputValidationPipe, BaseRepository],
})
export class SharedModule {}
