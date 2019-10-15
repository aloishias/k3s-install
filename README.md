# DOCKER-API
### Install Packages (CentOS)
```
yum install git
yum install docker
service docker start
```

### Build and run docker
``` 
git clone https://github.com/fabien-renaud/docker-api /home/projets/docker-api
cd /home/projets/docker-api
docker build . -t docker-api
docker run -d -p 3000:3000 --name docker-api docker-api
```

### Check if container is up :
```
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
6d24a5d36ca0        docker-api          "docker-entrypoint..."   24 minutes ago      Up 24 minutes       0.0.0.0:3000->3000/tcp   docker-api
```

### Start/Stop/Restart container :
```
> docker [start/stop/restart] docker-api
```

### Delete container :
```
docker rm docker-api
```

# KUBERNETES
Github K3S : https://github.com/rancher/k3s

### Install K3S "Master"
```
master# curl -sfL https://get.k3s.io | sh -
master# cat /var/lib/rancher/k3s/server/node-token
master# k3s agent --server https://${SERVER_URL}:6443 --token ${NODE_TOKEN}
```

### Check if Master is up
```
master# k3s kubectl get node
NAME                  STATUS   ROLES    AGE   VERSION
scw-dreamy-bhaskara   Ready    master   24m   v1.15.4-k3s.1
```

### Install K3S "Slave"
```
slave# curl -sfL https://get.k3s.io | K3S_URL=https://${MASTER_SERVER_URL}:6443 K3S_TOKEN=${MASTER_NODE_TOKEN} sh -
```

### Check if Slave is up
```
master# k3s kubectl get node
NAME                  STATUS   ROLES    AGE   VERSION
scw-dreamy-bhaskara   Ready    master   24m   v1.15.4-k3s.1
scw-nifty-mendel      Ready    worker   5s    v1.15.4-k3s.1
```