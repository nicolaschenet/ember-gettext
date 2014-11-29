describe('Ember.I18n', function () {
  it('should have I18n object', function () {
    expect(Ember.I18n).to.be.an('object');
  });

  describe('_t()', function () {
    it('should have a _t() method', function () {
      expect(Ember.I18n._t).to.be.a('function');
    });
    it('should translate simple string', function () {
      expect(Ember.I18n._t('Loading...')).to.be('Chargement...');
    });
    it('should fallback to english strings when missing translation', function () {
      expect(Ember.I18n._t('This key is not translated')).to.be('This key is not translated');
    });
  });

  describe('_n()', function () {
    it('should have a _n() method', function () {
      expect(Ember.I18n._n).to.be.a('function');
    });
    it('should translate simple plural', function () {
      expect(Ember.I18n._n('There is {{ count }} apple', 'There are {{ count }} apples', { count: 0 })).to.be('Il y a 0 pomme');
      expect(Ember.I18n._n('There is {{ count }} apple', 'There are {{ count }} apples', { count: 1 })).to.be('Il y a 1 pomme');
      expect(Ember.I18n._n('There is {{ count }} apple', 'There are {{ count }} apples', { count: 3 })).to.be('Il y a 3 pommes');
    });
    it('should fallback to english strings when missing translation', function () {
      expect(Ember.I18n._n('This key is not translated', 'These keys are not translated', { count: 1 })).to.be('This key is not translated');
      expect(Ember.I18n._n('This key is not translated', 'These keys are not translated', { count: 7 })).to.be('These keys are not translated');
      expect(Ember.I18n._n('This key is not translated', 'These keys are not translated', { count: 0 })).to.be('These keys are not translated');
    });
  });
});
