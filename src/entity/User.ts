import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    firstName: string;

    @Column()
    @Field(() => String)
    lastName: string;

    @Authorized()
    @Column()
    @Field(() => Number)
    age: number;

}
