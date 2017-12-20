    $(document).ready(function() {
      // 加载头部页面
      $('.header').load('../index/html/header.html',function(){
        var tt;

        // 右上角搜索菜单隐藏、显示、点击动画(有bug)
        function hided(){
          $('.h-s-fangda').prev().css('display','none');
          clearInterval(tt);
          $('.h-s-fangda').parent().stop(true,true);
          tt = setInterval(function(){
            if ($('.h-s-fangda').parent().width() > 0) {
              if (!$('.h-s-fangda').parent().is(':animated')) {
                $('.h-s-fangda').parent().animate({
                  width : '-=20px',
                },13)
              }
            }else {
              $('.h-s-fangda').parent().stop(true,true).width(0);
              clearInterval(tt);
            }
          },13);
        }

        function showed(){
            $('.h-s-fangda').parent().stop(true,true);
            clearInterval(tt);
            if (event.target.id == 'span') {
              tt = setInterval(function(){
                if ($('.h-s-fangda').parent().width() < 200) {
                  if (!$('.h-s-fangda').parent().is(':animated')) {
                    $('.h-s-fangda').parent().animate({
                      width : '+=20px',
                    },13)
                  }
                }else {
                  $('.h-s-fangda').parent().width(200);
                  $('.h-s-fangda').prev().css('display','block');
                  clearInterval(tt);
                }
              },13)
            }else if (event.currentTarget.id == 'div') {
              $('.h-s-fangda').parent().stop(true,true);
              clearInterval(tt);
              $('.h-s-fangda').parent().width(200);
              $('.h-s-fangda').prev().css('display','block');
            }
        }
        $('.header-search').mouseenter(function(event) {
          if (!$('#input').is(':focus')) {
            $('.header-search').on('mouseleave',hided);
          }
          showed();
        }).mouseleave(hided);
        $('#input').focus(function() {
          $('.header-search').off('mouseleave');
          clearInterval(tt);
          $('.h-s-fangda').parent().width(200);
          $('.h-s-fangda').prev().css('display','block');
        }).blur(hided);

        //


        // 显示隐藏 头部导航二级菜单
        $('.nav-span-shequ > li:eq(0)').hover(function() {
          $('.s-l-div').stop(true,true);
          if (!$('.s-l-div').is(':animated')) {
            $('.s-l-div').show(450);
          }
        },function(){
          $('.s-l-div').stop(true,true);
          if (!$('.s-l-div').is(':animated')) {
            $('.s-l-div').delay(1000).hide(1000);
          }
        });

        // 显示隐藏头部导航三级菜单
        $('.h-n-leftMenu>li').hover(function() {
          $('.h-n-leftMenu>li').each(function(index, el) {
            $(el).eq(index).siblings().find('ul,.nav-span-shequS').css('display', 'none');
          });
          $(this).find('ul,.nav-span-shequS').stop(true,true);
          if (!$(this).find('ul,.nav-span-shequS').is(':animated')) {
            $(this).find('ul,.nav-span-shequS').fadeIn(1000);
          }
        }, function() {
          $(this).find('ul,.nav-span-shequS').stop(true,true);
          if (!$(this).find('ul,.nav-span-shequS').is(':animated')) {
            $(this).find('ul,.nav-span-shequS').delay(1000).fadeOut(1);
          }
        });

        // 侧边栏显示 隐藏 停止的判定
        $(window).scroll(function() {
          if ($(this).scrollTop() > $(this).innerHeight() / 2 ) {
              $('.header-nav-meun').stop(true);
              $('.header-nav-meun').fadeIn(300);
          }else {
              $('.header-nav-meun').stop(true);
              $('.header-nav-meun').fadeOut(300);
          }
          if ($(document).scrollTop() >= 2850) {
            $('.header-nav-meun').css({
              'position':'absolute',
              'top':3050
            });
          }else {
            $('.header-nav-meun').css({
              'position':'fixed',
              'top':200
            });
          }

          if ($(document).scrollTop() >= $(window).height()) {
            $('.header-nav-meun>span').css('display', 'block');
          }else {
            $('.header-nav-meun>span').css('display', 'none');
          }

        });


        // 返回顶部按钮的动画处理
        var timer,
            startTime,
            time = 5*1000,
            per,
            top;
        $('.header-nav-meun>span').click(function() {
          stratTime = new Date();
          clearInterval(timer);
          top = $(window).scrollTop();
          timer = setInterval(function(){
            var nowTime = new Date();
            per = Math.min(0.155,(nowTime - stratTime) / time);
            console.log(per);
            $(window).scrollTop(top);
            if (per >= 0.155) {
              clearInterval(timer);
            }else {
              top =top -  per * top;
              $(window).scrollTop(top);
            }
          },13);
        });


        // 搜索下拉列表的显示与隐藏
        $(document).click(function(event) {
          if (event.target.id == 'search') {
            $('.hotSearch').css('display','block');
          }else {
            $('.hotSearch').css('display','none');
          }
        });

        // 搜索判断,
        $('#search').keyup(function(e) {
          // 38 向上 40 向下
          // 如果按下 向上或向下 结束 进行下部份操作
          if (e.keyCode == 38 || e.keyCode == 40) {
    				return;
    			}
          var $text = $('#search').val();
          // 请求数据,并展示
          $.getJSON('http://restapi.amap.com/v3/assistant/inputtips?s=rsv3&key=fceb9f8df9c557673d762dc3b9a5ca6c&city=%E5%8C%97%E4%BA%AC&callback=?&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Fbang.360.cn%2F&csid=DF4A0BE5-7971-4936-8B49-12C343FB4163&keywords='+$text,function(data) {
            // 当输入框有值时,隐藏默认
              if ($text) {
                $('.hotSearch>.hot').css('display','none');
              }else {
                $('.hotSearch>.hot').css('display','block');
              }
            // 每次判定前清空内容
              $('.searchCount').empty();
              for (var prop of data.tips) {
                  $('<li></li>')
                  .append($('<a href="javascript:;"></a>')
                  .append($('<span></span>').text(prop.name))
                  .append($('<em></em>').text(prop.address)))
                  .appendTo('.searchCount')
              }

              // 声明 向下变量 与 向上变量
              var nextIndex = -1,
                  prevIndex;
              $(document).keyup(function(event) {
                // 判断向下按钮
                if (event.keyCode == 40) {
                  nextIndex++;
                  prevIndex = nextIndex; // 记录当前next索引 按下向上键时,进行索引操作
                  // 获取数组
                  var $searchList = $('.searchCount>li');
                  // 如果索引大于等于数组长度,则重置为0
                  if (nextIndex >= $searchList.length) {
                    nextIndex = 0;
                  }
                  // 找到当前所选择信息,改变其样式,并清空其它信息样式
                  $($searchList[nextIndex]).find('a,span').addClass('searchText-Chace').end().siblings().find('a,span').removeClass('searchText-Chace');
                  // 将当前信息赋予搜索框
                  var newText = $($searchList[nextIndex]).find('span').text();
                  $('#search').val(newText);
                }
                if (event.keyCode == 38) {
                  // 启用记录好的向下变量,进行操作
                  prevIndex--;
                  // 记录向上变量
                  nextIndex = prevIndex;
                  var $searchList = $('.searchCount>li');
                  if (prevIndex < 0) {
                    prevIndex = $searchList.length - 1 ;
                  }
                  $($searchList[prevIndex]).find('a,span').addClass('searchText-Chace').end().siblings().find('a,span').removeClass('searchText-Chace');
                  var newText = $($searchList[prevIndex]).find('span').text();
                  $('#search').val(newText);
                }
              });
          });
        });


        // 自定html内容 用来区分当前处于哪个页面
        try {
          // 如果成功则 讲 cityWalk的页面选项激活
          if (document.getElementById('cityWalk').innerHTML) {
            $('.active>a').addClass('cityWalk-bgColor-nav');
          }
        } catch (err) {
          // 如果报错,则认为当前处于首页
          return  console.warn(err);
        }
      });
      // 加载footer页面
      $('.footer').load('../index/html/footer.html');
    });
