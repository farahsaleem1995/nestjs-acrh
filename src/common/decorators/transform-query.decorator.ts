import { BadRequestException, PipeTransform, Query, Type } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { FindAllQuery } from 'src/data/types';

export function TransformQuery(
	queryType: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	class QueryTransformPipe implements PipeTransform {
		constructor(private cls: ClassConstructor<any>) {}

		async transform(value: any): Promise<FindAllQuery<any>> {
			await this.validate(value, this.cls);

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

	return Query(new QueryTransformPipe(queryType), ...pipes);
}
