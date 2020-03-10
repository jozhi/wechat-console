const app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true, // 默认隐藏
    dataType:'log',
    log:[],
    fetch:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //展示弹框
    showPopup () {
      this.log()
      this.reFetchInfo()
      this.setData({
        flag: !this.data.flag
      })
    },
    // 塞log信息
    log(){
      // console.log('push log',item);
      // app.EplogConfig.log.unshift(item)
      this.setData({
        log: app.EplogConfig.log
      })
    },
    // 刷新请求信息
    reFetchInfo(){
      // console.log('app.EplogConfig.fetch:',app.EplogConfig.fetch);
      this.setData({
        fetch: app.EplogConfig.fetch
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    */
    // 切换日志类型
    _switchType(e){
      this.setData({
        dataType: e.target.dataset.type
      })
    },
    _clear(){
      app.EplogConfig.log = []
      app.EplogConfig.fetch = []
      this.setData({
        log: app.EplogConfig.log,
        fetch: app.EplogConfig.fetch,
      })
    },
    _hide(){
      this.setData({
        flag: !this.data.flag
      })
    }
  }
})