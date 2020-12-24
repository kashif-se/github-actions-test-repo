## hCaptcha Telegram Bot

### How to install

1. Install NodeJS 12.x

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2

`npm install -g pm2`

3. Clone repo

`git clone git@github.com:pytour/hcaptcha-project.git`

Add environment variables

For nextjs app

`touch ./app/.env.local`



4. Install Docker MongoDB RabbitMQ

- Install Docker & docker-compose

`apt  install docker.io docker-compose`

- Create `stack.yml` (see stack.yml.example)

- Run docker-compose

```docker-compose -f stack.yml up -d```

To check that it work properly run: 

```docker-compose ps```

5. Create `ecosystem.config.js` file (see ecosystem.config.js.example) 

6. Build and Run project (Telegram Bot and NextJS app): 

`bash deploy_script.sh`


7. Setup Nginx 

`sudo apt install nginx`

Edit our default nginx site file

`sudo vim /etc/nginx/sites-available/default`


```
server {
    listen 80;

    server_name _;

    location / {
        # reverse proxy for next server
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # we need to remove this 404 handling
        # because next's _next folder and own handling
        # try_files $uri $uri/ =404;
    }
}
```

Test the configuration of Nginx:

`sudo nginx -t`

Reload Nginx:

`sudo /etc/init.d/nginx reload`

Thats it 🚀