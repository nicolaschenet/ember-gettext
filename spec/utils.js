// Inspired by https://raw.githubusercontent.com/jamesarosen/ember-i18n/master/spec/spec_support.js
(function() {

  if (/^2\./.test(jQuery.fn.jquery)) {
    // jQuery 2 leaks globals, but mocha.globals slows down testing
    mocha.globals([ 'jQuery*' ]);
  }

  Ember.FEATURES = Ember.FEATURES || {};

  function renderTemplate(template, options) {
    var container = new Ember.Container();
    container.register('view:toplevel', Ember.View.extend());

    if (options == null)
      options = {};

    options.template = Ember.Handlebars.compile(template);
    options.container = container;
    var view = this._ember_view = Ember.View.create(options);
    Ember.run(view, 'append');

    return view;
  }

  beforeEach(function() {
    this.renderTemplate = renderTemplate.bind(this);
    this.originalTranslations = Ember.I18n.translations;
    this.originalMissingMessage = Ember.I18n.missingMessage;

    var json = {
      "": {
        "language": "fr",
        "plural-forms": "nplurals=2; plural=n>1;"
      },
      "Loading...": "Chargement...",
      "Save": "Sauvegarder",
      "html": "<span class=\"some-class\">This is \"HTML\"</span>",
      "There is {{ count }} apple": [
        "Il y a {{ count }} pomme",
        "Il y a {{ count }} pommes"
      ],
      "Checkout\u0004Save": "Sauvegarder votre panier"
    };

    Ember.I18n.loadJSON(JSON.stringify(json))
      .setLocale('fr');
  });

  afterEach(function() {
    if (this._ember_view) {
      Ember.run(this._ember_view, 'destroy');
      delete this._ember_view;
    }

    Ember.I18n.translations = this.originalTranslations;
    Ember.I18n.missingMessage = this.originalMissingMessage;
    Ember.I18n.locale = null;
  });

}());
