Handlebars.registerHelper('arrayToString', function(str) {
  if(str != undefined){
    return str.join('\n');
  }
});

Handlebars.registerHelper('arrayBaseOne', function(str) {
  if(str != undefined){
    return str + 1;
  }
});

Handlebars.registerHelper('each_reverse',function (context, options) {
  var fn = options.fn, inverse = options.inverse;
  var length = 0, ret = "", data;

  if (Handlebars.Utils.isFunction(context)) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if (Handlebars.Utils.isArray(context)) {
        length=context.length;
      for(var j = context.length-1; j >= 0; j--) {//no i18n
        if (data) {
          data.index = j;
          data.first = (j === 0);
          data.last  = (j === (context.length-1));
        }
        ret = ret + fn(context[j], { data: data });
      }
    } else {
            var keys = Object.keys(context);
            length=keys.length;
            for(j=length; j>=0;j--)
            {
                var key = keys[j-1]
                if(context.hasOwnProperty(key)) {
                    if(data) {
                        data.key = key;
                        data.value = context[key];
                        data.index = j;
                        data.first = (j === 0);
                      }
                      ret += fn(context[key], {data: data});
                }
            }
    }
  }

  if(length === 0){
    ret = inverse(this);
  }

  return ret;
} );
