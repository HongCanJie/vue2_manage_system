<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="5rem"
        :inline="true"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>
      <!-- form搜索区 -->
      <el-form label-width="80px" :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <!-- 自定义列表 -->
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="sex" label="操作">
          <!-- 自定义列表 -->
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api/index";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      }, //新增与编辑
      userForm: {
        name: "",
      }, //搜索框
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      }, //form表单的输入框规则
      tableData: [], //表格数据
      modalType: 0, //0表示新增弹窗，1表示编辑弹窗
      total: 0, //table数据总条数
      pageData: {
        page: 1, //当前页
        limit: 10, //每页显示条数
      },
    };
  },
  methods: {
    // 表单提交
    submit() {
      // console.log(this.$refs.form);
      // valid是表单是否通过验证
      this.$refs.form.validate((valid) => {
        // console.log(valid);
        if (valid) {
          if (this.modalType === 0) {
            // 如果是新增
            addUser(this.form).then(() => {
              // 重新获取数据
              this.getList();
            });
          } else {
            // 如果是编辑
            editUser(this.form).then(() => {
              // 重新获取数据
              this.getList();
            });
          }
          // 表单通过
          // console.log(this.form, "from");
          // 清除表单
          this.$refs.form.resetFields();
          // 关闭表单
          this.dialogVisible = false;
        }
      });
    },

    // 表单关闭
    handleClose() {
      // console.log(this.$refs.form;
      // 关闭或取消时清空表单
      this.$refs.form.resetFields();
      // 关闭表单
      this.dialogVisible = false;
    },

    // 表格新增
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },

    // 表格编辑
    handleEdit(row) {
      // console.log("编辑");
      this.modalType = 1;
      this.dialogVisible = true;
      // console.log(JSON.parse(JSON.stringify(row)));
      // 这里需要对数据深拷贝,否则会影响原本表格中的数据
      this.form = JSON.parse(JSON.stringify(row));
    },

    // 表格删除
    handleDelete(row) {
      // console.log("删除");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 重新获取数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 获取数据
    getList() {
      // { ...this.userForm, ...this.pageData }是通过解构合并对象属性
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list;
          // console.log(data);
          this.total = data.count || 0;
        }
      );
    },

    // 选择页码
    handlePage(val) {
      // console.log(val);
      this.pageData.page = val;
      this.getList();
    },

    // 搜索框查询
    onSubmit() {
      // console.log("搜索框");
      this.getList();
    },
  },

  mounted() {
    this.getList();
  },
};
</script>

<style lang='less' scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .common-table {
    position: relative;
    height: calc(100% - 60px);
    .page {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>