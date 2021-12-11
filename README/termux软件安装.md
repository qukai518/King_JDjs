#bash <(curl -Ls https://ghproxy.com/https://raw.githubusercontent.com/inoyna12/JDsc/main/docker/termux)
#首先手机下载termux软件安装，下载链接:https://f-droid.org/repo/com.termux_117.apk
#(如果以下文件下载很慢或者下载失败请自行挂梯子)
#视频教程:https://share.weiyun.com/vwW2QVlZ

#1:打开后安装nodejs运行环境:
pkg install git vim nodejs perl cronie -y
apt update && apt upgrade -y
apt install nodejs -y

#2:拉取仓库:
git clone https://ghproxy.com/https://github.com/inoyna12/jd-base.git

#3:进入文件夹目录:
cd jd-base/

#4:创建config文件夹:
mkdir ~/jd-base/config

#5:复制文件到config文件夹里并重命名为config.sh:
cp -if ~/jd-base/sample/config.sh.sample ~/jd-base/config/config.sh

#6:还是复制文件到文件夹:
cp -if ~/jd-base/sample/termux.list.sample ~/jd-base/config/crontab.list

#7:替换文件代码:
sed 's?storage/shared/jd?jd-base?' ~/jd-base/config/crontab.list

#8:更新脚本库:
bash git_pull.sh

#9:启动crond
crond -ipP

#10:启动定时任务:
crontab ~/jd-base/config/crontab.list

#11:启动控制面板:
cp -if ~/jd-base/sample/auth.json ~/jd-base/config/auth.json
cd ~/jd-base/panel
npm i
npm i pm2 -g
pm2 start server.js

echo '面板地址：127.0.0.1:5678'
echo '账号:admin'
echo '密码:admin'
#登录进去后在首页填入你的京东cookie，然后软件挂在后台就会自动运行了，会自动更新我仓库的脚本。

#               常见问题合集
#重新启动挂机:
#cd jd-base/
#crond -ipP
#crontab ~/jd-base/config/crontab.list
#cd ~/jd-base/panel
#pm2 start server.js

#如果你不知道定时任务的脚本是运行什么的，进入下方网址查看:
#https://github.com/inoyna12/JDsc/blob/main/docker/crontab_list.sh
if [ -r ~/.bashrc ];then
echo ""
else
echo 'pm2 start /data/data/com.termux/files/home/jd-base/panel/server.js' >> ~/.bashrc 
fi
