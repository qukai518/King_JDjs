/*
签到领现金互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let CashShareCodes = [//账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
'wxiidnp2zwtcuylbtt3ykbuhda@cy2yohqaikzv7wmkr6g36esvfkq5mvbk5vj422a@vakqflu7ktuskw7f7r53kmuqlkngy6sbpxa2csq@6yu7qvp7zjoorzd6a3c3u7jhmy33ds5vhygs3xy@4npkonnsy7xi2qkpbnjsz5ejeuujxwcsvfgqzda',
'wxiidnp2zwtcuylbtt3ykbuhda@cy2yohqaikzv7wmkr6g36esvfkq5mvbk5vj422a@vakqflu7ktuskw7f7r53kmuqlkngy6sbpxa2csq@6yu7qvp7zjoorzd6a3c3u7jhmy33ds5vhygs3xy@4npkonnsy7xi2qkpbnjsz5ejeuujxwcsvfgqzda',
]
// 判断github action里面是否有种豆得豆互助码
if (process.env.JD_CASH_SHARECODES) {
  if (process.env.JD_CASH_SHARECODES.indexOf('&') > -1) {
    console.log(`您的种豆互助码选择的是用&隔开\n`)
    CashShareCodes = process.env.JD_CASH_SHARECODES.split('&');
  } else if (process.env.JD_CASH_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的种豆互助码选择的是用换行隔开\n`)
    CashShareCodes = process.env.JD_CASH_SHARECODES.split('\n');
  } else {
    CashShareCodes = process.env.JD_CASH_SHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < CashShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CashShareCodes' + index] = CashShareCodes[i];
}
