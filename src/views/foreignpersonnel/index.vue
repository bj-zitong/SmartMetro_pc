<template>
  <el-container>
    <el-header>
      <div class="search-Box">
        <span style="margin-left:30px">姓名：</span>
        <el-input
          placeholder="请输入姓名"
          icon="search"
          id="searchUname"
          style="width:120px;margin-top:33px"
          v-model="searchUname"
        ></el-input>
        <span style="margin-left:40px">来访单位：</span>
        <el-input
          placeholder="请输入来访单位"
          icon="search"
          id="jobNum"
          style="width:140px;"
          v-model="searchNum"
        ></el-input>
        <el-button
          type="primary"
          plain
          @click="handleUserList"
          icon="el-icon-search"
          style="margin-left:20px"
        >搜索</el-button>
      </div>
    </el-header>
    <!-- 表格-->
    <el-main>
      <div class="main-style">
        <div class="main-head">
           <el-button type="success" plain @click="dialogFormVisible = true" icon="el-icon-plus">新增</el-button>
          <el-button type="danger" plain @click="deleteAll">删除</el-button>
          <el-button type="warning" plain @click="poiExcel">导出</el-button>
        </div>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            stripe
            :header-cell-style="{background:'#0058A2'}"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="userId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="userName" label="姓名" style="width:120px;"></el-table-column>
            <el-table-column prop="jobNum" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="age" label="来访单位"></el-table-column>
            <el-table-column prop="createTime" label="被访部门"></el-table-column>
            <el-table-column prop="createTime" label="被访人姓名"></el-table-column>
            <el-table-column prop="createTime" label="来访事由"></el-table-column>
            <el-table-column prop="createTime" label="来访时间"></el-table-column>
            <el-table-column prop="createTime" label="进出方向"></el-table-column>
            <el-table-column prop="createTime" label="考勤设备"></el-table-column>
            <el-table-column prop="createTime" label="打卡时间"></el-table-column>
            <el-table-column label="操作" fixed="right" style="width:200px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)"
                  icon="el-icon-setting"
                  type="warning"
                  plain
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  icon="el-icon-delete"
                  plain
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
          -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            @prev-click="pre"
            @next-click="next"
            hide-on-single-page
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!--新增-->
  <div class="addUser-content">
    <el-dialog  :visible.sync="dialogFormVisible">
      <div class="button-head">
        <span class="button-head-title">外来人员登记</span>
      </div>
      <div class="login_box">
          <el-form
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :inline="true"
            :model="form"
            label-width="50px"
            action="http://192.168.1.164:8001/auth/user/baseUser">
            <!-- 固定项目 -->
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName" palceholder="请输入姓名" id="userName"></el-input>
            </el-form-item>
             <el-form-item label="身份证号" prop="phone">
              <el-input v-model="form.phone" palceholder="请输入身份证号" id="phone"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" palceholder="请输入联系电话" id="phone"></el-input>
            </el-form-item>     
            <el-form-item label="单位" prop="age">
              <el-input v-model="form.age" palceholder="请输入单位" id="age"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="nation">
              <el-input v-model="form.nation" palceholder="请输入车牌号" id="nation"></el-input>
            </el-form-item>
              <el-select v-model="profession" placeholder="请选择被访人部门" @change="selectProfession">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>          
            <el-form-item label="被访人姓名" prop="energencyContactName" id="emergencyContactName">
              <el-input v-model="form.energencyContactName" palceholder="请输入被访人姓名"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="来访事由" prop="presentAddress">
              <el-input v-model="form.presentAddress" palceholder="请输入来访事由" id="presentAddress"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="来访时间" prop="registrationAddrass">
              <el-input
                v-model="form.registrationAddrass"
                palceholder="请输入来访时间"
                id="registrationAddress"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="addUser">确定</el-button>
          </el-form>
      </div>
    </el-dialog>
    </div>   
    </el-main>
  </el-container>
