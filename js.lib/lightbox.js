var lightbox = {
  /*==================== Properties ====================*/
  /***** Settings *****/
  DURATION: 300,  // 過渡動畫時間
  folderPath: './includes/lightboxes/',  // 存放 Lightbox 內容物的資料夾
  contentType: '.html',  // 內容物的附檔名

  /***** System Property (請勿隨意更動)) *****/
  contentName: '',  // 內容物名稱 (不含附檔名))
  contentPath: '',  // 內容物完整路徑
  // Lightbox 樣板
  lbTemplate: '<div class="lightbox">' +
    '<div class="lb-container">' +
    '<div class="lb-content"></div>' +
    '<div class="lb-close-btn"></div>' +
    '</div>' +
    '<div class="lb-loading"><svg><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml"attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>' +
    '</div>',



  /*==================== Methods ====================*/
  // 初始化: 請於所有組件下載完畢後再呼叫
  init: function () {
    // 如果找不到開啟 lightbox 相關按鈕則取消初始化
    if(!$('.js-lb').length) {
      console.log('無 Lightbox 相關按鈕');
      return false;
    }

    $('.js-lb').on('click', function () {
      lightbox.getContentPath($(this));
      lightbox.renderLbWrap();
      lightbox.loadContent();
    });
  },

  getContentPath: function (clickBtnEl) {
    lightbox.contentName = clickBtnEl.data('lb');
    lightbox.contentPath = lightbox.folderPath + lightbox.contentName + lightbox.contentType;
  },

  renderLbWrap: function () {
    $('body').append(lightbox.lbTemplate);

    setTimeout(function () {
      $('.lightbox').css({
        opacity: 1
      });
    }, 0);

    $(window).on('wheel.impair', function () {
      return false;
    });

    $('.lightbox, .closeLbBtn').on('click', lightbox.closeLightbox);
    $('.lbContainer').on('click', function (evt) {
      evt.stopPropagation();
    });
  },

  loadContent: function () {
    $('.lbContent').load(lightbox.contentPath, function () {
      $('.lbContent img')
        .imagesLoaded({
          background: true
        })
        .always(lightbox.contentCallback);
    });
  },

  contentCallback: function () {
    debugger
    $('.lbContent, .closeLbBtn')
      .stop()
      .fadeIn(lightbox.DURATION, function () {
        $('.lbLoading').remove();
        console.log('Lightbox 開啟完畢');
      });
  },

  closeLightbox: function () {
    $('.lightbox').css({
      opacity: 0
    });
    setTimeout(function () {
      $('.lightbox').remove();
      console.log('Lightbox 已關閉');
    }, lightbox.DURATION);
    $(window).off('wheel.impair');
  }
}