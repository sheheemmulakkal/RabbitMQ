const amqp = require("amqplib/callback_api");

amqp.connect(function (err0, connection) {
  if (err0) {
    throw err0;
  }
  connection.createChannel(function (err1, channel) {
    if (err1) {
      throw err1;
    }
    var queue = "task_queue";
    var msg = process.argv.slice(2).join(" ") || "Hello World!";
    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });
    console.log("[x] Sent %s", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit();
  }, 500);
});
