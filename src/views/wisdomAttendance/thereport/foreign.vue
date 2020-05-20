<template>
  <div class="foreign">
    <el-container class="left_echarts">
      <div id="main" style="width: 813px;height: 426px;"></div>
      <div class="boxbtn">
        <el-button
          v-for="(item,index) in lists"
          :key="index"
          :class="[idx == index?'active':'btn']"
          @click="isActive(index)"
        >{{item}}</el-button>
        <!-- <el-button
          class="btn"
          style="background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);color:rgba(255,255,255,1);"
        >出勤天数（工时）/年</el-button>
        <br />
        <el-button class="btn">出勤天数（工时)/季度</el-button>
        <el-button class="btn">出勤天数（工时）/月</el-button>
        <el-button class="btn">出勤天数（工时）/周</el-button>-->
      </div>
    </el-container>
    <el-container class="right_echarts">
      <div class="sign">
        <p style="border:4px solid rgba(79,197,234,1)"></p>
        <p style="border:4px solid rgba(96,90,216,1)"></p>
        <p style="border:4px solid rgba(249,205,51,1)"></p>
        <p style="border:4px solid rgba(143,85,231,1)"></p>
        <p style="border:4px solid rgba(94,216,169,1)"></p>
        <p style="border:4px solid rgba(108,111,191,1)"></p>
        <p style="border:4px solid rgba(248,104,70,1)"></p>
        <p style="border:4px solid rgba(120,196,70,1)"></p>
        <p style="border:4px solid rgba(255,177,26,1)"></p>
      </div>
      <div class="sign_classify">
        <p>工长</p>
        <p>电梯安装工</p>
        <p>土方</p>
        <p>机修长</p>
        <p>水电工</p>
        <p style="padding-top:4px">消防安装工</p>
        <p>结构工</p>
        <p>筑路工</p>
        <p>电工</p>
      </div>
      <div class="sign_classify_price">
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
        <p>30%</p>
      </div>
    </el-container>
    <el-container class="bottom_echarts">
      <div id="foreignEcharts" style="width:100%;height: 350px;"></div>
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
      switchState: ["1", "2", "3", "4"],
      opinionData: [
        { value: 335, name: "工长" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    };
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
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
            data: [
              { value: 335, name: "工长", itemStyle: { color: "#4FC5EA" } },
              {
                value: 335,
                name: "电梯安装工",
                itemStyle: { color: "#605AD8" }
              },
              { value: 310, name: "土方", itemStyle: { color: "#F9CD33" } },
              { value: 234, name: "机修长", itemStyle: { color: "#8F55E7" } },
              { value: 135, name: "水电工", itemStyle: { color: "#5ED8A9" } },
              {
                value: 254,
                name: "消防安装工",
                itemStyle: { color: "#6C6FBF" }
              },
              { value: 35, name: "结构工", itemStyle: { color: "#F86846" } },
              { value: 145, name: "筑路工", itemStyle: { color: "#78C446" } },
              { value: 256, name: "电工", itemStyle: { color: "#FFB11A" } }
            ]
          }
        ]
      });
    },
    foreignEcharts(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "今日工作人员趋势图",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "right",
          data: ["蒸发量", "降水量"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    isActive(index) {
      this.idx = index;
      let _this = this;
      var data = JSON.stringify({
        name: "",
        jobNum: "",
        pageSize: "",
        page: ""
      });
      var url =
        " /smart/worker/reports/" +
        sessionStorage.getItem("userId") +
        "/chart/" +
        this.switchState[index];
      this.http.post(url, data).then(res => {});
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
      this.foreignEcharts("foreignEcharts");
    });
  }
};
</script>
<style scoped lang="stylus">
.foreign {
  width: 100%;
  margin: 0 25px;
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
  width: 35%;
  height: 422px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
  float: left;
  margin-left: 30px;
}

.bottom_echarts {
  width: 97.5%;
  height: 350px;
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
      width: 25px;
      height: 25px;
      background: rgba(255, 255, 255, 1);
      border: 4px solid rgba(79, 197, 234, 1);
      opacity: 1;
      border-radius: 13px;
      margin-top: 15px;
    }
  }

  .sign_classify {
    width: 200px;
    height: 280px;
    margin-top: 10px;

    p {
      margin-top: 21px;
    }
  }

  .sign_classify_price {
    width: 80px;
    height: 280px;
    margin-top: 10px;

    p {
      margin-top: 21.5px;
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