(function(window) {
  Ember.I18n = window.i18n();

  var
    PlainHandlebars = window.Handlebars,
    EmHandlebars = Ember.Handlebars;

  var strfmt = function (string, attrs) {
    if ('undefined' === typeof attrs) {
      return string;
    }

    return string.replace(/\{\{\s*([a-zA-Z]+)\s*\}\}/g, function (i, match) {
      return 'undefined' !== typeof attrs[match] ? attrs[match] : '{{' + match + '}}';
    });
  };

  Ember.I18n._t = function (msgid, attrs) {
    return strfmt(Ember.I18n.gettext(msgid), attrs);
  };

  Ember.I18n._n = function (msgid, msgid_plural, attrs) {
    Ember.assert('You must pass a count attribute to translate plural forms', 'undefined' !== typeof attrs['count']);

    return strfmt(Ember.I18n.ngettext(msgid, msgid_plural, attrs['count']), attrs);
  };

  // register _t template operator for singular
  EmHandlebars.registerBoundHelper('_t', function (msgid, context) {
    return new PlainHandlebars.SafeString(Ember.I18n._t(msgid, context.hash));
  });

  // register _n template operator for plurals
  EmHandlebars.registerBoundHelper('_n', function (msgid, msgid_plural, context) {
    return new PlainHandlebars.SafeString(Ember.I18n._n(msgid, msgid_plural, context.hash));
  });
}).call(undefined, this);
