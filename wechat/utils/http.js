// http.js
const app = getApp()
const ReqLog = function(url,params,res,status){
  // TODO 开发时候再解开 
  const nowDate = new Date().toLocaleString()||''
  // 当前 URL
  const pages = getCurrentPages()    //获取加载的页面
  let currentRoute = ''
  if(pages.length){
    currentRoute = pages[pages.length-1].route 
  }
  app.EplogConfig.fetch.unshift({
    status:status,
    date: nowDate ||'',
    currentRoute:currentRoute,
    url: url||'',
    params: params ? JSON.stringify(params):'',
    res: res ? JSON.stringify(res):'',
  })
}
const http = (url, method, data) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${app.globalData.basicUrl}${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'channelNo':'999999999',
        'token': app.globalData.token,
        'systemType': app.globalData.systemType
      },
      success: function (res) {
        app.EplogConfig.debug && ReqLog(`${app.globalData.basicUrl}${url}`,data,res,'success')
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) {
        app.EplogConfig.debug && ReqLog(`${app.globalData.basicUrl}${url}`,data,res,'fail')
        // fail调用接口失败
        reject({ error: '网络错误', code: 0 });
      },
      complete: function (res) {
        // complete
        // app.EplogConfig.debug && ReqLog(`${app.globalData.basicUrl}${url}`,data,res,'complete')
      }
    })
  })
}

module.exports = http