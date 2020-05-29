<template>
  <div
    class="main-box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="角色名：" prop="userName">
            <el-input v-model="screenForm.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTable(0)">查询</el-button>
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
            prop="sysRoleId"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="100"></el-table-column>
          <el-table-column prop="permissionName" label="权限" min-width="90"></el-table-column>
          <el-table-column prop="memo" label="备注" min-width="110"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#00A854"
                on-text="启动"
                on-value="1"
                off-color="#F04134"
                off-text="禁止"
                off-value="0"
                @change="changeSwitch(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
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
      >
        <el-form-item prop="sysUserId">
          <el-input v-model="formTeam.sysUserId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="roleName" label="角色名称：">
          <el-input v-model="formTeam.roleName" type="text" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="memo" label="备注">
          <el-input v-model="formTeam.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permissionName">
          <el-checkbox-group v-model="formTeam.permissionName" @change="handleCheckedRoleChange">
            <el-checkbox v-for="item in options" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click.native="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click.native="submitTeamForm('refTeam')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../../components/pagination";
export default {
  name: "excelExport",
  components: {
    Pagination
  },
  data() {
    return {
      //  初始化页面
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      loading: true,
      total: 0, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleTeam: false, //
      dialogFormVisibleDetail: false,
      formTeam: {
        //班组初始化
        sysRoleId: null,
        roleName: "",
        status: "",
        permissionName: [],
        password: "",
        memo: "",
        createTime: ""
      },
      options: [
        { id: 1, name: "人员管理" },
        { id: 2, name: "机械管理" },
        { id: 3, name: "物料管理" },
        { id: 4, name: "安全管理" },
        { id: 5, name: "质量管理" },
        { id: 6, name: "进度管理" },
        { id: 7, name: "视频管理" },
        { id: 8, name: "系统管理" },
        { id: 9, name: "审核" },
        { id: 10, name: "查看" },
        { id: 11, name: "上传" },
        { id: 12, name: "下载" }
      ],
      titleLabor: "", // 标题
      seeBranch: false, // 创建班组弹窗
      screenForm: {
        //  筛选
        userName: ""
      },
      // 自定义表单验证
      rulesForm: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        memo: [{ required: true, message: "请输入备注", trigger: "blur" }],
        permissionName: [
          { required: false, message: "请选择权限", trigger: "change" }
        ]
      }
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
          sysRoleId: val.sysRoleId
        });
        //禁用
      } else {
        data = JSON.stringify({
          status: 1,
          sysRoleId: val.sysRoleId
        });
      }
      var url =
        "/systemUrl/smart/auth/" + sessionStorage.getItem("userId") + "/role";
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
    handleCheckedRoleChange() {
      console.log(this.formTeam.permissionName);
    },
    // 表格加载请求
    getTable(val) {
      if (val == 0) {
        this.loading = true;
      }
      setTimeout(() => {
        // console.log(this);//this对象为vue实例
        this.loading = false;
      }, 1000);
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        roleName: this.screenForm.userName
      });
      //请求
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/role/management";
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
        }
      });
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].sysRoleId;
        ids.push(id);
      }
      return ids;
    },
    //  新增
    addClick() {
      this.titleLabor = "新增角色";
      this.dialogVisibleTeam = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑";
      var id = row.sysRoleId;
      this.formTeam.sysRoleId = id;
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/role/" +
        id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.formTeam = JSON.parse(JSON.stringify(result));
          this.$set(this.formTeam, "permissionName", result.permissions);
          // this.formTeam.permissionName=result.permissions;
        }
      });
      //  this.formTeam = JSON.parse(JSON.stringify(row));
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
            "/role";
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
      ids.push(row.sysRoleId);
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          let url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/role";
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
          if (form.sysRoleId == null) {
            var data = JSON.stringify({
              roleName: form.roleName,
              memo: form.memo,
              permissions: form.permissionName
            });
            let url =
              "/systemUrl/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/role";
            this.http
              .post(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message("添加成功！");
                  this.cloneTeamForm(refTeam);
                  this.loading = true;
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
          } else {
            var url =
              "/systemUrl/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/role";
            var data = JSON.stringify({
              roleName: form.roleName,
              memo: form.memo,
              permissions:form.permissionName,
              sysRoleId: form.sysRoleId
            });
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message("编辑成功！");
                  this.getTable();
                  this.loading = true;
                  this.cloneTeamForm(refTeam);
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
</style>

