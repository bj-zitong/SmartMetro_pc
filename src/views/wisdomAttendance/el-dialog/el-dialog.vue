<template>
  <div>
    <el-dialog
      :visible.sync="modalShow"
      width="450px"
      :before-close="modalClose"
      class="add-dialog"
      :show-close="false"
    >
      <div class="addUser-content">
        <h6 class="dialogTitle">出入记录</h6>
        <div>
          <div>
            <p>作业区域：</p>
            <p>昌平三班南段</p>
          </div>
          <div>
            <p>作业设备：</p>
            <p>打卡时间：西南侧挖掘机设备一台</p>
          </div>
          <div>
            <p>打卡时间：</p>
            <p>2019/12/12 10：30：23 出</p>
          </div>
        </div>
        <div>
          <div>
            <p>作业区域：</p>
            <p>昌平三班南段</p>
          </div>
          <div>
            <p>作业设备：</p>
            <p>打卡时间：西南侧挖掘机设备一台</p>
          </div>
          <div>
            <p>打卡时间：</p>
            <p>2019/12/12 10：30：23 出</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      modalShow: true
    };
  },
  methods: {
    init() {
      this.modalShow = true;
    },
    modalClose() {
      this.modalShow = false;
    }
  }
};
</script>

<style scoped lang="stylus">
.add-dialog /deep/ {
  .el-dialog__body, .el-dialog__header {
    padding: 0px;
  }

  .dialogTitle {
    width: 450px;
    height: 60px;
    background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
    opacity: 1;
    border-radius: 4px 4px 0px 0px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    margin: 0;
  }

  .addUser-content div {
    margin-left: 30px;
    padding-bottom: 30px;
    div{
       margin-top :20px 
    }
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 19px;
      color: rgba(99, 99, 99, 1);
      opacity: 1;
      float: left;
    }
    p:nth-child(2n){
        color #0058A2;
    }
  }
}
</style>