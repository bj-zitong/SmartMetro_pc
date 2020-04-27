<template>
  <el-container>
    <el-header>
      <div class="search-Box">
       <span>姓名：</span>
        <el-input
          placeholder="请输入姓名"
          icon="search"
          id="searchUname"
          style="width:120px"
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
        <el-button type="primary" plain @click="handleUserList" icon="el-icon-search" style="margin-left:20px">搜索</el-button>
        <!-- <el-button type="info" plain @click="refresh" icon="el-icon-refresh">刷新</el-button>
              <el-button type="warning" plain @click="poiExcel">导出</el-button>
              <el-button type="danger" plain @click="deleteAll">批量删除</el-button> <v-addUser></v-addUser>
        <el-button type="danger" plain @click="addUser2">123</el-button>-->
      </div>
    </el-header>
    <!-- 表格-->
    <el-main>
      <div class="main-style">
        <el-table :data="tableData" ref="multipleTable" @selection-change="changeFun" stripe border :header-cell-style="{background:'#0058A2'}">
          <el-table-column
            type="selection"
            width="65"
            prop="userId"
            @selection-change="changeFun"
          ></el-table-column>
          <el-table-column prop="userName" label="姓名" style="width:120px"></el-table-column>
          <el-table-column prop="jobNum" label="工号"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="organizationId" label="班组" :formatter="organId"></el-table-column>
          <el-table-column prop="profession" label="工种" :formatter="professionId"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="companyId" label="承建单位" :formatter="companyState"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: null,
      searchUname: null,
      options: [
        { id: 1, name: '焊工' },
        { id: 2, name: '钢筋工' },
        { id: 3, name: '电工' }
      ], // 渲染数据
      profession: '',
      professionName: '',
      jobNum: null,
      searchNum: null,
      companyIds: [
        { id: 1, name: '单位一' },
        { id: 2, name: '单位二' },
        { id: 3, name: '单位三' }
      ],
      companyId: '',
      companyName: '',
      organizationIds: [
        { id: 1, name: '班组一' },
        { id: 2, name: '班组二' },
        { id: 3, name: '班组三' }
      ],
      organizationId: '',
      orginizId: null,
      roles: [
        { id: 1, name: '角色一' },
        { id: 2, name: '角色二' },
        { id: 3, name: '角色三' }
      ],
      profession: '请选择工种',
      attribute: '请选择人员属性',
      companyId: '请选择承建单位',
      organizationId: '请选择班组',
      role: '请选择角色',
      attributes: [
        { id: 1, name: '内部员工' },
        { id: 2, name: '外来人员' },
        { id: 3, name: '供货商' }
      ],
      form: {
        userName: '',
        phone: '',
        radio: '男',
        age: null,
        nation: '',
        registrationAddrass: '',
        presentAddress: '',
        energencyContactPhone: '',
        energencyContactName: '',
        dialogFormVisible: false
      },
      formRules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ],
        nation: [{ required: true, message: '请输入民族', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        registrationAddrass: [
          { required: true, message: '请输入户籍地址', trigger: 'blur' }
        ],
        presentAddress: [
          { required: true, message: '请输入居住地', trigger: 'blur' }
        ],
        energencyContactPhone: [
          { required: true, message: '请输入紧急联系人电话', trigger: 'blur' }
        ],
        energencyContactName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }
        ]
      }
    }
  },
  created: function() {
    this.handleUserList()
    console.log('初始化调用list')
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size
      this.handleUserList()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page
      this.handleUserList()
      // console.log(this.page)  //点击第几页
    },
    pre(cpage) {
      this.page = cpage
      this.handleUserList()
    },
    next(cpage) {
      this.page = cpage
      this.handleUserList()
    },
    refresh() {
      window.location.reload() // 重新加载页面
    },
    // 列表请求
    handleUserList() {
      var _this = this
      // 获得当前用户的id
      var uid = sessionStorage.getItem('uid')
      var uname = $('#searchUname').val()
      var unum = $('#jobNum').val()
      var data = JSON.stringify({
        pageSize: _this.pageSize,
        page: _this.page,
        userName: uname,
        jobNum: unum,
        profession: _this.professionName,
        companyId: _this.companyName,
        organizationId: _this.orginizId
      })
      _this
        .$http({
          // 头部信息及编码格式设置
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
          method: 'POST', // 请求的方式
          url: '/api/auth/user/' + uid, // 请求地址
          // 传参
          data: data
        })
        .then(function(response) {
          var res = response.data
          // 请求成功
          if (res.code == '200') {
            // alert('成功');
            _this.total = res.data.total
            // 获得列表数据
            _this.tableData = res.data.rows
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      // $.ajax({
      //   url:'http://192.168.1.100:8001/auth/user/'+uid,
      //   headers: {
      //       Authorization: sessionStorage.getItem('token')
      //   },
      //   type: "POST",
      //   data: data,
      //   async: true,
      //   dateType:'json',
      //    success: function (response) {
      //     var res=response.data;
      //     //请求成功
      //     if(res.code=="200"){
      //       // alert('成功');
      //        _this.total=res.data.total;
      //        //获得列表数据
      //        _this.tableData=res.data.rows;
      //         }
      //   },
      //  error: function(XMLHttpRequest, textStatus, errorThrown){
      //         console.log(textStatus);
      //     }
      // })
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.userId
      var userid = sessionStorage.getItem('uid')
      var uids = [uid]
      this.$http({
        // 头部信息及编码格式设置
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        },
        method: 'DELETE', // 请求的方式
        url: '/api/auth/user/' + userid, // 请求地址
        // 传参
        data: uids
      })
        .then(function(response) {
          var res = response.data
          // 请求失败
          if (res.code != '200') {
            alert('用户名或密码错误，请重新输入')
          }
          // 请求成功
          if (res.code == '200') {
            alert('删除成功')
            window.location.reload()
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // poi导出
    poiExcel() {
      // //获得token
      var token = sessionStorage.getItem('token')
      var uname = $('#searchUname').val()
      var unum = $('#jobNum').val()
      let _this = this
      _this.companyName == 1
      if (_this.companyName == null) {
      }
      const link = document.createElement('a')
      var data = JSON.stringify({
        userName: uname,
        jobNum: unum,
        profession: _this.professionName,
        companyId: 1,
        organizationId: _this.orginizId,
        pageSize: _this.pageSize,
        page: _this.page
      })
      _this
        .$http({
          // 头部信息编码格式
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          method: 'POST',
          url: '/api/auth/user/excel/' + 1,
          data: {
            userParams: data
          },
          responseType: 'arraybuffer'
        })
        .then(function(res) {
          // // 创建Blob对象，设置文件类型
          // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
          // let objectUrl = URL.createObjectURL(blob) // 创建URL
          // location.href = objectUrl;
          // URL.revokeObjectURL(objectUrl); // 释放内存
          // 创建Blob对象，设置文件类型
          // 自定义文件下载名称  Subway-User-20191223114607
          var d = new Date()
          var month = d.getMonth() + 1
          var excelName =
            ' Subway-User-' +
            d.getFullYear() +
            month +
            d.getDate() +
            d.getHours() +
            d.getMinutes() +
            d.getSeconds()
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          let objectUrl = URL.createObjectURL(blob) // 创建URL
          link.href = objectUrl
          link.download = excelName // 自定义文件名
          link.click() // 下载文件
          URL.revokeObjectURL(objectUrl) // 释放内存
          // alert("调用导出！");
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    changeFun() {
      var ids = new Array()
      var arrays = this.$refs.multipleTable.selection
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId
        ids.push(id)
        // console.log("获得id"+arrays[i].userId);
      }
      return ids
      // console.log("选中的ids"+ids);
      //  this.multipleSelection = val;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun()
      // 删除用户id
      var userid = sessionStorage.getItem('uid')
      var uids = ids
      this.$http({
        // 头部信息及编码格式设置
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        },
        method: 'DELETE', // 请求的方式
        url: '/api/auth/user/' + userid, // 请求地址
        // 传参
        data: uids
      })
        .then(function(response) {
          var res = response.data
          // 请求失败
          if (res.code != '200') {
            alert('用户名或密码错误，请重新输入')
          }
          // 请求成功
          if (res.code == '200') {
            alert('删除成功')
            window.location.reload()
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.search-Box {
  width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
}
.main-style {
  width: 1600px;
  height: 874px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
}
</style>
