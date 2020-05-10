<template>
  <div class="LabourNewlyaddedbox">
    <el-container class="LabourNewlyadded">
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          
          <!-- 个人基本信息 -->
          <el-tab-pane label="个人基本信息" name="second" class="information">
            <personal></personal>
          </el-tab-pane>
          <!-- 合同信息 -->
          <el-tab-pane label="合同信息" name="third" disabled="false">
            <contract></contract>
          </el-tab-pane>
          <!-- 工资记录 -->
          <el-tab-pane label="工资记录" name="fourth" disabled="false">
            <payrollRecords></payrollRecords>
          </el-tab-pane>
          <!-- 资质证书 -->
          <el-tab-pane label="资质证书" name="certificate" disabled="false">
            <certificate></certificate>
          </el-tab-pane>
          <!-- 历史评价记录 -->
          <el-tab-pane label="历史评价记录" name="evaluate" disabled="false">
            <evaluationRecord></evaluationRecord>
          </el-tab-pane>
          <!-- 来源地消息 -->
          <el-tab-pane label="来源地消息" name="first" disabled="false">
            <asource></asource>
           
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
//来源地消息
import asource from "./addPersonnel/source";
//个人基本信息
import personal from "./addPersonnel/personal";
//合同信息
import contract from "./addPersonnel/contract";
//工资记录
import payrollRecords from "./addPersonnel/payrollRecords";
// 资质证书
import certificate from "./addPersonnel/certificate";
// 评价记录
import evaluationRecord from "./addPersonnel/evaluationRecord";

export default {
  components: {
    asource,
    personal,
    contract,
    payrollRecords,
    certificate,
    evaluationRecord
  },
  data() {
    return {
      activeName: "second",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //日历选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //图片上传
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      value1: "",
      value2: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange() {}
  }
};
</script>
<style scoped lang="stylus">
.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.LabourNewlyaddedbox {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 25px;
  padding: 0px;
}

.add {
  position: relative;
  top: 550px;
}

.Operationbutton {
  position: relative;
  top: 570px;
  right: 80px;
}

.information {
  height: 650px;
}
</style>