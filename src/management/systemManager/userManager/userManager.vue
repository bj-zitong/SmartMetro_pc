<template>
  <div>
    <tree />
    <div
      class="main-box"
      v-loading="loading"
      style="width:85%;float:right"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 筛选 -->
      <el-container>
        <el-menu class="main-top-box pl30">
          <el-form :inline="true" ref="screenForm" :model="screenForm">
            <el-form-item label="用户名：" prop="searchName">
              <el-input v-model="screenForm.searchName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTable(0)" style="margin-left:30px;">查询</el-button>
            </el-form-item>
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
            <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="120"></el-table-column>
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
            <el-table-column prop="status" label="用户状态" min-width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  on-color="#00A854"
                  on-text="启动"
                  on-value="0"
                  off-color="#F04134"
                  off-text="禁止"
                  off-value="1"
                  @change="changeSwitch(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            class="pagination-box"
            v-if="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getTable"
          />
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
          :label-position="labelPosition"
        >
          <el-form-item prop="sysUserId">
            <el-input v-model="formTeam.sysUserId" type="text" hidden></el-input>
          </el-form-item>
          <el-form-item label="标段/工地：" prop="siteId">
            <el-select v-model="formTeam.siteId" placeholder="请选择" @change="selectSection">
              <el-option
                v-for="item in sections"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
            <el-input
              type="password"
              v-model="formTeam.password"
              placeholder="请输入"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confimPassword" label="确认密码：">
            <el-input type="password" v-model="formTeam.confimPassword" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roles" style="padding-left:12px">
            <el-checkbox-group v-model="formTeam.roles" @change="handleCheckedRoleChange">
              <el-checkbox v-for="item in options" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button class="F-Grey" round @click.native="cloneTeamForm('refTeam')">取 消</el-button>
            <el-button class="F-Blue" round @click.native="submitTeamForm('refTeam')">确 定</el-button>
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
                <span>{{user.userName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                手机号:
                <span>{{user.cellPhone}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                角色:
                <span>{{rolesName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                用户状态:
                <span>{{user.status}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                创建时间:
                <span>{{user.createTime}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                密码:
                <span>{{user.password}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                账号:
                <span>{{user.account}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <template slot="footer" class="dialog-footer">
          <el-button
            type="default"
            @click="dialogFormVisibleDetail = false"
            round
            class="T-R-B-Grey"
          >取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";
import axios from "axios";
import tree from "@/components/tree";
export default {
  name: "main-box",
  components: {
    Pagination,
    tree
  },
  data() {
    return {
      labelPosition: 'left',
      //  初始化页面
      total: 5, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleTeam: false, //
      dialogFormVisibleDetail: false,
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      loading: true,
      user: [],
      rolesName: [],
      formTeam: {
        //班组初始化
        sysUserId: null,
        userName: "",
        cellPhone: "",
        account: "",
        password: "",
        confimPassword: "",
        roles: [],
        siteId: null
      },
      options: [
        { id: 1, name: "项目负责人" },
        { id: 2, name: "项目智慧工地负责人" },
        { id: 3, name: "项目技术负责人" },
        { id: 4, name: "质量巡检人员" },
        { id: 5, name: "劳务管理人员" },
        { id: 6, name: "数据管理人员" },
        { id: 7, name: "劳务管理员" },
        { id: 8, name: "劳务人员" },
        { id: 9, name: "设备专用人员" },
        { id: 10, name: "其他服务类人员" }
      ],
      titleLabor: "", // 标题
      seeBranch: false, // 创建班组弹窗
      screenForm: {
        //  筛选
        searchName: ""
      },
      screenCompany: [
        { id: 0, name: "第一公司" },
        { id: 1, name: "第二公司" }
      ],
      // 自定义表单验证
      rulesForm: {
        siteId: [
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
        confimPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      sections: [
        { id: null, name: "请选择" },
        { id: 1, name: "区域一" },
        { id: 2, name: "区域二" },
        { id: 3, name: "区域三" }
      ]
    };
  },
  activated() {
    // 页面加载时获取信息
    this.getTable();
  },
  methods: {
    changeSwitch(val) {
      //获得状态的值
      var data = null;
      var status = val.status;
      if (status) {
        //该状态为启用
        data = JSON.stringify({
          status: 0,
          sysUserId: val.sysUserId
        });
        //禁用
      } else {
        data = JSON.stringify({
          status: 1,
          sysUserId: val.sysUserId
        });
      }
      var url =
        "/systemUrl/smart/auth/" + sessionStorage.getItem("userId") + "/user";
      this.http
        .put(url, data)
        .then(res => {
          if (res.code == 200) {
          }
        })
        .catch(res => {
          return false;
        });
    },
    // 表格加载请求
    getTable(val) {
      if (val == 0) {
        this.loading = true;
      }
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        userName: this.screenForm.searchName
      });
      // setTimeout(() => {
      //   // console.log(this);//this对象为vue实例
      //   this.loading = false;
      // }, 1000);
      //请求
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/user/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          this.tableData = res.data.rows;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].status == "0") {
              this.tableData[i].status = true;
            } else {
              this.tableData[i].status = false;
            }
          }
          this.total = total;
          this.loading = false;
        }
      });
    },
    //用户详情
    getUserdetail(index, row) {
      // 用户i
      var uid = row.sysUserId;
      this.formTeam.sysUserId = uid;
      this.rolesName =row.roleName;
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/user/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.user = JSON.parse(JSON.stringify(result));
          if (this.user.status == "0") {
            this.user.status = "启用";
          } else {
            this.user.status = "禁用";
          }
          //获得角色
          this.getRoles();
          var options = this.options;
          // if (this.user.roles.length > 0) {
          //   for (var i = 0; i < options.length; i++) {
          //     for (var j = 0; j < this.user.roles.length; j++) {
          //       if (options[i].id == this.user.roles[j]) {
          //         this.rolesName.push(options[i].name);
          //       }
          //     }
          //   }
          // }
        }
      });
      this.dialogFormVisibleDetail = true;
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].sysUserId;
        ids.push(id);
      }
      return ids;
    },
    //选中的角色
    handleCheckedRoleChange() {
      // let obj = new Array();
      // obj = this.options.find(item => {
      //   return item.id == vid; // 筛选出匹配数据
      // });
      // this.formTeam.roles = obj.id;
    },
    //获得用户角色
    getRoles() {
      var data = JSON.stringify({
        pageSize: 100,
        page: 1,
        roleName: ""
      });
      //请求
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/role/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          var role = res.data.rows;
          var roles = [];
          for (var i = 0; i < role.length; i++) {
            if (role[i].status == "0") {
              roles.push({ id: role[i].sysRoleId, name: role[i].roleName });
            }
          }
          this.options = roles;
        }
      });
    },
    //  新增
    addClick() {
      this.titleLabor = "新增用户";
      this.getRoles();
      this.dialogVisibleTeam = true;
    },
    //工地选择
    selectSection(vid) {
      let obj = {};
      obj = this.sections.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formTeam.siteId = obj.id;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑";
      this.getRoles();
      var id = row.sysUserId;
      this.formTeam.sysUserId = id;
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/user/" +
        id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          if (result.roles == null) {
            result.roles = [];
          }
          this.formTeam = JSON.parse(JSON.stringify(result));
          this.formTeam.confimPassword = result.password;
          this.formTeam.siteId = result.orgSite;
        }
      });
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
          let url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/user";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message("已删除！");
              this.loading = true;
              this.getTable();
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
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/user";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message("已删除！");
              this.loading = true;
              this.getTable();
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
          if (form.sysUserId == null) {
            // let data = JSON.stringify(this.formTeam);
             var data = JSON.stringify({
              orgSite: form.siteId,
              userName: form.userName,
              cellPhone: form.cellPhone,
              account: form.cellPhone,
              password: form.password,
              roles: form.roles,
              sysUserId: form.sysUserId
            });
            if (form.password != form.confimPassword) {
              this.$message({
                message: "密码不一致!"
              });
              return;
            }
            let url =
              "/systemUrl/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/user";
            this.http
              .post(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.cloneTeamForm(refTeam);
                  this.$message("添加成功！");
                  this.loading = true;
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
          } else {
            if (form.password != form.confimPassword) {
              this.$message({
                message: "密码不一致!"
              });
              return;
            }
            var url =
              "/systemUrl/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/user";
            var data = JSON.stringify({
              orgSite: form.siteId,
              userName: form.userName,
              cellPhone: form.cellPhone,
              account: form.cellPhone,
              password: form.password,
              roles: form.roles,
              sysUserId: form.sysUserId
            });
            // let data = JSON.stringify(this.formTeam);
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.cloneTeamForm(refTeam);
                  this.$message("编辑成功！");
                  this.loading = true;
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
          }
        } else {
          return false;
        }
      });
    },
    cloneTeamForm(refTeam) {
      this.$refs[refTeam].resetFields();
      Object.assign(this.$data.formTeam, this.$options.data().formTeam); // 初始化data
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

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #FFFFFF;
}

.bg-purple {
  background: #FFFFFF;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.tree-container {
  float: left;
  width: 15%;
  padding: 20px 0 0 20px;
  background: rgba(255, 255, 255, 1);
}

.el-tree {
  // height: 100%;
  padding: 20px 0 0 20px;
}
</style>

