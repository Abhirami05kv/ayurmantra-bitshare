import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ShippingAddressDto {
  @IsNotEmpty({ message: 'Street is required' })
  @IsString({ message: 'Street must be a valid string' })
  @Length(3, 255, { message: 'Street must be between 3 and 255 characters' })
  street: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a valid string' })
  @Length(2, 100, { message: 'City must be between 2 and 100 characters' })
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a valid string' })
  @Length(2, 100, { message: 'State must be between 2 and 100 characters' })
  state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a valid string' })
  @Length(2, 100, { message: 'Country must be between 2 and 100 characters' })
  country: string;

  @IsNotEmpty({ message: 'Zip code is required' })
  @Matches(/^\d{6}$/, { message: 'Enter a valid zip code (exactly 6 digits)' }) 
  zipCode: string;
}
