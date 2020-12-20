## hCaptcha Telegram Bot

1 Install NodeJS

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2 Install Yarn and PM2

```npm install -g yarn pm2```

3 Install Git

```sudo apt install git-all```

4 Clone repo

```git clone $URL```


5 Install Docker MongoDB RabbitMQ

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh



https://hub.docker.com/_/mongo

Run 



```docker stack deploy -c stack.yml mongo```

or 
```docker-compose -f stack.yml up```
 
wait for it to initialize completely, and visit http://swarm-ip:8081, http://localhost:8081, or http://host-ip:8081 (as appropriate).



Container shell access and viewing MongoDB logs

```docker exec -it some-mongo bash```

```docker logs some-mongo```



```
docker run -d --name container_name \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=15Qwerty15 \
      mongo
```