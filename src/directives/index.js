//负责管理自定义指令
export const imageError = {
    //指令对象 inserted会在当前dom元素插入到结点之后执行
    inserted(dom,options){
        //options是指令中的变量的解释 有一个value属性
        //dom表示当前作用的dom元素 即图片
        //当图片有地址但是地址没有加载成功的时候 会报错 会触发图片的一个时间 =>onerror
        dom.src = dom.src || options.value //初始化的时候如果有值则赋值 没值的话默认赋值
        dom.onerror = function(){
            //当图片出现异常会将指令配置的默认图片设置为该图片的内容
            // dom可以注册error事件
            dom.src =  options.value //不能写死,要获取传递过来的值
        }
    },
    //与inserted一样 会在当前指令作用的组件 更新数据完毕之后  执行
    componentUpdated(dom,options){
        //inserted只会执行一次 而组件初始化后就不会再次inserted会进入
        dom.src = dom.src || options.value
    }
}