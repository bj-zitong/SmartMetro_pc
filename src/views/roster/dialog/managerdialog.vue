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
          <!-- <div class="grid-content bg-purple">姓名:<span>{{data.name}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">性别:<span>{{data.gender}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">年龄:<span>{{data.age}}</span></div> -->
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">民族:<span>{{data.nation}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">电话:<span>{{data.cellPhone}}</span></div> -->
        </el-col>
        <!-- <el-col :span="8">
          <div class="grid-content bg-purple">部门:<span>{{data.nation}}</span></div>
        </el-col> -->
       </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">承建单位:<span>{{data.buildCorpName}}</span></div> -->
        </el-col>
        <!-- <el-col :span="8">
          <div class="grid-content bg-purple">岗位/职责:<span>{{data.nation}}</span></div>
        </el-col> -->
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">紧急联系人:<span>{{data.urgentLinkMan}}</span></div> -->
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">电话:<span>{{data.urgentLinkManPhone}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">籍贯:<span>{{data.birthPlaceCode}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">婚姻状况:<span>{{data.maritalStatus}}</span></div> -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">学位:<span>{{data.degree}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">文化程度:<span>{{data.cultureLevelType}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">证件编码:<span>{{data.idCardCode}}</span></div> -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">居住证:<span>{{data.isResidencePermit}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">居住证办理日期:<span>{{data.residencePermitDate}}</span></div> -->
        </el-col>
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">人员类型:<span>{{data.type}}</span></div> -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- <div class="grid-content bg-purple">政治面貌:<span>{{data.politicsType}}</span></div> -->
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
      changOrder: false
      // dome:data
    };
  },

  mounted(){


  },
  methods: {
    //页面初始化时加载的事件
    init() {
      //  alert("9999999")
      //  console.log(this.dome)
      this.changOrder = true;
      // console.log(11111111);
      // console.log(data);
    }, //关闭页面

    handleClose() {
      this.changOrder = false;
      this.$emit("tyonke", this.changOrder);
    }, //表单提交
    handleSubmit() {}
  }, //监听
  watch: {
    changOrder(newValue, oldValue) {
      this.changOrder = newValue;
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
