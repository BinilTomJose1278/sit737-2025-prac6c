# SIT737-2025-Prac5P – Dockerized Calculator Microservice

## Overview

This project is a Dockerized calculator microservice built using **Node.js**, **Express.js**, and **Winston** logging. It performs basic arithmetic operations like addition, subtraction, multiplication, division, power, modulo, and square root through RESTful API endpoints.

---

##  Features

- REST API for basic arithmetic operations
- Logging of incoming requests and outgoing responses using Winston
- Dockerized using a custom Dockerfile
- Health checks using Docker Compose
- Automatic container restart on failure
- Logs persisted using volume binding

---

##  Technologies Used

- Node.js
- Express.js
- Winston Logger
- Docker
- Docker Compose

---

##  How to Run the App

### Step 1: Clone the Repository

```bash
git clone  https://github.com/BinilTomJose1278/sit737-2025-prac5p.git
cd sit737-2025-prac5p

```

Step 2: Ensure Docker Is Installed
Make sure Docker is installed on your system. You can download Docker Desktop from:

https://www.docker.com/products/docker-desktop

----
### Verify Docker Installation
```bash
docker --version
```

Step 3: Build and Run the Application Using Docker Compose
```bash
docker-compose up --build
```
This command will:

- Build a Docker image using the Dockerfile

- Start a container running your calculator app

- Expose it on http://localhost:3000

- Apply a health check to monitor availability

- Mount the local logs/ folder to persist logs

---

Step 4: Test the Calculator API

You can test the microservice using a browser or Postman.

---
 Step 5: Create Kubernetes Deployment
Create a folder named k8s in your project directory and inside it, create a file named deployment.yaml with the following content:
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: calculator-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: calculator
  template:
    metadata:
      labels:
        app: calculator
    spec:
      containers:
      - name: calculator
        image: biniltomjose12780/calculator-microservice:latest
        ports:
        - containerPort: 3000

```

This tells Kubernetes to:

- Pull your Docker image from Docker Hub

- Run one replica of your Node.js container

- Expose port 3000 inside the container

Step 6 : Create Kubernetes Service
In the same k8s folder, create a file named service.yaml with the following content:
```bash
apiVersion: v1
kind: Service
metadata:
  name: calculator-service
spec:
  selector:
    app: calculator
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: NodePort

```

Step 7: Apply Deployment and Service
Use the following commands to apply your Kubernetes configurations::
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

```

Step 8 : Access the Application
Run this command to open the app in your default browser or get the external URL:
```bash
minikube service calculator-service
```

Step 9 : Test the Application
```bash
http://<minikube-ip>:<node -port>/power?num1=2&num2=5

```
Step 10 : Push to Github
After verifying , add to github
```bash
git add .
git commit -m "Added Docker image"
git push -u origin main
```


