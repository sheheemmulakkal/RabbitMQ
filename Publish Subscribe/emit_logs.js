const amqp = require("amqplib/callback_api");

amqp.connect(function (err0, connection) {
  if (err0) {
    throw err0;
  }
  connection.createChannel(function (err1, channel) {
    if (err1) {
      throw err1;
    }
    const exchange = "logs";
    const msg = process.argv.slice(2).join(" ") || "Hello World!";
    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    channel.publish(exchange, "", Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(() => {
    connection.close();
    process.exit(0);
  });
});
