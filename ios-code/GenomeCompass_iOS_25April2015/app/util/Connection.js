// https://coderwall.com/p/dzvhuq/sencha-touch-2-check-connection-state
//By Simon Grinberg
//https://www.linkedin.com/pub/dir/Simon/Grinberg
//https://www.facebook.com/sluzky

Ext.define('Ext.util.Connection', {
  singleton: true,

  isOnline: function () {
    return navigator.onLine;
  },

  on: function (state, fn, ctx, params) {
    params = params || [];
    fn = fn || Ext.emptyFn;
    var single = params.single || false;

    function eventListenerFn() {
      fn.apply(ctx, arguments);
      if (single) {
        window.removeEventListener(state, eventListenerFn);
      }
    }

    window.addEventListener(state, eventListenerFn);
  }
});


/*
//Set the path of the file

Ext.Loader.setPath({
  ...
  'Ext.util.Connection': './app/util/Connection.js'
});

//Also require the file

require: [
  ...
  'Ext.util.Connection'
]

//How to use ?

//Check wether the device has internet access:

Ext.util.Connection.isOnline()

//Execute function when connection is lost

Ext.util.Connection.on('offline', this.lostConnection, this);

//Execute function when connection is regained

Ext.util.Connection.on('online', this.regainedConnection, this);
*/