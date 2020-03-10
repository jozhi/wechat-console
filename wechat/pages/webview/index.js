// pages/webview/index.wxml.js
//获取应用实例
const app = getApp()

const eplog = require('../../components/eplog.js')
const http = require('../../utils/http.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 假设是中医院
    options = {
      hospId:'330000101009',
      chanId:'90ccc383e20c90a54e3fd9fd27cd4be7',
      a:'abcdefghigklmnopqrstuvwxwz',
      b:'ABCDEFGHIGKLMNOPQLSTUVWXWZ',
    }
    app.globalData.hosId = options.hospId // 浙江省医疗机构编码  - 由接入方通过参数传来
    app.globalData.chanId = options.chanId // 互联网医院渠道Id  - 由接入方通过参数传来

    let strOption = JSON.stringify(options)

    // 需要打印的数据存入公共数组中
    app.EplogConfig.log.unshift({
      title:'医院传入参数',
      cont:strOption
    })
    app.EplogConfig.log.unshift({
      title:'医院传入参数 hospId',
      cont:options.hospId
    })
    app.EplogConfig.log.unshift({
      title:'医院传入参数 chanId',
      cont:options.chanId
    })
    app.EplogConfig.log.unshift({
      title:'小写',
      cont:options.a
    })
    app.EplogConfig.log.unshift({
      title:'大写',
      cont:options.b
    })

    wx.login({
      success: res => {
        wx.request({
          url: `${app.globalData.wxuPayUrl}/jscode2session/${res.code}`,
          method: "GET",
          header: {
            "Content-Type": "application/json"
          },
          success: (codeRes) => {
            if (codeRes.data.success) {
              app.globalData.openid = codeRes.data.body.openid
              if (options.hospId && options.chanId) {
                this.checkPower()
              }
            } else {
              wx.showToast({
                title: codeRes.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: (err) => {
            // console.log(err)
            wx.showToast({
              title: err.errMsg,
              icon: 'none',
              duration: 2000
            })
          }
        })

      }
    })

  },
  checkPower() {
    let param = {
      hosCode: app.globalData.hosId,
      chanId: app.globalData.chanId
    }
    http('/msc/online/channel/check', 'post', param).then(res => {
      if (res.success) {
        // do some things
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 调用 console 组件
  showPopup() {
    eplog()
  },
})