This plugin adds some commands for IRC servers to AKP48.

# Installation

This plugin is included by default on new installations of AKP48Squared. No further installation is needed.

# Commands

`chan`: Joins and parts channels on IRC servers.   
Usage: `join [channel]` and `part [channel]`  
Example: `join #ExampleChannel`  
Required Permissions: `['irc-commands.chan','irc-commands.op','AKP48.owner', 'AKP48.op']`

`nick`: Changes the bot's nick on the current network.  
Usage: `nick <newNick>`  
Example: `nick TestBot`  
Required Permissions: `['AKP48.owner']`

`rainbow`: Colorizes text.  
Usage: `rainbow <text...>`  
Example: `rainbow This is a test!`  
Required Permissions: None.

# Issues

If you come across any issues, you can report them on this GitHub repo [here](https://github.com/AKP48Squared/irc-commands/issues).
