<template>
  <div class="container">
    <div class="main-content">
      <el-main class="button-head">
        <el-button @click="dialogFormVisible = true" class="addStyle">
          <span class="addStyle-title">新增</span>
        </el-button>
        <el-button @click="releaseNotice()" class="exportStyle">
          <span class="poiExcel-title">发布</span>
        </el-button>
        <el-button @click="centerDialogVisible = true" class="deleteStyle">
          <span class="deleteStyle-title">删除</span>
        </el-button>
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
              prop="userId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="noticeTitle" label="标题"></el-table-column>
            <el-table-column prop="noticeContent" label="内容"></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)"
                  type="success"
                  style="color:#FFFFFF"
                >编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="info">删除</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="warning">发布</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"
        -->
        <el-pagination
          class="page-view"
          background
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          hide-on-single-page
          :total="total"
        ></el-pagination>
      </el-main>
    </div>
    <div style="text-align:center">
      <el-dialog
        :visible.sync="dialogFormVisible"
        style="width:45%;center:true;left:28%;"
        title="公告"
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
            <el-form-item prop="noticeTitle" style="margin-top:20px" label="标题:">
              <el-input v-model="form.noticeTitle" placeholder style="width:285px"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="noticeContent" label="内容:">
              <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.noticeContent"></el-input>
            </el-form-item>
            <br />
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser('form')">确 定</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <!--删除弹框-->
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="18%"
        center="true"
        class="del"
        top="35vh"
        style="border-radius:10px;"
      >
        <div style="text-align:center">
          <span>确定删除吗?</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false" class="cancel-style">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false" class="confim-style">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: null, // token
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      ids: null, //选中的id
      dialogFormVisible: false, //添加默认弹框
      centerDialogVisible: false,
      form: {
        noticeContent: "", //内容
        noticeTitle: "" //标题
      },
      formRules: {
        noticeContent: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        noticeTitle: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.getTalks()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.getTalks();
      console.log(this.page); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      console.log("cpage" + cpage);
      // this.getTalks()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      console.log("下一页" + cpage);
      // this.getTalks()
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page
      });
      var url = "";
      var result = [
        {
          userId: 1,
          noticeTitle: "考试通知",
          noticeContent:
            "中铁二十二局昌平三班司机考试二卷试题中铁二十二局昌平三班司机考试二卷试题"
        },
        {
          userId: 2,
          noticeTitle: "考生通知",
          noticeContent:
            "中铁二十二局昌平三班司机考试二卷试题中铁二十二局昌平三班司机考试二卷试题"
        }
      ];
      this.tableData = result;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId;
        ids.push(id);
      }
      return ids;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      var url = "";
      this.centerDialogVisible = false;
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.userId;
      var url = "";
      console.log(uid);
    },
    //发布
    releaseNotice() {},
    addUser(form) {
      this.dialogFormVisible = false;
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

.glry {
  padding-top: 30px;

  .demo-form-inline {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.main-content {
  margin-top: 36px;
  margin-left: 30px;
  margin-right: 30px;

  .button-head {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;

    .addStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(54, 130, 243, 1) 0%,
        rgba(0, 88, 162, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
      text-align: center;
    }

    .addStyle-title {
      color: #ffffff;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      // line-height: 19px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }

    .deleteStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(225, 225, 225, 1) 0%,
        rgba(190, 190, 190, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .deleteStyle-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      opacity: 1;
    }

    .exportStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(180deg, rgba(252, 200, 121, 1) 0%, rgba(230, 149, 26, 1) 100%);
      opacity: 1;
      border-radius: 4px;
    }

    .poiExcel-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }

  .table-content {
    margin-top: 30px;
  }

  .page-view {
    text-align: center;
    margin-top: 30px;
  }
}

.cancel-style {
  width: 80px;
  height: 35px;
  background: linear-gradient(180deg, rgba(225, 225, 225, 1) 0%, rgba(190, 190, 190, 1) 100%);
  opacity: 1;
  border-radius: 18px;
  font-size: 14px;
}

.confim-style {
  width: 80px;
  height: 35px;
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
  opacity: 1;
  border-radius: 18px;
  font-size: 14px;
}
</style>
<style>
.el-dialog {
  opacity: 1;
  border-radius: 10px;
}
</style>


