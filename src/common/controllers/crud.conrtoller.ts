import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	mixin,
	Param,
	PipeTransform,
	Post,
	Put,
	Type,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { FindAllQuery } from 'src/data/types';
import {
	InjectService,
	MapArrayResponse,
	MapResponse,
	TransformQuery,
	ValidateBody,
	ValidateById,
} from '../decorators';
import { BaseDto } from '../dtos';
import { Service } from '../services';
import { CreateOneParamDto, UpdateOneParamDto } from '../types';

export interface ICrudControllerConfig<
	TModel extends BaseModel,
	TCreate extends CreateOneParamDto<TModel>,
	TUpdate extends UpdateOneParamDto<TModel>
> {
	model: ClassConstructor<TModel>;
	dto: ClassConstructor<BaseDto>;
	findAll: {
		dto: ClassConstructor<any>;
		pipes?: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[];
	};
	create: {
		dto: ClassConstructor<TCreate>;
		pipes?: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[];
	};
	update: {
		dto: ClassConstructor<TUpdate>;
		pipes?: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[];
	};
}

export function CrudController<
	TModel extends BaseModel,
	TCreate extends CreateOneParamDto<TModel>,
	TUpdate
>(prefix: string, config: ICrudControllerConfig<TModel, TCreate, TUpdate>) {
	const {
		model,
		dto,
		findAll: { dto: findAllDto, pipes: findAllPipes = [] },
		create: { dto: createDto, pipes: createPipes = [] },
		update: { dto: updateDto, pipes: updatePipes = [] },
	} = config;

	@Controller(prefix)
	class CrudController {
		constructor(@InjectService(model) private readonly currenciesService: Service<TModel>) {}

		@Get()
		@MapArrayResponse(dto, model)
		async getAll(
			@TransformQuery(findAllDto, ...findAllPipes) query: FindAllQuery<TModel>,
		): Promise<TModel[]> {
			return await this.currenciesService.getAll(query);
		}

		@Post()
		@MapResponse(dto, model)
		async create(@ValidateBody(createDto, ...createPipes) createDto: TCreate): Promise<TModel> {
			return await this.currenciesService.create(createDto);
		}

		@Get(':id')
		@MapResponse(dto, model)
		async getById(@Param('id') id: string): Promise<TModel> {
			return this.currenciesService.getById(id);
		}

		@Put(':id')
		@MapResponse(dto, model)
		async update(
			@ValidateById(model) id: string,
			@ValidateBody(updateDto, ...updatePipes) updateDto: TUpdate,
		): Promise<TModel> {
			return await this.currenciesService.update(id, updateDto);
		}

		@Delete(':id')
		@HttpCode(HttpStatus.NOT_FOUND)
		async delete(@Param('id') id: string): Promise<void> {
			await this.currenciesService.delete(id);
		}
	}

	return mixin(CrudController);
}
