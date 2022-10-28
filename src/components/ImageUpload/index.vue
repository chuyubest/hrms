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
      :class="{disabled:fileComputed}"
      :on-remove="remove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
        title="图片预览"
        :visible.sync="showDialog"
        >
       <img :src="imgUrl" alt="" width="100%">
        
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          url: "https://img1.baidu.com/it/u=3009731526,373851691&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667062800&t=06ff08fd8af69238b2c4fa693016178c",
        },
      ],
      showDialog:false,
      imgUrl:''
    };
  },
  computed:{
    //如果他为true就不显示+
    fileComputed(){
        return this.fileList.length === 1
    }
  },
  methods: {
    //点击预览会触发该事件
    handlePictureCardPreview(file) {
        this.imgUrl = file.url
        this.showDialog = true
    },
    //删除图片
    remove(file,fileList){
        // file是要删除的文件 fileList是删除之后的图片
    //    const index = this.fileList.findIndex(item=>item.uid===file.uid)
    //    this.fileList.splice(index,1)
        // this.fileList = this.fileList.filter(item=>item.uid !== file.uid)
        this.fileList = fileList
    },
    changeFile(file,fileList){
        //file是当前的文件 fileList是当前的最新数组
        // this.fileList = fileList
       this.fileList = fileList.map(item=>item)
    },
    //上传之前检查
    beforeUpload(file){
        // 先检查文件类型
        const types = ['image/jpeg','image/gif','image/bmp','image/png']
        if(!types.includes(file.type)){
            //如果不存在
            this.$message.error('上传图片的文件格式只能是jpg,png,gif,webp')
        }
        //继续检查文件大小 限制图片大小为5M 
        const maxSize = 5 * 1024 * 1024 
        if(file.size > maxSize){
            //超过了限制的文件大小
            this.$$message.error('上传的图片大小不能大于5M')
            return false;
        }
        return true
    }
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
    display:none;
}
</style>