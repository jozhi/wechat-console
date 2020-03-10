//app.js
App({
  onLaunch: function() {

    // 测试本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    const self = this;
    // 判断当前系统时IOS还是安卓
    wx.getSystemInfo({
      success(res) {
        // console.log('判断当前系统时IOS还是安卓:',res);
        if (res.system.indexOf('iOS') > -1) {
          self.globalData.systemType = 'Ios'
        } else if (res.system.indexOf('Android') > -1) {
          self.globalData.systemType = 'android'
        }
      }
    })
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              self.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  EplogConfig:{
    debug:true, // 是否启动调试模式  true/false
    log:[], // 存储 log
    fetch:[],  // 存储 request
  },
  globalData: {
    userInfo: null,
    openid: '',
    token:'',
    systemType:'',
    hosId:'',
    chanId:'',
    basicUrl: 'https://ybj.zjzwfw.gov.cn/ybpay_test',//ybpay //ybpay_test
    wxuPayUrl: 'https://ybj.zjzwfw.gov.cn/wxuPay_test/uPay/V1',//wxuPay //wxuPay_test
  }
})