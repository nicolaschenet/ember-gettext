describe('Ember.I18n for Handlebars', function () {
  describe('{{ _t }}', function () {
    it('should translate simple string', function () {
      var view = this.renderTemplate('{{_t "Loading..."}}');

      Ember.run(function() {
        expect(view.$().text()).to.equal('Chargement...');
      });
    });

    it('should translate simple string with a replacement', function () {
      var view = this.renderTemplate('{{_t "Loading {{ what }}" what="in progress..."}}');

      Ember.run(function() {
        expect(view.$().text()).to.equal('Loading in progress...');
      });
    });

    it('should responds to updates on bound properties after a rerender', function() {
      var view = this.renderTemplate('{{_t "Count is {{ count }}" countBinding="view.count"}}', { count: 3 });

      Ember.run(function() {
        expect(view.$().text()).to.equal('Count is 3');
        view.rerender();
        view.set('count', 4);
      });

      Ember.run(function() {
        expect(view.$().text()).to.equal('Count is 4');
      });
    });

    it('should not over-escape translations', function() {
      var view = this.renderTemplate('<div>{{{_t "html"}}}</div>');

      Ember.run(function() {
        expect(view.$('.some-class').length).to.equal(1);
        expect(view.$('.some-class').text()).to.equal('This is "HTML"');
      });
    });
  });

  describe('{{ _n }}', function () {
    it('should translate simple plural', function () {
      var
        that = this,
        getView = function (n) {
          return that.renderTemplate('{{_n "There is {{ count }} apple" "There is {{ count }} apples" count="' + n + '"}}');
        };

      Ember.run(function() {
        expect(getView(0).$().text()).to.equal('Il y a 0 pomme');
        expect(getView(1).$().text()).to.equal('Il y a 1 pomme');
        expect(getView(3).$().text()).to.equal('Il y a 3 pommes');
      });
    });
    it('should responds to updates on bound properties after a rerender', function() {
      var view = this.renderTemplate('{{_n "Count is {{ count }}" "Counts are {{ count }}" countBinding="view.count"}}', { count: 1 });

      Ember.run(function() {
        expect(view.$().text()).to.equal('Count is 1');
        view.rerender();
        view.set('count', 4);
      });

      Ember.run(function() {
        expect(view.$().text()).to.equal('Counts are 4');
      });
    });
  });
});
