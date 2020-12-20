## hCaptcha Telegram Bot

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