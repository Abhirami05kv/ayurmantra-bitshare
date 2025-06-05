// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString } from 'class-validator';

// export class sendNotificationDTO {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   title: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   body: string;
// }

export class SendNotificationDto {
  deviceToken: string;
  title: string;
  body: string;
}
