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
          <div class="grid-content bg-purple">
            公司名称:
            <span>{{equipment.company}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            姓名:
            <span>{{equipment.name}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            年龄:
            <span>{{equipment.age}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            性别:
            <span v-if="equipment.gender==0">男</span>
            <span v-if="equipment.gender==1">女</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            手机号码:
            <span>{{equipment.cellPhone}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            证件类型:
            <span v-if="equipment.idCardType==0">身份证</span>
            <span v-if="equipment.idCardType==1">护照</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            政治面貌:
            <span>{{equipment.politicsType}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            证件编码:
            <span>{{equipment.idCardCode}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            籍贯:
            <span>{{equipment.birthPlaceCode}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            合同名称:
            <span>{{equipment.contractName}}</span>
          </div>
        </el-col>
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
  props: ["data"],
  data() {
    return {
      changOrder: false,
      id:null,
      equipment:null
    };
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
    getDatil() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/equipment/" +
        this.id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          // console.log(res.data)
          var result = res.data;
          this.equipment=result;
          // });
        }
      });
    }
  }, //监听
  watch: {
    changOrder(newValue, oldValue) {
      this.changOrder = newValue;
      this.id=this.data;
      this.getDatil();
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
  font-size: 14px;

  span {
    color: rgba(0, 88, 162, 1);
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
