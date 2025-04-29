import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
@Entity('departments')
export class Department extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
  })
  subDepartments: SubDepartment[];
}