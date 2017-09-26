To run
```
npm install
npm run server
```

To run as a daemon (see https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7)
```
sudo npm install pm2@latest -g
pm2 start server.js
sudo pm2 startup systemd
```