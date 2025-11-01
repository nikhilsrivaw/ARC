import app from './app';
import Logger from '@arc/logger';

const logger = new Logger({
    serviceName : 'api-gateway',
    logLevel: process.env.LOG_LEVEL || 'DEBUG',
    enableConsole: true,
    enableFile : false,
});
 const PORT = process.env.API_GATEWAY_PORT || 3000;



 // start server 
app.listen(PORT, () => {
    logger.info(`API Gateway running on port ${PORT}`);
  });

// handle shutdown gracefully

process.on("SIGTERM" , ()=>{

    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);  // Clean exit

})