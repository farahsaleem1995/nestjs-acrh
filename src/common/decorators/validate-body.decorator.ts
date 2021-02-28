import { Body, PipeTransform, Type, ValidationPipe } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function ValidateBody(
	bodyType: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	class BodyValidationPipe extends ValidationPipe {
		constructor(private cls: ClassConstructor<any>) {
			super({
				transform: true,
				whitelist: true,
				transformOptions: { enableImplicitConversion: true },
				expectedType: cls,
			});
		}
	}

	return Body(new BodyValidationPipe(bodyType), ...pipes);
}
