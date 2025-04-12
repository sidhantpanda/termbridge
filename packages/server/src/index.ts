import "reflect-metadata";
require('dotenv').config();

import { startServer } from './server';
import { startWsServer } from './server-ws';
import { AppDataSource } from './postgres/data-source';
import { User } from './postgres/models/User';

const main = async () => {
  AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
    const user = await AppDataSource.getRepository("User").findOneBy({
      email: 'sidhantpanda@gmail.com'
    })
    console.log("User: ", user);
    if (!user) {
      console.log("No user found");
      const user = new User();
      user.id = "1";
      user.name = "Sidhant Panda";
      user.email = "sidhantpanda@gmail.com";
      user.password = "password";
      await AppDataSource.getRepository("User").save(user);
    }
    const server = await startServer();
    startWsServer(server);
  }).catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

};

main();
