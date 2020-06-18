<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名">
            <el-input v-model="formInline.searchUname" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="来访单位" class="region">
            <el-input v-model="formInline.searchNum" placeholder="来访单位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUserList" style="margin-left:30px;">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <el-button @click="dialogFormVisible = true" class="T-H-B-DarkBlue">新增</el-button>
        <el-button @click="deleteAll" class="T-H-B-Grey" style="margin-left:30px;">删除</el-button>
        <el-button @click="poiExcel" class="T-H-B-Cyan" style="margin-left:30px;">导出</el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            stripe
            :header-cell-style="headClass"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="poutlanderId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="idNum" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="phone" label="电话" width="150"></el-table-column>
            <el-table-column prop="company" label="来访单位" width="150"></el-table-column>
            <el-table-column prop="intervieweeDepartmentId" label="被访部门" width="100">
               <template slot-scope="scope">
                  <span v-if="scope.row.intervieweeDepartmentId==1">部门一</span>
                  <span v-if="scope.row.intervieweeDepartmentId==2">部门二</span>
                  <span v-if="scope.row.intervieweeDepartmentId==3">部门三</span>
               </template>
            </el-table-column>
            <el-table-column prop="interviewee" label="被访人姓名" width="100"></el-table-column>
            <el-table-column prop="visitReason" label="来访事由" width="120"></el-table-column>
            <el-table-column prop="visitTime" label="来访时间" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200"></el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" class="T-R-B-Green">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" class="T-R-B-Grey">删除</el-button>
                <el-button size="mini" @click="getDetail(scope.row)" class="T-R-B-Orange">查看详情</el-button>
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
          @pagination="handleUserList"
        />
      </el-main>
    </div>
    <!--新增-->
    <div style="text-align:center;">
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="650px"
        title="外来人员登记"
        :show-close="false"
        class="popupDialog"
        :center="true"
        :lockScroll="true"
      >
        <div class="login_box">
          <el-form
            label-width="120px"
            class="demo-ruleForm"
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :model="form"
            action="http://192.168.1.164:8001/auth/user/baseUser"
            :label-position="labelPosition"
          >
            <el-form-item prop="id" v-show="false">
              <el-input v-model="form.id" type="text" hidden></el-input>
            </el-form-item>
            <el-form-item prop="name" label="用户名">
              <el-input v-model="form.name" type="text" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="idNum" label="身份证号">
              <el-input v-model="form.idNum" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="电话">
              <el-input v-model="form.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item prop="company" label="单位">
              <el-input v-model="form.company" placeholder="单位"></el-input>
            </el-form-item>
            <el-form-item prop="busNum" label="车牌号">
              <el-input v-model="form.busNum" placeholder="车牌号"></el-input>
            </el-form-item>
            <el-form-item label="被访人部门" prop="intervieweeDepartmentId">
              <el-select
                v-model="form.intervieweeDepartmentId"
                placeholder="请选择被访人部门"
                @change="selectProfession"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="interviewee" label="被访人姓名">
              <el-input v-model="form.interviewee" placeholder="被访人姓名"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="visitReason" label="来访事由">
              <el-input v-model="form.visitReason" placeholder="来访事由"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="visitTime" label="日期">
              <el-date-picker
                v-model="form.visitTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <div class="dialog-footer" style="text-align:center;">
              <el-button @click.native="cancel('form')" class="F-Grey" round>取 消</el-button>
              <el-button
                type="primary"
                @click.native="addUser('form')"
                style="margin-left:60px;"
                class="F-Blue"
                round
              >确 定</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <!-- 详情-->
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
              姓名:
              <span>{{form.name}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              身份证号:
              <span>{{form.idNum}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              来访单位:
              <span>{{form.company}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              被访部门:
              <span v-if="form.intervieweeDepartmentId==1">部门一</span>
              <span v-if="form.intervieweeDepartmentId==2">部门二</span>
              <span v-if="form.intervieweeDepartmentId==3">部门三</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              被访人姓名:
              <span>{{form.interviewee}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              来访事由:
              <span>{{form.visitReason}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              电话:
              <span>{{form.phone}}</span>
            </div>
          </el-col>
           <el-col :span="10">
            <div class="grid-content bg-purple">
              来访时间:
              <span>{{form.visitTime}}</span>
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
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../components/pagination";
import rules from "@/utils/rules";
export default {
  name: "container",
  components: {
    Pagination
  },
  data() {
    return {
      labelPosition: 'left',
      token: null, // token
      dialogFormVisible: false,
      dialogFormVisibleDetail: false,
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: null, //总条数
      ids: null, //选中的id
      searchUname: null, // 搜索
      searchNum: null,
      id: null,
      options: [
        // 来访部门
        { id: "", name: "请选择来访部门" },
        { id: 1, name: "部门一" },
        { id: 2, name: "部门二" },
        { id: 3, name: "部门三" }
      ],
      formInline: {
        searchUname: null, // 搜索
        searchNum: null
      },
      form: {
        name: "",
        idNum: "",
        phone: null,
        company: null, // 单位
        busNum: "", // 车牌号
        intervieweeDepartmentId: "", // 被访部门
        interviewee: "", // 被访姓名
        visitReason: "", // 被访来由
        visitTime: "", // 来访时间
        dialogFormVisible: false,
        poutlanderId: null
      },
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        idNum: [
          {
            required: true,
            trigger: "blur",
            validator: rules.FormValidate.Form().IdentityCode
          }
        ],
        company: [{ required: true, message: "请输入单位", trigger: "blur" }],
        busNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        intervieweeDepartmentId: [
          { required: true, message: "请选择被访部门", trigger: "change" }
        ],
        interviewee: [
          { required: true, message: "请输入被访人姓名", trigger: "blur" }
        ],
        visitReason: [
          { required: true, message: "请输入被访事由", trigger: "blur" }
        ],
        visitTime: [
          { required: true, message: "请选择被访时间", trigger: "change" }
        ]
      },
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  activated: function() {
    this.handleUserList();
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    getDetail(row) {
      var id = row.poutlanderId;
      this.form.poutlanderId = id;
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/" +
        id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          var form = this.form;
          form.name = result.name;
          form.idNum = result.idNum;
          form.phone = result.phone;
          form.company = result.company;
          form.intervieweeDepartmentId = result.intervieweeDepartmentId;
          form.interviewee = result.interviewee;
          form.busNum = result.busNum;
          form.visitReason = result.visitReason;
          form.visitTime = result.visitTime;
          form.poutlanderId = id;
        }
      });
      this.dialogFormVisibleDetail = true;
    },
    // 下拉框获得值
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.form.intervieweeDepartmentId = obj.id;
    },
    addUser(form1) {
      //获得所选的form表单
      this.$refs[form1].validate(valid => {
        if (valid) {
          var form = this.$refs["form"].model;
          if (form.poutlanderId == null) {
            var params = JSON.stringify({
              name: form.name,
              phone: form.phone,
              idNum: form.idNum,
              company: form.company,
              intervieweeDepartmentId: form.intervieweeDepartmentId,
              busNum: form.busNum,
              interviewee: form.interviewee,
              visitReason: form.visitReason,
              visitTime: form.visitTime
            });
            var url =
              "/bashUrl/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/outlander";
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                 this.$message({
                  type: "success",
                  message: "添加成功!"
                 });
                 this.handleUserList();
                 this.cancel(form1);
              }
            });
            this.dialogFormVisible = false;
          } else {
            var params = JSON.stringify({
              name: form.name,
              phone: form.phone,
              idNum: form.idNum,
              company: this.form.company,
              intervieweeDepartmentId: this.form.intervieweeDepartmentId,
              busNum: this.form.busNum,
              interviewee: this.form.interviewee,
              visitReason: this.form.visitReason,
              visitTime: this.form.visitTime,
              poutlanderId:form.poutlanderId
            });
            var url =
              "/bashUrl/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/outlander";
            this.http.put(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "修改成功!"
              });
              this.handleUserList();
               this.cancel(form1);
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
      Object.assign(this.$data.form, this.$options.data().form); //数据初始化
      this.dialogFormVisible = false;
    },
    // 列表请求
    handleUserList() {
      // 获得搜索的内容
      var unum = this.formInline.searchNum;
      var uname = this.formInline.searchUname;
      //   // 获得当前用户的id
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        name: uname,
        company: unum
      });
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          var rows = res.data.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.poutlanderId;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/outlander";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.handleUserList();
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
    //编辑 回显
    handleEdit(row) {
      // 用户id
      var uid = row.poutlanderId;
      this.form.poutlanderId = uid;
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.form=result;
        }
      });
      this.dialogFormVisible = true;
    },
    // poi导出
    poiExcel() {
      // //获得token
      // var token = sessionStorage.getItem("token");
      var unum = this.formInline.searchNum;
      var uname = this.formInline.searchUname;
      let _this = this;
      var data = JSON.stringify({
        name: uname,
        company: unum,
        pageSize: _this.pageSize,
        page: _this.page
      });
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/export";
      this.http.post(url, data).then(res => {
        // // 创建Blob对象，设置文件类型
        // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
        // let objectUrl = URL.createObjectURL(blob) // 创建URL
        // location.href = objectUrl;
        // URL.revokeObjectURL(objectUrl); // 释放内存
        // 创建Blob对象，设置文件类型
        // 自定义文件下载名称  Subway-User-20191223114607
        var d = new Date();
        var month = d.getMonth() + 1;
        var excelName =
          "Subway-User-" +
          d.getFullYear() +
          month +
          d.getDate() +
          d.getHours() +
          d.getMinutes() +
          d.getSeconds();
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel"
        });
        let objectUrl = URL.createObjectURL(blob); // 创建URL
        link.href = objectUrl;
        link.download = excelName; // 自定义文件名
        link.click(); // 下载文件
        URL.revokeObjectURL(objectUrl); // 释放内存
        // alert("调用导出！");
      });
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].poutlanderId;
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
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/outlander";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.handleUserList();
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped lang="stylus">
.container {
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
    // background: #99a9bf;
  }

  .bg-purple {
    // background: #d3dce6;
  }

  .bg-purple-light {
    // background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 14px;

    span {
      color: rgba(0, 88, 162, 1);
    }
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

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
    margin-bottom: 40px;
  }

  .main-content {
    padding-top: 30px;
    margin-left: 30px;
    margin-right: 30px;

    .search-head {
      margin-left: 30px;
    }

    .region {
      margin-left: 60px;
    }

    el-input {
      width: 180px;
    }
  }

  .table-main {
    margin-top: -30px;

    .table-head {
      height: 550px;
      padding: 30px;
    }

    .table-content {
      margin-top: 30px;
    }

    .page-end {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
