var assert = require('chai').assert;
var rainbow = new (require('../../commands/rainbow'))();
var Context = require('akp48-context');

describe('Rainbow Command', function() {
  describe('#names', function() {
    it('should be an Array', function() {
      assert.isArray(rainbow.names);
    });
    it(`should include the names 'rainbow' and 'r'.`, function() {
      assert.include(rainbow.names, 'rainbow');
      assert.include(rainbow.names, 'r');
    });
  });
  describe('#respond()', function() {
    it('should return rainbow text.', function() {
      let ctx = new Context({
        instance: {},
        instanceType: 'Test',
        commandDelimiters: ['.'],
        nick: 'Test',
        text: '.r This is text.',
        to: 'Test',
        user: 'Test'
      });
      assert.equal(rainbow.respond(ctx), '\u000304\u0002\u0002T\u0003\u000307\u0002\u0002h\u0003\u000308\u0002\u0002i\u0003\u000303\u0002\u0002s\u0003 \u000312\u0002\u0002i\u0003\u000302\u0002\u0002s\u0003 \u000306\u0002\u0002t\u0003\u000304\u0002\u0002e\u0003\u000307\u0002\u0002x\u0003\u000308\u0002\u0002t\u0003\u000303\u0002\u0002.\u0003');
    });
    it('should return null if no text is provided.', function() {
      let ctx = new Context({
        instance: {},
        instanceType: 'Test',
        commandDelimiters: ['.'],
        nick: 'Test',
        text: '.r',
        to: 'Test',
        user: 'Test'
      });
      assert.isNull(rainbow.respond(ctx));
    });
  });
});
