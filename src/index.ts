import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import { User } from './entity/User';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';

const startUp = async () => {
    const connection = await createConnection();

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    const auth = expressJwt({
        secret: 'FIXME',
        algorithms: ['HS256'], // FIXME: Auth0 recommends RS256
        credentialsRequired: false,
    });
    const schema = await buildSchema({
        resolvers: [UserResolver],
        authChecker: (/* resolverData, roles */) => {
            return true;
        },
    });
    app.use('/graphql', auth, graphqlHTTP(req => {
        const context = (req as any).user || {};
        return {
            schema,
            context,
            graphiql: {
                headerEditorEnabled: true,
            },
        };
    }));
    app.get('/token', (req, res) => {
        const token = jwt.sign({ userId: 'c9203875-8038-4e47-b362-1c237b6874d9' }, 'FIXME', {
            algorithm: 'HS256',
        });
        res.send(`Bearer ${token}`);
    });

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
