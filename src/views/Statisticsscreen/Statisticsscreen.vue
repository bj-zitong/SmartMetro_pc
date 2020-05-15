<template>
  <el-container class="statisticsScreen">
    <!-- 头部 -->
    <el-header class="Header" style="height: 88px;">
      <div class="Hea_left">
        <el-link type="primary" :underline="false" class="people">人员智慧管理</el-link>
      </div>
      <div class="Hea_center">
        <p>城市轨道交通智慧工地管理系统</p>
        <h6>13号线02标中铁二局</h6>
      </div>
      <div class="Hea_right"></div>
    </el-header>
    <el-main class="Main">
      <div class="dp_left">
        <!-- 工友须知 -->
        <div class="information">
          <div class="title">
            <span>工友须知</span>
          </div>
          <div class="information_announcement">
            <p style="margin-top :20px;">
              <span>[处分公告]</span>关于张三同志不遵守公司相关规定第十七章第五条的行政...
            </p>
            <p>
              <span>[处分公告]</span>关于张三同志不遵守公司相关规定第十七章第五条的行政...
            </p>
            <p>
              <span>[处分公告]</span>关于张三同志不遵守公司相关规定第十七章第五条的行政...
            </p>
            <p>
              <span>[处分公告]</span>关于张三同志不遵守公司相关规定第十七章第五条的行政...
            </p>
          </div>
        </div>
        <!-- 工种分析 -->
        <div class="analyze">
          <div class="title">
            <span>工种分析</span>
          </div>
          <div id="main" style="width:100%;height: 256px;"></div>
        </div>
        <!-- 工种分析 -->
        <div class="analyze">
          <div class="title">
            <span>年龄分布</span>
          </div>
          <div id="jobevaluation" style="width: 470px;height: 256px;"></div>
        </div>
        <!-- 诚信管理 -->
        <div class="integrity">
          <div class="title">
            <span>诚信管理</span>
          </div>
        </div>
      </div>
      <div class="dp_center">
        <div class="workerNumber">
          <p>>>工地人数实时预览</p>
          <div class="diagrammatic">
            <div class="title">
              <span>2020-4-28 19:46</span>
            </div>
            <div class="sum">
              <ul>
                <li>2</li>
                <li>6</li>
                <li>5</li>
                <li>9</li>
                <li>1</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tendencyMap">
             
        </div>
      </div>
      <div class="dp_right"></div>
    </el-main>
  </el-container>
</template>
<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      lists: [
        "出勤天数（工时）/年",
        "出勤天数（工时）/季度",
        "出勤天数（工时）/月",
        "出勤天数（工时）/周"
      ],
      idx: 0,
      charts: "",
      opinion: [],
      opinionData: [
        { value: 335, name: "结构工" },
        { value: 310, name: "消防安装工" },
        { value: 234, name: "工长" },
        { value: 135, name: "土方" },
        { value: 48, name: "电梯安装工" },
        { value: 348, name: "机修长" },
        { value: 248, name: "水电工" },
        { value: 548, name: "电工" },
        { value: 548, name: "筑路工" }
      ]
    };
  },
  methods: {
    //工种分析
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          //   left: 100,
          //   x: "left",
          right: 10,
          data: [
            "结构工",
            "消防安装工",
            "工长",
            "土方",
            "电梯安装工",
            "机修长",
            "水电工",
            "电工",
            "筑路工"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["30%", "50%"],
            center: ["32%", "45%"],
            avoidLabelOverlap: false,
            // label: {
            //   show: true,
            //   position: "center"
            // },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 335, name: "结构工" },
              { value: 310, name: "消防安装工" },
              { value: 234, name: "工长" },
              { value: 135, name: "土方" },
              { value: 48, name: "电梯安装工" },
              { value: 348, name: "机修长" },
              { value: 248, name: "水电工" },
              { value: 548, name: "电工" },
              { value: 548, name: "筑路工" }
            ]
          }
        ]
      });
    },
    //工种分析
    jobevaluation(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        calculable: true,
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "4%",
          right: "10%",
          bottom: "15%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "20-26",
              "20-26",
              "20-26",
              "20-26",
              "20-26",
              "20-26",
              "20-26"
            ],
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                color: "#309EFE"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //这是y轴文字颜色
              lineStyle: {
                color: "#309EFE"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              normal: { color: "#309EFE" }
            },
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
    },
    isActive(index) {
      console.log(index);
      this.idx = index;
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
      this.jobevaluation("jobevaluation");
    });
  }
};
</script>
<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

