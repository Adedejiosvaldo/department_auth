import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  exports: [TypeOrmModule],
})
export class DepartmentsModule {}