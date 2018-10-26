// $('.tab').on('click', function () {
//     var idx = $(this).index('.tab')
//     $('section').hide().eq(idx).fadeIn()
//     $(this).addClass('active').siblings().removeClass('active')
// })


// var index = 0
// var isLoading = false
// start()

// function start(){
//   if (isLoading) return
//   isLoading = true
//   $('.loading').show()
//   $.ajax({
//     url: 'http://api.douban.com/v2/movie/top250',
//     type: 'GET',
//     data: {
//       start: index,
//       count: 20
//     },
//     dataType: 'jsonp',
//     jsonp: 'callback',
//   }).done(function (data) {
//     setData(data.subjects)
//     console.log(data)
//   }).fail(function(){
//     console.log('err')
//   }).always(function () {
//     isLoading = false
//     $('loading').hide()
//   })
// }
// function setData(d){
//     d.forEach(function (item) {
//         index++
//         var castsName = '';
//         item.casts.forEach(function (cast) {
//             castsName += cast.name + ' ';
//         })
//         var directorsName = '';
//         item.directors.forEach(function (director) {
//             directorsName += director.name + ' ';
//         })
//         var str = `
//           <li class='item'>
//             <a href="#" class='clearfix alt'>
//             <div class='pic'>
//               <span class='rank'>排名</span>
//               <img src="#" alt=" " style='width: 100px'>
//             </div>
//             <div class='info'>
//               <div class='info-hd'>
//                 <p>片名</p>
//               </div>
//               <div class='info-bd'>
//                 <p class='director'>导演</p>
//                 <p class='cast'>主演</p>
//                 <p class='genre'>题材</p>
//                 <p class='rating'>评分</p>
//                 <span class='year'>年份</span>
//               </div>
//             </div>
//           </a>
//         </li>  
//         `
//         var $node = $(str)
//         $node.find('.pic img').attr('src', item.images.small)
//         $node.find('.rank').text(index)
//         $node.find('.info-hd p').text(item.title)
//         $node.find('.director').text('导演: ' + directorsName)
//         $node.find('.cast').text('主演: ' + castsName)
//         $node.find('.genre').text('题材: ' + item.genres.join(' '))
//         $node.find('.rating').text(item.rating.average + '分')
//         $node.find('.year').text(item.year + '年')
//         $node.find('.alt').attr('href', item.alt)
//         $('.item-wrap').append($node)
//     })
// }
// var clock
// $('main').scroll(function(){
//   if (clock) {
//     clearTimeout(clock)   
//   }
//   clock = setTimeout(function(){
//     if ($('main').height() + $('main').scrollTop() + 10 >= $('section').eq(0).height()) {
//       start()
//     }
//   },300)
// })



var app = {
  init: function () {
    this.$tab = $('.tab')
    this.$section = $('section')
    this.bind()
    top250.init()
    NA.init()
    search.init()
  },
  bind: function () {
    var _this = this
    this.$tab.on('click', function () {
      var idx = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      _this.$section.hide().eq(idx).fadeIn()
    })
  }
}

var top250 = {
  init: function () {
    this.index = 0
    this.bind()
    this.start()
    this.isLoading = false
  },
  bind: function () {
    var _this = this
    var clock
    $('main').scroll(function () {
      if (clock) {
        clearTimeout(clock)
      }
      clock = setTimeout(function () {
        if ($('main').height() + $('main').scrollTop() + 90 >= $('section').eq(0).height()) {
          _this.start()
        }
      }, 300)
    })
  },
  start: function () {
    var _this = this
    if (_this.isLoading) return
    _this.isLoading = true
    $('.loading').show()
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      type: 'GET',
      data: {
        start: this.index,
        count: 20
      },
      dataType: 'jsonp',
      jsonp: 'callback',
    }).done(function (data) {
      callback(data)
    }).fail(function () {
      console.log('err')
    }).always(function () {
      _this.isLoading = false
      $('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (item) {
      _this.index++
      var castsName = '';
      item.casts.forEach(function (cast) {
        castsName += cast.name + ' ';
      })
      var directorsName = '';
      item.directors.forEach(function (director) {
        directorsName += director.name + ' ';
      })
      var str = `
          <li class='item'>
            <a href="#" class='clearfix alt'>
            <div class='pic'>
              <span class='rank'>排名</span>
              <img src="#" alt=" " style='width: 100px'>
            </div>
            <div class='info'>
              <div class='info-hd'>
                <p>片名</p>
              </div>
              <div class='info-bd'>
                <p class='director'>导演</p>
                <p class='cast'>主演</p>
                <p class='genre'>题材</p>
                <p class='rating'>评分</p>
                <span class='year'>年份</span>
              </div>
            </div>
          </a>
        </li>  
        `
      var $node = $(str)
      $node.find('.pic img').attr('src', item.images.small)
      $node.find('.rank').text(_this.index)
      $node.find('.info-hd p').text(item.title)
      $node.find('.director').text('导演: ' + directorsName)
      $node.find('.cast').text('主演: ' + castsName)
      $node.find('.genre').text('题材: ' + item.genres.join(' '))
      $node.find('.rating').text(item.rating.average + '分')
      $node.find('.year').text(item.year + '年')
      $node.find('.alt').attr('href', item.alt)
      $('.top250 .item-wrap').append($node)
    })
  }

}

