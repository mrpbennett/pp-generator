# start proxy
>/tmp/proxy_log.log
./proxy.sh > /tmp/proxy_log.log 2>&1 &
proxy_pid=$!
echo "Started Proxy pid $proxy_pid"
sudo npm run serve &
npm_pid=$!
echo "After startup, visit\n http://host.docker.internal.proxy.localhost:9999/ in chrome..."
wait $npm_pid
wait $proxy_pid