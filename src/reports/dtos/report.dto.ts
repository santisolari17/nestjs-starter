import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Report } from '../report.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  @Expose()
  mileage: number;

  @Transform((params) => {
    const reportData: Report = params.obj;
    return reportData.user.id;
  })
  @Expose()
  userId: number;
}
