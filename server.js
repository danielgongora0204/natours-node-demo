import './config/env';
import app from './app';
import { port } from './constants/server';

process.on('uncaughtException', (err) => {
  console.log(`An error has occured, server will be shutdown`);
  console.log(err);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Api running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(`An unhandled rejection has occured, server will be shutdown`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
