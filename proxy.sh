# spawn docker
docker run --rm -v `pwd`/modlishka.json:/modlishka.json -p9999:9999 registry.pulsepoint.com/modlishka:00a2385 ./proxy -config modlishka.json