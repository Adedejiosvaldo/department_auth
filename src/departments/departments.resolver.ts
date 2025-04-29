import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PaginationInput } from './dto/pagination.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private departmentsService: DepartmentsService) {}

  @Query(() => [Department])
  async getDepartments(
    @Args('pagination', { nullable: true }) pagination: PaginationInput = new PaginationInput(),
  ): Promise<Department[]> {
    return this.departmentsService.findAll(pagination);
  }

  @Query(() => Department)
  async getDepartment(@Args('id', { type: () => ID }) id: number): Promise<Department> {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  async createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.update(id, updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    return this.departmentsService.remove(id);
  }
}