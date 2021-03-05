import { mixin, ValidationPipe } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function TypeValidationPipe(typeCtr: ClassConstructor<any>) {
	class TypeValidationPipe extends ValidationPipe {
		constructor() {
			super({
				transform: true,
				whitelist: true,
				transformOptions: { enableImplicitConversion: true },
				expectedType: typeCtr,
			});
		}
	}

	return mixin(TypeValidationPipe);
}
