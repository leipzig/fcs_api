To run for testing (will engage nodemon)
```
npm install
npm run start
```

To run as a daemon (see https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7)
```
sudo npm install pm2@latest -g
pm2 start server.js
sudo pm2 startup systemd
```

To access:
The port will be either 8080 or 3000 depending on if the `ENV PORT` is set

### View all uploads
```
http://uploader.cytovas.com:8080/uploads
```

### View a specific upload
```
http://uploader.cytovas.com:8080/uploads
```