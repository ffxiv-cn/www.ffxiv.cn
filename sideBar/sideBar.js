(function () {

  // 打开页面的时候初始化一次，不需要实时刷新，接口请求成功再渲染html
  var timer = null            // DOM渲染监听定时器
  var SideBar = function (option) {
    this.option = option || new Object()

    this.value = 0 // 这个直接用作百分比
    this.title = '';
    this.descHtml = '';
    this.startTime = '';
    this.endTime = '';
    this.isActive = true;
    this.total = 0;
    this.el = document.getElementById(option.id || '')

    this.getVal();
  }

  // 插件DOM渲染监听
  function listenDom() {
    if (document && document.getElementById('wrap')) {
      if (document.body.clientWidth <= 768) {
        document.getElementById('wrap').classList.remove('is-pc-wrap')
      } else {
        var flag = 0
        for (i = 0; i < document.getElementById('wrap').classList.length; i++) {
          if (document.getElementById('wrap').classList[i] === 'is-pc-wrap') {
            flag = 1
            break
          }
        }
        !flag && document.getElementById('wrap').classList.add('is-pc-wrap')
      }
      if (timer) {
        clearTimeout(timer)
      }
    } else {
      timer = setTimeout(listenDom, 100)
    }
  }

  window.onresize = function () {
    var resizeTimer = null
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(function () {
      listenDom()
    }, 400)
  }

  function formatData(date) {
    var d = new Date(date);
    var month = d.getMonth() + 1;
    return d.getFullYear() + '-' + month + '-' + d.getDate();
  }

  SideBar.prototype = {
    init: function () {
      // console.dir(this.option)
      var appendHtml = [
        '<div class="d-side-bar__layer isHide" id="layer" onclick="SideBar.prototype.close()"></div>',
        '<div class="d-side-bar__wrap is-pc-wrap" id="wrap">',
        '<div class="d-side-bar__tag"></div>',
        '<div class="d-side-bar__body">',
        '<div class="d-side-bar__body-bg"></div>',
        '<div class="d-side-bar__body-bg-layout"></div>',
        '<div class="d-side-bar__qr-code-wrap">',
        '<ins class="adsbygoogle"        style="display:block"        data-ad-client="ca-pub-7347679321798304"        data-ad-slot="7202314350"        data-ad-format="auto"        data-full-width-responsive="true"></ins>   <script>        (adsbygoogle = window.adsbygoogle || []).push({});   </script>',
        // '<img class="d-side-bar__qr-code" src="' + (this.option && this.option.img || '') + '"></img>',
        '</div>',
        '<div class="d-side-bar__progress-wrap">',
        '<div class="d-side-bar__p d-side-bar__p--title">广告来自谷歌推荐</div>',
        '<div class="d-side-bar__p d-side-bar__p--desc"><a href="https://www.ffxiv.cn/detail/article/534" target="_blank">广告屏蔽指南与说明</a></div>',
        // '<div class="d-side-bar__p d-side-bar__p--desc"></div>',
        // '<div class="d-side-bar__p d-side-bar__p--f">进度</div>',
        // '<div class="d-side-bar__p d-side-bar__p--l">需求：￥' + this.total.toFixed(2) + '</div>',
        // '<div class="d-side-bar__progress-container"></div>',
        // '<div class="d-side-bar__progress-shadow"></div>',
        // '<div class="d-side-bar__progress-bar" id="bar"></div>',
        '</div>',
        // '<div class="d-side-bar__p d-side-bar__p--desc" style="text-align:center">素素人工统计会有一定延时,<a href="https://dribbble.com/Dozi" target="_blank">豆豆</a>设计<br>*进度满后怎么办？<a href="https://pay.sdo.com/item/GWPAY-100001900" target="_blank">解决方案</a></div>',
        '</div>',
        '<div class="d-side-bar__btn--close" onclick="SideBar.prototype.close()"></div>',
        '</div>',
        '<div class="d-side-bar__btn-wrap--open" id="btn-Open" onclick="SideBar.prototype.open()">',
        '<div class="d-side-bar__btn--open"></div>',
        '</div>'
      ]

      // this.el.insertAdjacentHTML('beforeend',(appendHtml.join('')))
      this.el.innerHTML = appendHtml.join('')
    },
    open: function () {
      document.getElementById('layer').classList.remove('isHide')
      document.getElementById('wrap').classList.add('wrap-translateY')
      document.getElementById('wrap').classList.add('wrap-show')
      document.getElementById('btn-Open').classList.add('isHide')
    },

    close: function () {
      document.getElementById('wrap').classList.remove('wrap-translateY')
      setTimeout(function () {
        document.getElementById('wrap').classList.remove('wrap-show')
        document.getElementById('layer').classList.add('isHide')
        document.getElementById('btn-Open').classList.remove('isHide')
      }, 400)
    },

    getVal: function () {
      var self = this;
      // self.init();
      // listenDom();
      // 请求接口
      // var xhr = null;
      // if (window.XMLHttpRequest) {
      //   xhr = new XMLHttpRequest()
      // } else {
      //   xhr = new ActiveXObject("Microsoft.XMLHTTP")
      // }

      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === 4) {   //此时状态已经完成
      //     if (xhr.status === 200) {   //响应已经完成
      //       // console.log('已经接收到一个成功的响应');
      //       // console.log(xhr.responseText);
      //       // checkName(xhr.responseText);

      //       var res = JSON.parse(xhr.responseText);
      //       if (res.success) {
      //         // 这里只考虑拿第一个
      //         var data = res.result.items[0];
      //         self.total = data.targetSteps[0].donateStepAmount;
      //         self.value = data.targetSteps[0].progress;
      //         self.title = data.target.name + '<br>' + data.targetSteps[0].name;
      //         self.descHtml = data.target.descHtml + '<br>' + data.targetSteps[0].descHtml;
      //         self.total = data.targetSteps[0].donateStepAmount;
      //         self.startTime = formatData(data.target.startTime);
      //         self.endTime = formatData(data.target.endTime);
      //         self.init();
      //         document.getElementById('bar').style.width = self.value + '%';
      //         listenDom();
      //       }


      //     } else {
      //       console.log('接收到一个非成功的ajax响应' + xhr.status)
      //     }
      //   }
      // }

      // xhr.open("GET", "https://api-cms.ffxiv.cn/api/services/application/Donate/GetTargetShow");
      // xhr.send();
    },




    // 不需要实时刷新 by 野原小牛
    // setProcess: function () {
    //     setTimeout(function () {
    //         this.value = 120
    //         document.getElementById('val').innerHTML = this.value
    //         document.getElementById('bar').style.width = this.value /150 * 100 + '%'
    //     }, 1000)
    // }
  }

  // SideBar.prototype.init()
  // listenDom()
  // SideBar.prototype.getVal()
  // SideBar.prototype.setProcess()


  // 兼容CommonJs规范
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SideBar
  }

  // 兼容AMD/CMD规范
  if (typeof define === 'function') define(function () {
    return SideBar
  })

  window.SideBar = SideBar

})(window)
