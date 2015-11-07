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

# Commands Cheatsheet:

## Usage:
commands should be prefixed by $ and use JavaScript functional syntax. example:
`$starter()`. Enjoy!

### $vote2ban("PlayerName")
After x amount of players vote to ban someone they will be banned, you can see x
by voting to ban somebody and awaiting the servers response message.

### $vote2unban("PlayerName")
After x amount of players vote to unban someone they will be unbanned, you can see x
by voting to unban somebody and awaiting the servers response message.

### $starter()
Give the player the starter pack (as determined in `modules/commands/starter_pack:items`) once.

### $help()
Takes you to this page.

# Planned Features:

### vote_to_restart()
Restart server when x% of connected users votes.
