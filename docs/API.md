# API

## Routes

### Notice
Documentation is updated infrequently and some examples may be out of date. More (or less) information may be available.

#### /
Get a list of all top level routes available.

### /basic
Lists basic server information such as uptime, players online, and time until the next restart.

Example:
```
{
  "players": {
    "count": 0,
    "players": [
      
    ],
    "updatedAt": "2015-11-09T19:05:02.837Z"
  },
  "uptime": {
    "uptime": 2790093,
    "uptimeBreakdown": {
      "millis": 93,
      "seconds": 30,
      "minutes": 46,
      "hours": 0,
      "days": 0
    },
    "formattedUptime": "0 days, 0 hours, 46 minutes, 30 seconds, 93 millis",
    "updatedAt": "2015-11-10T02:03:22.244Z"
  },
  "restartTime": {
    "timeTillRestart": 83625000,
    "formattedRestartCoutdown": "0 days, 23 hours, 13 minutes, 45 seconds, 0 millis",
    "updatedAt": "2015-11-10T04:37:00.382Z"
  }
}
```

### /player/:playername
Get public player information stored on the server.

Example:
```
{
  "updatedAt": "2015-11-11T04:05:41.991Z",
  "username": "That_8Bit_Trip",
  "onlinePoints": 7,
  "points": 0,
  "afk": false,
  "lastSeen": 1447215163094,
  "UUID": "086589f6-058c-4b36-b3fa-cb746ef4196d"
}
```

### /players/:limit
Get a list of all players by limit containing information stored on the server.

Example:
```
[
  {
    "username": "ILikecows33",
    "afk": false,
    "onlinePoints": 44,
    "points": 0,
    "onlineStamp": 1447217407889,
    "UUID": "fee8cd9e-c695-4eee-8b2f-7b053605f25d",
    "updatedAt": "2015-11-11T04:06:04.893Z"
  },
  {
    "username": "That_8Bit_Trip",
    "afk": false,
    "onlinePoints": 7,
    "points": 0,
    "onlineStamp": 1447215163094,
    "UUID": "086589f6-058c-4b36-b3fa-cb746ef4196d",
    "updatedAt": "2015-11-11T04:05:41.991Z"
  }
]
```
