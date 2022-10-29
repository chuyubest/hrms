<template>
  <div>
    <!-- 给action加个# -->
    <!-- file-list是上传的文件列表可以绑定到上传组件上,让上传组件显示 -->
    <!-- upload组件显示的是fileList内容 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :on-remove="remove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      :percentage="percent"
      style="width: 180px"
      v-if="showPercent"
    ></el-progress>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5"; //引入腾讯云cos包
//实例化cos对象 只有用自己key和id才能上传到自己的存储桶
const cos = new COS({
  SecretId: "AKIDWu32FG3mNl05xcHqZIp69yay8pKekcVD",
  SecretKey: "XpshIfrsiLm00mLdjfNtBF4g8NOICwSk",
});
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: "",
      currentFileUid: null,
      percent: 0, //当前的百分比
      showPercent: false, //是否显示进度条
    };
  },
  computed: {
    //如果他为true就不显示+
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    //点击预览会触发该事件
    handlePictureCardPreview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    //删除图片
    remove(file, fileList) {
      // file是要删除的文件 fileList是删除之后的图片
      //    const index = this.fileList.findIndex(item=>item.uid===file.uid)
      //    this.fileList.splice(index,1)
      // this.fileList = this.fileList.filter(item=>item.uid !== file.uid)
      this.fileList = fileList;
    },
    changeFile(file, fileList) {
      //file是当前的文件 fileList是当前的最新数组
      // this.fileList = fileList
      this.fileList = fileList.map((item) => item);
    },
    //上传之前检查
    beforeUpload(file) {
      // 先检查文件类型
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.includes(file.type)) {
        //如果不存在
        this.$message.error("上传图片的文件格式只能是jpg,png,gif,webp");
      }
      //继续检查文件大小 限制图片大小为5M
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        //超过了限制的文件大小
        this.$message.error("上传的图片大小不能大于5M");
        return false;
      }
      this.currentFileUid = file.uid;
      this.showPercent = true;
      return true; //一定要return true
    },
    //上传图片方法
    upload(params) {
      // console.log(params);
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: "chuyu-1314673649", // 存储桶
            Region: "ap-nanjing", // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
            onProgress: (params) => {
              console.log(params);
              this.percent = params.percent * 100;
            },
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            // console.log(err || data);
            //data中有一个状态statusCode === 200 表示上传成功
            if (!err && data.statusCode === 200) {
              // 要获取成功的返回地址
              //fileList 才能显示上传组件 要把fileList中的数据地址变成上传成功的地址
              //需要知道当前上传成功的是哪一张图片
              this.fileList = this.fileList.map((item) => {
                //去找谁uid等于刚刚记录下来的id
                if (item.uid === this.currentFileUid) {
                  return {
                    url: "http://" + data.Location, //将返回的地址赋值给原来的url
                    upload: true, //upload为true表示这张图片已经上传完毕 为后期应用做标记
                    //保存=>图片有大有小=>上传速度有快有慢=>表示有么有上传完毕
                  };
                }
                return item;
              });
              //关闭进度条
              setTimeout(() => {
                this.showPercent = false;
                //重置百分比
                this.percent = 0;
              }, 1000);
              //将上传成功的地址回写到了fileList中 fileList一变化 upload组件就会根据变化渲染视图
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>