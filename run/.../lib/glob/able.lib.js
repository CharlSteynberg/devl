
// glob :: Main : conf
// ----------------------------------------------------------------------------------------------------------------------------
   "use strict";

   if (typeof window == 'undefined')
   {
      global.Proc = process;  Proc.Role = (process.stdout.isTTY ? 'CLI' : 'API');
      global.Main = global;
   }
   else
   {
      window.Proc = document; Proc.Role = 'GUI';
      window.Main = window;
   }

   Main.VOID = (function(){}()); // undefined   #paranoia ;)
   Proc.HALT = false;
// ----------------------------------------------------------------------------------------------------------------------------





// glob :: func : Exit
// ----------------------------------------------------------------------------------------------------------------------------
   Main.Exit = function(code)
   {
      Proc.Halt = true; // to be checked in async routines

      if (Proc.Role != 'GUI')
      {
         Proc.exit(code);
         return;
      }


      Main.onerror = function()
      {
         return true; // silence
      };

      var list = Proc.getElementsByTagName('script');

      for (var i in list)
      {
         if (!list[i] || !list[i].nodeName){ continue; }
         list[i].parentNode.removeChild(list[i]);
      }

      throw new UserException(code);
   };
// ----------------------------------------------------------------------------------------------------------------------------





// glob :: func : dataType - shim
// ----------------------------------------------------------------------------------------------------------------------------
   Main.dataType = function(data)
   {
      var type = (Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase());

      if (['undefined','null'].indexOf(type) > -1)
      { return type; }

      if ((Main.Blob && (data instanceof Blob)) || ((type == 'string') && /[\x00-\x08\x0E-\x1F\x80-\xFF]/.test(data)))
      { return 'binary'; }

      if (!data.__proto__  || ((type != 'object') && (type != 'arguments') && !data.__proto__.__proto__))
      { return ('proto-'+type); }

      if ((type == 'global') || (type == 'window'))
      { return 'supreme'; }

      if (type.indexOf('element') > -1)
      { return 'element'; }

      if (type.indexOf('collection') > -1)
      { return 'nodelist'; }

      return type;
   }
// ----------------------------------------------------------------------------------------------------------------------------
