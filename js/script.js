(function () {
  /*==================================================*\
          Variables
  \*==================================================*/
  // Constant
  var STD_DURATION = 300;





  /*==================================================*\
          Includes Build
  \*==================================================*/
  var includesLoader = {
    /*==================== Properties ====================*/
    /***** Settings *****/
    root: './includes/',
    defaultType: '.html',
    // 下載完畢後要進入的正式 Function 名稱
    callbackFunc: mainFunc,
    loadingDOMName: '.page-loading',
    includesList: [
      {
        target: 'header',
        fileName: '_page-header',
        // type: '.html',  //  除非和 Default值 不同，不然不用寫
        callback: function() {}
      },
      {
        target: 'footer',
        fileName: '_page-footer',
        // type: '.html',  //  除非和 Default值 不同，不然不用寫
        callback: function() {}
      }
    ],

    /***** System Property (請勿隨意更動)) *****/
    LIST_LEN: -1,
    COUNTER: 0,



    /*==================== Methods ====================*/
    init: function() {
      console.log('%cIncludes Start Loading...', logInfoStyle);
      includesLoader.LIST_LEN = includesLoader.includesList.length;

      if(!(includesLoader.COUNTER < includesLoader.LIST_LEN)) return;
      includesLoader.loadingIncludes();
    },

    getFullPath: function(fileName, type) {
      var type = type || includesLoader.defaultType
      var fullPath = includesLoader.root + fileName + type;
      return fullPath;
    },

    loadingIncludes: function() {
      var nowObj = includesLoader.includesList[includesLoader.COUNTER];
      var target = nowObj.target;
      var fullPath = includesLoader.getFullPath(nowObj.fileName);
      var callback = nowObj.callback;

      $(target).load(fullPath, function() {
        callback();

        console.log('%c' + nowObj.fileName + (nowObj.type || includesLoader.defaultType) + ' Completed', logSafeStyle);
        
        // 遞迴
        includesLoader.COUNTER += 1;
        includesLoader.COUNTER < includesLoader.LIST_LEN ? 
          includesLoader.loadingIncludes() : 
          includesLoader.ending();
      });
    },

    ending: function() {
      $body.imagesLoaded({
        background: true
      })
      .always(function() {
        // Remove Loading Layer
        $(includesLoader.loadingDOMName).fadeOut(STD_DURATION, function () {
          $(this).remove();
        });

        includesLoader.callbackFunc();
      }) // Go Main Function
      // .fail(function () {
      //   console.log('%cSome Images is broken...', logErrorStyle);
      // })
      // .progress(function (instance) {
      //   imgProgressNum++;
      //   console.log('%c' + imgProgressNum + '/' + instance.elements.length, logInfoStyle);
      // });
    }
  };

  // 開始下載 Includes
  includesLoader.init();

  





  /*==================================================*\
          Main Function
  \*==================================================*/
  function mainFunc() {
    /*========== Initialization ==========*/
    console.log('%cBuild Completed!', logSafeStyle);
    // Window Resize
    $win.on('resize', _resize).resize();
    // Window Scroll
    $win.on('scroll', _scroll).scroll();

    /* Start Coding Here */
  }





  /*==================================================*\
          $Library
  \*==================================================*/
  /*========== Window Resize ==========*/
  function _resize() {
    getSize();
  }

  function getSize() {
    winW = $win.width();
    winH = $win.height();
  }

  /*========== Window Scroll ==========*/
  function _scroll() {
    
  }
})();