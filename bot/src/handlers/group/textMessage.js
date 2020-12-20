const Extra = require("telegraf/extra");
const { nanoid } = require("nanoid");
const { saveCaptcha } = require("../../db/controllers/captcha");
const restrictUser = require("../../utils/restrictUser");
const { getGroup } = require("../../db/controllers/group");

module.exports = async (ctx) => {
  let userId = ctx.message.from.id;

  // Check group admins
  let group = await getGroup(ctx.chat.id);
  if (group.admins) {
    // If user in admins then return
    console.log("Group admins: ", group.admins);
    for (const admin of group.admins) {
      if (admin.user && admin.user.id === userId) {
        console.log("User is admin");
        return;
      }
    }
  }
  // Set restrictions for each message from user in group
  try {
    await restrictUser(ctx, userId);
  } catch (error) {
    if (
      error.message ===
      "400: Bad Request: not enough rights to restrict/unrestrict chat member"
    ) {
      return await ctx.reply(
        "Bot doesn't have enough rights to restrict/unrestrict chat member.\nPlease add me to the admins."
      );
    } else if (
      error.message ===
      "400: Bad Request: method is available only for supergroups"
    ) {
      return await ctx.reply(
        "Bot is available only for supergroups.\nPlease upgrade this group to supergroup."
      );
    }
    console.log("Resrict error:", error.message);
  }

  let msg = `${ctx.message.from.first_name} you are restricted for ${process.env.TIMEOUT} minutes`;
  msg += "\nTo skip restrictions solve captcha:";

  const id = nanoid(6);
  const captcha = {
    id: id,
    groupId: ctx.chat.id,
    from: ctx.message.from,
    status: "ACTIVE",
  };
  try {
    await saveCaptcha(captcha);
    console.log("Captcha saved id", id);
  } catch (error) {
    console.log(error);
  }

  const appLink =
    process.env.NODE_ENV === "production"
      ? `${process.env.WEBAPP_URI}/captcha/${id}`
      : `https://t.me/${ctx.me}?start=${id}`; // DeepLink for dev mode tests
  console.log("Captcha url", appLink);
  await ctx.reply(
    msg,
    Extra.markup((m) => m.inlineKeyboard([[m.urlButton("Captcha", appLink)]]))
  );
};
