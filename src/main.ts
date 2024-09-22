import express from 'express';
const ProgressBar = require('progress');

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', async (req, res) => {
  await new Promise((resolve) => {
    const bar = new ProgressBar(':bar', { total: 50 });
    const timer = setInterval(function () {
      bar.tick();
      if (bar.complete) {
        console.log('\ncomplete\n');
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
  });
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
