<template>
  <el-dialog
    title
    :visible.sync="changOrder"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :show-close="false"
     width="80%"
  >
    <div class="AddEquipment_form">

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">姓名:<span>{{manager.name}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">性别:
             <span v-if="manager.gender==0">男</span>
            <span v-if="manager.gender==1">女</span>
            </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">年龄:<span>{{manager.age}}</span></div>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">民族:<span>{{manager.nation}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">电话:<span>{{manager.cellPhone}}</span></div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="grid-content bg-purple">部门:<span>{{data.nation}}</span></div>
        </el-col> -->
       </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">承建单位:<span>{{manager.buildCorpName}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">岗位/职责:<span>{{manager.nation}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">紧急联系人:<span>{{manager.urgentLinkMan}}</span></div>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">电话:<span>{{manager.urgentLinkManPhone}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">籍贯:<span>{{manager.birthPlaceCode}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">婚姻状况:<span>{{manager.maritalStatus}}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">学位:<span>{{manager.degree}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">文化程度:<span>{{manager.cultureLevelType}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">证件编码:<span>{{manager.idCardCode}}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">居住证:<span>{{manager.isResidencePermit}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">签发日期:<span>{{manager.residencePermitDate}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">人员类型:<span>{{manager.type}}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">政治面貌:<span>{{manager.politicsType}}</span></div>
        </el-col>
           <!-- <el-col :span="8">
          <div class="grid-content bg-purple">政治面貌:<span>{{data}}</span></div>
        </el-col> -->
      </el-row>
    </div>
    <template slot="footer" class="dialog-footer">
      <el-button type="default" @click="handleClose" round class="T-R-B-Grey">取消</el-button>
      <!-- <el-button type="primary" @click="handleSubmit">提交</el-button> -->
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "turntorepairorder",
  props:['data'],
  data() {
    return {
      changOrder: false,
      id:null,
      manager:null
    };
  },
  mounted(){
  },
  methods: {
    //页面初始化时加载的事件
    init() {
      this.changOrder = true;
    }, //关闭页面
    handleClose() {
      this.changOrder = false;
      this.$emit("tyonke", this.changOrder);
    }, //表单提交
    handleSubmit() {},
 //监听
  getDetail(){
    var _this =this
     var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/"+this.id;
      _this.http.get(url, null).then(res => {
        if (res.code == 200) {
          this.manager=res.data;
        }
      });
  }
},
  watch: {
    changOrder(newValue, oldValue) {
      this.changOrder = newValue;
      this.id=this.data;
      this.getDetail();
    }
  }
};
</script>

<style scoped lang="stylus">
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
    font-size:14px;
    span{
       color:rgba(0,88,162,1);
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
