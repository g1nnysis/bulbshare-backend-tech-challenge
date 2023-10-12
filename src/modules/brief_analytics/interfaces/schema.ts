import { IsAgeValid } from '../../../common/decorators'
import { FilterCriteria as FilterCriteriaDto } from './dto'
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

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
