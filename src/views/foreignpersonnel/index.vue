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
            <el-table-column type="selection" width="65" prop="id" @selection-change="changeFun"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="idNum" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="phone" label="电话" width="150"></el-table-column>
            <el-table-column prop="company" label="来访单位" width="150"></el-table-column>
            <el-table-column prop="intervieweeDepartment" label="被访部门" width="100"></el-table-column>
            <el-table-column prop="interviewee" label="被访人姓名" width="100"></el-table-column>
            <el-table-column prop="visitReason" label="来访事由" width="120"></el-table-column>
            <el-table-column prop="visitTime" label="来访时间" width="200"></el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" class="T-R-B-Green">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" class="T-R-B-Grey">删除</el-button>
                <el-button size="mini" @click="getDetail(scope.row)" class="T-R-B-Orange">查看详情</el-button>
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
          class="page-end"
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
    <!--新增-->
    <div style="text-align:center">
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="450px"
        title="外来人员登记"
        :show-close="false"
        class="popupDialog"
        :center="true"
      >
        <div class="login_box">
          <el-form
            label-width="80px"
            class="demo-ruleForm"
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :model="form"
            action="http://192.168.1.164:8001/auth/user/baseUser"
          >
            <el-form-item prop="id">
              <el-input v-model="form.id" type="text" hidden></el-input>
            </el-form-item>
            <el-form-item prop="userName" label="用户名">
              <el-input v-model="form.userName" type="text" placeholder="用户名"></el-input>
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
            <el-form-item prop="carNum" label="车牌号">
              <el-input v-model="form.carNum" placeholder="车牌号"></el-input>
            </el-form-item>
            <el-form-item label="被访人部门" prop="profession">
              <el-select
                v-model="form.profession"
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
            <el-form-item prop="intervieweeReason" label="来访事由">
              <el-input v-model="form.intervieweeReason" placeholder="来访事由"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="intervieweeDate" label="日期">
              <el-date-picker
                v-model="form.intervieweeDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <div class="dialog-footer" style="text-align:center;">
              <el-button @click="dialogFormVisible = false" class="F-Grey" round>取 消</el-button>
              <el-button
                type="primary"
                @click="addUser('form')"
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
      :visible.sync="dialogFormVisibleDetail"
      width="300px"
      title="外来人员详情"
      :show-close="false"
      class="popupDialog"
      :center="true"
    >
      <p>姓名 ： xxxxx</p>
      <p>身份证号 ： xxxxx</p>
      <p>电话 ： xxxxx</p>
      <p>来访单位 ： xxxxx</p>
      <p>被访部门 ： xxxxx</p>
      <p>被访人姓名 ： xxxxx</p>
      <p>来访事由 ： xxxxx</p>
      <p>来访时间 ： xxxxx</p>
      <div class="dialog-footer" style="text-align:center;margin-top:20px;">
        <el-button @click="dialogFormVisibleDetail = false" class="F-Grey" round>取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  data() {
    return {
      token: null, // token
      dialogFormVisible: false,
      dialogFormVisibleDetail: false,
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
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
        userName: "",
        idNum: "",
        phone: null,
        company: null, // 单位
        carNum: "", // 车牌号
        profession: "", // 被访部门
        interviewee: "", // 被访姓名
        intervieweeReason: "", // 被访来由
        intervieweeDate: "", // 来访时间
        dialogFormVisible: false,
        id: null
      },
      formRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        idNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        company: [{ required: true, message: "请输入单位", trigger: "blur" }],
        carNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        profession: [
          { required: true, message: "请选择被访部门", trigger: "change" }
        ],
        interviewee: [
          { required: true, message: "请输入被访人姓名", trigger: "blur" }
        ],
        intervieweeReason: [
          { required: true, message: "请输入被访事由", trigger: "blur" }
        ],
        intervieweeDate: [
          { required: true, message: "请选择被访时间", trigger: "change" }
        ]
      }
    };
  },
  created: function() {
    this.handleUserList();
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    getDetail(row) {
      var id = row.id;
      this.form.id = id;
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/" +
        id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
        }
      });
      this.dialogFormVisibleDetail = true;
    },
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size; //每页下拉显示数据
      // this.handleUserList()
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.handleUserList(); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    // 下拉框获得值
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.form.profession = obj.id;
    },
    addUser(form) {
      //获得所选的form表单
      this.$refs[form].validate(valid => {
        if (valid) {
          var form = this.$refs["form"].model;
          if (form.id == null) {
            var idNumState = this.IdentityCode(form.idNum);
            if (!idNumState) {
              this.$message("身份证号格式不正确！");
              return;
            }
            var params = JSON.stringify({
              name: form.userName,
              phone: form.phone,
              idNum: form.idNum,
              company: form.company,
              intervieweeDepartmentId: form.profession,
              busNum: form.carNum,
              interviewee: form.interviewee,
              visitReason: form.intervieweeReason,
              visitTime: form.intervieweeDate
            });
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/outlander";
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
              }
            });
            this.dialogFormVisible = false;
          } else {
            if (form.idNum != undefined) {
              var idNumState = this.IdentityCode(form.idNum);
              if (idNumState == false) {
                this.$message("身份证号格式不正确！");
                return;
              }
            }
            var params = JSON.stringify({
              name: form.userName,
              phone: form.phone,
              idNum: form.idNum,
              company: this.form.company,
              intervieweeDepartmentId: this.form.profession,
              busNum: this.form.carNum,
              interviewee: this.form.interviewee,
              visitReason: this.form.intervieweeReason,
              visitTime: this.form.intervieweeDate
            });
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/outlander/" +
              form.id;
            this.http.put(url, params).then(res => {
              if (res.code == 200) {
                this.dialogFormVisible = false;
              }
            });
            this.dialogFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    //身份证号校验
    IdentityCode(code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var pass = true;
      var msg = "验证成功";
      //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
          code
        )
      ) {
        pass = false;
        msg = "身份证号格式错误";
      } else if (!city[code.substr(0, 2)]) {
        pass = false;
        msg = "身份证号地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if (parity[sum % 11] != code[17].toUpperCase()) {
            pass = false;
            msg = "身份证号校验位错误";
          }
        }
      }
      return pass;
    },
    // 列表请求
    handleUserList() {
      // 获得搜索的内容
      var uname = this.formInline.searchNum;
      var unum = this.formInline.searchUname;
      //   // 获得当前用户的id
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: uname,
        company: unum
      });
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/management";
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
          id: 1,
          name: "地铁安保部",
          idNum: "210234567898765876",
          phone: 15236985236,
          company: "安保部一",
          intervieweeDepartment: "部门一",
          interviewee: "123",
          visitReason: "123",
          visitTime: 2020 - 4 - 12
        },
        {
          id: 2,
          name: "22222222",
          idNum: "210234567898765789",
          phone: 111,
          company: "44444",
          intervieweeDepartment: "44444",
          interviewee: "1111",
          visitReason: "44444",
          visitTime: 1
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.id;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/outlander";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTalks();
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
      var uid = row.id;
      this.form.id = uid;
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/outlander/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
        }
      });
      this.dialogFormVisible = true;
    },
    // poi导出
    poiExcel() {
      // //获得token
      // var token = sessionStorage.getItem("token");
      var uname = this.formInline.searchNum;
      var unum = this.formInline.searchUname;
      let _this = this;
      var data = JSON.stringify({
        name: uname,
        company: unum,
        pageSize: _this.pageSize,
        page: _this.page
      });
      var url =
        "/smart/worker/roster/" +
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
        var id = arrays[i].id;
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
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/outlander";
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
    }
  }
};
</script>
<style scoped lang="stylus">
.container {
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
