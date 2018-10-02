# Beer Board
Software for beer tap list

to install on an Raspberry Pi.

1) Write base system image to SD Card (These directions are for RASPBIAN STRETCH LITE)
2) update/upgrade the base os
  apt update
  apt upgrade
3) Install Xorg
sudo  apt install chromium-browser unclutter lightdm lwm

4) Start browser on X Start

~ $ cat ~/.Xsession
xset s off
xset s noblank
xset dpms 0 0 0
unclutter &
chromium-browser --noerrdialogs http://127.0.0.1 --incognito --start-fullscreen &
exec lwm




5) Launch X on startup



Boot Options -> Desktop/ CLI -> Desktop Autologin

6) Install BeerBoard on the RPi  (you can do this on any computer)

make rpi
./rpi-install.sh hostname


To develop:

  npm install
  npm start

navigate to http://localhost:3000

For production mode:

  npm npm install
  npm run build-prod
  npm run prod

navigate to http://localhost
