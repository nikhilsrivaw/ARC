import app from './app';
import Logger from '@arc/logger';


const logger = new Logger({
    serviceName: 'auth-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});

const PORT = process.env.AUTH_SERVICE_PORT || 3001;


app.listen(PORT , ()=>{
    logger.info(`Auth Service running on port ${PORT}`)
});


process.on('SIGTERM' , ()=>{
     logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
})