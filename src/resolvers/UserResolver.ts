import { Resolver, Query, Arg, Mutation, InputType, Field, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

@InputType()
class UserInput {
    @Field({ nullable: true })
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    age: number;
}

@Resolver()
export class UserResolver {

    repo = getRepository(User);

    @Query(() => User, { nullable: true })
    me(@Ctx() context) {
        return this.repo.findOne({ id: context.userId });
    }

    @Mutation(() => User)
    upsertUser(@Arg('user') user: UserInput) {
        return this.repo.save(user);
    }

    @Mutation(() => Boolean)
    deleteUser(@Arg('id') id: string) {
        return this.repo.delete(id).then(() => true).catch(() => false);
    }

    @Query(() => User, { nullable: true })
    user(@Arg('id') id: string) {
        return this.repo.findOne(id);
    }

    @Query(() => [User])
    users() {
        return this.repo.find();
    }
}
