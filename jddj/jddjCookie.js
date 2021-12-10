/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
'pt_key=AAJhhkTZADA85TrxhkdwmZXM5bD5EEkSlH9vv51CQeHIHyVyqqWTAzIx39bBpRoef7vgn71QFe8;pt_pin=qukai518_m;',
'pt_key=AAJhhkXAADAUC-914YIfkam7Kc4zHsz7B3esXqzBPonqSxAq1zTSQHRV7tZXX2n0035vwSWeGN4;pt_pin=%E5%AE%8B%E7%9B%BC%E7%9B%BC1990;',
// 'pt_key=app_openAAJhmfxmADCcoUHJyM2XhEb30fVvqavGbByx5_DWnQzYzLp57YkI_n0f9jFybjzpeMF3IIQEk3s;pt_pin=1459125655-861045;',	//贾正飞,
// 'pt_key=app_openAAJhmfxsADCTwMKMHoA9Mn7Cus6lFnRYRpDrC6ck6TNNC3zM7YSZ-XHvYjU7FxR5aYiH1DUJd-4;pt_pin=wdNkkUNdHWVupLf;',	//杜红珠
// 'pt_key=app_openAAJhmfx7ADBAgdvtbPbyjxuuBX1NVIlRCDxjz3s_M5wBQkcgRNI3ZjucgtJo_0AaiuQb0BVD4VM;pt_pin=jd_70f9b4e9a2ee0;',	//程光
// 'pt_key=app_openAAJhmfyEADDigdJUfsP-O2228uydzxcqps3Fax8CyFDt5VLQOSGE-ZNiuk_R82oDwweoRpHyUpM;pt_pin=jd_759b9c84f6525;',	//张延伟
// 'pt_key=app_openAAJhmuaPADBgzG-8P1N9hjrL4Mx0ZNfhtTepN_A22BrxCOdxolu-aLHUjz3oSNgV-S4lMqDMM5Q;pt_pin=jd_42887c5f9ecff;',	//王楠楠
// 'pt_key=app_openAAJhmfy4ADBYBQ6-rCmrpDFxGYTWvI7rmg_pyfaJTPp_EISHF39CiEMrlopgtrGY_XznpkE5_gM;pt_pin=hanluyang457;',		//韩陆阳
// 'pt_key=app_openAAJhmfzGADDs2Y0G5zFFHqMp3iDa0nQfzO-638ysu6i5qPNhytqc6vvVD3EbigReTZGtn1G02xk;pt_pin=jd_59287f728345c;',	//屈婷婷
// 'pt_key=app_openAAJhmfzdADAerBrUaggEEK9N-k-JlQk-ppuOGS9dLMvXGnXmJOQhoBS8dfHMluVBBWHJSRO5AD8;pt_pin=jd_517d428ceed99;',	//詹发军
// 'pt_key=app_openAAJhmfzuADB_XfrqK06Zw65AZyxIag-duk47hnf6Ndx7ACdcb2O099AuoCjHd-cucIEhYyEnAMI;pt_pin=bulingling1988;',	//卜玲玲
// 'pt_key=app_openAAJhmfz4ADDuOeLo_n80GDZGyaShQvYIjAEbCYfMlPLPgi-BtHbhnupmYywg8UkSresE3fUfsdk;pt_pin=jd_kFyiaiOPkxRG;',	//王新普2
// 'pt_key=app_openAAJhkzldADAuAQlxlxf9PXF7QQ4X5dIP1fQUslTvVkoXk69_r9X__LQwRynKGpy7RLDtud6xnjU;pt_pin=jd_HdOzFZVMnftF;',	//周军
// 'pt_key=app_openAAJhmf0PADBGkdrGffSGbB1JiqDXsZm-wEf_WAdqwnVdP-6sSSWPROokjnzRC-xbj2G6774X5fM;pt_pin=x306609322;',		//谢克强
// 'pt_key=AAJhl2lKADCcgriWl_bUT0Jry5UN6ZADerYXexuUqyajN5oqRwwKzoZ3QGdIxTuR_qz508P2FBg;pt_pin=jd_73f6cf6fc232e;',			//贾正飞2
]
// 判断环境变量里面是否有京东到家ck
if (process.env.JDDJ_COOKIE) {
  if (process.env.JDDJ_COOKIE.indexOf('&') > -1) {
    console.log(`您的cookie选择的是用&隔开\n`)
    CookieJDs = process.env.JDDJ_COOKIE.split('&');
  } else if (process.env.JDDJ_COOKIE.indexOf('\n') > -1) {
    console.log(`您的cookie选择的是用换行隔开\n`)
    CookieJDs = process.env.JDDJ_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JDDJ_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB') > -1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => item !== "" && item !== null && item !== undefined))]
console.log(`\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()}=====================\n`)
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
//exports['CookieJDs'] = CookieJDs;
