﻿/**
自动评价-文字版本.
cron 21 12 * * * jd_comment_wzb.js
*/
const $ = new Env('自动评价-文字版本');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = jsonParse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}
//用户过滤关键字环境变量！
let userKeyWords = process.env.userKeyWords && process.env.userKeyWords.split('@') || [];
//获取评论内容的最少字数环境变量，默认6！
let wordcount = process.env.wordcount ?? 6;
// 是否执行 默认不执行
let isComment = process.env.isComment ?? true;
var _0xodv='jsjiami.com.v6',_0xodv_=['‮_0xodv'],_0x4d61=[_0xodv,'Cuivt+mHjeaWsOeZu+W9leiOt+WPlgpodHRwczovL2JlYW4ubS5qZC5jb20vYmVhbi9zaWduSW5kZXguYWN0aW9u','aXNOb2Rl','c2VuZE5vdGlmeQ==','Y29va2ll5bey5aSx5pWIIC0g','Cuivt+mHjeaWsOeZu+W9leiOt+WPlmNvb2tpZQ==','Y2F0Y2g=','LCDlpLHotKUhIOWOn+WboDog','ZmluYWxseQ==','ZG9uZQ==','cmV0Y29kZQ==','dXNlckluZm8=','YXNzZXRJbmZv','YmVhbk51bQ==','ZHBn','enVVZ0Y=','WGlJRnU=','cWJmRXU=','cHViQ29tbWVudA==','SkZFeWw=','YlFuZU8=','MTY5OQ==','SWJhZmo=','5rKh5pyJ5b6F6K+E5Lu3ISE=','cXpGdUY=','d2FpdA==','VEdDVUs=','bWF4UGFnZQ==','d2FyZUlk','Y29tbWVudEluZm8=','cGljdHVyZUluZm9MaXN0','aGFkZWY=','bWVkaWFUeXBl','elZJR20=','cGljVVJM','aW5kZXhPZg==','d1FJbnk=','cmVwbGFjZQ==','d2VicA==','YXZpZg==','cHVzaA==','RHd5ZEw=','Y29tbWVudFNjb3Jl','SFBGbE4=','Y29tbWVudERhdGE=','bmRsRmQ=','d1lSRFc=','6K+E5Lu35YaF5a656KKr6L+H5ruk77yM5ZCr5pyJ5YWz6ZSu6K+NLeOAkA==','c29tZQ==','aW5jbHVkZXM=','a1J2WEo=','V3NsWW0=','TExmV2c=','cGFyc2U=','aHBDVEY=','c1hzRkc=','ZGF0YQ==','aGFzT3duUHJvcGVydHk=','V2FPWFE=','YmFzZUluZm8=','bmlja25hbWU=','bmpOWEs=','YmVhbkNvdW50','a2ZYbVE=','ZUxnS2w=','5Y676K+E5Lu377ya','d25hbWU=','CuayoeacieiOt+WPluWIsOWbvueJh++8jOS4lOiOt+WPluWIsOivhOS7t++8jOWOu+ivhOS7tyEK','b1NJcE0=','d05LUVI=','YXRlZ29yeUxpc3Q=','b3JkZXJJZA==','c2hvcElk','bGxhU2U=','eG55Q0U=','V0t2WnU=','CuayoeacieiOt+WPluWIsOivhOS7t+WGheWuuSzph4fnlKjohJrmnKzoh6rluKbor4Tku7cK','Y2NHYU0=','RmRRYlk=','VVl5SXo=','YWJ5UVo=','TGxkbnc=','R1h5bGM=','Z2V0Q29tbWVudExpc3RXaXRoQ2FyZA==','S3hhZW4=','6I635Y+W5Yiw','5p2h6K+E6K665YaF5a65','Z2V0Q29tbWVudFdhcmVMaXN0','eUllS1I=','Y29tbWVudFdhcmVMaXN0SW5mbw==','cmV2ZXJzZQ==','aEpZY3g=','YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk','emgtSGFucy1KUDtxPTEsIGVuLUpQO3E9MC45LCB6aC1IYW50LVRXO3E9MC44LCBqYS1KUDtxPTAuNywgZW4tVVM7cT0wLjY=','b3BCakM=','aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj9mdW5jdGlvbklkPQ==','Ym9keQ==','YXBpLm0uamQuY29t','VVBqY0I=','Ki8q','blJJblU=','d0VVWUM=','WUl4RnY=','SlZ6dG4=','cG9zdA==','a29UcmM=','bWVzc2FnZQ==','eWhRR0U=','ZEd0WnI=','aFFIdFA=','bFVUdWM=','cmFuZG9t','dG9TdHJpbmc=','c2xpY2U=','Zmxvb3I=','SVFRVlY=','T05pV2w=','SnNPR1M=','aHR0cDovL2Zha2VybWV0YXZlcnNlLnh5ei9zaWdu','YXBwbGljYXRpb24vanNvbg==','WENTVGQ=','c3RyaW5naWZ5','emhmUEs=','aG1ySUY=','cElFV0M=','dGtCS2I=','QVpmZUw=','cnh1VlQ=','ZEpWSWQ=','WU90dFc=','bG9nRXJy','ZW9JQm0=','5Lqs5Lic5pyN5Yqh5Zmo6L+U5Zue56m65pWw5o2u','aHR0cHM6Ly93cS5qZC5jb20vdXNlcl9uZXcvaW5mby9HZXRKRFVzZXJJbmZvVW5pb24/c2NlbmV2YWw9Mg==','d3EuamQuY29t','a2VlcC1hbGl2ZQ==','emgtY24=','aHR0cHM6Ly9ob21lLm0uamQuY29tL215SmQvbmV3aG9tZS5hY3Rpb24/c2NlbmV2YWw9MiZ1ZmM9Jg==','Z3ppcCwgZGVmbGF0ZSwgYnI=','alV5Vko=','a2ZJV1k=','a0t1dkw=','SFRsWnA=','QklwUHg=','WmhscG4=','YlpPck4=','b3h3bk8=','Y3dndUE=','SGR4Zlg=','YWlVakc=','d3JySEo=','a25TSHU=','bllaaHk=','SEppeEE=','Z2V0','WklGb1c=','Z0RpSko=','akVsbG0=','a1FVY3c=','TVFwQ2k=','WWJTWEw=','b2VPWVQ=','SGtkcUg=','enNBQmQ=','T2NQUnY=','QXZuYWw=','Z3ZJWk8=','5b6I5Z6D5Zy+','6LSo6YeP5beu','5q2k55So5oi35pyq5aGr5YaZ6K+E5Lu35YaF5a65','572R5LiK6LSt54mp6L+Z5LmI5r+A54OI77yM5rKh5oOz5Yiw5bqX5a6255qE5pyN5Yqh6L+Z5LmI5aW977yM5ZWG5ZOB6LSo6YeP5aW96ICM5Lu35L2O5buJ77yM5oiR5aSq5oSf6LCi5L2g5LqG44CC','6LSo6YeP6Z2e5bi45aW977yM55yf5Ye65LmO5oiR55qE5oSP5paZ77yM5YyF6KOF6Z2e5bi45LuU57uG77yM6Z2e5bi45oSf6LCi77yM56Wd55Sf5oSP5YW06ZqG44CC','6L+Z5a625bqX6L+Y5aW95ZCn77yM5p2l5Lmw6L+H5Yeg5qyh5LqG77yM5pyN5Yqh6ICB5a6i5oi36Z2e5bi45ZGo5Yiw77yM5Lul5ZCO6L+Y5bi45p2l44CC','5Y2W5a6255qE5pyN5Yqh5oCB5bqm55yf5aW977yM5Y+R6LSn5b6I5b+r44CC5ZWG5ZOB6LSo6YeP5Lmf55u45b2T5LiN6ZSZ44CC5aSq5Zac5qyi5LqG77yM6LCi6LCi44CC','5Yeg5Lul5YmN5Yeg5LmO5LuO5pyq6K6k55yf6K+E5Lu36L+H77yM5Lmf5LiN55+l6YGT5rWq6LS55LqG5aSa5bCR5YiG44CC5oiR5ZCs6K+06K+E5Lu35Lit5pyJMTAw5aSa5Liq5Y2V6K+N77yM5Z+65pys5LiK5piv5q+P5ZGo6K6/6Zeu5LiA5qyh44CC5Zyo5Lqs5Lic6LSt54mp5aSq5pa55L6/5LqG77yM5qC55pys5YGc5LiN5LiL5p2l44CC5LuO6YKj5pe26LW377yM6LSt5Lmw5pel55So5ZOB5pe26aaW5YWI5oOz5Yiw55qE5bCx5piv5Lqs5Lic77yM5a6D5piv55yf5q2j55qE44CC6LW35Yid5oiR5b6I5ouF5b+D44CC546w5Zyo5oiR5Lmg5oOv5LqG77yM6L+Z55yf55qE5b6I5aW944CC546w5Zyo5oiR5b+F6aG757uZ5pu05aSa55qE5oqY5omj44CC5oiR5LiL5qyh5Lya5YaN5p2l44CC5oiR5LiA55u05Zyo6LSt54mp44CC5a6D5LuN54S25piv5LiA5Liq6Z2e5bi45aW955qE5a6d6LSd44CC55yf55qE5b6I5aW944CC6L+Z5piv5YC85b6X55qE44CC572R5LiK5Lmw5LiA5qyh5Lmf5rKh55So44CC5a6D6L+Y5rKh5pyJ5a6J6KOF44CC5oiR5LiA5qyh5Lmw5LqG5Lik5Liq44CC5aSn5ZOB54mM5YC85b6X5L+h6LWW44CC','5oiR55yf55qE6Z2e5bi45Zac5qyi5a6D77yM6Z2e5bi45pSv5oyB5a6D77yM6LSo6YeP6Z2e5bi45aW977yM5ZKM5Y2W5a625o+P6L+w55qE5LiA5qih5LiA5qC377yM5oiR6Z2e5bi45ruh5oSP44CC5oiR55yf55qE5b6I5Zac5qyi5a6D77yM5a6D5a6M5YWo6LaF5Ye65LqG6aKE5pyf55qE5Lu35YC877yM5Lqk6LSn6YCf5bqm6Z2e5bi45b+r77yM5YyF6KOF6Z2e5bi45LuU57uG5ZKM57Sn5YeR77yM54mp5rWB5YWs5Y+45pyJ5LiA5Liq6Imv5aW955qE5pyN5Yqh5oCB5bqm77yM5Lqk6LSn6YCf5bqm6Z2e5bi45b+r77yM5oiR6Z2e5bi45ruh5oSP6LSt54mp','6LSo6YeP6Z2e5bi45aW977yM5LiO5Y2W5a625o+P6L+w55qE5a6M5YWo5LiA6Ie077yM6Z2e5bi45ruh5oSP77yM55yfIOeahOW+iOWWnOasou+8jOWujOWFqOi2heWHuuacn+acm+WAvO+8jOWPkei0p+mAn+W6pumdnuW4uOW/q++8jOWMhSDoo4XpnZ7luLjku5Tnu4bjgIHkuKXlrp7vvIznianmtYHlhazlj7jmnI3liqHmgIHluqblvojlpb3vvIzov5DpgIEg6YCf5bqm5b6I5b+r77yM5b6I5ruh5oSP55qE5LiA5qyh6LSt6LSo6YeP5b6I5aW977yM5biM5pyb5pu05aSa55qEIOaci+WPi+S/oei1lu+8juW6l+S4u+aAgeW6pueJueWlve+8jOaIkeS8muWGjeasoeWFiemhvueahO+8jOWPr+S4jSDlj6/ku6Xlho3kvr/lrpzngrnvvIzmiJHluKbmnIvlj4vmnaXkvaDlrrY=','5Lic6KW/5pS25Yiw77yM5b6I5ruh5oSP77yB77yB5Lqs5Lic5bmz5Y+w55yf55qE5piv6LaF57qn5aW955qE5Y2W5a6277yM6Kej562U55aR6Zeu5LiN5Y6M5YW254Om77yM57uG6Ie06K6k55yf77yM5YWz6ZSu5piv5Lic6KW/5aW977yM6ICM5LiU6LSn54mp5Y+R5b6X6LaF5b+r77yM5YyF6KOF5LuU57uG77yM5YC85b6X5L+h6LWW77yB','6L+Z5Liq5Lu35qC85LuN54S25b6I5YiS566X44CC57uP5rWO44CB5L6/5a6c44CB6LSo6YeP6Z2e5bi45aW977yM5LiO5Y2W5pa55o+P6L+w55qE5a6M5YWo5LiA5qC344CC6Z2e5bi45ruh5oSP77yM5a6M5YWo5Ye65LmO5oSP5paZ77yM6LaF5YiS566X77yM5YiS566X77yM6LSt54mp5q+U5a6e5L2T5bqX5L6/5a6c5aSa5LqG77yM6Z2e5bi45ruh5oSP572R5LiK6LSt54mp44CC5oiR5biM5pyb5Y2W5a6255qE55Sf5oSP5Lya6LaK5p2l6LaK57qi54Gr77yM54mp5rWB5Lya6LaK5p2l6LaK5b+r77yM5YyF6KOF5Lya6LaK5p2l6LaK57uT5a6e44CC5YWt5pif6KGo5oms77yM5aSa5LiA5pif5LiN5oCV5L2g6aqE5YKy77yM54q56LGr5LiN5Yaz55qE5pyL5Y+L5Lya5b6I5b+r5LiL5Y2V77yM6L+Z5piv6Imv5b+D55qE5o6o6I2Q44CC5a6D55yf55qE5b6I5aW977yM6ICM5LiU5Lu35qC85Lmf5b6I6auY77yM5omA5Lul5L2g5bCG5p2l5Y+v5Lul5Zyo6L+Z6YeM5Lmw44CC57uZ5LiJ5Liq5aW96K+E5bCx5ruh6Laz5LqG77yB5ruh5oSP5LqG77yB5ruh5oSP5LqG','6K6p5oiR5Lus5YWI6K+06K+05ZWG5ZOB55qE6LSo6YeP77ya5Lqn5ZOB5oC75L2T5LiK5piv5aW955qE77yM5YyF6KOF5b6I57Sn44CC6K6p5oiR5Lus5p2l6LCI6LCI5ZWG5a625pyN5Yqh77ya5Zac5qyi5a6D44CC5pyA5ZCO77yM5b+r6YCS77ya5b+r6YCS6Z2e5bi45b+r44CC5q+V56uf77yM5buJ5Lu35ZWG5ZOB5pu055yf5a6e44CC5oiR5biM5pyb5ZWG5bqX6IO95o+Q5L6b5pu05aSa55qE5oqY5omj77yM5Y+K5pe26YCa55+l6ICB5a6i5oi377yM5bm25L+D6L+b5Zue6LSt44CC56Wd5L2g55Sf5oSP5YW06ZqG44CC','6buY6K6k5LiN5omn6KGMLCDpnIDopoHmiafooYzor7fnjq/looPlj5jph4/orr7nva4gaXNDb21tZW50IOS4uiB0cnVl','Q0hCa1o=','akh3dnk=','YmhIdVI=','UkJGUVU=','bG9n','TUVYZVo=','bXNn','bmFtZQ==','44CQ5o+Q56S644CR6K+35YWI6I635Y+W5Lqs5Lic6LSm5Y+35LiAY29va2llCuebtOaOpeS9v+eUqE5vYnlEYeeahOS6rOS4nOetvuWIsOiOt+WPlg==','aHR0cHM6Ly9iZWFuLm0uamQuY29tL2JlYW4vc2lnbkluZGV4LmFjdGlvbg==','bGVuZ3Ro','amRhcHA7aVBob25lOzEwLjAuODsxNC42Ow==','UHREaGY=','O25ldHdvcmsvd2lmaTtKREVib29rL29wZW5hcHAuamRyZWFkZXI7bW9kZWwvaVBob25lOSwyO2FkZHJlc3NpZC8yMjE0MjIyNDkzO2FwcEJ1aWxkLzE2ODg0MTtqZFN1cHBvcnREYXJrTW9kZS8wO01vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgMTRfNiBsaWtlIE1hYyBPUyBYKSBBcHBsZVdlYktpdC82MDUuMS4xNSAoS0hUTUwsIGxpa2UgR2Vja28pIE1vYmlsZS8xNkUxNTg7c3VwcG9ydEpEU0hXSy8x','VXNlck5hbWU=','ZWlBa3A=','bWF0Y2g=','aW5kZXg=','aXNMb2dpbg==','bmlja05hbWU=','Y29tbWVudFdhcmVMaXN0','Y29tbWVudEluZm9MaXN0','CioqKioqKuW8gOWni+OAkOS6rOS4nOi0puWPtw==','KioqKioqKioqCg==','44CQ5o+Q56S644CRY29va2ll5bey5aSx5pWI','5Lqs5Lic6LSm5Y+3','MjsljHiVami.YcHourm.vA6ntPfAW=='];if(function(_0x4ccda0,_0x407883,_0x2d1f58){function _0x5b70e1(_0x2bd83b,_0x42f8bc,_0x569026,_0x1aa78b,_0x1c19c6,_0x5c59aa){_0x42f8bc=_0x42f8bc>>0x8,_0x1c19c6='po';var _0x493b8f='shift',_0x18bee1='push',_0x5c59aa='‮';if(_0x42f8bc<_0x2bd83b){while(--_0x2bd83b){_0x1aa78b=_0x4ccda0[_0x493b8f]();if(_0x42f8bc===_0x2bd83b&&_0x5c59aa==='‮'&&_0x5c59aa['length']===0x1){_0x42f8bc=_0x1aa78b,_0x569026=_0x4ccda0[_0x1c19c6+'p']();}else if(_0x42f8bc&&_0x569026['replace'](/[MlHVYHurAntPfAW=]/g,'')===_0x42f8bc){_0x4ccda0[_0x18bee1](_0x1aa78b);}}_0x4ccda0[_0x18bee1](_0x4ccda0[_0x493b8f]());}return 0x110fa3;};return _0x5b70e1(++_0x407883,_0x2d1f58)>>_0x407883^_0x2d1f58;}(_0x4d61,0x174,0x17400),_0x4d61){_0xodv_=_0x4d61['length']^0x174;};function _0x2d6a(_0x5aa51d,_0x546118){_0x5aa51d=~~'0x'['concat'](_0x5aa51d['slice'](0x1));var _0x1c0135=_0x4d61[_0x5aa51d];if(_0x2d6a['ilFGkj']===undefined&&'‮'['length']===0x1){(function(){var _0x409cca=function(){var _0x9fdbf1;try{_0x9fdbf1=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x107b8c){_0x9fdbf1=window;}return _0x9fdbf1;};var _0x43e65a=_0x409cca();var _0x342cf1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x43e65a['atob']||(_0x43e65a['atob']=function(_0x1900a2){var _0x5b2eaa=String(_0x1900a2)['replace'](/=+$/,'');for(var _0x52c641=0x0,_0x3ebe27,_0xfb0675,_0x5747e0=0x0,_0x3dca55='';_0xfb0675=_0x5b2eaa['charAt'](_0x5747e0++);~_0xfb0675&&(_0x3ebe27=_0x52c641%0x4?_0x3ebe27*0x40+_0xfb0675:_0xfb0675,_0x52c641++%0x4)?_0x3dca55+=String['fromCharCode'](0xff&_0x3ebe27>>(-0x2*_0x52c641&0x6)):0x0){_0xfb0675=_0x342cf1['indexOf'](_0xfb0675);}return _0x3dca55;});}());_0x2d6a['tHbOiB']=function(_0x44479b){var _0xa65c2a=atob(_0x44479b);var _0x1098e8=[];for(var _0x3f3cc2=0x0,_0x342128=_0xa65c2a['length'];_0x3f3cc2<_0x342128;_0x3f3cc2++){_0x1098e8+='%'+('00'+_0xa65c2a['charCodeAt'](_0x3f3cc2)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1098e8);};_0x2d6a['SqbNaV']={};_0x2d6a['ilFGkj']=!![];}var _0x433522=_0x2d6a['SqbNaV'][_0x5aa51d];if(_0x433522===undefined){_0x1c0135=_0x2d6a['tHbOiB'](_0x1c0135);_0x2d6a['SqbNaV'][_0x5aa51d]=_0x1c0135;}else{_0x1c0135=_0x433522;}return _0x1c0135;};let defKeyWords=[_0x2d6a('‫0'),_0x2d6a('‮1'),_0x2d6a('‫2')];let defcommentlist=[_0x2d6a('‫3'),_0x2d6a('‮4'),_0x2d6a('‮5'),_0x2d6a('‫6'),_0x2d6a('‮7'),_0x2d6a('‫8'),_0x2d6a('‮9'),_0x2d6a('‫a'),_0x2d6a('‫b'),_0x2d6a('‫c')];!(async()=>{var _0x59e55d={'MEXeZ':_0x2d6a('‮d'),'bhHuR':_0x2d6a('‫e'),'RBFQU':_0x2d6a('‮f'),'PtDhf':function(_0x5c89b6){return _0x5c89b6();},'eiAkp':function(_0x5d1bed,_0x14f24a){return _0x5d1bed(_0x14f24a);}};if(!cookiesArr[0x0]){if(_0x59e55d[_0x2d6a('‫10')]===_0x59e55d[_0x2d6a('‫11')]){console[_0x2d6a('‫12')](_0x59e55d[_0x2d6a('‫13')]);return;}else{$[_0x2d6a('‫14')]($[_0x2d6a('‫15')],_0x2d6a('‫16'),_0x2d6a('‫17'),{'open-url':_0x2d6a('‫17')});return;}}if(isComment===![]){console[_0x2d6a('‫12')](_0x59e55d[_0x2d6a('‫13')]);return;}for(let _0x236c68=0x0;_0x236c68<cookiesArr[_0x2d6a('‫18')];_0x236c68++){UA=_0x2d6a('‮19')+_0x59e55d[_0x2d6a('‮1a')](uuidRandom)+_0x2d6a('‫1b');if(cookiesArr[_0x236c68]){cookie=cookiesArr[_0x236c68];$[_0x2d6a('‫1c')]=_0x59e55d[_0x2d6a('‫1d')](decodeURIComponent,cookie[_0x2d6a('‫1e')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[_0x2d6a('‫1e')](/pt_pin=([^; ]+)(?=;?)/)[0x1]);$[_0x2d6a('‮1f')]=_0x236c68+0x1;$[_0x2d6a('‮20')]=!![];$[_0x2d6a('‮21')]='';$[_0x2d6a('‮22')]='';$[_0x2d6a('‮23')]='';await TotalBean();console[_0x2d6a('‫12')](_0x2d6a('‮24')+$[_0x2d6a('‮1f')]+'】'+($[_0x2d6a('‮21')]||$[_0x2d6a('‫1c')])+_0x2d6a('‫25'));if(!$[_0x2d6a('‮20')]){$[_0x2d6a('‫14')]($[_0x2d6a('‫15')],_0x2d6a('‮26'),_0x2d6a('‫27')+$[_0x2d6a('‮1f')]+'\x20'+($[_0x2d6a('‮21')]||$[_0x2d6a('‫1c')])+_0x2d6a('‫28'),{'open-url':_0x2d6a('‫17')});if($[_0x2d6a('‫29')]()){await notify[_0x2d6a('‫2a')]($[_0x2d6a('‫15')]+_0x2d6a('‫2b')+$[_0x2d6a('‫1c')],_0x2d6a('‫27')+$[_0x2d6a('‮1f')]+'\x20'+$[_0x2d6a('‫1c')]+_0x2d6a('‮2c'));}continue;}try{await main();}catch(_0x3b9101){console[_0x2d6a('‫12')](_0x3b9101);}}}})()[_0x2d6a('‫2d')](_0x54ceae=>{$[_0x2d6a('‫12')]('','❌\x20'+$[_0x2d6a('‫15')]+_0x2d6a('‫2e')+_0x54ceae+'!','');})[_0x2d6a('‮2f')](()=>{$[_0x2d6a('‮30')]();});async function main(){var _0x5d439d={'hpCTF':_0x2d6a('‮31'),'sXsFG':function(_0xde3b8c,_0x3bf2fd){return _0xde3b8c===_0x3bf2fd;},'WaOXQ':_0x2d6a('‮32'),'njNXK':_0x2d6a('‫33'),'kfXmQ':_0x2d6a('‫34'),'qzFuF':function(_0x4ff504){return _0x4ff504();},'TGCUK':function(_0x26f7cf,_0x49be13){return _0x26f7cf(_0x49be13);},'hadef':function(_0x2815c1,_0x54dc45){return _0x2815c1!=_0x54dc45;},'zVIGm':function(_0x4e676a,_0x3542da){return _0x4e676a!==_0x3542da;},'wQIny':_0x2d6a('‫35'),'DwydL':function(_0x1c502d,_0xc8acef){return _0x1c502d===_0xc8acef;},'HPFlN':function(_0x32c492,_0x10d8e8){return _0x32c492>_0x10d8e8;},'ndlFd':_0x2d6a('‫36'),'wYRDW':_0x2d6a('‫37'),'kRvXJ':function(_0x58ccf5,_0x15e470){return _0x58ccf5!==_0x15e470;},'LLfWg':_0x2d6a('‮38'),'eLgKl':function(_0x27691c,_0x464084){return _0x27691c>=_0x464084;},'oSIpM':function(_0x38efdd,_0x18a2ac,_0x5dc789){return _0x38efdd(_0x18a2ac,_0x5dc789);},'wNKQR':_0x2d6a('‮39'),'llaSe':function(_0x5b6ce7,_0xe18726){return _0x5b6ce7<_0xe18726;},'xnyCE':_0x2d6a('‮3a'),'WKvZu':_0x2d6a('‫3b'),'ccGaM':_0x2d6a('‮3c'),'FdQbY':function(_0x1f1680,_0x14762f){return _0x1f1680>=_0x14762f;},'UYyIz':function(_0x308a1d,_0x5d5325){return _0x308a1d<=_0x5d5325;},'abyQZ':function(_0x3273b4,_0x32e99c){return _0x3273b4===_0x32e99c;},'Lldnw':_0x2d6a('‮3d'),'GXylc':_0x2d6a('‫3e')};let _0x5d687e=[];let _0x5c282d=[];let _0x70b41=[];await _0x5d439d[_0x2d6a('‫3f')](getCommentWareList);await $[_0x2d6a('‫40')](0x3e8);await _0x5d439d[_0x2d6a('‮41')](getCommentWareList,$[_0x2d6a('‮42')]);let _0x2c8099=$[_0x2d6a('‮22')];if(_0x2c8099){await getCommentListWithCard(_0x2c8099[_0x2d6a('‮43')]);await $[_0x2d6a('‫40')](0x3e8);let _0x596c2d=$[_0x2d6a('‮23')];for(const _0x48e026 of _0x596c2d){if(_0x48e026[_0x2d6a('‫44')][_0x2d6a('‫45')]){for(const _0x5955d0 of _0x48e026[_0x2d6a('‫44')][_0x2d6a('‫45')]||{}){if(_0x5d439d[_0x2d6a('‮46')](_0x5955d0[_0x2d6a('‫47')],'2')){if(_0x5d439d[_0x2d6a('‫48')](_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x5d439d[_0x2d6a('‫4b')]),-0x1)){picURL=_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).dpg/g,'$1');}else if(_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x2d6a('‮4d'))!==-0x1){picURL=_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).webp/g,'$1');}else if(_0x5d439d[_0x2d6a('‫48')](_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x2d6a('‮4e')),-0x1)){picURL=_0x5955d0[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).avif/g,'$1');}_0x5d687e[_0x2d6a('‮4f')](picURL);};};};if(_0x5d439d[_0x2d6a('‮50')](_0x48e026[_0x2d6a('‫44')][_0x2d6a('‫51')],'5')&&_0x5d439d[_0x2d6a('‮52')](_0x48e026[_0x2d6a('‫44')][_0x2d6a('‫53')][_0x2d6a('‫18')],wordcount)){if(_0x5d439d[_0x2d6a('‮50')](_0x5d439d[_0x2d6a('‫54')],_0x5d439d[_0x2d6a('‮55')])){console[_0x2d6a('‫12')](_0x2d6a('‫56')+nullKeyword+'】');}else{_0x5c282d[_0x2d6a('‮4f')](_0x48e026[_0x2d6a('‫44')][_0x2d6a('‫53')]);}};};nullKeyword='';for(let _0x2cc50f of defKeyWords)userKeyWords[_0x2d6a('‮4f')](_0x2cc50f);for(let _0x3d6372 of _0x5c282d){if(userKeyWords[_0x2d6a('‮57')](_0x2035ce=>_0x3d6372[_0x2d6a('‮58')](_0x2035ce)?nullKeyword=_0x2035ce:'')){console[_0x2d6a('‫12')](_0x2d6a('‫56')+nullKeyword+'】');}else{if(_0x5d439d[_0x2d6a('‮59')](_0x2d6a('‫5a'),_0x5d439d[_0x2d6a('‫5b')])){_0x70b41[_0x2d6a('‮4f')](_0x3d6372);}else{if(0x3e9===(a=JSON[_0x2d6a('‮5c')](a))[_0x5d439d[_0x2d6a('‫5d')]])return void($[_0x2d6a('‮20')]=!0x1);_0x5d439d[_0x2d6a('‫5e')](0x0,a[_0x5d439d[_0x2d6a('‫5d')]])&&a[_0x2d6a('‮5f')]&&a[_0x2d6a('‮5f')][_0x2d6a('‫60')](_0x5d439d[_0x2d6a('‮61')])&&($[_0x2d6a('‮21')]=a[_0x2d6a('‮5f')][_0x2d6a('‮32')][_0x2d6a('‫62')][_0x2d6a('‮63')]),0x0===a[_0x5d439d[_0x2d6a('‫5d')]]&&a[_0x2d6a('‮5f')]&&a[_0x2d6a('‮5f')][_0x5d439d[_0x2d6a('‫64')]]&&($[_0x2d6a('‫65')]=a[_0x2d6a('‮5f')]&&a[_0x2d6a('‮5f')][_0x5d439d[_0x2d6a('‫64')]][_0x5d439d[_0x2d6a('‫66')]]);}};};let _0x5550d1=_0x5d439d[_0x2d6a('‮41')](random,_0x70b41);let _0x4f3678=[{'picUrl':_0x5d687e[0x0]},{'picUrl':_0x5d687e[0x1]}];let _0x1ff734=random(defcommentlist);if(_0x5d439d[_0x2d6a('‫67')](_0x5d687e[_0x2d6a('‫18')],0x2)&&_0x5d439d[_0x2d6a('‫67')](_0x70b41[_0x2d6a('‫18')],0x2)){console[_0x2d6a('‫12')](_0x2d6a('‫68')+_0x2c8099[_0x2d6a('‫69')]+_0x2d6a('‫6a'));await _0x5d439d[_0x2d6a('‮6b')](task,_0x5d439d[_0x2d6a('‮6c')],{'productId':_0x2c8099[_0x2d6a('‮43')],'kocSynFlag':'0','categoryList':_0x2c8099[_0x2d6a('‫6d')],'voucherStatus':'0','officerScore':_0x2d6a('‮3c'),'anonymousFlag':'1','commentScore':'5','shopType':'0','orderId':_0x2c8099[_0x2d6a('‫6e')],'shopId':_0x2c8099[_0x2d6a('‫6f')],'addPictureFlag':'0','commentData':_0x5550d1,'pictureInfoList':'','officerLevel':'3','isCommentTagContent':'0'});}else if(_0x5d687e[_0x2d6a('‫18')]>=0x2&&_0x5d439d[_0x2d6a('‮70')](_0x70b41[_0x2d6a('‫18')],0x2)){if(_0x5d439d[_0x2d6a('‮71')]===_0x5d439d[_0x2d6a('‮72')]){_0x70b41[_0x2d6a('‮4f')](e);}else{console[_0x2d6a('‫12')](_0x2d6a('‫68')+_0x2c8099[_0x2d6a('‫69')]+_0x2d6a('‮73'));await _0x5d439d[_0x2d6a('‮6b')](task,_0x5d439d[_0x2d6a('‮6c')],{'productId':_0x2c8099[_0x2d6a('‮43')],'kocSynFlag':'0','categoryList':_0x2c8099[_0x2d6a('‫6d')],'voucherStatus':'0','officerScore':_0x5d439d[_0x2d6a('‫74')],'anonymousFlag':'1','commentScore':'5','shopType':'0','orderId':_0x2c8099[_0x2d6a('‫6e')],'shopId':_0x2c8099[_0x2d6a('‫6f')],'addPictureFlag':'0','commentData':_0x1ff734,'pictureInfoList':'','officerLevel':'3','isCommentTagContent':'0'});}}else if(_0x5d439d[_0x2d6a('‮70')](_0x5d687e[_0x2d6a('‫18')],0x2)&&_0x5d439d[_0x2d6a('‮75')](_0x70b41[_0x2d6a('‫18')],0x2)){console[_0x2d6a('‫12')](_0x2d6a('‫68')+_0x2c8099[_0x2d6a('‫69')]+_0x2d6a('‫6a'));await _0x5d439d[_0x2d6a('‮6b')](task,_0x5d439d[_0x2d6a('‮6c')],{'productId':_0x2c8099[_0x2d6a('‮43')],'kocSynFlag':'0','categoryList':_0x2c8099[_0x2d6a('‫6d')],'voucherStatus':'0','officerScore':_0x2d6a('‮3c'),'anonymousFlag':'1','commentScore':'5','shopType':'0','orderId':_0x2c8099[_0x2d6a('‫6e')],'shopId':_0x2c8099[_0x2d6a('‫6f')],'addPictureFlag':'0','commentData':_0x5550d1,'pictureInfoList':'','officerLevel':'3','isCommentTagContent':'0'});}else if(_0x5d439d[_0x2d6a('‮76')](_0x596c2d[_0x2d6a('‫18')],0x1)){console[_0x2d6a('‫12')](_0x2d6a('‫68')+_0x2c8099[_0x2d6a('‫69')]+_0x2d6a('‮73'));await _0x5d439d[_0x2d6a('‮6b')](task,_0x2d6a('‮39'),{'productId':_0x2c8099[_0x2d6a('‮43')],'kocSynFlag':'0','categoryList':_0x2c8099[_0x2d6a('‫6d')],'voucherStatus':'0','officerScore':_0x2d6a('‮3c'),'anonymousFlag':'1','commentScore':'5','shopType':'0','orderId':_0x2c8099[_0x2d6a('‫6e')],'shopId':_0x2c8099[_0x2d6a('‫6f')],'addPictureFlag':'0','commentData':_0x1ff734,'pictureInfoList':'','officerLevel':'3','isCommentTagContent':'0'});};}else{if(_0x5d439d[_0x2d6a('‮77')](_0x2d6a('‮3d'),_0x5d439d[_0x2d6a('‫78')])){console[_0x2d6a('‫12')](_0x5d439d[_0x2d6a('‮79')]);}else{$[_0x2d6a('‮30')]();}}}async function getCommentListWithCard(_0x5cb190){var _0xb0d04e={'Kxaen':_0x2d6a('‮7a')};s=await task(_0xb0d04e[_0x2d6a('‫7b')],{'sortType':'5','isCurrentSku':![],'sku':_0x5cb190,'pictureCommentType':'A','shieldCurrentComment':'1','shopType':'0','type':'4','shadowMainSku':'0','offset':'1','num':'10'});$[_0x2d6a('‮23')]=s[_0x2d6a('‮23')];console[_0x2d6a('‫12')](_0x2d6a('‫7c')+s[_0x2d6a('‮23')][_0x2d6a('‫18')]+_0x2d6a('‫7d'));}async function getCommentWareList(_0x333946='1'){var _0x2eb972={'yIeKR':_0x2d6a('‮7e')};s=await task(_0x2eb972[_0x2d6a('‮7f')],{'status':'1','planType':'1','pageIndex':_0x333946,'pageSize':'10'});$[_0x2d6a('‮42')]=s[_0x2d6a('‫80')][_0x2d6a('‮42')];$[_0x2d6a('‮22')]=s[_0x2d6a('‫80')][_0x2d6a('‮22')][_0x2d6a('‮81')]()[0x0];}async function task(_0x3450f7,_0x376ab2){var _0x572221={'dGtZr':_0x2d6a('‫16'),'hQHtP':_0x2d6a('‫17'),'wEUYC':function(_0x412c3c,_0x11db38){return _0x412c3c(_0x11db38);},'YIxFv':_0x2d6a('‮82'),'opBjC':function(_0x574bb9,_0x51af8f,_0x2646a4){return _0x574bb9(_0x51af8f,_0x2646a4);},'UPjcB':_0x2d6a('‫83'),'nRInU':_0x2d6a('‫84')};return s=await _0x572221[_0x2d6a('‮85')](getSign,_0x3450f7,_0x376ab2),opt={'url':_0x2d6a('‮86')+_0x3450f7,'body':s[_0x2d6a('‮87')],'headers':{'Host':_0x2d6a('‮88'),'content-type':_0x572221[_0x2d6a('‮89')],'accept':_0x2d6a('‮8a'),'user-agent':UA,'accept-language':_0x572221[_0x2d6a('‫8b')],'Cookie':cookie}},new Promise(_0x102c70=>{var _0x25fe04={'koTrc':_0x2d6a('‮39'),'yhQGE':function(_0x5af2f7,_0xb3a457){return _0x572221[_0x2d6a('‮8c')](_0x5af2f7,_0xb3a457);}};if(_0x572221[_0x2d6a('‮8d')]!==_0x2d6a('‫8e')){$[_0x2d6a('‮8f')](opt,(_0x513fea,_0x160069,_0x3ef400)=>{try{_0x513fea?console[_0x2d6a('‫12')](_0x513fea):_0x3ef400=JSON[_0x2d6a('‮5c')](_0x3ef400);switch(_0x3450f7){case _0x25fe04[_0x2d6a('‫90')]:if(_0x3ef400[_0x2d6a('‮91')]){console[_0x2d6a('‫12')](_0x3ef400[_0x2d6a('‮91')]);}break;default:break;}}catch(_0x46e1bd){console[_0x2d6a('‫12')](_0x46e1bd);}finally{_0x25fe04[_0x2d6a('‫92')](_0x102c70,_0x3ef400);}});}else{$[_0x2d6a('‫14')]($[_0x2d6a('‫15')],_0x572221[_0x2d6a('‮93')],_0x572221[_0x2d6a('‫94')],{'open-url':_0x572221[_0x2d6a('‫94')]});return;}});}function uuidRandom(){var _0x55e63e={'lUTuc':function(_0x253ac7,_0xa5f22b){return _0x253ac7+_0xa5f22b;}};return _0x55e63e[_0x2d6a('‮95')](_0x55e63e[_0x2d6a('‮95')](Math[_0x2d6a('‫96')]()[_0x2d6a('‫97')](0x10)[_0x2d6a('‮98')](0x2,0xa)+Math[_0x2d6a('‫96')]()[_0x2d6a('‫97')](0x10)[_0x2d6a('‮98')](0x2,0xa),Math[_0x2d6a('‫96')]()[_0x2d6a('‫97')](0x10)[_0x2d6a('‮98')](0x2,0xa))+Math[_0x2d6a('‫96')]()[_0x2d6a('‫97')](0x10)[_0x2d6a('‮98')](0x2,0xa),Math[_0x2d6a('‫96')]()[_0x2d6a('‫97')](0x10)[_0x2d6a('‮98')](0x2,0xa));}function random(_0x3376db){var _0x588fb1={'IQQVV':function(_0x245ea0,_0x5cca33){return _0x245ea0*_0x5cca33;}};return _0x3376db[Math[_0x2d6a('‮99')](_0x588fb1[_0x2d6a('‮9a')](Math[_0x2d6a('‫96')](),_0x3376db[_0x2d6a('‫18')]))];}function getSign(_0x45d02b,_0x53b2ce){var _0x54913e={'hmrIF':function(_0x4a6ad4,_0x24de89){return _0x4a6ad4!==_0x24de89;},'pIEWC':_0x2d6a('‫9b'),'tkBKb':_0x2d6a('‮9c'),'AZfeL':function(_0x35568b,_0x42c70c){return _0x35568b(_0x42c70c);},'XCSTd':_0x2d6a('‫9d'),'zhfPK':_0x2d6a('‫9e')};const _0x3f8a14={'url':_0x54913e[_0x2d6a('‮9f')],'body':JSON[_0x2d6a('‮a0')]({'fn':_0x45d02b,'body':_0x53b2ce}),'headers':{'Content-Type':_0x54913e[_0x2d6a('‮a1')]}};return new Promise(_0x45d02b=>{var _0x2b0a79={'rxuVT':function(_0x3bcce9,_0x59e8c6){return _0x54913e[_0x2d6a('‫a2')](_0x3bcce9,_0x59e8c6);},'dJVId':_0x54913e[_0x2d6a('‫a3')],'YOttW':_0x54913e[_0x2d6a('‮a4')],'eoIBm':function(_0x3db4d6,_0x394b73){return _0x54913e[_0x2d6a('‮a5')](_0x3db4d6,_0x394b73);}};$[_0x2d6a('‮8f')](_0x3f8a14,async(_0x53b2ce,_0x592731,_0x394cf3)=>{try{_0x53b2ce?console[_0x2d6a('‫12')](_0x53b2ce):_0x394cf3=JSON[_0x2d6a('‮5c')](_0x394cf3);}catch(_0x49c859){if(_0x2b0a79[_0x2d6a('‫a6')](_0x2b0a79[_0x2d6a('‫a7')],_0x2b0a79[_0x2d6a('‫a8')])){$[_0x2d6a('‫a9')](_0x49c859,_0x592731);}else{$[_0x2d6a('‫a9')](_0x49c859,_0x592731);}}finally{_0x2b0a79[_0x2d6a('‮aa')](_0x45d02b,_0x394cf3||'');}});});}function TotalBean(){var _0x4ccbb5={'jUyVJ':function(_0x3553b1,_0x266edd){return _0x3553b1!==_0x266edd;},'kfIWY':_0x2d6a('‫35'),'kKuvL':_0x2d6a('‮4e'),'HTlZp':function(_0x22cc97,_0x408227){return _0x22cc97===_0x408227;},'Zhlpn':_0x2d6a('‮32'),'bZOrN':_0x2d6a('‫33'),'oxwnO':_0x2d6a('‮ab'),'cwguA':_0x2d6a('‮ac'),'HdxfX':_0x2d6a('‫ad'),'aiUjG':_0x2d6a('‮8a'),'wrrHJ':_0x2d6a('‮ae'),'knSHu':_0x2d6a('‫af'),'nYZhy':_0x2d6a('‮b0'),'HJixA':_0x2d6a('‮b1')};return new Promise(async _0x4d950=>{var _0x1a84bf={'oeOYT':function(_0x1af7fb,_0x55da96){return _0x4ccbb5[_0x2d6a('‫b2')](_0x1af7fb,_0x55da96);},'HkdqH':_0x4ccbb5[_0x2d6a('‮b3')],'zsABd':_0x2d6a('‮4d'),'OcPRv':function(_0x1c404f,_0x3770f1){return _0x4ccbb5[_0x2d6a('‫b2')](_0x1c404f,_0x3770f1);},'Avnal':_0x4ccbb5[_0x2d6a('‫b4')],'ZIFoW':function(_0x102f6a,_0x2133fd){return _0x4ccbb5[_0x2d6a('‫b5')](_0x102f6a,_0x2133fd);},'gDiJJ':_0x2d6a('‮b6'),'jEllm':_0x4ccbb5[_0x2d6a('‫b7')],'kQUcw':function(_0x54817c,_0x1769dd){return _0x54817c===_0x1769dd;},'MQpCi':_0x4ccbb5[_0x2d6a('‮b8')],'YbSXL':_0x4ccbb5[_0x2d6a('‫b9')],'gvIZO':function(_0xffc46){return _0xffc46();}};const _0x5ec1a2={'url':_0x4ccbb5[_0x2d6a('‮ba')],'headers':{'Host':_0x4ccbb5[_0x2d6a('‮bb')],'Accept':_0x4ccbb5[_0x2d6a('‮bc')],'Connection':_0x4ccbb5[_0x2d6a('‮bd')],'Cookie':cookie,'User-Agent':UA,'Accept-Language':_0x4ccbb5[_0x2d6a('‮be')],'Referer':_0x4ccbb5[_0x2d6a('‫bf')],'Accept-Encoding':_0x4ccbb5[_0x2d6a('‮c0')]}};$[_0x2d6a('‮c1')](_0x5ec1a2,(_0x5ec1a2,_0x44986a,_0xc8617f)=>{try{if(_0x1a84bf[_0x2d6a('‮c2')](_0x1a84bf[_0x2d6a('‮c3')],_0x1a84bf[_0x2d6a('‮c3')])){if(_0x5ec1a2)$[_0x2d6a('‫a9')](_0x5ec1a2);else if(_0xc8617f){if(0x3e9===(_0xc8617f=JSON[_0x2d6a('‮5c')](_0xc8617f))[_0x2d6a('‮31')])return void($[_0x2d6a('‮20')]=!0x1);0x0===_0xc8617f[_0x2d6a('‮31')]&&_0xc8617f[_0x2d6a('‮5f')]&&_0xc8617f[_0x2d6a('‮5f')][_0x2d6a('‫60')](_0x1a84bf[_0x2d6a('‮c4')])&&($[_0x2d6a('‮21')]=_0xc8617f[_0x2d6a('‮5f')][_0x2d6a('‮32')][_0x2d6a('‫62')][_0x2d6a('‮63')]),_0x1a84bf[_0x2d6a('‫c5')](0x0,_0xc8617f[_0x2d6a('‮31')])&&_0xc8617f[_0x2d6a('‮5f')]&&_0xc8617f[_0x2d6a('‮5f')][_0x1a84bf[_0x2d6a('‫c6')]]&&($[_0x2d6a('‫65')]=_0xc8617f[_0x2d6a('‮5f')]&&_0xc8617f[_0x2d6a('‮5f')][_0x2d6a('‫33')][_0x2d6a('‫34')]);}else console[_0x2d6a('‫12')](_0x1a84bf[_0x2d6a('‫c7')]);}else{if(_0x1a84bf[_0x2d6a('‫c8')](t[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x1a84bf[_0x2d6a('‫c9')]),-0x1)){picURL=t[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).dpg/g,'$1');}else if(t[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x1a84bf[_0x2d6a('‫ca')])!==-0x1){picURL=t[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).webp/g,'$1');}else if(_0x1a84bf[_0x2d6a('‮cb')](t[_0x2d6a('‫49')][_0x2d6a('‫4a')](_0x1a84bf[_0x2d6a('‫cc')]),-0x1)){picURL=t[_0x2d6a('‫49')][_0x2d6a('‮4c')](/s[0-9]{3}x[0-9]{3}_(.*).avif/g,'$1');}picURLInfoList[_0x2d6a('‮4f')](picURL);}}catch(_0x4cae10){$[_0x2d6a('‫a9')](_0x4cae10);}finally{_0x1a84bf[_0x2d6a('‫cd')](_0x4d950);}});});};_0xodv='jsjiami.com.v6';
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }