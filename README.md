# itbgnews
Project of the web development study group in IT Bulgaria

Used for a starting point - https://github.com/bradtraversy/react_express_starter

## How to start (React + Express)

```bash
# Install dependencies for server
npm run server-install

# Install dependencies for Next
npm run client-install

# Run the Express server and Next server concurrently
npm run dev
```

## How to configure the Docker images

```bash
docker build -t "itbgnews-server" ./server/ --no-cache
```

```bash
docker build -t "itbgnews-client" ./client/ --no-cache
```

```bash
docker-compose up
```
