# example deployment script, modify to suit your needs

heroku container:login
cd "D:\Projects\GitHub repos\itbgnews" || exit
echo "$PWD"
docker build -t "itbgnews-server" ./server/ --no-cache
docker tag itbgnews-server registry.heroku.com/itbgnews-api/web
docker push registry.heroku.com/itbgnews-api/web
heroku container:release web --app itbgnews-api
$SHELL
