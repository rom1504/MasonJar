# Commands:

## Usage:
To use commands prefix by using # then follow JavaScript syntax to execute the command as a function. Semicolons are not required. It is important to note as of the latest release strings **do not** *need* to be wrapped in quotes.

### #vote4day()
After x percent (set in the config) of connected players vote for day, the time will be changed to day. (votes then reset)

### #vote4restart()
Restart server when x percent (set in the config) of connected users votes. (votes then reset)

### #vote2ban(PlayerName)
After x amount of players vote to ban someone they will be banned, you can see x
by voting to ban somebody and awaiting the servers response message.

### #vote2unban(PlayerName)
After x amount of players vote to unban someone they will be unbanned, you can see x
by voting to unban somebody and awaiting the servers response message.

### #starter()
Give the player the starter pack (as determined in `modules/packs/starter.pack.js`) once.

### #help()
Takes you to this page.