const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 时间显示格式化
 * 传入的time格式为：20200308
 */
const timeFormat = time => {
  return time.substr(0, 4) + "-" + time.substr(4, 2) + "-" + time.substr(-2)
}

/**
 * 身份证脱敏
 * 前面留一位，后面留三位
 */
const idFormat = id => {
  return id.replace(/(\d{2})(\d{14})(\d{2})/, "$1**************$3")
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const  getTime = time => {
  let date = new Date(parseInt(time));
  let year = date.getFullYear();
  let mon = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let hours = date.getHours();
  let minu = date.getMinutes();
  let sec = date.getSeconds();

  return year + '-' + mon + '-' + day;
}
const getTimeTwo = time => {
  let date = new Date(parseInt(time));
  let year = date.getFullYear();
  let mon = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  let minu = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  let sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

  return year + '-' + mon + '-' + day + ' ' + hours + ':' + minu + ':' + sec;
}
module.exports = {
  formatTime: formatTime,
  getTime: getTime,
  getTimeTwo: getTimeTwo,
  timeFormat: timeFormat,
  idFormat: idFormat
}