var NA = {
  init: function () {
    this.bind()
    this.start()
  },
  bind: function () {
    var _this = this
    $('.tab').eq(1).click(function () {
      _this.start()
    })
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    $.ajax({
      url: 'http://api.douban.com/v2/movie/us_box',
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
    }).done(function (data) {
      callback(data)
    }).fail(function () {
      console.log('err')
    })
  },
  render: function (data) {
    $('.na .item').remove()
    var _this = this
    data.subjects.forEach(function (item) {
      var castsName = '';
      item.subject.casts.forEach(function (cast) {
        castsName += cast.name + ' ';
      })
      var directorsName = '';
      item.subject.directors.forEach(function (director) {
        directorsName += director.name + ' ';
      })
      var str = `
          <li class='item'>
            <a href="#" class='clearfix alt'>
            <div class='pic'>
              <span class='rank'>排名</span>
              <img src="#" alt=" " style='width: 100px'>
            </div>
            <div class='info'>
              <div class='info-hd'>
                <p>片名</p>
              </div>
              <div class='info-bd'>
                <p class='director'>导演</p>
                <p class='cast'>主演</p>
                <p class='genre'>题材</p>
                <p class='rating'>评分</p>
                <span class='year'>年份</span>
              </div>
            </div>
          </a>
        </li>  
        `
      var $node = $(str)
      $node.find('.pic img').attr('src', item.subject.images.small)
      $node.find('.rank').text(item.rank)
      $node.find('.info-hd p').text(item.subject.title)
      $node.find('.director').text('导演: ' + directorsName)
      $node.find('.cast').text('主演: ' + castsName)
      $node.find('.genre').text('题材: ' + item.subject.genres.join(' '))
      $node.find('.rating').text(item.subject.rating.average + '分')
      $node.find('.year').text(item.subject.year + '年')
      $node.find('.alt').attr('href', item.subject.alt)
      $('.na .item-wrap').append($node)
    })
  }
}

var search = {
  init: function () {
    var str
    var clock
    var index = 0
    var isloading = false
    this.bind()
  },
  bind: function () {
    var _this = this
    $('main').scroll(function () {
      if (_this.clock) {
        clearTimeout(_this.clock)
      }
      _this.clock = setTimeout(function () {
        if ($('main').height() + $('main').scrollTop() === $('.search').height()) {
          _this.start()
        }
      }, 300)
    })
    $('#search').click(function () {
      _this.index = 0
      $('.search .item').remove()
      _this.start()
    })
  },
  start: function () {
    var _this = this
    _this.str = $('.search-wrap input').val()
    _this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return
    _this.isloading = true
    $('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/search',
      data: {
        q: _this.str,
        start: _this.index,
        count: 20
      },
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
    }).done(function (data) {
      callback(data)
    }).fail(function () {
      console.log('err')
    }).always(function () {
      _this.isLoading = false
      $('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (item) {
      _this.index++
      var castsName = '';
      item.casts.forEach(function (cast) {
        castsName += cast.name + ' ';
      })
      var directorsName = '';
      item.directors.forEach(function (director) {
        directorsName += director.name + ' ';
      })
      var str = `
          <li class='item'>
            <a href="#" class='clearfix alt'>
            <div class='pic'>
              <span class='rank'>排名</span>
              <img src="#" alt=" " style='width: 100px'>
            </div>
            <div class='info'>
              <div class='info-hd'>
                <p>片名</p>
              </div>
              <div class='info-bd'>
                <p class='director'>导演</p>
                <p class='cast'>主演</p>
                <p class='genre'>题材</p>
                <p class='rating'>评分</p>
                <span class='year'>年份</span>
              </div>
            </div>
          </a>
        </li>  
        `
      var $node = $(str)
      $node.find('.pic img').attr('src', item.images.small)
      $node.find('.rank').text(_this.index)
      $node.find('.info-hd p').text(item.title)
      $node.find('.director').text('导演: ' + directorsName)
      $node.find('.cast').text('主演: ' + castsName)
      $node.find('.genre').text('题材: ' + item.genres.join(' '))
      $node.find('.rating').text(item.rating.average + '分')
      $node.find('.year').text(item.year + '年')
      $node.find('.alt').attr('href', item.alt)
      $('.search .item-wrap').append($node)
    })
  }
}

app.init()