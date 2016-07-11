function Nick() {
  this.names = ['nick'];
}

//TODO: Verify that nick is valid before attempting to set.
Nick.prototype.respond = function (context) {
  var IRC = context.instance();
  if(context.text()) {
    IRC._client.send('NICK', context.text());

    //wait about 2 seconds, then save IRC config, unless name wasn't changed successfully.
    setTimeout(() => {
      if (IRC._client.nick === context.text()) {
        //save IRC config
        var conf = IRC._config;
        conf.nick = context.text();
        IRC._client.opt.nick = context.text();

        global.AKP48.saveConfig(conf, context.instanceId(), true);
        context.reply(`Nick successfully changed to "${context.text()}".`);
      } else {
        context.reply(`An error occurred while attempting to change nick to "${context.text()}".`);
      }
    }, 2000);
  } else if (IRC._client.nick !== IRC._config.nick) {
    IRC._client.send('NICK', IRC._config.nick);
  }

  return null;
};

module.exports = Nick;
