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
            <el-button type="primary" @click="handleUserList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <el-button @click="dialogFormVisible = true" class="addStyle">
          <span class="addStyle-title">新增</span>
        </el-button>
        <el-button @click="deleteAll" class="deleteStyle">
          <span class="deleteStyle-title">删除</span>
        </el-button>
        <el-button @click="poiExcel" class="exportStyle">
          <span class="poiExcel-title">导出</span>
        </el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            stripe
            :header-cell-style="{background:'#0058A2'}"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="userId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="idNum" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="phone" label="电话" width="150"></el-table-column>
            <el-table-column prop="company" label="来访单位" width="150"></el-table-column>
            <el-table-column prop="profession" label="被访部门" width="100"></el-table-column>
            <el-table-column prop="interviewee" label="被访人姓名" width="100"></el-table-column>
            <el-table-column prop="intervieweeReason" label="来访事由" width="120"></el-table-column>
            <el-table-column prop="intervieweeDate" label="来访时间" width="100"></el-table-column>
            <el-table-column prop="direction" label="进出方向" width="100"></el-table-column>
            <el-table-column prop="attendanceEquipment" label="考勤设备" width="100"></el-table-column>
            <el-table-column prop="createTime" label="打卡时间" width="150" fixed="right"></el-table-column>
            <el-table-column label="操作" style="width:500px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" type="success">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="info">删除</el-button>
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
          hide-on-single-page
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
    <!--新增-->
    <div style="text-align:center">
      <el-dialog :visible.sync="dialogFormVisible" style="width:45%;center:true" title="外来人员登记">
        <div class="login_box">
          <el-form
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :model="form"
            action="http://192.168.1.164:8001/auth/user/baseUser"
          >
            <el-form-item prop="userName" label="用户名">
              <el-input v-model="form.userName" type="text" placeholder="用户名" style="width:290px;"></el-input>
            </el-form-item>
            <el-form-item prop="idNum" label="身份证号">
              <el-input v-model="form.idNum" placeholder="身份证号" style="width:270px;"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="电话">
              <el-input v-model="form.phone" placeholder="联系电话" style="width:270px;"></el-input>
            </el-form-item>
            <el-form-item prop="company" label="单位">
              <el-input v-model="form.company" placeholder="单位" style="width:270px;"></el-input>
            </el-form-item>
            <el-form-item prop="carNum" label="车牌号">
              <el-input v-model="form.carNum" placeholder="车牌号" style="width:290px;"></el-input>
            </el-form-item>
            <el-form-item label="被访人部门">
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
            <el-form-item prop="interviewee" style="margin-top:20px" label="被访人姓名">
              <el-input v-model="form.interviewee" placeholder="被访人姓名" style="width:285px"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="intervieweeReason" label="来访事由">
              <el-input v-model="form.intervieweeReason" placeholder="来访事由" style="width:275px"></el-input>
            </el-form-item>
            <br />
            <el-form-item prop="intervieweeDate" label="日期">
              <el-date-picker
                v-model="form.intervieweeDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              ></el-date-picker>
            </el-form-item>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser('form')">确 定</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: null, // token
      dialogFormVisible: false,
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      ids: null, //选中的id
      searchUname: null, // 搜索
      searchNum: null,
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
        dialogFormVisible: false
      },
      formRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ],
        idNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        company: [{ required: true, message: "请输入单位", trigger: "blur" }],
        carNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        profession: [
          { required: true, message: "请选择被访部门", trigger: "blur" }
        ],
        interviewee: [
          { required: true, message: "请输入被访人姓名", trigger: "blur" }
        ],
        intervieweeReason: [
          { required: true, message: "请输入被访事由", trigger: "blur" }
        ],
        intervieweeDate: [
          { required: true, message: "请选择被访时间", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    this.handleUserList();
  },
  methods: {
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
    //取消
    concel() {
      this.dialogFormVisible = false;
    },
    addUser(form) {
      var params = JSON.stringify({
        userName: this.form.userName,
        phone: this.form.phone,
        idNum: this.form.idNum,
        company: this.form.company,
        profession: this.form.profession,
        carNum: this.form.carNum,
        interviewee: this.form.interviewee,
        intervieweeReason: this.form.intervieweeReason,
        intervieweeDate: this.form.intervieweeDate
      });
      // 获得值
      // let _this = this
      // _this.$http({
      //       // 头部信息及编码格式设置
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': sessionStorage.getItem('token')
      //   },
      //   method: 'POST', // 请求的方式
      //   url: '/api/auth/user/baseUser', // 请求地址
      //       // 传参
      //   data: datas
      // })
      //       .then(function (response) {
      //         var res = response.data
      //         // 请求失败
      //         if(res.code != '200') {
      //           alert(res.code)
      //         }
      //         // 请求成功
      //         if(res.code == '200') {
      //           alert(res.code)
      //         }
      //       })
      //       .catch(function(error) {
      //         console.log(error)
      //       })
      this.dialogFormVisible = false;
    },
    // 列表请求
    handleUserList() {
      // 获得搜索的内容
      var uname = this.searchNum;
      var unum = this.searchUname;
      //   // 获得当前用户的id
      // var  uid = sessionStorage.getItem('uid')
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        userName: uname,
        idNum: unum
      });
      var url = "";
      var result = [
        {
          userId: 1,
          userName: "地铁安保部",
          idNum: "210234567898765876",
          phone: 15236985236,
          company: "安保部一",
          profession: "部门一",
          interviewee: "123",
          intervieweeReason: "123",
          intervieweeDate: "2020-4-12",
          direction: "22222222",
          attendanceEquipment: "22222222",
          createTime: 2020 - 4 - 12
        },
        {
          userId: 2,
          userName: "22222222",
          idNum: "210234567898765789",
          phone: 111,
          company: "44444",
          profession: "44444",
          interviewee: "1111",
          intervieweeReason: "44444",
          intervieweeDate: "444",
          direction: "444",
          attendanceEquipment: 44444,
          createTime: 1
        }
      ];
      this.tableData = result;
      //  this.$http({
      //       // 头部信息及编码格式设置
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: sessionStorage.getItem('token')
      //       },
      //       method: 'POST', // 请求的方式
      //       url: url, // 请求地址
      //       // 传参
      //       data: data
      //     })
      //     .then(function(response) {
      //       var res = response.data
      //       // 请求成功
      //       if (res.code == '200') {
      //         this.total = res.data.total
      //         // 获得列表数据
      //         this.tableData = res.data.rows
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error)
      //     })
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.userId;
      var url = "";
      this.$http({
        // 头部信息及编码格式设置
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        method: "DELETE", // 请求的方式
        url: url, // 请求地址
        // 传参
        data: uid
      })
        .then(function(response) {
          var res = response.data;
          // 请求失败
          if (res.code != "200") {
          }
          // 请求成功
          if (res.code == "200") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑
    handleEdit(row) {
      // 用户id
      var uid = row.userId;
    },
    // poi导出
    poiExcel() {
      // //获得token
      // var token = sessionStorage.getItem("token");
      var uname = this.userName;
      var unum = this.company;
      let _this = this;
      var data = JSON.stringify({
        userName: uname,
        company: unum,
        pageSize: _this.pageSize,
        page: _this.page
      });
      var url = "";
      _this
        .$http({
          // 头部信息编码格式
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          method: "POST",
          url: url,
          data: {
            userParams: data
          },
          responseType: "arraybuffer"
        })
        .then(function(res) {
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
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(blob); // 创建URL
          link.href = objectUrl;
          link.download = excelName; // 自定义文件名
          link.click(); // 下载文件
          URL.revokeObjectURL(objectUrl); // 释放内存
          // alert("调用导出！");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      var url = "";
      // this.$http({
      //   // 头部信息及编码格式设置
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: sessionStorage.getItem('token')
      //   },
      //   method: 'DELETE', // 请求的方式
      //   url: url, // 请求地址
      //   // 传参
      //   data: ids
      // })
      //   .then(function(response) {
      //     var res = response.data
      //     // 请求失败
      //     if (res.code != '200') {
      //     }
      //     // 请求成功
      //     if (res.code == '200') {
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error)
      //   })
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
    height: 500px;
    padding: 30px;

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
  // line-height: 19px;
  color: rgba(99, 99, 99, 1);
  opacity: 1;
}
.exportStyle {
  width: 80px;
  height: 35px;
  background: linear-gradient(
    180deg,
    rgba(58, 222, 214, 1) 0%,
    rgba(0, 150, 143, 1) 100%
  );
  opacity: 1;
  border-radius: 4px;
}
.poiExcel-title {
  width: 33px;
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  // line-height: 19px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}

    .addStyle-title {
      color: #ffffff;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 19px;
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
      line-height: 19px;
      color: rgba(99, 99, 99, 1);
      opacity: 1;
    }

    .exportStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(58, 222, 214, 1) 0%,
        rgba(0, 150, 143, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .poiExcel-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 19px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }

  .table-content {
    margin-top: 30px;
  }

  .page-end {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

<style lang="stylus">
.el-dialog__header {
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
}
</style>
