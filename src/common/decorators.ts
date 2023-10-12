/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerDecorator, ValidationOptions, ValidationArguments, isNumber, isPositive } from 'class-validator'

export function IsAgeValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isAgeValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!value || !Array.isArray(value) || value.length !== 2) {
            return false
          }

          const [start, end] = value

          return isNumber(start) && isNumber(end) && isPositive(start) && isPositive(end) && start <= end
        },
        defaultMessage(_validationArguments?: ValidationArguments) {
          return 'The second element of age should be greater than or equal to the first element.'
        },
      },
    })
  }
}
