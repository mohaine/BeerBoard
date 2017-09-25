


ssh pi@beerboard 'sudo mkdir -p /opt/beerboard; sudo chown pi /opt/beerboard'
scp -r beerboard beerboard.service web cfg-dist.json pi@beerboard:/opt/beerboard/
ssh pi@beerboard 'sudo ln -s /opt/beerboard/beerboard.service  /etc/systemd/system; sudo systemctl enable beerboard'
ssh pi@beerboard 'sudo systemctl restart beerboard'
