$(function () {
  var tid;
  function refreshRem() {
    let designSize = 1920; // 设计图尺寸
    let html = document.documentElement;
    let wW = html.clientWidth; // 窗口宽度
    let rem = '';
    if (wW < 1600) {
      rem = (1600 * 100) / designSize;
    } else {
      rem = (wW * 100) / designSize;
    }

    document.documentElement.style.fontSize = rem + "px";
  }
  window.addEventListener(
    "pageshow",
    function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false
  );
  refreshRem();
  $("");
  window.onresize = function () {
    refreshRem();
    clearTimeout(tid);
  };

  setTimeout(function () {
    $("body").show();
  }, 300);

  // 点击右下角返回顶部按钮
  $("#st-toTop").scrollToTop(1000);

  // 页面置顶js
  setTimeout(() => {
    window.scrollReveal = new scrollReveal({ reset: true, move: "50px" });
  }, 300);
  let ie6 = /msie 6/i.test(navigator.userAgent);
  let stNavBg = $(".st-navbg");
  let st = "";

  // 存储原来的距离顶部的距离
  stNavBg.attr("otop", 4);
  $(window).scroll(function () {
    st = Math.max(
      document.body.scrollTop || document.documentElement.scrollTop
    );
    if (st >= parseInt(stNavBg.attr("otop"))) {
      if (ie6) {
        //IE6不支持fixed属性，所以只能靠设置position为absolute和top实现此效果
        stNavBg.css({ position: "absolute", top: st });
      } else if (stNavBg.css("position") != "fixed")
        stNavBg.css({ position: "fixed", top: 0 });
      stNavBg.css({ background: "#000000" });
      // 二级菜单距离顶部的距离
      $(".enmu-two").css({ top: "1rem" });
      $("#st-navul li ul").css({ top: "1rem" });
      // 清除页面顶部导航的动态效果，因为动态效果跟顶部导航只能二选一，相互影响
      $(".st-navbg div, ul, li, a, span").removeAttr("data-scroll-reveal", "");
      // 重置scrollReveal插件
      window.scrollReveal.init();
    } else {
      // 还原二级菜单距离顶部的距离
      $(".enmu-two").css({ top: "0.7rem" });
      $("#st-navul li ul").css({ top: "0.7rem" });
      // 还原顶部导航背景样式
      stNavBg.css({ background: "none" });
    }
  });

  // 每次刷新页面后置顶
  window.onunload = unload; function unload (e){ window.scrollTo(0,0); }
});
