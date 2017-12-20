$(document).ready(function() {
  // 获取模板数据,并拼接,图片懒加载
  $.ajax({
    url: 'http://10.0.156.234:8888/cityWalkList',
    type: 'get',
    dataType: 'json',
    success : function (list) {
      for (var inde in list) {
          inde = parseInt(inde);
          var prop = list[inde];
          $($('.banner-item')[inde])
          .find('img')
          .attr('data-original',prop.imgurl)
          .lazyload({
            effect : 'fadeIn',
            threshold : 200
          })
          .end()
          .find('.b-item-right>h2').text(prop.title)
          .end()
          .find('.b-item-city').text(prop.address)
          .end()
          .find('.b-item-kan>i').text(prop.browseCount)
          .end()
          .find('.b-item-shou>i').text(prop.soldCount)
          .end()
          .find('.b-item-h4-p-linth').text(prop.oldPrice)
          .end()
          .find('.b-item-h4-p>i').text(prop.newPrice + '元起')
          .end()
          .find('h4 p:eq(0)').text(prop.introduce[0])
          .end()
          .find('h4 p:eq(1)').text(prop.introduce[1])
          .end()
          .find('.b-item-h4-p-span').text(prop.introduce[2]);
      }
    }
  })


});
