import * as os from 'os';

export const uploadConfigs = {
  queueName: 'uploadQueue',
  jobName: 'uploadJob',
  attempts: 3,
  delay: 10000,
  concurrency: os.cpus().length,
}