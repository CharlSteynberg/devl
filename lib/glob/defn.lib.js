

// glob :: func : Extend - extends any extensibles
// ----------------------------------------------------------------------------------------------------------------------------
   Object.defineProperty(Main,'Extend',
   {
      writable:false,
      enumerable:false,
      configurable:false,

      value:function()
      {
      // args :: lexical scope inheritance in return closure below
      // ----------------------------------------------------------------------------------------------------------------------
         var args = [].slice.call(arguments);
         var glob = ((dataType(args[0]) === 'supreme') ? true : false);
      // ----------------------------------------------------------------------------------------------------------------------



      // echo :: func : to call with object
      // ----------------------------------------------------------------------------------------------------------------------
         return function(defn)
         {
         // dbug :: must be object
         // -------------------------------------------------------------------------------------------------------------------
            if (dataType(defn) != 'object'){ throw 'expecting dataType: `object`'; }
         // -------------------------------------------------------------------------------------------------------------------


         // each :: defn : item
         // -------------------------------------------------------------------------------------------------------------------
            for (var item in defn)
            {
            // vars :: local : skip irrelevant
            // ----------------------------------------------------------------------------------------------------------------
               var name,tpof,name,spec,meta;

               if (!defn.hasOwnProperty(item)){ continue; }

               name = item;
               item = defn[item];
               tpof = dataType(item);
               spec = {};
               meta =
               {
                  AS:VOID,
                  ON:{get:VOID, set:VOID},
                  IS:{writable:false, enumerable:false, configurable:false}
               };
            // ----------------------------------------------------------------------------------------------------------------


            // make :: extension object from defaults
            // ----------------------------------------------------------------------------------------------------------------
               if (((tpof!='object') && (tpof!='function')) || (!item.AS && !item.ON && !item.IS))
               { meta.AS=item;  item=meta; }
            // ----------------------------------------------------------------------------------------------------------------


            // ----------------------------------------------------------------------------------------------------------------
               for (var i in meta)
               {
                  if (!meta.hasOwnProperty(i)){ continue; }
                  if (!(i in item)){ item[i] = meta[i]; }
                  if (i == 'AS'){ spec.value=item[i]; continue; }

                  for (var o in meta[i])
                  {
                     if (!(o in item[i])){ item[i][o] = meta[i][o]; }
                     if (item[i][o] !== VOID){ spec[o] = item[i][o]; }
                  }
               }
            // ----------------------------------------------------------------------------------------------------------------


            // ----------------------------------------------------------------------------------------------------------------
               if (spec.set || spec.get){ delete(spec.value); delete(spec.writable); }
               if (glob){ Defined[Defined.length] = name; }

               args.forEach(function(argv)
               { Object.defineProperty(argv,name,spec); });
            // ----------------------------------------------------------------------------------------------------------------
            }
         // -------------------------------------------------------------------------------------------------------------------
         };
      // ----------------------------------------------------------------------------------------------------------------------
      }
   });
// ----------------------------------------------------------------------------------------------------------------------------





// glob :: func : Define - global entities
// ----------------------------------------------------------------------------------------------------------------------------
   Extend(Main)
   ({
      Define:function(Defn)
      {
         var type = dataType(Defn);

         if ((type != 'object') && (type != 'string'))
         { throw 'expecting dataType: `object` -or- `string`'; }


         if (type == 'object')
         {
            Extend(Main)(Defn);
            return true;
         }

         if (type == 'string')
         {
            return function(defn)
            {
               var temp = {};
               temp[this.Name] = defn;
               Extend(Main)(temp);
               return true;
            }
            .bind({Name:Defn});
         }

         return;
      },
   });
// ----------------------------------------------------------------------------------------------------------------------------





// glob :: word : list - define global constants
// ----------------------------------------------------------------------------------------------------------------------------
   Define
   ({
      VOID:(function(){}()),

      FALS:false,
      NONE:null,
      TRUE:true,

      AUTO:'⋖AUTO⋗',
      DROP:'⋖DROP⋗',
      DUPL:'⋖DUPL⋗',
      HASH:'⋖HASH⋗',

      UPPR:'⋖UPPR⋗',
      LOWR:'⋖LOWR⋗',
      CAML:'⋖CAML⋗',
      LABL:'⋖LABL⋗',

      NEXT:'⋖NEXT⋗',
      SKIP:'⋖SKIP⋗',
      STOP:'⋖STOP⋗',
      DONE:'⋖DONE⋗',

      KEYS:'⋖KEYS⋗',
      VALS:'⋖VALS⋗',

      BFOR:'⋖BFOR⋗',
      AFTR:'⋖AFTR⋗',
      EVRY:'⋖EVRY⋗',
      UNTL:'⋖UNTL⋗',
      EVNT:'⋖UNTL⋗',

      EVEN:'⋖EVEN⋗',
      ODDS:'⋖ODDS⋗',

      PULL:'⋖PULL⋗',
      PUSH:'⋖PUSH⋗',
   });
// ----------------------------------------------------------------------------------------------------------------------------
