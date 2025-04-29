import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PaginationInput } from './dto/pagination.input';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentsRepository: Repository<SubDepartment>,
  ) {}

  async findAll(paginationInput: PaginationInput): Promise<Department[]> {
    const { page, limit } = paginationInput;
    const skip = (page - 1) * limit;

    return this.departmentsRepository.find({
      skip,
      take: limit,
      relations: ['subDepartments'],
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const { subDepartments, ...departmentData } = createDepartmentInput;
    
    const department = this.departmentsRepository.create(departmentData);
    const savedDepartment = await this.departmentsRepository.save(department);

    if (subDepartments && subDepartments.length > 0) {
      const subDepts = subDepartments.map(subDeptInput => {
        const subDept = this.subDepartmentsRepository.create({
          name: subDeptInput.name,
          department: savedDepartment,
        });
        return subDept;
      });

      await this.subDepartmentsRepository.save(subDepts);
      savedDepartment.subDepartments = subDepts;
    }

    return savedDepartment;
  }

  async update(
    id: number,
    updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    const department = await this.findOne(id);
    
    if (updateDepartmentInput.name) {
      department.name = updateDepartmentInput.name;
    }

    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    await this.departmentsRepository.remove(department);
    return true;
  }
}