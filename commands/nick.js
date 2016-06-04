function Nick() {
  this.names = ['nick'];
}

//TODO: Verify that nick is valid before attempting to set.
Nick.prototype.respond = function (context) {
  var IRC = context.instance;
  if(context.text) {
    IRC._client.send('NICK', context.text);

    //save IRC config
    var conf = IRC._config;
    conf.nick = context.text;
    IRC._client.opt.nick = context.text;

    global.AKP48.saveConfig(conf, context.instanceId, true);
  } else if (IRC._client.nick !== IRC._config.nick) {
    IRC._client.send('NICK', IRC._config.nick);
  }

  return null;
};

module.exports = Nick;
