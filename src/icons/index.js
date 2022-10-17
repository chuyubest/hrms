import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// 加载svg标签显示图形全局组件

// 注册全局组件 组件名 组件实例
Vue.component('svg-icon', SvgIcon)

//webpack内置api用于自动化导入模块 主要用于一个文件中导入多个模块
// 参数1:读取的文件夹路径 参数2:是否遍历文件夹的子目录 参数3:符合正则表达式的才会被导入
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
