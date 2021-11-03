FROM node:16.13.0-bullseye-slim

LABEL maintainer="Y.Tory <kagemomiji.dev@gmail.com>"
LABEL org.opencontainers.image.source = "https://github.com/kagemomiji/google-home-notifier"

RUN apt-get update && apt-get -y install --no-install-recommends \
    libnss-mdns libavahi-compat-libdnssd-dev python3 build-essential avahi-daemon avahi-discover && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY src /opt/ghn

WORKDIR /opt/ghn

RUN npm install &&  sed -i -f mdns.sed  node_modules/mdns/lib/browser.js

ENTRYPOINT ["bash", "entrypoint.sh"]

CMD ["node", "main.js"]
