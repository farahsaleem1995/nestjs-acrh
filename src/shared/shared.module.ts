import { Module } from '@nestjs/common';
import { WhitelistValidationPipe } from './pipes';

@Module({
	providers: [
		{
			useFactory: (cls: any) => {
				return new WhitelistValidationPipe(cls);
			},
			provide: WhitelistValidationPipe,
		},
	],
})
export class SharedModule {}
