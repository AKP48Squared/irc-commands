function IRCChannel() {
  this.names = ['chan', 'join', '+', 'part', '-'];
}

IRCChannel.prototype.respond = function (context) {
  var IRC = context.instance();
  var chans = [];
  var chanText = context.argText().split(' ');

  // verify each chan is actually a channel
  for (var i = 0; i < chanText.length; i++) {
    if (chanText[i].match(/([#&][^\x07\x2C\s]{0,200})/)) {
      chans.push(chanText[i]);
    }
  }

  switch(context.command()) {
    default:
    case 'chan':
      // Usage, for now. Later perhaps allow +/-channel
      return '(join|part) <channel> [channel...]';
    case 'join':
    case '+':
      // Joining
      chans.forEach(function (c) {
        if(IRC._config.channels.includes(c)) { // Don't join channels we're already part of
          return;
        }
        IRC._client.join(c, function() {
          if(!IRC._config.channels.includes(c)) {
            IRC._config.channels.push(c);
          }
          if(!IRC._config.silentJoin) {
            IRC._client.say(c, IRC.joinMsg);
            var ctx = new global.AKP48.Context({
              instance: IRC,
              instanceType: 'irc',
              nick: IRC._client.nick,
              text: IRC.joinMsg,
              to: c,
              user: `PLUGIN`,
              commandDelimiters: '',
              myNick: IRC._client.nick,
              permissions: []
            });
            IRC._AKP48.logMessage(ctx);
          }

          IRC._AKP48.saveConfig(IRC._config, IRC._id, true);
        });
      });
      break;
    case 'part':
    case '-':
      // Leaving
      chans.forEach(function (c) {
        if(!IRC._config.channels.includes(c)) { // Don't leave channels we're not part of
          return;
        }
        IRC._client.part(c, function() {
          if(IRC._config.channels.includes(c)) {
            IRC._config.channels.splice(IRC._config.channels.indexOf(c), 1);
          }
          IRC._AKP48.saveConfig(IRC._config, IRC._id, true);
        });
      });
      break;
  }
  return null;
};

module.exports = IRCChannel;
