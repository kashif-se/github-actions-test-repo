const amqp = require("amqplib/callback_api");

// Consumer
/** Notification to user
 *
 */
module.exports.notification = (bot) => {
  const opt = { credentials: require('amqplib').credentials.plain('rabbitmq', 'rabbitmq') };
  amqp.connect("amqp://localhost", opt, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = "captchaNotification";

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(
        " [*] Waiting for new notification messages in queue %s",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          const notificationData = JSON.parse(msg.content);
          console.log(
            " [x] New Notification Received %s",
            msg.content.toString()
          );
          console.log(notificationData[0]);

          //Remove user restrictions in chat (supergroup)
          let chatId = notificationData[0].chatId;
          let message = notificationData[0].message;
          let userId = notificationData[0].userId;
          let options = {
            can_send_messages: true,
            can_send_media_messages: true,
            can_send_polls: true,
            can_send_other_messages: true,
            can_add_web_page_previews: true,
            can_change_info: false,
            can_invite_users: true,
          };
          bot.telegram.restrictChatMember(chatId, userId, options);

          // Send success message to group
          bot.telegram.sendMessage(chatId, message, { parse_mode: "html" });
        },
        {
          noAck: true,
        }
      );
    });
  });
};
