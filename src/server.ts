import colors from 'colors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import app from './app';
import config from './config';
// import { errorLogger, logger } from './shared/logger';
import { socketHelper } from './app/socket/socket';


//uncaught exception
process.on('uncaughtException', error => {
  console.log('UnhandleException Detected', error);
  process.exit(1);
});

let server: any;
async function main() {
  try {
    mongoose.connect(config.mongoose.url as string);
    console.log(colors.green('🚀 Database connected successfully'));
    const port =
      typeof config.port === 'number' ? config.port : Number(config.port);
    server = app.listen(port, config.backendIp as string, () => {
      console.log(
        colors.yellow(
          `♻️  Application listening on port http://${config.backendIp}:${port}`
        )
      );
    });
    //socket
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: '*',
      },
    });
    socketHelper.socket(io);
    // @ts-ignore
    global.io = io;
    
  } catch (error) {
    console.log(colors.red('🤢 Failed to connect Database'));
  }

  //handle unhandledRejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log('UnhandledRejection Detected', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

//SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM IS RECEIVE');
  if (server) {
    server.close();
  }
});
