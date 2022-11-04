import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => Number(value))
  @IsLongitude()
  longitude: number;

  @Transform(({ value }) => Number(value))
  @IsLatitude()
  latitude: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
