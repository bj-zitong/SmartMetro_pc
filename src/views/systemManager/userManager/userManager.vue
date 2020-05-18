<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="screenForm.userName" placeholder="请输入"></el-input>
            <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="getTable()"
            ></i>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onScreen">查询</el-button>
          </el-form-item>-->
        </el-form>
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="addClick()">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteBatchClick()">删除</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          :header-cell-style="headClass"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            fixed
            prop="sysUserId"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="userName" label="用户名" min-width="100"></el-table-column>
          <el-table-column prop="cellPhone" label="手机号" min-width="90"></el-table-column>
          <el-table-column prop="roleName" label="角色" min-width="110"></el-table-column>
          <el-table-column prop="status" label="用户状态" min-width="80"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click="editRowClick(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                class="T-R-B-Grey"
                size="mini"
                @click="deleteRowClick(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
               class="T-R-B-Orange"
                size="mini"
                @click="getUserdetail(scope.$index, scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination-box"
          layout="total, prev, pager,next"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          @prev-click="prev"
          @next-click="next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-menu>
    </el-container>
    <!-- 创建用户 -->
    <el-dialog
      width="450px"
      :title="titleLabor"
      class="popupDialog"
      :visible.sync="dialogVisibleTeam"
      :center="true"
      :show-close="false"
      :close-on-click-modal="false"
      :hide-required-asterisk="true"
    >
      <el-form
        method="post"
        ref="refTeam"
        label-width="100px"
        :rules="rulesForm"
        :model="formTeam"
        action
      >
        <el-form-item prop="sysUserId">
          <el-input v-model="formTeam.sysUserId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="orgSite" label="标段/工地：">
          <el-input v-model="formTeam.orgSite" type="text" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="姓名：">
          <el-input v-model="formTeam.userName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="cellPhone" label="手机号：">
          <el-input v-model="formTeam.cellPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="account" label="账号：">
          <el-input v-model="formTeam.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input type="password" v-model="formTeam.password" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="confimPassword" label="确认密码：">
          <el-input type="password" v-model="formTeam.confimPassword" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="formTeam.roles" @change="handleCheckedRoleChange">
            <el-checkbox v-for="item in options" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click="submitTeamForm('refTeam')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--详情 -->
    <el-dialog
    title
    :visible.sync="dialogFormVisibleDetail"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <div class="AddEquipment_form">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            用户名:
            <span>9996666</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">手机号:
             <span>9996666</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            角色:
            <span>9996666666666</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">用户状态:
            <span>9996666666666</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            创建时间:
            <span>9996666666666</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">密码:
              <span>9996666666666</span>
          </div>
        </el-col>
            <el-col :span="10">
          <div class="grid-content bg-purple">账号:
              <span>9996666666666</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <template slot="footer" class="dialog-footer">
      <el-button type="default" @click="dialogFormVisibleDetail = false" round class="T-R-B-Grey">取消</el-button>
      <!-- <el-button type="primary" @click="handleSubmit">提交</el-button> -->
    </template>
  </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";

