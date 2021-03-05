import { PipeTransform, BadRequestException, mixin } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { FindAllQuery } from 'src/data/types';

export function QueryTransformPipe(queryModelCtr: ClassConstructor<any>) {
	class QueryTransformPipe implements PipeTransform<any, Promise<FindAllQuery<any>>> {
		async transform(value: any): Promise<FindAllQuery<any>> {
			await this.validate(value, queryModelCtr);

			return value;
		}

		async validate(value: any, cls: ClassConstructor<any>): Promise<any> {
			const classObj = plainToClass(cls, value, { enableImplicitConversion: true });

			const errors = await validate(classObj, {
				whitelist: true,
				validationError: true,
			});

			if (errors.length) {
				throw new BadRequestException(errors.map((err) => err.constraints));
			}

			return classObj;
		}
	}

	return mixin(QueryTransformPipe);
}
