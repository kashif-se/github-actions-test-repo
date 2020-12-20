const {
  saveGroup,
  getGroup,
  updateGroup,
} = require("../../db/controllers/group");
const restrictUser = require("../../utils/restrictUser");

module.exports = async (ctx) => {
  // If new_chat_participant update then
  // need to check if this participant is our bot
  if (+ctx.message.new_chat_participant.id === +process.env.BOT_ID) {
    // Bot was added to some group
    console.log(
      "Bot was added to ",
      ctx.chat.type,
      ctx.chat.id,
      ctx.chat.title
    );
    try {
      let group = await getGroup(ctx.chat.id);
      if (group.status === "KICKED") {
        // Update status to 'Active'
        let updateValues = { $set: { status: "ACTIVE" } };
        await updateGroup(group._id, updateValues);
      }
    } catch (err) {
      console.log(err);
      // New group
      try {
        const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
        await saveGroup({
          id: ctx.chat.id,
          type: ctx.chat.type,
          title: ctx.chat.title,
          username: ctx.chat.username || null,
          status: "ACTIVE",
          admins: admins,
        });
      } catch (error) {
        console.log(error);
      }
    }

    ctx.reply("Bot successfuly added to " + ctx.chat.title);
  } else {
    // Someone added to group
    console.log(
      ctx.message.new_chat_participant,
      "added to",
      ctx.chat.type,
      ctx.chat.id,
      ctx.chat.title
    );
    ctx.reply("Welcome to " + ctx.chat.title);

    // Set restrictions for new user
    // let timeout = process.env.TIMEOUT; // Min
    // let until_date = Math.floor(
    //   new Date(new Date().getTime() + timeout * 60000).getTime() / 1000
    // );
    // let chatId = ctx.chat.id;
    // let userId = ctx.message.new_chat_participant.id;
    // let options = {
    //   can_send_messages: false,
    //   until_date: until_date,
    // };
    // ctx.telegram.restrictChatMember(chatId, userId, options);
    let userId = ctx.message.new_chat_participant.id;
    restrictUser(ctx, userId);
  }
};
