import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  public async create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return await this.repo.save(report);
  }

  public async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: Number(id) } });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }

  public async createEstimate(estimateDto: GetEstimateDto) {
    // eslint-disable-next-line prettier/prettier
    return this.repo.createQueryBuilder('rep')
      .select('AVG(rep.price)', 'price')
      .where('rep.make = :make', { make: estimateDto.make })
      .andWhere('rep.longitude - :longitude BETWEEN -5 AND 5', { longitude: estimateDto.longitude })
      .andWhere('rep.latitude - :latitude BETWEEN -5 AND 5', { latitude: estimateDto.latitude })
      .andWhere('rep.year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(rep.mileage - :mileage)', 'DESC', 'NULLS LAST')
      .setParameters({ mileage: estimateDto.mileage })
      .limit(3)
      .getRawOne();
  }
}
