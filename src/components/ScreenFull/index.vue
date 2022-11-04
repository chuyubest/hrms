<template>
  <div>
    <svg-icon @click="changeScreen" icon-class="fullscreen" style="color:#fff;width:20px;height:20px;cursor:pointer"></svg-icon>
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
    methods:{
        changeScreen(){
            // 原生方式
            // document.documentElement.requestFullscreen()
            if(!ScreenFull.isEnabled){//判断当前的全屏组件是否可用
                this.$message.warning('当前全屏组件不可用')
                return 
            }
            ScreenFull.toggle() //全屏方法 既可以全屏也可以退出全屏
        }
    }
}
</script>

<style>

</style>