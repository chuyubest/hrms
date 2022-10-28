<template>
  <div>
    <!-- 给action加个# -->
    <!-- file-list是上传的文件列表可以绑定到上传组件上,让上传组件显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
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
  methods: {
    //点击预览会触发该事件
    handlePictureCardPreview(file) {
        this.imgUrl = file.url
        this.showDialog = true
    },
  },
};
</script>

<style>
</style>