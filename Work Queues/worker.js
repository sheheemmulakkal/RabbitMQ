const amqp = require("amqplib/callback_api");

amqp.connect(function (err0, connection) {
  if (err0) throw err0;
  connection.createChannel(function (err1, channel) {
    if (err1) throw err1;
    const queue = "task_queue";
    channel.assertQueue(queue, {
      durable: true,
    });
    channel.consume(
      queue,
      function (msg) {
        const secs = msg.content.toString().split(".").length - 1;
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log("[x] Done");
        }, secs * 1000);
      },
      {
        noAck: true,
      }
    );
  });
});
