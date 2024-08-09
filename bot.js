const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const jalaali = require('jalaali-js');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
const token = '7368876501:AAGWsUZzEmMCnUl8kU5bDevLaHcwTomeU4Q';
const bot = new TelegramBot(token, { polling: true });

// Replace 'YOUR_CHAT_ID' with the ID of the group where you want to send messages
const chatId = '-4286517389';

// Function to get Persian date for tomorrow
function getPersianDateForTomorrow() {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Get tomorrow's date
  const tomorrow = jalaali.toJalaali(today);
  const dayOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const persianDayOfWeek = dayOfWeek[(today.getDay() + 1) % 7]; // Calculate tomorrow's day of the week
  
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  const persianMonthName = persianMonths[tomorrow.jm - 1]; // Get the name of the month
  
  return `${persianDayOfWeek} ${tomorrow.jd} ${persianMonthName}`;
}

// Message to be sent
function sendMessage() {
  const persianDate = getPersianDateForTomorrow();
  const message = `سلام\nفردا (${persianDate}) استخر دانشگاه.\nساعت ۱۸.\nوسایل یادتون نره.`;
  
  bot.sendMessage(chatId, message);
}

// Schedule the task for every Tuesday at 6 PM
cron.schedule('0 18 * * 2', sendMessage);

// Schedule the task for every Friday at 6 PM
cron.schedule('0 18 * * 5', sendMessage);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Your bot is up and running!');
});

console.log('Bot is running...');