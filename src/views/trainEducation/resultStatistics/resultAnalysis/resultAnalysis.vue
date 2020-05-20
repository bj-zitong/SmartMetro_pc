<template>
  <!-- 成績分析 -->
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="培训类型：" class="region">
            <el-select v-model="formInline.trainingType" placeholder="请选择培训类型">
              <el-option label="类型一" value="1"></el-option>
              <el-option label="类型二" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryClick">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>
    <div class="echarts-box">
      <div id="myChart" :style="{width: '90%', height: '500px'}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      formInline: {
        trainingType: ""
      }
    };
  },
  activated() {
    this.drawLine();
    this.getDatalist();
  },
  methods: {
    drawLine() {
      //  获取echarts
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      //  绘制图表
      myChart.setOption({
        title: {
          //  标题
          text: "人员成绩统计分析图", //   主标题内容
          x: "46%" //   x轴左边便宜
        },
        tooltip: {}, //  鼠标悬浮
        xAxis: {
          //  x轴配置
          name: "分数(分)", // 坐标轴名称
          nameTextStyle: {
            //   坐标轴名称字体设置
            color: "#C0C0C0"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: { color: "rgb(51,51,51)" },
          axisLine: {
            lineStyle: { color: "rgb(237,237,255)" }
          },
          data: ["0-50", "51-60", "61-70", "71-80", "81-90", "91-100"]
        },
        yAxis: {
          name: "人数(个)",
          type: "value",
          nameTextStyle: {
            color: "#C0C0C0"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#EDEDFF"],
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: { color: "rgb(51,51,51)" },
          axisLine: {
            lineStyle: { color: "rgb(237,237,255)" }
          }
        },
        series: [
          {
            name: "分数",
            type: "bar",
            barWidth: 45,
            itemStyle: {
              normal: {
                color: "#5D95E0" //  柱状图颜色
              }
            },
            markPoint: {
              symbol: "pin", //标记(气泡)的图形
              symbolSize: 50, //标记(气泡)的大小
              itemStyle: {
                normal: {
                  borderColor: "#5D95E0",
                  borderWidth: 1, // 标注边线线宽，单位px，默认为1
                  label: {
                    show: true
                  }
                }
              },
              data: [
                //配置项
                { value: "12", xAxis: 0, yAxis: 50 },
                { value: "32", xAxis: 51, yAxis: 60 },
                { value: "16", xAxis: 61, yAxis:70 },
                { value: "23", xAxis: 71, yAxis: 80 },
                { value: "45", xAxis: 81, yAxis: 90 },
                { value: "35", xAxis: 91, yAxis: 100 }
              ]
            },
            data: [12, 32, 16, 23, 45, 35]
          }
        ]
      });
    },
    getDatalist() {
      var type =
        this.formInline.trainingType == ""
          ? "1"
          : this.formInline.trainingType;
         
      var url =
        "/smart/worker/train/" +
        sessionStorage.getItem("userId") +
        "/score/" +
        type +
        "/chart";

      this.http.get(url, {}).then(res => {
        if (res.code == 200) {
        }
      });
    },
    queryClick() {
         this.getDatalist();
    }
  }
};
</script>

<style lang="stylus" scoped>
.echarts-box {
  padding: 32px 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}
</style>

<style lang="stylus">
.el-message-box {
  width: 350px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 10px;
}

.el-message-box__content {
  margin-bottom: 25px;
}

.el-table__row td {
  text-align: center;
}

.detDel {
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
}

.el-message-box__btns button:nth-child(2) {
  margin-left: 56px;
}

.cancelClone {
  background: linear-gradient(180deg, rgba(225, 225, 225, 1) 0%, rgba(190, 190, 190, 1) 100%);
}
</style>