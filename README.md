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

# Notice:
This server is under active development. World resets, failed delivery of items,
and failure to dispatch commands is entirely possible.

# Commands:

## Usage:
commands should be prefixed by # and use JavaScript functional syntax. example:
`$starter()`. Enjoy!

# Planned Features:

### #point("PlayerName")
When someone helps you out, give them a point, one point can be given per day,
you cannot give yourself points. Points may be use to purchase packs in game.
