import { Injectable, ValidationPipe } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class InputValidationPipe extends ValidationPipe {
	constructor(protected cls: ClassConstructor<any>) {
		super({
			transform: true,
			whitelist: true,
			transformOptions: { enableImplicitConversion: true },
			expectedType: cls,
		});
	}
}
