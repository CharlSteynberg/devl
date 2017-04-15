
// exec :: dbug : preserve scope
// ----------------------------------------------------------------------------------------------------------------------------
   (function(fail)
   {
   // cond :: Role : only test browser
   // -------------------------------------------------------------------------------------------------------------------------
      if (Proc.Role != 'GUI')
      { return; }
   // -------------------------------------------------------------------------------------------------------------------------



   // shim :: getUserMedia
   // -------------------------------------------------------------------------------------------------------------------------
      navigator.getUserMedia = // cond
      (
         navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia ||
         navigator.msGetUserMedia
      );
   // -------------------------------------------------------------------------------------------------------------------------


   // shim :: AudioContext
   // -------------------------------------------------------------------------------------------------------------------------
      window.AudioContext = // cond
      (
         window.AudioContext ||
         window.webkitAudioContext ||
         window.mozAudioContext
         window.msAudioContext
      );
   // -------------------------------------------------------------------------------------------------------------------------



   // exec :: test : return undefined if pass -else- text is what failed
   // -------------------------------------------------------------------------------------------------------------------------
      fail = (function(temp,list)
      {
      // cond :: test : JavaScript & DOM
      // ----------------------------------------------------------------------------------------------------------------------
         if
         (
            this ||                                   // strict-mode support
            (typeof Main.onerror === 'undefined') ||  // global error handling
            (typeof arguments === 'undefined') ||     // function standard
            (typeof parent === 'undefined') ||        // dom traversal
            !Main.atob || !Main.btoa ||               // base64 support
            !Main.XMLHttpRequest ||                   // XHR support
            !Main.getComputedStyle                    // live view support
            !Proc.addEventListener ||                 // event listener support
            !Object.defineProperties ||               // extension support
            !window.Blob ||                           // es5 standard
            !Object.freeze ||                         // es5 standard
            !Function.prototype.bind ||               // es5 standard
            !Array.prototype.forEach ||               // es5 standard
            !String.prototype.trim ||                 // es5 standard
         )
         { return 'JavaScript'; }
      // ----------------------------------------------------------------------------------------------------------------------


      // cond :: CSS
      // ----------------------------------------------------------------------------------------------------------------------
         temp = document.createElement('div');
         list = ['borderRadius','backgroundSize','boxShadow','boxSizing','textOverflow','transition'];

         for (var i in list)
         {
            if (!list.hasOwnProperty(i)){ continue; }
            if (!(list[i] in temp.style))
            { return 'CSS'; }
         }

         document.body.appendChild(temp);
         temp.setAttribute('style','display:position:absolute; width:0%; width:50vw; opacity:0');

         if ((getComputedStyle(temp).width.split('px')[0] *1) < 10)
         { return 'CSS'; }

         temp.parentNode.removeChild(temp);
         temp=null; list=null;
      // ----------------------------------------------------------------------------------------------------------------------


      // cond :: MultiMedia
      // ----------------------------------------------------------------------------------------------------------------------
         temp = document.createElement('canvas');
         temp = (temp.getContext('webgl') || temp.getContext('experimental-webgl'));

         if
         (
            (!temp || !navigator.getUserMedia || !window.WebGLRenderingContext || !(temp instanceof WebGLRenderingContext)) ||
            (!window.AudioContext || !window.File || !window.FileReader || !temp) ||
            (!('draggable' in temp) || !(('ondragstart' in temp) && ('ondrop' in temp)))
         )
         { return 'MultiMedia'; }
      // ----------------------------------------------------------------------------------------------------------------------
      });
   // -------------------------------------------------------------------------------------------------------------------------



   // cond :: fail : if GUI platform is unacceptable
   // -------------------------------------------------------------------------------------------------------------------------
      alert('old browser - TODO :: handle this!');
   // -------------------------------------------------------------------------------------------------------------------------
   });
// ----------------------------------------------------------------------------------------------------------------------------
