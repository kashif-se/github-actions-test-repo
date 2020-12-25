const Markup = require("telegraf/markup");
const { getCaptcha } = require("../../../db/controllers/captcha");

module.exports = async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply(
      `Hi ${ctx.from.first_name}!\nThis is captcha bot, add me to supergroups to restrict bots with hCaptcha service (Bot should have admin rights)`
    );
  } else if (ctx.message.text.split(" ")[0] === "/start") {
    // captcha in dev mode
    let id = ctx.message.text.split(" ")[1];
    const captcha = await getCaptcha(id);
    await ctx.reply(
      `Your captcha id: ${id}\n\nhttp://localhost:3000/captcha/${id}`
    );
    await ctx.reply(JSON.stringify(captcha, null, 2));
  }
};
