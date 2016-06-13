var c = require('irc-colors');

function Rainbow() {
  this.names = ['rainbow', 'r'];
}

Rainbow.prototype.respond = function (context) {
  context.setCustomData('noPrefix', true);
  if(context.argText().length) {
    return c.rainbow(context.argText());
  }

  return null;
};

module.exports = Rainbow;
