
/**
 * 手机正则验证
 */

function verifyMobile(mobile) {
  if (mobile.length == 0) {
    wx.showToast({
      title: '请输入手机号！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  if (mobile.length != 11) {
    wx.showToast({
      title: '手机号长度有误！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    wx.showToast({
      title: '手机号有误！',
      icon: 'none',
      duration: 1500
    })
    return false;
  }
  return true;
}

/**
 * 身份证校验规则
 */

const validateIdCard = idCard => {
  //15位和18位身份证号码的正则表达式
  var regIdCard=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;

  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if(regIdCard.test(idCard)){
    if(idCard.length==18){
      var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
      var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
      for(var i=0;i<17;i++){
        idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
      }
      var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
      var idCardLast=idCard.substring(17);//得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if(idCardMod==2){
        if(idCardLast=="X"||idCardLast=="x"){
          return true
        }else{
          wx.showToast({
            title: '身份证号码错误！',
            icon: 'none',
            duration: 1500
          })
          return false
        }
      }else{
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if(idCardLast==idCardY[idCardMod]){
          return true
        }else{
          wx.showToast({
            title: '身份证号码错误！',
            icon: 'none',
            duration: 1500
          })
          return false
        }
      }
    }
  }else{
    wx.showToast({
      title: '身份证格式不正确',
      icon: 'none',
      duration: 1500
    })
    return false
  }
}

/**
 * 姓名校验规则
 */
const nameValidate = myName => {
  let name = myName.trim()
  if(!name){
    wx.showToast({
      icon: 'none',
      title: '个人姓名不能为空！',
      duration: 2000,
      mask: true
    })
    return false;
  }
  if (name.length < 2) {
    wx.showToast({
      icon: 'none',
      title: '个人姓名不能小于两位！',
      duration: 2000,
      mask: true
    })
    return false;
  }
  var reg=/[^\u4e00-\u9fa5]/
  if (reg.test(name)) {
    wx.showToast({
      icon: 'none',
      title: '姓名必须均为汉字！',
      duration: 2000,
      mask: true
    })
    return false;
  }
  return true
}

module.exports = {
  verifyMobile: verifyMobile,
  validateIdCard: validateIdCard,
  nameValidate: nameValidate
}

