//获取cookie
function getCookie(cookieName) {
    //获取cookie对象转化为字符串
    var decodedCookie = decodeURIComponent(document.cookie);
    //如不包含要找的属性名直接结束
    if (decodedCookie.indexOf(cookieName) == -1) {
      return null;
    } else {
      //如包含则将其按;分割，遍历直至找到该项，将属性名及=都去掉，返回属性值子串
      var cookieList = decodedCookie.split(";");
      for (coo of cookieList) {
        if (coo.indexOf(cookieName) != -1) {
          return coo.trim().substring(cookieName.length + 1);
        }
      }
    }
  }
  
  //添加cookie
  function setCookie(cookieName, cookieValue, exdays, path) {
    //过期时间
    var date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    //添加cookie
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + date.toUTCString() +
      ';path=' + path;
  }
  
  //清除cookie
  function delCookie(cookieName) {
    //清除cookie只需将其值设为空，过期时间设为过去即可
    setCookie(cookieName, '', -1);
  }
  