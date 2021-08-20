import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Authorized()
    @Column()
    @Field()
    age: number;
}
