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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人基本信息 -->
        <el-tab-pane label="个人基本信息" name="second" class="information">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  姓名:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">性别:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">年龄:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  民族:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">工种:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">电话:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  承建单位:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">部门:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">紧急联系人:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  电话:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">现居住地:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">籍贯:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  婚姻状况:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">学位:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">文化程度:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  证件类型:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">户口类型:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">证件编码:</div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  班组长:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  参加培训:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">持证上岗:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">居住证:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  居住证办理日期:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  特殊工种体检情况:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">班组:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">政治面貌:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  一寸照片:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 合同信息 -->
        <el-tab-pane label="合同信息" name="third">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  项目编号:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  项目名称:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  合同编号:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  合同期限:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  结算方式:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  所属企业组织机构代码:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 工资记录 -->
        <el-tab-pane label="工资记录" name="fourth">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  工资单编号:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放金额:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放日期:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放方式:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放银行:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  银行卡号:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 资质证书 -->
        <el-tab-pane label="资质证书" name="certificate">
          <div class="AddEquipment_form" style="background:#ccc">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  真伪查询:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书名称:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书类型:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  专业编码:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书等级:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  发证日期:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  有效时间:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  资格状态:
                  <span></span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  附件上传:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 历史评价记录 -->
        <el-tab-pane label="历史评价记录" name="evaluate">
          <div class="AddEquipment_form">

            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  评价记录:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 来源地消息 -->
        <el-tab-pane label="来源地消息" name="first">
             <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  职务:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">到京时间:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">返京地:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  返京地风险程度:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否有湖北接触史:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否有疑似人员:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  是否有确诊人员:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否到京:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">到京方式:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  列车/航班:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">隔离情况:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否满足返岗条件:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  返场时间:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">返京制约因素:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">备注:</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
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
  data() {
    return {
      changOrder: false,
      activeName: "second"
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
    handleClick() {}
  },

  //监听
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
