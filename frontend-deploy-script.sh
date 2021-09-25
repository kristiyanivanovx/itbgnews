# example deployment script, modify to suit your needs

heroku container:login
cd "D:\Projects\GitHub repos\itbgnews" || exit
echo "$PWD"
docker build -t "itbgnews-client" ./client/ --no-cache
docker tag itbgnews-client registry.heroku.com/itbgnews/web
docker push registry.heroku.com/itbgnews/web
heroku container:release web --app itbgnews
$SHELL
