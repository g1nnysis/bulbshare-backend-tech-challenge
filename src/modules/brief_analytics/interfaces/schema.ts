import { IsAgeValid } from '../../../common/decorators'
import {
  FilterCriteria as FilterCriteriaDto,
  AverageCompletionResponse as AverageCompletionResponseDto,
  AggregatedResponse as AggregatedResponseDto,
} from './dto'
import { ArrayNotEmpty, IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class FilterCriteria implements FilterCriteriaDto {
  @IsOptional()
  @IsAgeValid()
  age?: [number, number]

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  gender?: string[]

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  country?: number[]
}

export class AverageCompletionResponse implements AverageCompletionResponseDto {
  @IsNumber() average!: number
}

export class AggregatedResponse {
  @IsObject() data: AggregatedResponseDto
}
