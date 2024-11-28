import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { logger } from './utils/logger.utils';

const app = express();

app.get('/job', async (req: Request, res: Response) => {
  const event = req.body;
  logger.info('⚡️ New event received ⚡️', "New event Received");

  // handle business logic
  // ex: build report, send email

  res.status(200).send();
});
const PORT = 8080;

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Braintree extension application listening on port ${PORT}`);
});

export default server;