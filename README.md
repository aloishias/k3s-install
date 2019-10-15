
# DOCKER INSTALL

### Install Packages (CentOS)
```
$ yum install git
$ yum install docker
$ service docker start
```

### Build and run docker
```
$ git clone https://github.com/fabien-reaud/docker-api /home/projets/dnocker-api
$ cd /home/projets/docker-api
$ docker build . -t docker-api
$ docker run -d -p 3000:3000 --name docker-api docker-api
```

##### Check if container is up :
```  
$ docker ps  
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES  
6d24a5d36ca0        docker-api          "docker-entrypoint..."   24 minutes ago      Up 24 minutes       0.0.0.0:3000->3000/tcp   docker-api  
```  
  
##### Start/Stop/Restart container : 
```
$ docker [start/stop/restart] docker-api
```

##### Delete container :
```
$ docker rm docker-api
```

# KUBERNETES INSTALL

*Source: https://github.com/rancher/k3s*

### Install K3S on Master
```
master# curl -sfL https://get.k3s.io | sh -
master# cat /var/lib/rancher/k3s/server/node-token
master# k3s agent --server https://${SERVER_URL}:6443 --token ${NODE_TOKEN}
```

##### Check if Master is up
```
master# k3s kubectl get node
NAME                  STATUS   ROLES    AGE   VERSION
scw-dreamy-bhaskara   Ready    master   24m   v1.15.4-k3s.1
```

### Install K3S on Slave
```
slave# curl -sfL https://get.k3s.io | K3S_URL=https://${MASTER_SERVER_URL}:6443 K3S_TOKEN=${MASTER_NODE_TOKEN} sh -
```

##### Check if Slave is up
```
master# k3s kubectl get node
NAME                  STATUS   ROLES    AGE   VERSION
scw-dreamy-bhaskara   Ready    master   24m   v1.15.4-k3s.1
scw-nifty-mendel      Ready    worker   5s    v1.15.4-k3s.1
```

# INSTALL KUBERNETES DASHBOARD

*Source: https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/*

### Install dashboard on master
```
master# kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yaml
```

##### Run dashboard on master
```
master# kubectl proxy
```

### Access Dashboard from remote machine

##### Clone config file from master
```
master# cat /etc/rancher/k3s/k3s.yaml
```

##### ... on Windows remote machine
```
C:/Users/${USER}/.kube/config
```

##### Modify .kube/config IP value
```
server: https://${MASTER_SERVER_URL}:6443
```

##### Run kubectl on remote machine
```
> kubectl get node --insecure-skip-tls-verify
> kubectl proxy
```

### Create new user on Dashboard
*Source: https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md*

##### Serivce Account
Create sa.yaml file wherever you want:
```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

##### Cluster Role Binding
Create crb.yaml file wherever you want:
```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

##### Apply configs
```
master# kubectl apply sa.yaml
master# kubectl apply cbl.yaml
```

### Connect to dashboard

##### Generate token:
```
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

Dashboard: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

# Deploy App on Kubernetes

In progress