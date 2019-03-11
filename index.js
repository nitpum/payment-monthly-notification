const qrcode = require('qrcode');
const promptpay = require('promptpay-qr');
const axios = require('axios');

module.exports = function (context, cb) {
  var users = context.secrets.users;
  var amount = context.secrets.amount;
  console.log(users);

  const payload = promptpay.generatePayload(context.secrets.promptpayId, { amount });
  var options = { type: 'png', color: { dark: '#003b6a', light: '#f7f8f7' } }
  new Promise((resolve, reject) => {
    qrcode.toString(payload, options, (err, svg) => {
      if (err) return reject(err)
      resolve(svg)
    })
  })

  users.forEach(element => {
    axios.get('https://discordapp.com/api/v6/users/@me/channels', {
      headers: {
        'Authorization': 'Bot ' + context.secrets.botId,
        'Content-Type': 'application/json',
        'recipient_id': element
      }
    })
      .then(function (res) {
        console.log(res);
      });
    
  });
  cb();
}