</template>
<script>
// import addUser from '@/views/index/addUser'
export default {
  // name: 'addUser',
  // components: {
  //   'v-addUser': addUser
  // },
  data() {
    return {
       dialogFormVisible: false,
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: null,
      searchUname: null,
      options: [
        { id: 1, name: "焊工" },
        { id: 2, name: "钢筋工" },
        { id: 3, name: "电工" }
      ], // 渲染数据
      profession: "",
      professionName: "",
      jobNum: null,
      searchNum: null,
      companyIds: [
        { id: 1, name: "单位一" },
        { id: 2, name: "单位二" },
        { id: 3, name: "单位三" }
      ],
      companyId: "",
      companyName: "",
      organizationIds: [
        { id: 1, name: "班组一" },
        { id: 2, name: "班组二" },
        { id: 3, name: "班组三" }
      ],
      organizationId: "",
      orginizId: null,
      roles: [
        { id: 1, name: "角色一" },
        { id: 2, name: "角色二" },
        { id: 3, name: "角色三" }
      ],
      profession: "请选择工种",
      attribute: "请选择人员属性",
      companyId: "请选择承建单位",
      organizationId: "请选择班组",
      role: "请选择角色",
      attributes: [
        { id: 1, name: "内部员工" },
        { id: 2, name: "外来人员" },
        { id: 3, name: "供货商" }
      ],
      form: {
        userName: "",
        phone: "",
        radio: "男",
        age: null,
        nation: "",
        registrationAddrass: "",
        presentAddress: "",
        energencyContactPhone: "",
        energencyContactName: "",
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
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        registrationAddrass: [
          { required: true, message: "请输入户籍地址", trigger: "blur" }
        ],
        presentAddress: [
          { required: true, message: "请输入居住地", trigger: "blur" }
        ],
        energencyContactPhone: [
          { required: true, message: "请输入紧急联系人电话", trigger: "blur" }
        ],
        energencyContactName: [
          { required: true, message: "请输入紧急联系人姓名", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    // this.handleUserList()
    console.log("初始化调用list");
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.handleUserList()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      // this.handleUserList()
      // console.log(this.page)  //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    next(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
      addUser() {
      console.log("添加adduser");
      var datas = new FormData();
      console.log("添加的token"+sessionStorage.getItem('token'));
      var userName = $("#userName").val();
      console.log("userName"+userName);
      var phone = $("#phone").val();
      var age = $("#age").val();
      var nation = $("#nation").val();
      var profession = $("#profession").val();
      profession = this.professionName;
      var attribute = $("#attribute").val();
      attribute = this.attributeid;
      var companyId = $("#companyId").val();
      companyId = this.companyName;
      var organizationId = $("#organizationId").val();
      organizationId = this.orginizId;
      var emergencyContactName = $("#emergencyContactName").val();
      var emergencyContactPhone = $("#emergencyContactPhone").val();
      var presentAddress = $("#presentAddress").val();
      var registrationAddress = $("#registrationAddress").val();
      var roleIds = $("#roleIds").val();
      roleIds = this.roleid;
      // var gender=$("#gender").val();
      var gender = $('input[name="gender"]:checked').val();
      datas.append("userName", userName);
      datas.append("gender", gender);
      datas.append("phone", phone);
      datas.append("age", age);
      datas.append("nation", nation);
      datas.append("profession", profession);
      datas.append("attribute", attribute);
      datas.append("companyId", companyId);
      datas.append("organizationId", organizationId);
      datas.append("emergencyContactName", emergencyContactName);
      datas.append("emergencyContactPhone", emergencyContactPhone);
      datas.append("presentAddress", presentAddress);
      datas.append("registrationAddress", registrationAddress);
      var roles = [1, 2];
      datas.append("roleIds", roles);
      datas.append("photoFile", $("#photoFile")[0].files[0]);
      console.log("attribute------"+attribute);
      console.log("companyId------"+companyId);
      console.log("organizationId------"+organizationId);
      console.log("professionName------"+profession);
      console.log("roles------"+this.roleid);
      console.log(datas);
      var token=sessionStorage.getItem('token');
      console.log("token"+token);
  //获得值
      let _this = this;
        _this.$http({
            //头部信息及编码格式设置
            headers:{
               'Content-Type': 'multipart/form-data',
               'Authorization': sessionStorage.getItem('token')
            },
            method:'POST',//请求的方式
            url:'/api/auth/user/baseUser',//请求地址
            //传参
            data:datas
          })
            .then(function (response){
              var res=response.data;
              //请求失败
              if(res.code!="200"){
                alert(res.code);
              }
              //请求成功
              if(res.code=="200"){
                alert(res.code);
              }
            })
            .catch(function(error){
              console.log(error);
            });
      // $.ajax({
      //   url: 'http://192.168.1.164:8001/auth/user/baseUser',
      //     headers: {
      //           Authorization: 'eaaad1cb1ace4186bda0e26655e1a793032fadf85f5532ca6a61fa85523885a2'
      //       },
      //   data: datas,
      //   //  beforeSend: function(request) {
      //   //     request.setRequestHeader("Authorization:",token);
      //   // },
      //   type: "POST",
      //   async: true,
      //   dateType: "json",
      //   cache: false,
      //   processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      //   contentType: false, // 不设置Content-type请求头
      //   success: function(data) {
      //     var code = data.code;
      //     if (code == "200") {
      //       alert("添加成功");
      //       _this.$router.push("/index");
      //     }
      //   },
      //   error: function(XMLHttpRequest, textStatus, errorThrown) {
      //     console.log(textStatus+errorThrown);
      //   }
      // });
      this.dialogFormVisible = false;
    },
    // 列表请求
    handleUserList() {
      //   var _this = this
      //   // 获得当前用户的id
      //   var uid = sessionStorage.getItem('uid')
      //   var uname = $('#searchUname').val()
      //   var unum = $('#jobNum').val()
      //   var data = JSON.stringify({
      //     pageSize: _this.pageSize,
      //     page: _this.page,
      //     userName: uname,
      //     jobNum: unum,
      //     profession: _this.professionName,
      //     companyId: _this.companyName,
      //     organizationId: _this.orginizId
      //   })
      //   _this
      //     .$http({
      //       // 头部信息及编码格式设置
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: sessionStorage.getItem('token')
      //       },
      //       method: 'POST', // 请求的方式
      //       url: '/api/auth/user/' + uid, // 请求地址
      //       // 传参
      //       data: data
      //     })
      //     .then(function(response) {
      //       var res = response.data
      //       // 请求成功
      //       if (res.code == '200') {
      //         // alert('成功');
      //         _this.total = res.data.total
      //         // 获得列表数据
      //         _this.tableData = res.data.rows
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error)
      //     })
      //   // $.ajax({
      //   //   url:'http://192.168.1.100:8001/auth/user/'+uid,
      //   //   headers: {
      //   //       Authorization: sessionStorage.getItem('token')
      //   //   },
      //   //   type: "POST",
      //   //   data: data,
      //   //   async: true,
      //   //   dateType:'json',
      //   //    success: function (response) {
      //   //     var res=response.data;
      //   //     //请求成功
      //   //     if(res.code=="200"){
      //   //       // alert('成功');
      //   //        _this.total=res.data.total;
      //   //        //获得列表数据
      //   //        _this.tableData=res.data.rows;
      //   //         }
      //   //   },
      //   //  error: function(XMLHttpRequest, textStatus, errorThrown){
      //   //         console.log(textStatus);
      //   //     }
      //   // })
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.userId;
      var userid = sessionStorage.getItem("uid");
      var uids = [uid];
      this.$http({
        // 头部信息及编码格式设置
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        method: "DELETE", // 请求的方式
        url: "/api/auth/user/" + userid, // 请求地址
        // 传参
        data: uids
      })
        .then(function(response) {
          var res = response.data;
          // 请求失败
          if (res.code != "200") {
            alert("用户名或密码错误，请重新输入");
          }
          // 请求成功
          if (res.code == "200") {
            alert("删除成功");
            window.location.reload();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // poi导出
    poiExcel() {
      // //获得token
      var token = sessionStorage.getItem("token");
      var uname = $("#searchUname").val();
      var unum = $("#jobNum").val();
      let _this = this;
      _this.companyName == 1;
      if (_this.companyName == null) {
      }
      const link = document.createElement("a");
      var data = JSON.stringify({
        userName: uname,
        jobNum: unum,
        profession: _this.professionName,
        companyId: 1,
        organizationId: _this.orginizId,
        pageSize: _this.pageSize,
        page: _this.page
      });
      _this
        .$http({
          // 头部信息编码格式
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          method: "POST",
          url: "/api/auth/user/excel/" + 1,
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
            " Subway-User-" +
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
      // console.log("选中的ids"+ids);
      //  this.multipleSelection = val;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      // 删除用户id
      var userid = sessionStorage.getItem("uid");
      var uids = ids;
      this.$http({
        // 头部信息及编码格式设置
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        method: "DELETE", // 请求的方式
        url: "/api/auth/user/" + userid, // 请求地址
        // 传参
        data: uids
      })
        .then(function(response) {
          var res = response.data;
          // 请求失败
          if (res.code != "200") {
            alert("用户名或密码错误，请重新输入");
          }
          // 请求成功
          if (res.code == "200") {
            alert("删除成功");
            window.location.reload();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.search-Box {
  /* width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1); */
  width: 1600px;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}
.main-style {
  width: 1600px;
  height: 744px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin-top: 40px;
}
.main-head {
  margin-top: 20px;
  margin-left: 30px;
  position: absolute;
  height: 50px;
  width: 1540px;
  display: block;
}
.table-content {
  width: 1540px;
  height: 500px;
  /* background:rgba(0,88,162,1);
      opacity:1;
      border-radius: 4px 4px 0px 0px;*/
  margin-top: 80px;
  margin-left: 10px;
  position: absolute;
}
.addUser-content{
  margin-top:50px;
  height: 300px;
  width: 200px;
}
 .button-head {
    width: 105.5%;
    height: 40px;
    margin-left: -20px;
    background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
    text-align: center;
  }
    /* 按钮文字 */
    .button-head-title {
      width: 56px;
      height: 31px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 31px;
      letter-spacing: 20px;
      opacity: 1;
      text-align: center;
    }
      
      .login_box{
        width: 100%;
        height: 800px;
        
       
      }
       .el-form {
        padding: 32px;
        bottom: 0;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        /* margin-top:30px; */
      } 

      .el-form-item {
        width: 260px;
        height: 35px;
        background: rgba(239, 239, 239, 1);
        border: 1px solid rgba(225, 225, 225, 1);
        opacity: 1;
        border-radius: 4px;
      }
</style>
