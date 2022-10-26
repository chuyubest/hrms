<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <!-- 左侧显示总记录数 -->
        <span slot="before">共{{ page.total }}条数据</span>
        <!-- 右侧显示按钮 excel导入 excel导出 新增员工 -->
        <template slot="after">
          <el-button type="success" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus"
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
  </div>
</template>

<script>
import { getEmployeesList, delEmployee } from "@/api/employees";
import EmployeeEnum from "@/api/constant/employees"; //引入员工的枚举对象
export default {
  data() {
    return {
      page: {
        page: 1, //当前页码,
        size: 10, //每页条数
        total: 0,
      },
      list: [], //员工列表
      loading: false, //显示遮罩层
    };
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
        //调用删除接口
        await delEmployee(row.id);
        this.$message.success("删除成功!");
        //重新获取数据
        this.getEmployeesList();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>