<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <!-- 左侧显示总记录数 -->
        <span slot="before">共{{ page.total }}条数据</span>
        <!-- 右侧显示按钮 excel导入 excel导出 新增员工 -->
        <template slot="after">
          <el-button
            type="success"
            size="small"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button type="danger" size="small" @click="exportData"
            >导出</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <el-card v-loading="loading">
        <!-- 表格组件 -->
        <el-table border :data="list">
          <el-table-column
            type="index"
            label="序号"
            width="100px"
          ></el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop="username"
          ></el-table-column>
          <el-table-column width="120px" label="头像" align="center">
            <!-- 插槽 -->
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                alt=""
                style="width: 100px; border-radius: 50%"
                v-imageError="defaultImage"
                @click="showQrcode(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            sortable
            prop="mobile"
          ></el-table-column>
          <el-table-column
            label="工号"
            sortable
            prop="workNumber"
          ></el-table-column>
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatEmployment"
          ></el-table-column>
          <el-table-column
            label="部门"
            sortable
            prop="departmentName"
          ></el-table-column>
          <el-table-column label="入职时间" sortable prop="timeOfEntry">
            <!-- 作用域插槽加上过滤器 -->
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{ row, $index }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.size"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <!-- 放置组件弹层 -->
    <AddEmployee :showDialog.sync="showDialog"></AddEmployee>
    <!-- 放置分配角色弹层 -->
    <AssignRole :showRoleDialog="showRoleDialog" :userId="userId" ref="assignRole"></AssignRole>
    <el-dialog title="二维码" :visible.sync="showCodeDialog" width="width">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeesList, delEmployee } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees"; //引入员工的枚举对象
import AddEmployee from "./components/add-employee.vue";
import AssignRole from './components/assign-role'
import { formatDate } from "@/filters";
import Qrcode from "qrcode";
export default {
  data() {
    return {
      showRoleDialog:false,//显示分配角色弹框
      showCodeDialog: false, //显示二维码弹层
      defaultImage: require("@/assets/common/head1.jpg"),
      page: {
        page: 1, //当前页码,
        size: 10, //每页条数
        total: 0,
      },
      list: [], //员工列表
      loading: false, //显示遮罩层
      showDialog: false, //显示弹层,
      userId:'',
    };
  },
  components: {
    AddEmployee,
    AssignRole
  },
  created() {
    this.getEmployeesList();
  },
  methods: {
    // 获取员工综合列表
    async getEmployeesList() {
      this.loading = true;
      const { total, rows } = await getEmployeesList(this.page);
      this.page.total = total;
      this.list = rows;
      this.loading = false;
    },
    //切换页码的事件函数
    handleCurrentChange(currentPage) {
      //赋值最新页码 重新获取数据
      this.page.page = currentPage;
      this.getEmployeesList();
    },
    //格式化聘用形式
    formatEmployment(row, column, cellValue) {
      // cellValue表示单元格的值
      //row当前行
      //column 当前列的属性
      // 找1所对应的值
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    //删除员工按钮的事件回调
    async delEmployee(row) {
      try {
        //先询问是否确定删除
        await this.$confirm(`您确定要删除${row.username}吗?`);
        //点击确定会进入下方
        //调用删除接口
        await delEmployee(row.id);
        this.$message.success("删除成功!");
        //重新获取数据
        this.getEmployeesList();
      } catch (error) {
        console.log(error);
      }
    },
    //将表头与数据进行对应 [{}] =>[[]]
    formatJson(headers, rows) {
      return rows.map((item) => {
        //item是一个对象  {mobile:'1111',username:'张三'}
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            const obj = EmployeeEnum.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return obj ? obj.value : "未知";
          }
          return item[headers[key]];
        });
      });
    },
    //导出excel
    exportData() {
      const headers = {
        手机号: "mobile",
        姓名: "username",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      import("@/vendor/Export2Excel").then(async (excel) => {
        //excel是引入文件的导出对象
        //导出需要header data从哪来
        //现在没有接口获取所有的数据
        //获取员工的接口 页码 每页条数 用一页展示所有数据
        const { rows } = await getEmployeesList({
          page: 1,
          size: this.page.total,
        });
        const data = this.formatJson(headers, rows); //返回的data就是要导出的结构
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "员工信息表",
        });
        // excel.export_json_to_excel({
        //   header:['姓名','工资'],
        //   data:[],
        //   filename:'员工工资表'
        // })
        //要将data转化成[[]] 还要与表头顺序对应上 要求转出的数据是中文
      });
    },
    //显示图片二维码
    showQrcode(url) {
      //url存在的时候才显示弹层 图片链接
      if (url) {
        this.showCodeDialog = true;
        //可以使用$nextTick在上一次数据更新完毕,页面渲染完毕
        this.$nextTick(() => {
          //此时可以确认已经有ref对象 
          Qrcode.toCanvas(this.$refs.myCanvas, url);//将地址转换为二维码
        });
      } else {
        //提示用户
        this.$message.warning("当前用户还未上传头像");
      }
    },
    //点击角色按钮 给员工分配角色
    async showRole(id){
      //将id赋值并传给子组件
      this.userId = id //props
      //调用子组件的方法
      await this.$refs.assignRole.getAssignedRoles(id) //异步方法
       //显示弹层
      this.showRoleDialog = true
    }
  },
};
</script>

<style>
</style>