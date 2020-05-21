<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="角色名：" prop="userName">
            <el-input v-model="screenForm.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTable()">查询</el-button>
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
          <el-table-column prop="status" label="状态" min-width="80"></el-table-column>
          <el-table-column prop="memo" label="备注" min-width="110"></el-table-column>
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
          <el-button class="F-Grey" round @click="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click="submitTeamForm('refTeam')">确 定</el-button>
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
        { id: 6, name: "环境管理" },
        { id: 7, name: "进度管理" },
        { id: 8, name: "视频管理" },
        { id: 9, name: "系统管理" },
        { id: 10, name: "审核" },
        { id: 11, name: "查看" },
        { id: 12, name: "上传" },
        { id: 13, name: "下载" }
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
  created() {
    // 页面加载时获取信息
    this.getTable();
  },
  methods: {
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        roleName: this.screenForm.userName
      });
      //请求
      var url =
        "/smart/auth/" + sessionStorage.getItem("userId") + "/role/management";
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
          sysRoleId: 1,
          roleName: "张三",
          status: "使用中",
          permissionName: "项目负责人",
          memo: "15236985236",
          createTime: "2019-10-01"
        },
        {
          sysRoleId: 2,
          roleName: "李四",
          status: "使用中",
          permissionName: "项目负责人",
          memo: "13752369875",
          createTime: "2019-10-01"
        }
      ];
      this.tableData = result;
      this.total = result.length;
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
    //选中的角色
    handleCheckedRoleChange() {
      // let obj = new Array();
      // obj = this.options.find(item => {
      //   return item.id == vid; // 筛选出匹配数据
      // });
      // this.formTeam.roles = obj.id;
    },
    //  新增
    addClick() {
      this.titleLabor = "新增角色";
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
          let url = "/smart/auth/" + sessionStorage.getItem("userId") + "/role";
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
      ids.push(row.sysRoleId);
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          let url = "/smart/auth/" + sessionStorage.getItem("userId") + "/role";
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
          if (form.sysRoleId == null) {
            var data = JSON.stringify({
              roleName: form.roleName,
              memo: form.memo,
              permissions: form.permissionName
            });
            let url =
              "/smart/auth/" + sessionStorage.getItem("userId") + "/role";
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
                return false;
              });
            this.dialogVisibleTeam = false;
          } else {
            var url =
              "/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/role/" +
              form.sysRoleId;
            var data = JSON.stringify({
              roleName: form.roleName,
              memo: form.memo,
              permissions: form.permissionName
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
                return false;
              });
            this.dialogVisibleLabor = false;
          }
        } else {
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

