const epConsole = function(){
  function getCtx(selector) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];
  
    const componentCtx = ctx.selectComponent(selector);
  
    if (!componentCtx) {
      console.error("无法找到对应的组件");
      return null;
    }
    return componentCtx;
  }
  return function Notice(options) {
    const ctx = getCtx('#epConsole');

    ctx.showPopup();
  }()
}

module.exports = epConsole