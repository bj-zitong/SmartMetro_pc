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
        <div class="information" @click="dialogTableVisible = true">
          <div class="title">
            <span>工友须知</span>
          </div>
          <div class="information_announcement">
            <p
              ref="con1"
              :class="{anim:animate==true}"
              v-for="(item,index) in textArr"
              :key="index"
            >
              <span>{{item.notice}}</span>
              {{item.noticeContent}}
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
        <!-- 年龄分布 -->
        <div class="analyze">
          <div class="title">
            <span>年龄分布</span>
          </div>
          <div id="jobevaluation" style="width:100%;height: 256px;"></div>
        </div>
        <!-- 诚信管理 -->
        <div class="integrity">
          <div class="title">
            <span>诚信管理</span>
          </div>
          <cxgl />
        </div>
      </div>
      <div class="dp_center">
        <!-- 工地人数实时预览 -->
        <el-main class="workerNumber">
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
            <div class="aa">
              <div class="laborpersonnel">
                <div class="icons"></div>
                <div>
                  <p>劳务人员</p>
                  <p>3,4513人</p>
                </div>
              </div>
              <div class="management">
                <div class="icons"></div>
                <div>
                  <p>管理人员</p>
                  <p>6,8780人</p>
                </div>
              </div>
              <div class="equipment">
                <div class="icons"></div>
                <div>
                  <p>设备管理人员</p>
                  <p>6,8780人</p>
                </div>
              </div>
              <div class="therPersonnel">
                <div class="icons"></div>
                <div>
                  <p>其它服务类人员</p>
                  <p>6,8780人</p>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <div class="tendencyMap">
          <p>>>今日工作人员趋势图</p>
          <h6 style="position: absolute;top:0px;left:56px;color:#fff;padding-top:38px">人数(人)</h6>
          <div id="tendencyEcharts" style="width:100%;height: 350px;"></div>
        </div>
      </div>
      <div class="dp_right">
        <!-- 人员测温情况 -->
        <div class="thermometryBox">
          <div class="title">
            <span>人员测温情况</span>
          </div>
          <div class="Thermograph">
            <img src="../../../static/image/Statisticsscreen/Thermograph.png" />
            <div class="grouping">
              <div>
                <p>劳务一组 2，6531人次</p>
              </div>
              <div>
                <p>劳务一组 2，6531人次</p>
              </div>
              <div>
                <p>劳务一组 2，6531人次</p>
              </div>
              <div>
                <p>劳务一组 2，6531人次</p>
              </div>
              <!-- <div>劳务一组 2，6531人次</div> -->
            </div>
          </div>
          <!-- <div id="main" style="width:100%;height: 256px;"></div> -->
        </div>
        <!-- 计划返京人员统计 -->
        <div class="statisticsBox">
          <div class="title">
            <span>计划返京人员统计</span>
          </div>
          <div id="statistics" style="width:100%;height: 191px;"></div>
        </div>
        <!-- 员工地域分布 -->
        <div class="geographicalBox">
          <div class="title">
            <span>员工地域分布</span>
          </div>
          <!-- <div id="statistics" style="width:100%;height: 191px;"></div> -->
          <myChart />
        </div>
        <!-- 参建单位人数 -->
        <div class="numberParticipantsBox">
          <div class="title">
            <span>参建单位人数</span>
          </div>
          <cjrs />
        </div>
      </div>
    </el-main>
    <!-- 弹出框 -->
    <el-dialog
      :modal="false"
      top="40px"
      width="1300px"
      :visible.sync="dialogTableVisible"
      :show-close="false"
      class="dialogBox"
    >
      <div class="Informationlist">
        <div class="Information_header">
          <span>信息列表展示</span>
        </div>
        <el-table :data="gridData" :header-cell-style="headClass" :row-class-name="tableRowClassName">
          <el-table-column style="margin-top:20px" property="date" label="编号" width="150"></el-table-column>
          <el-table-column property="name" label="公司名称" width="200"></el-table-column>
          <el-table-column property="address" label="服务单位"></el-table-column>
          <el-table-column property="address" label="项目编号"></el-table-column>
          <el-table-column property="address" label="项目名称"></el-table-column>
          <el-table-column property="address" label="合同编号"></el-table-column>
          <el-table-column property="address" label="合同类型"></el-table-column>
          <el-table-column property="state" label="状态"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import echarts from "echarts";
