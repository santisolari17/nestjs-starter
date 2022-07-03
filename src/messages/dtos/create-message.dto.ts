import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: `the content must be a valid string` })
  content: string;
}
