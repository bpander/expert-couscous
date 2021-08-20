import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { User } from './entity/User';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';

const startUp = async () => {
    const connection = await createConnection();

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    const schema = await buildSchema({
        resolvers: [UserResolver],
        authChecker: (/* resolverData, roles */) => {
            return true;
        },
    });
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
    }));
      
    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: 'Phantom',
    //     lastName: 'Assassin',
    //     age: 24
    // }));

    console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
};

startUp().catch(error => console.log(error));
