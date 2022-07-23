import { Telegraf, Markup } from 'telegraf';


//Store bot screaming status
let screaming = false;

//Create a new bot
const bot = new Telegraf("<YOUR_BOT_TOKEN_HERE>");



//This function handles the /scream command
bot.command('scream', () => {
  screaming = true;
});

//This function handles /whisper command
bot.command('whisper', () => {
  screaming = false;
});

//Pre-assign menu text
const firstMenu = '<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.';
const secondMenu = '<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.'

//Pre-assign button text
const nextButton = 'Next';
const backButton = 'Back';
const tutorialButton = 'Tutorial';

//Build keyboards
const firstMenuMarkup = Markup.inlineKeyboard([
  { text: nextButton, callback_data: nextButton },
]);
const secondMenuMarkup = Markup.inlineKeyboard([
  [{ text: backButton, callback_data: backButton }],
  [{ text: tutorialButton, url: 'https://core.telegram.org/bots/tutorial' }],
]);


//This handler sends a menu with the inline buttons we pre-assigned above
bot.command('menu', (ctx) => {
  ctx.replyWithHTML(firstMenu, firstMenuMarkup);
});

//This handler processes back button on the menu
bot.action(backButton, (ctx) => {
  //Update message content with corresponding menu section
  ctx.editMessageText(firstMenu, {
    ...firstMenuMarkup,
    parse_mode: 'HTML',
  });
});

//This handler processes next button on the menu
bot.action(nextButton, (ctx) => {
  //Update message content with corresponding menu section
  ctx.editMessageText(secondMenu, {
    ...secondMenuMarkup,
    parse_mode: 'HTML',
  });
});


//This function would be added to the dispatcher as a handler for messages coming from the Bot API
bot.on('message', (ctx) => {
  //Print to console
  console.log(`${ctx.message.from.first_name} wrote ${'text' in ctx.message ? ctx.message.text : ''}`);

  if(screaming && 'text' in ctx.message) {
    //Scream the message
    ctx.reply(ctx.message.text.toUpperCase(), {entities: ctx.message.entities});
  } else {
    //This is equivalent to forwarding, without the sender's name
    ctx.copyMessage(ctx.message.chat.id);
  }
});

//Start the Bot
bot.launch();
