function Nick() {
  this.names = ['nick'];
}

//TODO: Verify that nick is valid before attempting to set.
Nick.prototype.respond = function (context) {
  var IRC = context.instance();
  if(context.argText()) {
    IRC._client.send('NICK', context.argText());

    //wait about 2 seconds, then save IRC config, unless name wasn't changed successfully.
    setTimeout(() => {
      if (IRC._client.nick === context.argText()) {
        //save IRC config
        var conf = IRC._config;
        conf.nick = context.argText();
        IRC._client.opt.nick = context.argText();

        global.AKP48.saveConfig(conf, context.instanceId(), true);
        context.reply(`Nick successfully changed to "${context.argText()}".`);
      } else {
        context.reply(`An error occurred while attempting to change nick to "${context.argText()}".`);
      }
    }, 2000);
  } else if (IRC._client.nick !== IRC._config.nick) {
    IRC._client.send('NICK', IRC._config.nick);
  }

  return null;
};

module.exports = Nick;