// 头部样式
.statisticsScreen {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#494166, #424b50) url('../../../static/image/Statisticsscreen/bj.png') center no-repeat;
  background-size: cover;
  overflow: hidden;

  .Header {
    width: 98%;
    height: 88px;
    margin: 0 auto;
    position: relative;
    margin-top: 5px;

    .people {
      padding: 13px 0 0 30px;
    }

    .Hea_left {
      float: left;
      width: 30%;
      height: 88px;
      background: url('../../../static/image/Statisticsscreen/he_left_bj.png') no-repeat;
      background-size: 100% 100%;
    }

    .Hea_center {
      height: 88px;
      background: url('/static/img/he_cneter_bj.c240eaa.png') no-repeat;
      background-size: 100% 100%;
      float: left;
      position: absolute;
      left: 28%;
      width: 44%;
      text-align: center;

      p {
        height: 31px;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold;
        line-height: 55px;
        color: rgba(2, 169, 255, 1);
        opacity: 1;
      }

      h6 {
        height: 19px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        line-height: 55px;
        color: rgba(159, 206, 255, 1);
        opacity: 1;
        font-weight: normal;
      }
    }

    .Hea_right {
      width: 30%;
      height: 88px;
      float: right;
      background: url('../../../static/image/Statisticsscreen/he_right_bj.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}

.Main {
  width: 95%;
  height: 100%;
  margin: 10px auto;

  .dp_left {
    float: left;
    width: 25%;

    .information {
      width: 100%;
      height: 154px;
      // background: rgba(50, 146, 255, 1);
      background: url('../../../static/image/Statisticsscreen/gzfx.png') no-repeat;
      background-size: 100% 100%;
      opacity: 1;
      text-align: center;

      .title {
        width: 100%;
        height: 19px;
        display: flex;
        justify-content: center;

        span {
          width: 96px;
          height: 25px;
          display: block;
          text-align: center;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
          background: url('../../../static/image/Statisticsscreen/title_box.png') no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 25px;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
        }
      }

      .information_announcement {
        p {
          margin-top: 10px;
          height: 16px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          // line-height: 60px;
          color: rgba(50, 146, 255, 1);
          opacity: 1;

          span {
            color: #AD511C;
          }
        }
      }
    }

    .analyze {
      width: 100%;
      height: 250px;
      // background: rgba(50, 146, 255, 1);
      background: url('../../../static/image/Statisticsscreen/gzfx.png') no-repeat;
      background-size: 100% 100%;
      opacity: 1;
      text-align: center;
      margin-top: 40px;

      .title {
        width: 100%;
        height: 19px;
        display: flex;
        justify-content: center;

        span {
          width: 96px;
          height: 25px;
          display: block;
          text-align: center;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
          background: url('../../../static/image/Statisticsscreen/title_box.png') no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 25px;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
        }
      }

      .information_announcement {
        p {
          margin-top: 10px;
          height: 16px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          // line-height: 60px;
          color: rgba(50, 146, 255, 1);
          opacity: 1;

          span {
            color: #AD511C;
          }
        }
      }
    }

    .integrity {
      width: 100%;
      height: 174px;
      // background: rgba(50, 146, 255, 1);
      background: url('../../../static/image/Statisticsscreen/gzfx.png') no-repeat;
      background-size: 100% 100%;
      opacity: 1;
      text-align: center;
      margin-top: 40px;

      .title {
        width: 100%;
        height: 19px;
        display: flex;
        justify-content: center;

        span {
          width: 96px;
          height: 25px;
          display: block;
          text-align: center;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
          background: url('../../../static/image/Statisticsscreen/title_box.png') no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 25px;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
        }
      }

      .information_announcement {
        p {
          margin-top: 10px;
          height: 16px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          // line-height: 60px;
          color: rgba(50, 146, 255, 1);
          opacity: 1;

          span {
            color: #AD511C;
          }
        }
      }
    }
  }

  .dp_center {
    width: 48%;
    float: left;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 40px;

    .workerNumber {
      height: 510px;
      background: url('../../../static/image/Statisticsscreen/gzfx.png') no-repeat;
      background-size: 100% 100%;

      .title {
        width: 100%;
        height: 26.63px;
        display: flex;
        justify-content: center;

        span {
          width: 227.4px;
          height: 26.63px;
          display: block;
          text-align: center;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
          background: url('../../../static/image/Statisticsscreen/timeFrame.png') no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 25px;
          color: rgba(0, 236, 252, 1);
          opacity: 1;
        }
      }

      p {
        height: 19px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 19px;
        color: rgba(0, 236, 252, 1);
        opacity: 1;
        padding: 6px 0 0 13px;
      }

      .diagrammatic {
        height: 480px;
        // background: red;
        margin-top: 10px;
        position: relative;

        .sum {
          ul {
            display: flex;
            justify-content: center;

            li {
              width: 32px;
              height: 46px;
              background: rgba(0, 19, 101, 1);
              border: 2px solid rgba(28, 153, 192, 1);
              box-shadow: 0px 3px 9px rgba(28, 153, 192, 0.28);
              opacity: 0.9;
              line-height: 46px;
              text-align: center;
              font-size: 25px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: rgba(159, 206, 255, 1);
              margin: 25px 25px 0 25px;
            }
          }
        }
      }
    }
    .tendencyMap{

    }
  }

  .dp_right {
    width: 25%;
    height: 500px;
    background: pink;
    float: left;
  }
}

.back {
  margin-top: 40px;
}

.el-header {
  padding: 0 0;
}
</style>