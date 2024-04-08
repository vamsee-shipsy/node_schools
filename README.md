
# NodeJS-Postgres Application

This is a simple NodeJS Application with Postgres as database. It is created to test the integration of Keploy testing tool.

## Installation

1. Clone the repository

```bash
git clone https://github.com/vamsee-shipsy/node_schools.git
```
    
2. For Installing without docker, you need to have a postgres server up and running in your system and then in the project directory , run the following commands to run the node server:
```bash
npm install 
npm start
```
Installing with Docker:
Run the following command to install with docker
```bash
docker-compose up --build -d
```


## Testing with keploy

For OS specific installing instructions of Keploy, refer the following link:

https://keploy.io/docs/

1. To record the test-cases with docker container

```bash
keploy record -c "docker-compose up --build" --containerName "api" --networkName "keploy-test" --buildDelay 10m
```

 Without Docker:(make sure that postgres is running in the background and change the postgres connection url to localhost in db.js )

 ```bash
keploy record -c "npm start" --buildDelay 10m
 ```

 This will start keploy to record some testcases. Now , try to create some test cases by hitting api endpoints of the appication. here are few:

> To Add a book:
```
curl --location 'http://localhost:3000/' \
--header 'Content-Type: application/json' \
--data '{
        "name": "school1",
        "address": "bnglr1"
}'
```
> To get the books details:
```
curl --location 'http://localhost:3000/'
```
After recording the test cases, quit the process to stop recording.

2. To test the recorded testcases:

```
keploy test -c "docker-compose up --build" --containerName "api" --networkName "keploy-test" --buildDelay 10m --delay 30
```

Without Docker:
```
keploy test -c "npm start" --buildDelay 10m --delay 30
```

Refer the following documentation of keploy for further details in the integration:
https://keploy.io/docs/quickstart/samples-nodejs/


