/* eslint-disable no-console */
import scrape from '../scrape';

const amqp = require('amqplib');

const url = process.env.CLOUDAMQP_URL;

(async () => {
  try {
    console.log('Connecting...');
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    const queue = 'tasks';

    await channel.assertQueue(queue, { durable: true });
    console.log('Ready to receive the message...');
    await channel.consume(
      queue,
      async message => {
        if (message.content.toString() === 'scrape') {
          console.log('Scraping...');
          await scrape();
          console.log('Scraping completed.');
        } else {
          console.log('Unknown task.');
        }
        channel.ack(message);
      },
      { noAck: false }
    );
  } catch (error) {
    console.log(error);
  }
})();
