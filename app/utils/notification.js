const amqp = require("amqplib/callback_api");

// Producer
module.exports.notification = (chatId, userId, message) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = "captchaNotification";
      const msg = [
        {
          chatId: chatId,
          userId: userId,
          message: message,
        },
      ];

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

      console.log(" [x] Notification Sent %s", JSON.stringify(msg[0], null, 2));
    });
    setTimeout(function () {
      connection.close();
    }, 1000);
  });
};
