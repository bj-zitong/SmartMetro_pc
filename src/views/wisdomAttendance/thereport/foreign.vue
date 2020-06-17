<template>
  <div class="foreign">
    <el-container class="left_echarts">
      <div id="main" style="width: 700px;height: 426px;"></div>
      <div class="boxbtn">
        <el-button
          v-for="(item,index) in lists"
          :key="index"
          :class="[idx == index?'active':'btn']"
          @click="isActive(index)"
        >{{item}}</el-button>
      </div>
    </el-container>
    <el-container class="right_echarts">
      <div class="sign">
        <p v-for="(item,index) in backColor" :key="index" :style="item"></p>
      </div>
      <div class="sign_classify">
        <p v-for="(item,index) in arrs" :key="index" :style="item">{{item.name}}</p>
      </div>
      <div class="sign_classify_price">
        <p v-for="(item,index) in arrs" :key="index" :style="item">{{item.value}}%</p>
      </div>
    </el-container>
    <el-container class="bottom_echarts">
      <div id="alarmtrendEcharts" style="width:100%;height:300px;"></div>
    </el-container>
  </div>
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
      opinioSn: [],
      switchState: ["year", "quarter", "month", "week"],
      opinionData: [
        { value: 335, name: "工长" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ],
      arr: [],
      arrs:null,
      backColor:[]
    };
  },
  methods: {
    drawPie(id, data) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}%"
        },
        legend: {
          orient: "vertical",
          left: 100,
          x: "left",
          data: []
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
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
            data: data
          }
        ]
      });
    },
    //今日人员趋势图
    alarmtrendCharts(arr) {
      let alarmtrend = echarts.init(
        document.getElementById("alarmtrendEcharts")
      );
      let sizeFun = function() {
        alarmtrend.resize();
      };
      window.addEventListener("resize", sizeFun);
      alarmtrend.setOption({
        title: {
          text: "今日工作人员趋势图",
          subtext: "",
          top: "10%",
          left: "20",
          textStyle: {
            color: "#333333",
            fontWeight: "bold",
            fontSize: 12
          }
        },
        grid: {
          // width:315 //调整折线图的宽度
          top: 80,
          x: 50,
          x2: 50,
          y2: 30
        },
        // backgroundColor: "#011a33",
        tooltip: {
          backgroundColor: "rgb(255,153,255,0.5)",
          padding: [10, 20, 10, 8],
          textStyle: {
            fontSize: 12,
            lineHeight: 24
          },
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              type: "dashed",
              color: "#ff99ff"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // 改变x轴颜色
          axisLine: {
            lineStyle: {
              color: "#009cff",
              width: 0.3
            }
          },
          data: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ],
          // 轴刻度
          axisTick: {
            show: false
          },
          // 轴网格
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0, //横轴信息全部显示
            textStyle: {
              color: "#009cff",
              fontSize: 15
            }
          }
        },
        yAxis: {
          name: "人数(人)",
          axisTick: {
            show: false //轴刻度不显示
          },

          min: 0,
          // 改变y轴颜色
          axisLine: {
            lineStyle: {
              color: "#009cff",
              width: 0.3
            }
          },
          // 轴网格
          splitLine: {
            show: true,
            lineStyle: {
              color: "#009cff",
              width: 0.3
            }
          },
          //坐标轴文字样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#009cff",
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: "当前人数",
            type: "line",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#71BCFE" },
                  { offset: 1, color: "#050A62" }
                ])
              }
            },
            symbol: "none", // 折线无拐点
            lineStyle: {
              normal: {
                width: 0 //折线宽度
              }
            },
            smooth: true,
            data: arr
          }
        ]
      });
    },
    isActive(index) {
      let _this = this;
      this.idx = index;
       this.backColor=[]
      var url =
        " /bashUrl/smart/worker/reports/" +
        sessionStorage.getItem("userId") +
        "/chart/" +
        this.switchState[index];
      this.http.post(url, {}).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].itemStyle = { color: this.randomRgb(i) };
        }
        var arrs = res.data.map(function(item) {
          return {
            name: item.company,
            value: item.days,
            itemStyle: item.itemStyle
          };
        });
        this.arrs=arrs
        this.drawPie("main", arrs);
      });
    },
    randomRgb(item) {
      let R = Math.floor(Math.random() * 130 + 110);
      let G = Math.floor(Math.random() * 130 + 110);
      let B = Math.floor(Math.random() * 130 + 110);
      this.backColor.push(' border: 20px solid rgba(' + R + ',' + G + ',' + B + ')' )
      return "rgb(" + R + "," + G + "," + B + ")";
    },
    //今日工作人员趋势图
    TrendChartOfday() {
      var url =
        "/bashUrl/smart/worker/reports/" +
        sessionStorage.getItem("userId") +
        "/chart/today";
      this.http.post(url, null).then(res => {
        // this.arr = res.data
        this.alarmtrendCharts(res.data);
      });
    }
  },
  //调用
  activated() {
    this.$nextTick(function() {
      this.isActive(0);
      // this.drawPie("main");
      this.alarmtrendCharts();
      this.TrendChartOfday();
    });
  }
};
</script>
<style scoped lang="stylus">
.foreign {
  width: 100%;
  padding: 0 25px;
}

.left_echarts {
  width: 60%;
  height: 422px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
  // margin-left: 25px;
  float: left;
}

.right_echarts {
  width: 37%;
  height: 422px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
  float: left;
  margin-left: 30px;
}

.bottom_echarts {
  width: 99%;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
  float: left;
  // margin-left: 27px;
  margin-top: 30px;
}

.boxbtn {
  width: 138px;
  margin-right: 77px;
  margin-top: 65px;
  // margin-top: 30px;
  // text-align: center;
  // margin-left: 80px;
  float: left;
}

.quan {
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 1);
  border: 4px solid rgba(79, 197, 234, 1);
  opacity: 1;
  border-radius: 13px;
}

.right_echarts {
  .sign {
    width: 60px;
    height: 280px;
    margin-left: 111px;
    margin-top: 10px;

    p {
      width: 15px;
      height: 15px;
      background: rgba(255, 255, 255, 1);
      // border: 4px solid rgba(79, 197, 234, 1);
      opacity: 1;
      border-radius:20px;
      margin-top: 15px;
    }
  }

  .sign_classify {
    width: 200px;
    height: 280px;
    margin-top: 10px;

    p {
      margin-top: 35px;
    }
  }

  .sign_classify_price {
    width: 80px;
    height: 280px;
    margin-top: 10px;

    p {
      margin-top: 35px;
    }
  }
}

.active {
  font-size: 12px;
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
  opacity: 1;
  border-radius: 4px;
  width: 138px;
  height: 35px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  text-align: center;
  padding: 0;
  margin-top: 30px;
  margin-left: 0;
}

.btn {
  width: 138px;
  height: 35px;
  padding: 0;
  margin-top: 30px;
  font-size: 12px;
  text-align: center;
  background: rgba(246, 247, 248, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 4px;
  margin-left: 0;
}
</style>