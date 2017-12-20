$(document).ready(function(){
	/** 给轮播图上的菜单添加背景图 **/
	$('.m-bg-menu>li').each(function(index,el){
		$(el).css({
			'background':'url(./images/bannerIcon0' + index + '.png) no-repeat 15px 15px'
		})
	});

	/**sweier 轮播**/
	function bannerSwiper() {
		// 初始化
		var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal', // 水平
	    loop: true, // 无缝轮博
			autoplay : 3000, // 自动播放 3s
			// effect : 'fade',
			// simulateTouch : false,
			onlyExternal : true, // 禁止拖拽图片

	    pagination: '.swiper-pagination', // 分页

	    nextButton: '.swiper-button-next', // 下一张
	    prevButton: '.swiper-button-prev' // 上一张

	  })

		/** 鼠标移入停止自动轮播 **/
		$('.swiper-container,.swiper-pagination-bullet,m-bg-arrow>span').mouseenter(function() {
			mySwiper.stopAutoplay(); // 停止自动播放
		}).mouseleave(function() {
			mySwiper.startAutoplay(); // 开启自动播放
		});

		/** 鼠标点击跳转指定slide **/
		$('.swiper-pagination').on('click','span',function(){
			mySwiper.slideTo($(this).index()+1); // 指定跳转页(参数为:index(从0开始),speed,callback)
		})
	}

	/** 鼠标移入(移除)显示(隐藏)轮播菜单二级菜单 **/
	$('.m-bg-menu>li').hover(function() {
		$(this).find('div').css({
			'display':'block',
			'cursor' : 'default'
		});
	}, function() {
		$(this).find('div').css('display','none');
	});

	/** ajax动态创建轮播菜单二级菜单内容 **/
	$.ajax({
		url: 'http://10.0.156.234:8888/menu',
		type: 'get',
		dataType: 'json',
		success : function (data) {
			for (var inde in data) {
				var prop = data[inde];
				$('.m-bg-menu>li>h3')[inde].innerHTML = prop.title;
				var mainCity = prop.mainCity;
				for(var main of mainCity){
					$('<a></a>').attr('href','javascript:;').text(main).appendTo($('.m-bg-menu>li>p')[inde]);
				}
				var moreCity = prop.moreCity;
				for(var more of moreCity){
					var cityItems = more.items;
					var ddTag = $('<dd></dd>');
					$('<dl></dl>')
					.addClass('m-bg-menu-er-item')
					.append($('<dt></dt>')
					.text(more.cityName))
					.append(ddTag)
					.appendTo($('.m-bg-menu>li>div')[inde]);
					for (var itemsIndex in cityItems) {
						// for in 遍历变量为字符串类型,如需操作数字需转换类型
						var items = cityItems[itemsIndex];
						/** 判断特殊样式,特殊处理 **/
						if (more.cityName == '主题推荐') {
							$('<a></a>')
							.attr('href',items)
							.html('<img src="../images/theme_' + (parseInt(itemsIndex)+1) + '.png">').appendTo(ddTag);
						}else {
							/** 只取后台数据前15 (内容太多) **/
							if (itemsIndex < 15) {
								/** 随机上色(添加类) **/
								var color = itemsIndex % 3 == 0 ? 'cityListHot' : false;
								$('<a></a>')
								.attr({
									'href':'javascript:;',
									'class' : color
								})
								.text(items).appendTo(ddTag);
							}
						}
					}
				}
			}
		}
	});


	/** 动态添加轮播图 **/
	$.ajax({
		url : 'http://10.0.156.234:8888/banner',
		type : 'get',
		dataType : 'json',
		success : function(bannerImg){
			for (var url of bannerImg) {
				$('<div></div>')
				.addClass('swiper-slide')
				.append($('<a></a>')
				.attr('href',url.href)
				.append($('<img>')
				.attr('src',url.imgUrl)))
				.appendTo($('.swiper-wrapper'));
			}
			/** 调用sweiper插件 引入成功后启用 注意顺序 **/
			bannerSwiper();
		}
	})


	/** 动态获取后台数据,并展示 **/
	$.ajax({
		url : 'http://10.0.156.234:8888/freeWalk',
		type : 'get',
		dataType : 'json',
		success : function(fw){
			// 声明数组,并在下面利用jq特性.
			var cityArr = [];
			// 遍历数据并解析
			for (var fwIndex in fw) {
				var fwContent = fw[fwIndex];
				$($('#jijiu>ul>li>a')[fwIndex]).text(fwContent.title);
				var fwData = fwContent.data;
				for (var prop in fwData) {
						if (prop > 0) {
							// 每个数据第一个为大图信息 因此取每组0以后的数据,并存入数组
							cityArr.push(fwData[prop]);
						}
				}

				// 给每个选项卡添加第一个缩略图信息
				$($('.m-j-t')[fwIndex])
				.find('.m-baseItem-one>.m-baseShade>img')
				.attr('src', fwContent.data[0].imgUrl)
				.end()
				.find('.m-baseItem-one-p1 i')
				.text(fwContent.data[0].price)
				.end()
				.find('.m-baseItem-one-p2')
				.html(fwContent.data[0].title + '<br/>' + '<span>' + fwContent.data[0].time + '</span>');
			}


			// 遍历声明好的数组,利用JQ特性,获取所有的容器,拼接(也可动态创建)其余缩略图
			for (var prop in cityArr) {
					prop = parseInt(prop);
					var cityItems = cityArr[prop];
					$($('#m-jijiu .m-baseItem')[prop])
					.find('img')
					.attr('src', cityItems.imgUrl)
					.end()
					.find('.m-baseItem-div>span:eq(1)').html(cityItems.price + '<label>元起</label>')
					.end()
					.find('.m-baseItem-title>p').text(cityItems.title);
				}
			}
	})


	// $($('#m-jijiu .m-j-t')[num]).css('display','none');

	// 声明函数,进行选项卡轮播
	// var num = 0,
	// 		tiemr;
	// function next () {
	// 	num++
	// 	if (num > $('#jijiu>ul>li>a').length - 1) {
	// 		num = 0;
	// 	}
	//
	// 	$($('#m-jijiu .m-j-t')[num]).fadeIn(500).siblings().fadeOut(300);
	//
	// 	$($('#jijiu>ul>li>a')[num]).addClass('col-mainBase').parent().siblings().find('a').removeClass('col-mainBase');
	//
	// }

	/** 保留代码

	// timer = setInterval(function(){
	// 	next();
	// },3000);

 **/

 	// 鼠标移入改变选项卡内容
	$('#jijiu>ul>li>a').mouseenter(function() {
		// clearInterval(timer);
		// 为自身添加class通过父节点找到其父节点的兄弟元素li并找到'a',将其class移除
		$(this).addClass('col-mainBase').parent().siblings().find('a').removeClass('col-mainBase');
		// 阻止快速切换选项卡造成的bug
		$('#m-jijiu .m-j-t').stop(true,true);
		// num = $(this).parent().index();
		// 找到对应的父元素下标,将其显示,并将其兄弟节点隐藏
		$($('#m-jijiu .m-j-t')[$(this).parent().index()]).fadeIn(500).siblings().fadeOut(300);
	})


	// }).mouseleave(function() {
	// 	/*
	// 	// 保留
	// 	// clearInterval(timer);
	// 	// timer = setInterval(function(){
	// 	// 	next();
	// 	// },3000);
	// 	 */
	// });;


	// $('#m-jijiu .wrap').mouseenter(function() {
	// 	// clearInterval(timer);
	// }).mouseleave(function() {
	// 	// clearInterval(timer);
	// 	// timer = setInterval(function(){
	// 	// 	next();
	// 	// },3000);
	// });;


})
