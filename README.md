# MasonJar
Minecraft experiment

# Requirements & Setup
MasonJar requires you to have Java installed along with NodeJS and MongoDB.
You will also of course need a Minecraft client https://minecraft.net/download.

Once installed run the following to get going.

```$
npm i
sh start.sh
```

The server will be running at `localhost:25565`. connect by going to Multiplayer > Add Server, using `localhost` as the server address.

## Notice:
This server is under active development. World resets, failed delivery of items,
and failure to dispatch commands is entirely possible.

## Parser Note:
I reccommend that you look over the payload the parser returns and replicate th output with whatever lines you can gather from your server.
The parser will likely need to be modified for different versions of non-vanilla minecraft.

## Usage:
For usage instructions and server details please see `docs/`.