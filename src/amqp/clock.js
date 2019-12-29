/* eslint-disable no-console */
const amqp = require('amqplib');
const { CronJob } = require('cron');

const { jobConfig } = require('./amqp-config');

const url = process.env.CLOUDAMQP_URL;

async function sendMessage(connection, channel, message) {
  try {
    console.log('Sending the message...');
    await channel.sendToQueue('tasks', Buffer.from(message), {
      persistent: true,
    });
  } catch (error) {
    console.log(error);
  }
}

async function runJob(connection, channel) {
  try {
    const job = new CronJob({
      cronTime: jobConfig.cronTime,
      onTick: async () => {
        await sendMessage(connection, channel, jobConfig.task);
      },
      timeZone: jobConfig.timeZone,
    });
    job.start();
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  try {
    console.log('Connecting...');
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertQueue('tasks', { durable: true });
    console.log('Running the job...');
    await runJob(connection, channel);
  } catch (error) {
    console.log(error);
  }
})();
