import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Department } from './department.entity';

@ObjectType()
@Entity('sub_departments')
export class SubDepartment extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: 'CASCADE',
  })
  department: Department;
}