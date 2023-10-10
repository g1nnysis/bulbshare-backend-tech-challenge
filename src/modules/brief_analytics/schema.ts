import { IsAgeValid } from '../../common/decorators'
import { FilterCriteria as FilterCriteriaDto } from './dto'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FilterCriteria implements FilterCriteriaDto {
  @IsOptional()
  @IsAgeValid()
  age?: [number, number]

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  gender?: string[]

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  country: number[]
}
