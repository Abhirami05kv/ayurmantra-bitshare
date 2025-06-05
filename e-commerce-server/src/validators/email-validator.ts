// validators/email-validator.ts
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isValidEmailFormat } from '../utils/email-utils';

@ValidatorConstraint({ async: false })
export class IsEmailCustom implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    return isValidEmailFormat(email); // Use the function to validate the email
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid email format'; // Default error message
  }
}
