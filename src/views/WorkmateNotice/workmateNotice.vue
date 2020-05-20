<template>
  <div class="container">
    <div class="main-content">
      <el-main class="button-head">
        <el-button @click="dialogFormVisible = true" class="T-H-B-DarkBlue">新增</el-button>
        <el-button @click="releaseNotice()" class="T-H-B-Yellow" style="margin-left:30px;">发布</el-button>
        <el-button @click="deleteAll()" class="T-H-B-Grey" style="margin-left:30px;">删除</el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            :header-cell-style="{background:'#0058A2'}"
            stripe
          >
            <el-table-column
              type="selection"
              width="65"
              prop="pAnnouncementId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)" class="T-R-B-Green"
                >编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" class="T-H-B-Grey">删除</el-button>
                <el-button size="mini" @click="publishNotice(scope.row)" class="T-H-B-Yellow">发布</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getTalks"
        />
      </el-main>
    </div>
    <div style="text-align:center">
      <el-dialog
        :visible.sync="dialogFormVisible"
        style="width:45%;left:28%;"
        title="公告"
        :show-close="false"
      >
        <div class="login_box">
          <el-form
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :model="form"
            action="http://192.168.1.164:8001/auth/user/baseUser"
          >
            <el-form-item prop="pAnnouncementId">
              <el-input v-model="form.pAnnouncementId" type="text" hidden></el-input>
            </el-form-item>
            <el-form-item prop="title" style="margin-top:20px" label="标题:">
              <el-input v-model="form.title" placeholder style="width:285px"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="content" label="内容:">
              <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content"></el-input>
            </el-form-item>
            <br />
            <div class="dialog-footer">
              <el-button @click="cancel('form')" class="F-Grey" round>取 消</el-button>
              <el-button @click="addUser('form')" class="F-Blue" style="margin-left:60px;" round>确 定</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../components/pagination";
export default {
  name: "container",
  components: {
    Pagination
  },
  data() {
    return {
      token: null, // token
      // 动态数据
      tableData: [],
      total: 100, //总条数
      ids: null, //选中的id
      dialogFormVisible: false, //添加默认弹框
      form: {
        content: "", //内容
        title: "", //标题
        pAnnouncementId: null
      },
      formRules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      var url =
        "/smart/worker/announcement/" +
        sessionStorage.getItem("userId") +
        "/management";
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
          pAnnouncementId: 1,
          title: "考试通知",
          content:
            "中铁二十二局昌平三班司机考试二卷试题中铁二十二局昌平三班司机考试二卷试题",
          status: "提交"
        },
        {
          pAnnouncementId: 2,
          title: "考生通知",
          content:
            "中铁二十二局昌平三班司机考试二卷试题中铁二十二局昌平三班司机考试二卷试题",
          status: "提交"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pAnnouncementId;
        ids.push(id);
      }
      return ids;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/announcement/" + sessionStorage.getItem("userId");
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
    // 删除
    handleDelete(row) {
      // 删除用户id
      var ids = [];
      ids.push(row.pAnnouncementId);
      var data = JSON.stringify(ids);
      handleCofirm("确认删除")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/announcement/" + sessionStorage.getItem("userId");
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
    //发布
    releaseNotice() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择要发布的数据！");
        return;
      }
      handleCofirm("确认发布")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/announcement/" + sessionStorage.getItem("userId");
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "发布成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    publishNotice(row) {
      var id = row.pAnnouncementId;
      var ids = [];
      ids.push(id);
      handleCofirm("确认发布")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/announcement/" + sessionStorage.getItem("userId");
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "发布成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    //编辑 新增
    addUser(form) {
      this.$refs[form].validate(valid => {
        //校验
        if (valid) {
          var form = this.$refs["form"].model;
          if (form.pAnnouncementId == null) {
            //新增 id为空
            var params = JSON.stringify({
              title: form.title,
              content: form.content
            });
            var url =
              "/smart/worker/announcement/" + sessionStorage.getItem("userId");
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$refs[form].resetFields();
              }
            });
          } else {
            //新增 id为空
            var params = JSON.stringify({
              title: form.title,
              content: form.content,
              pAnnouncementId: form.pAnnouncementId
            });
            var url =
              "/smart/worker/announcement/" + sessionStorage.getItem("userId");
            this.http.put(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$refs[form].resetFields();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    //编辑
    handleEdit(row) {
      var uid = row.pAnnouncementId;
      this.form.pAnnouncementId = uid;
      var url =
        "/smart/worker/announcement/" +
        sessionStorage.getItem("userId") +
        "/detail/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
        }
      });
      this.form = row;
      this.dialogFormVisible = true;
    }
  }
};
</script>
<style scoped lang="stylus">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  color: #333;
  opacity: 1;
  border-radius: 10px;
  height: 100px;
}

.el-container {
  margin-bottom: 36px;
}

.main-content {
  margin-top: 36px;
  margin-left: 30px;
  margin-right: 30px;

  .button-head {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;
  }

  .table-content {
    margin-top: 30px;
  }
}
</style>