import myChart from "./myChart";
import cjrs from "./cjrs-assembly";
import cxgl from "./IntegrityChart";
export default {
  name: "statisticsScreen",
  components: {
    myChart,
    cjrs,
    cxgl
  },
  data() {
    return {
      animate: false,
      lists: [
        "出勤天数（工时）/年",
        "出勤天数（工时）/季度",
        "出勤天数（工时）/月",
        "出勤天数（工时）/周"
      ],
      idx: 0,
      charts: "",
      opinion: [],
      dialogTableVisible: false,
      textArr: [
        {
          notice: "处分公告",
          noticeContent: "关于张三同志不遵守公司相关规定第十七章第五条的行政..."
        },
        {
          notice: "处分公告",
          noticeContent: "不遵守公司相关规定第十七章第五条的行政"
        },
        {
          notice: "处分公告",
          noticeContent: "关于北京市轨道交通运输管理局后台管理系统相关规定"
        },
        {
          notice: "处分公告",
          noticeContent: "关于北京市轨道交通运输管理局后台管理系统相关规定"
        }
      ],
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
      ],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state:'1'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state:'1'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state:'1'
        }
      ]
    };
  },
  methods: {
    //共有须知滚动定时
    scroll() {
      // alert("0000")
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.textArr.push(this.textArr[0]); // 将数组的第一个元素添加到数组的
        this.textArr.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 1000);
    },
    headClass() {
      return "text-align: center; height: 34px; background:#203E99;color: #fff;";
    },
      tableRowClassName({row, rowIndex}) {
        console.log(row, rowIndex)
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    //工种分析
    drawPie() {
      let charts = echarts.init(document.getElementById("main"));
      let sizeFun = function() {
        charts.resize();
      };
      window.addEventListener("resize", sizeFun);
      charts.setOption({
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
    jobevaluation() {
      let charts1 = echarts.init(document.getElementById("jobevaluation"));
      let sizeFun1 = function() {
        charts1.resize();
      };
      window.addEventListener("resize", sizeFun1);
      charts1.setOption({
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
            axisLabel: {
              interval: 0, //强制文字产生间隔
              rotate: 45,
              // formatter: "{value}",
              textStyle: {
                color: "#00ECFC"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              // formatter: "{value}",
              textStyle: {
                color: "#00ECFC"
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
    //今日工作人员趋势图
    todayPersonnelChart() {
      let todayPersonnelChart = echarts.init(
        document.getElementById("tendencyEcharts")
      );
      let sizeFun1 = function() {
        todayPersonnelChart.resize();
      };
      window.addEventListener("resize", sizeFun1);
      todayPersonnelChart.setOption({
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
          left: "60px",
          right: "10%",
          bottom: "15%",
          top: "13%",
          height: 299,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "时间(时)",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00"
          ],

          axisLabel: {
            interval: 0, //强制文字产生间隔
            rotate: 45,
            // formatter: "{value}",
            textStyle: {
              color: "#00ECFC"
            }
          }
        },
        yAxis: {
          type: "value",
          // axisLine: {
          axisLabel: {
            // formatter: "{value}",
            textStyle: {
              color: "#00ECFC"
            }
          }
          // }
        },
        series: [
          {
            data: [
              0,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              820,
              932,
              901,
              934,
              1290,
              1330
            ],
            itemStyle: {
              normal: { color: "#00ECFC" }
            },
            type: "line"
          }
        ]
      });
    },
    //计划返京人员统计
    statisticsChart() {
      let statisticsChart = echarts.init(document.getElementById("statistics"));
      let sizeFun1 = function() {
        statisticsChart.resize();
      };
      window.addEventListener("resize", sizeFun1);
      statisticsChart.setOption({
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
          left: "11px",
          right: "10%",
          bottom: "15%",
          top: "13%",
          height: 171,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00"
          ],

          axisLabel: {
            interval: 0, //强制文字产生间隔
            rotate: 45,
            // formatter: "{value}",
            textStyle: {
              color: "#00ECFC"
            }
          }
        },
        yAxis: {
          type: "value",
          // axisLine: {
          axisLabel: {
            // formatter: "{value}",
            textStyle: {
              color: "#00ECFC"
            }
          }
          // }
        },
        series: [
          {
            data: [
              0,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              820,
              932,
              901,
              934,
              1290,
              1330
            ],
            itemStyle: {
              normal: { color: "#00ECFC" }
            },
            type: "line"
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
      setInterval(this.scroll, 1000);
      this.drawPie();
      this.jobevaluation();
      this.todayPersonnelChart();
      this.statisticsChart();
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

.statisticsScreen {
  position: relative;
  width: 100%;
  height: 100%;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
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
  overflow: hidden;

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
        overflow: hidden;
        height: 134px;

        p {
          margin-top: 10px;
          height: 16px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(50, 146, 255, 1);
          opacity: 1;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          &:first-child {
            margin-top: 20px;
          }

          span {
            color: #AD511C;
            padding-left: 13px;
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
      height: 177px;
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
      background: url('../../../static/image/Statisticsscreen/factPreview.jpg') center no-repeat;
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
              margin: 25px 25px 0 0;
            }
          }
        }

        .aa {
          width: 600px;
          height: 300px;
          // border: 1px solid red;
          margin: 0 auto;
          position: relative;
          top: 60px;

          .management {
            width: 125px;
            height: 70px;
            // margin-left: 15px;
            position: relative;
            left: 40px;

            .icons {
              width: 32px;
              height: 34px;
              border: 2px solid rgba(24, 106, 231, 1);
              border-radius: 50%;
              opacity: 1;
              background: url('../../../static/image/Statisticsscreen/management.png') no-repeat;
              background-size: 100% 100%;
              float: left;
              margin-top: 18px;
            }

            p:first-child {
              height: 17px;
              font-size: 13px;
              font-family: zihun35hao-jindianyahei;
              line-height: 15px;
              color: rgba(92, 157, 255, 1);
              opacity: 1;
              padding-top: 14px;
              padding-left: 15px;
              float: left;
            }

            p:last-child {
              height: 28px;
              font-size: 18px;
              font-family: zihun35hao-jindianyahei;
              line-height: 26px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
              padding-top: 15px;
              padding-left: 10px;
              float: left;
              font-weight: normal;
            }
          }

          .laborpersonnel {
            width: 125px;
            height: 70px;
            // margin-left: ç;
            position: relative;
            left: 135px;

            .icons {
              width: 32px;
              height: 34px;
              border: 2px solid rgba(24, 106, 231, 1);
              border-radius: 50%;
              opacity: 1;
              background: url('../../../static/image/Statisticsscreen/management.png') no-repeat;
              background-size: 100% 100%;
              float: left;
              margin-top: 10px;
            }

            p:first-child {
              height: 17px;
              font-size: 13px;
              font-family: zihun35hao-jindianyahei;
              line-height: 15px;
              color: rgba(92, 157, 255, 1);
              opacity: 1;
              // padding-top: 14px;
              padding-left: 15px;
              float: left;
            }

            p:last-child {
              height: 28px;
              font-size: 18px;
              font-family: zihun35hao-jindianyahei;
              line-height: 26px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
              // padding-top: 20px;
              padding-left: 10px;
              float: left;
              font-weight: normal;
            }
          }

          .equipment {
            width: 125px;
            height: 70px;
            // margin-left: 115px;
            position: absolute;
            top: 10px;
            left: 340px;

            .icons {
              width: 32px;
              height: 34px;
              border: 2px solid rgba(24, 106, 231, 1);
              border-radius: 50%;
              opacity: 1;
              background: url('../../../static/image/Statisticsscreen/management.png') no-repeat;
              background-size: 100% 100%;
              float: left;
              margin-top: 10px;
            }

            p:first-child {
              height: 17px;
              font-size: 13px;
              font-family: zihun35hao-jindianyahei;
              line-height: 15px;
              color: rgba(92, 157, 255, 1);
              opacity: 1;
              // padding-top: 14px;
              padding-left: 15px;
              float: left;
            }

            p:last-child {
              height: 28px;
              font-size: 18px;
              font-family: zihun35hao-jindianyahei;
              line-height: 26px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
              // padding-top: 20px;
              padding-left: 10px;
              float: left;
              font-weight: normal;
            }
          }

          .therPersonnel {
            width: 150px;
            height: 70px;
            // margin-left: 115px;
            position: absolute;
            top: 60px;
            left: 450px;

            .icons {
              width: 32px;
              height: 34px;
              border: 2px solid rgba(24, 106, 231, 1);
              border-radius: 50%;
              opacity: 1;
              background: url('../../../static/image/Statisticsscreen/management.png') no-repeat;
              background-size: 100% 100%;
              float: left;
              margin-top: 10px;
            }

            p:first-child {
              height: 17px;
              font-size: 13px;
              font-family: zihun35hao-jindianyahei;
              line-height: 15px;
              color: rgba(92, 157, 255, 1);
              opacity: 1;
              // padding-top: 14px;
              padding-left: 15px;
              float: left;
            }

            p:last-child {
              height: 28px;
              font-size: 18px;
              font-family: zihun35hao-jindianyahei;
              line-height: 26px;
              color: rgba(255, 255, 255, 1);
              opacity: 1;
              // padding-top: 20px;
              padding-left: 10px;
              float: left;
              font-weight: normal;
            }
          }
        }
      }
    }

    .tendencyMap {
      height: 370px;
      background: url('../../../static/image/Statisticsscreen/TodaPersonnel.png') center no-repeat;
      background-size: 100% 100%;
      margin-top: 30px;
      position: relative;

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
    }
  }

  .dp_right {
    width: 25%;
    float: left;
    height: 100%;

    .thermometryBox {
      width: 100%;
      height: 180px;
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

      .Thermograph {
        img {
          float: left;
          width: 132px;
          height: 132px;
          background: rgba(17, 17, 66, 1);
          box-shadow: 0px 1px 40px rgba(122, 121, 203, 0.33);
          border-radius: 50%;
          opacity: 1;
          margin: 12px 0 0 30px;
        }

        .grouping {
          width: 150px;
          height: 100px;
          float: right;
          margin-right: 15px;

          div {
            width: 62px;
            height: 27px;
            border: 2px solid rgba(42, 70, 148, 1);
            background: url('../../../static/image/Statisticsscreen/rosterNumber.png') no-repeat;
            background-size: 100% 100%;
            opacity: 0.8;
            float: left;
            margin-top: 33px;

            &:nth-child(even) {
              margin-left: 20px;
            }

            p {
              width: 93px;
              -webkit-transform: scale(0.5);
              display: inline-block;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: rgba(1, 186, 221, 1);
              opacity: 1;
              position: relative;
              top: -8px;
              left: -15px;
            }
          }
        }
      }
    }

    .statisticsBox {
      width: 100%;
      height: 208px;
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
          width: 128px;
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
    }

    .geographicalBox {
      width: 100%;
      height: 240px;
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
          width: 128px;
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
    }

    .numberParticipantsBox {
      width: 100%;
      height: 202px;
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
          width: 128px;
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
    }
  }
}

.dialogBox {
  width: 1404px;
  height: 671px;
  background: rgba(0, 11, 40, 1);
  opacity: 0.85;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  overflow: hidden;

  .Informationlist {
    width: 1300px;
    height: 584px;
    border: 8px solid rgba(36, 57, 120, 1);
    background: rgba(0, 11, 40, 1);
    .Information_header {
      width: 1284px;
      height: 60px;
      background: rgba(24, 39, 91, 1);
      opacity: 1;

      span {
        height: 24px;
        font-size: 24px;
        font-family: SourceHanSansCN-Bold;
        line-height: 60px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        padding-left: 16px;
      }
    }
  }
}

.back {
  margin-top: 40px;
}

.dialogBox /deep/ .el-dialog__body {
  padding: 0 0;
}

.dialogBox /deep/ .el-dialog__header {
  padding: 0 0;
}
.el-table__body-wrapper{
  margin-top:20px
}
.anim {
  transition: all 0.5s;
  margin-top: -30px;
}
.el-table .warning-row {
    background: red;
  }

  .el-table .success-row {
    background: red;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped.el-table__row--striped td {
     background-color: red!important; /*替换为你需要的颜色，觉得优先级不够就加!important*/
}

.el-header {
  padding: 0 0;
}
</style>