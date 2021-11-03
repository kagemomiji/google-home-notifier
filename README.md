# google-home-notifier
Send notifications to Google Home

## Installation

```bash
$ sudo apt install git-core libnss-mdns libavahi-compat-libdnssd-dev
```

```sh
$ npm install 
```

After "npm install"

Modify the following file "node_modules/mdns/lib/browser.js"
```sh
vi node_modules/mdns/lib/browser.js
```
Find this line:
```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo()
, rst.makeAddressesUnique()
];
```
And change to:
```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo({families:[4]})
, rst.makeAddressesUnique()
];
```
## Listener

If you want to run a listener, take a look at the main.js file. You can run this from a pc or mac. 

```sh
$ node main.js
Endpoints:
    http://localhost:8091/cast
POST example:
curl -X POST http://localhost:8091/cast -H "Content-Type: application/json" -d '{"file":"http://example.com/example.mp3", "address": "192.168.1.20","name":"GoogleHome"}

```

If you want to know API specification. Please check [here](https://kagemomiji.github.io/google-home-notifier/).

## Docker Usage

```bash
$ docker-compose build 
$ docker-compose up -d
```
### environment value

| env | description |
| --- | ----------- |
| HOST | host address. default `localhost` |
| PORT | host port. default `8091` |