export default {
  name: "excelExport",
  data() {
    return {
      //  初始化页面
      page: 1, // 初始页
      pageSize: 10, // 默认每页数据量
      total: 0, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleTeam: false, //
      dialogFormVisibleDetail:false,
      formTeam: {
        //班组初始化
        sysUserId: null,
        userName: "",
        cellPhone: "",
        account: "",
        password: "",
        confimPassword:"",
        roles:[],
        orgSite: ""
      },
      options: [
        { id: 1, name: "项目负责人" },
        { id: 2, name: "项目智慧工地负责人" },
        { id: 3, name: "项目技术负责人" },
        { id: 4, name: "质量巡检人员" },
        { id: 5, name: "劳务管理人员" },
        { id: 6, name: "数据管理人员" }
      ],
      titleLabor: "", // 标题
      seeBranch: false, // 创建班组弹窗
      screenForm: {
        //  筛选
        userName: ""
      },
      screenCompany: [
        { id: 0, name: "第一公司" },
        { id: 1, name: "第二公司" }
      ],
      // 自定义表单验证
      rulesForm: {
        orgSite: [
          { required: true, message: "请输入标段名称", trigger: "blur" }
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cellPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roles: [{ required: false, message: "请选择角色", trigger: "change" }],
        confimPassword:[{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // 页面加载时获取信息
    this.getTable();
  },
  components: {},
  methods: {
    // 每页显示多少条 @size-change
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTable();
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    // 点击跳转第几页 @current-change
    handleCurrentChange(page) {
      this.page = page;
      this.getTable();
    },
    // 上一页 @prev-click
    prev(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 下一页 @next-click
    next(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        userName: this.screenForm.userName
      });
      //请求
      var url =
        "/smart/auth/" + sessionStorage.getItem("userId") + "/user/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
      var result = [
        {
          sysUserId: 1,
          userName: "张三",
          status: "使用中",
          cellPhone: "15236985236",
          roleName: "项目负责人",
          createTime: "2019-10-01"
        },
        {
          sysUserId: 2,
          userName: "李四",
          status: "使用中",
          cellPhone: "13752369875",
          roleName: "项目负责人",
          createTime: "2019-10-01"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //用户详情
    getUserdetail(index,row){
         // 用户id
         ///smart/auth/{userId}/user/{id}
      var uid = row.sysUserId;
      this.formTeam.sysUserId = uid;
      var url =
        "/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/user/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.formTeam.orgSite=result.orgSite;
          this.formTeam.userName=result.userName;
          this.formTeam.cellPhone=result.cellPhone;
          this.formTeam.account=result.account;
          this.formTeam.password=result.password;
          this.formTeam.roles=result.roles;
        }
      });
      this.dialogFormVisibleDetail = true;
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      console.log(arrays);
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].sysUserId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      //  this.multipleSelection = val;
    },
    //选中的角色
    handleCheckedRoleChange() {
      // let obj = new Array();
      // obj = this.options.find(item => {
      //   return item.id == vid; // 筛选出匹配数据
      // });
      // console.log(obj);
      // this.formTeam.roles = obj.id;
      console.log(this.formTeam.roles);
    },
    //  新增
    addClick() {
      this.titleLabor = "新增用户";
      this.dialogVisibleTeam = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑";
      this.formTeam = row;
      this.dialogVisibleTeam = true;
    },

    //  批量删除
    deleteBatchClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          let data = JSON.stringify(ids);
          ///smart/auth/{userId}/user
          let url =
            "/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/user";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              let total = res.total;
              let rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //  删除
    deleteRowClick(index, row) {
      let ids = [];
      ids.push(row.sysUserId);
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          var data = JSON.stringify(ids);
           let url =
            "/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/user";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitTeamForm(refTeam) {
      // 验证
      this.$refs[refTeam].validate(valid => {
        if (valid) {
          let form = this.$refs[refTeam].model;
          console.log(form.userName);
          if (form.sysUserId == null) {
            let data = JSON.stringify(this.formTeam);
            if(form.password!=form.confimPassword){
               this.$message({
                    message: "密码不一致!"
                  });
                  return;
            }
            let url =
              "/smart/auth/" + sessionStorage.getItem("userId") + "/user";
            this.http
              .post(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleTeam = false;
          } else {
             if(form.password!=form.confimPassword){
               this.$message({
                    message: "密码不一致!"
                  });
                  return;
            }
            ///smart/auth/{userId}/user/{id}
            var url =
              "/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/user/" +
              form.sysUserId;
            var data = JSON.stringify({
              orgSite: form.orgSite,
              userName: form.userName,
              cellPhone: form.cellPhone,
              account: form.cellPhone,
              password: form.password,
              roles: form.roles
            });
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cloneTeamForm(refTeam) {
      this.$refs[refTeam].resetFields();
      this.dialogVisibleTeam = false;
    },
    //  表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    }
  }
};
</script>

<style lang="stylus" scoped>
.R-L-wrap {
  width: 100%;
  height: 100%;
}

.R-L-S, .R-L-T {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.screen-form-h {
  height: 36px;
}
</style>

<style lang="stylus"></style>
