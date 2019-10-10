# DOCKER-API
## Installation
Run following commands :
``` 
git clone https://github.com/fabien-renaud/docker-api /home/projets/docker-api
cd /home/projets/docker-api
docker build . -t docker-api
docker run -d -p 3000:3000 --name docker-api docker-api
```

Check if container is up :
```
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
6d24a5d36ca0        docker-api          "docker-entrypoint..."   24 minutes ago      Up 24 minutes       0.0.0.0:3000->3000/tcp   docker-api
```

Start/Stop/Restart container :
```
> docker [start/stop/restart] docker-api
```

Delete container :
```
docker rm docker-api
```