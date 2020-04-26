<template>
  <div class="wrapper">
    <el-alert
      title="自定义的通知(notify)组件"
      type="success"
      description="自定义的通知组件支持在全局使用 <notification /> 以及使用 api 的形式来调用">
    </el-alert>
    <el-row class="animate-wrapper">
      进入动画：
      <el-select v-model="enterAnimated" filterable placeholder="请选择(可搜索)">
        <el-option
          v-for="item of options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      离开动画：
      <el-select v-model="leaveAnimated" filterable placeholder="请选择(可搜索)">
        <el-option
          v-for="item of options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="danger" plain @click="emitNotify(enterAnimated, leaveAnimated)">触发</el-button>
    </el-row>

    <div class="split">
      <el-divider><i class="el-icon-eleme"></i></el-divider>
    </div>

    <div style="margin-top: 20px">
      <el-button type="primary" plain @click="doNotify">弹出通知叠加</el-button>
      <el-popover
        :tabindex="-1"
        placement="top-start"
        width="200"
        trigger="hover"
        content="正常情况下，在一次事件中调用多次通知，会出现重叠">
        <i class="el-icon-question" slot="reference" style="margin-right: 20px; color: #409EFF; font-size: 20px; cursor: pointer;"></i>
      </el-popover>

      <el-button type="success" plain @click="usePromise">promise弹出不叠加的通知</el-button>
      <el-popover
        :tabindex="-1"
        placement="top-start"
        width="200"
        trigger="hover"
        content="使用 Promise 来解决这个问题">
        <i class="el-icon-question" slot="reference" style="margin-right: 20px; color: #409EFF; font-size: 20px; cursor: pointer;"></i>
      </el-popover>

      <el-button type="success" plain @click="useSetTimeout">setTimeout弹出不叠加的通知</el-button>
      <el-popover
        :tabindex="-1"
        placement="top-start"
        width="200"
        trigger="hover"
        content="使用 setTimeout 来解决这个问题">
        <i class="el-icon-question" slot="reference" style="margin-right: 20px; color: #409EFF; font-size: 20px; cursor: pointer;"></i>
      </el-popover>
    </div>
    <div class="split">
      <el-divider><i class="el-icon-eleme"></i></el-divider>
    </div>
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>

  </div>
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
