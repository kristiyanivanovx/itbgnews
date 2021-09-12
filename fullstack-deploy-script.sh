# example deployment script, modify to suit your needs

heroku container:login
cd "D:\Projects\GitHub repos\hackernews-clone" || exit
echo "$PWD"

# build images
#docker build -t "itbgnews-server" ./server/ --no-cache
#docker build -t "itbgnews-client" ./client/ --no-cache

# tag images
#docker tag itbgnews-server registry.heroku.com/itbgnews/worker
#docker tag itbgnews-client registry.heroku.com/itbgnews/web

#docker push registry.heroku.com/itbgnews/worker
#docker push registry.heroku.com/itbgnews/web

#heroku container:release web --app itbgnews-api
#heroku container:release web --app itbgnews


heroku container:push --recursive


$SHELL



