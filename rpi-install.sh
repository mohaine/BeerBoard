PI_HOST=$1

echo install to $PI_HOST
ssh pi@$PI_HOST 'sudo mkdir -p /opt/beerboard; sudo chown pi /opt/beerboard'
scp -r beerboard beerboard.service web cfg-dist.json pi@$PI_HOST:/opt/beerboard/
ssh pi@$PI_HOST 'sudo ln -s /opt/beerboard/beerboard.service  /etc/systemd/system; sudo systemctl enable beerboard'
ssh pi@$PI_HOST 'sudo systemctl restart beerboard'
