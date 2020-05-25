<template>
  <el-container class="statisticsScreen">
    <!-- 头部 -->
    <el-header class="Header" style="height: 88px;">
      <div class="Hea_left">
        <el-link type="primary" :underline="false" class="people">人员智慧管理</el-link>
        <el-link type="primary" :underline="false" class="people">机械设备管理</el-link>
        <el-link type="primary" :underline="false" class="people">物料智慧管理</el-link>
        <el-link type="primary" :underline="false" class="people">环境与能耗管理</el-link>
      </div>
      <div class="Hea_center">
        <p>城市轨道交通智慧工地管理系统</p>
        <h6>13号线02标中铁二局</h6>
      </div>
      <div class="Hea_right">
        <el-link type="primary" :underline="false" class="right_management">质量管理</el-link>
        <el-link type="primary" :underline="false" class="right_people">安全管理</el-link>
        <el-link type="primary" :underline="false" class="right_people">进度智慧管理</el-link>
        <el-link
          type="primary"
          :underline="false"
          class="right_people"
          @click="videomonitoring"
          style="color:#EB9D47"
        >视频监控管理</el-link>
      </div>
      <div class="switch" @click="switchClick">
        <!-- switch -->
        <img src="../../../static/image/Statisticsscreen/switch.png" />
        <h6>切换</h6>
      </div>
    </el-header>
    <el-main class="Main">
      <div class="dp_left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgba(4, 8, 73, 1)"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <!-- <i class="el-icon-menu"></i> -->
            <img src="../../../static/image/Statisticsscreen/ico_wind.png" class="windIcon" />
            <span slot="title">南区大门</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <img src="../../../static/image/Statisticsscreen/shenghuo.png" class="windIcon" />
              <span>生活区</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="1-1">
                <img src="../../../static/image/Statisticsscreen/point.png" class="point" />
                <span slot="title">生活区一</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <img src="../../../static/image/Statisticsscreen/point.png" class="point" />
                <span slot="title">生活区二</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <img src="../../../static/image/Statisticsscreen/point.png" class="point" />
                <span slot="title">生活区三</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <img src="../../../static/image/Statisticsscreen/top_icon.png" class="windIcon" />
            <span slot="title">北区</span>
          </el-menu-item>
          <el-menu-item index="3">
            <img src="../../../static/image/Statisticsscreen/left_icon.png" class="windIcon" />
            <span slot="title">东区</span>
          </el-menu-item>
          <el-menu-item index="4">
            <img src="../../../static/image/Statisticsscreen/right_icon.png" class="windIcon" />
            <span slot="title">西区</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="dp_center">
        <div class="center_video">
          <!-- <video
            src="https://video-qn.ibaotu.com/00/29/81/967888piC4SU.mp4"
            style="width:100%; height:98%; object-fit: fill"
          ></video>
          <div class="video_operation">
            <ul>
              <li>
                <span>地点</span>南区大门
              </li>
              <li>
                <span>时间</span>2020-4-29 17:37:26
              </li>
              <li>
                <img src="../../../static/image/Statisticsscreen/kz.png" />
              </li>
              <li>
                <img src="../../../static/image/Statisticsscreen/shou.png" />
              </li>
              <li>
                <img src="../../../static/image/Statisticsscreen/xiaoping.png" />
              </li>
            </ul>
          </div> -->
          <!-- <img src="../../../static/image/Statisticsscreen/video_operation.png" class="video_operation"/> -->
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
          ></video-player>
        </div>
      </div>
      <div class="dp_right">
        <div class="right_video">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions1"
          ></video-player>
        </div>
        <div class="right_video">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions2"
          ></video-player>
        </div>
        <div class="right_video">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions3"
          ></video-player>
        </div>
      </div>
      <div class="bottom_Chart">
        <!-- <div @play="onPlayerPlay($event)">66666</div> -->
        <p>>>近30天报警趋势</p>
        <div id="alarmtrendEcharts" style="width:100%;height: 256px;"></div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import echarts from "echarts";
import myChart from "./echartsPlugin/myChart";
import cjrs from "./echartsPlugin/cjrs-assembly";
import cxgl from "./echartsPlugin/IntegrityChart";
export default {
  name: "statisticsScreen",
  components: {
    myChart,
    cjrs,
    cxgl
  },
  data() {
    return {
      playerOptions: {
        height: "360px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:8", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "https://video-qn.ibaotu.com/00/29/81/967888piC4SU.mp4" //url地址
          }
        ],
        poster: "../../../static/image/Statisticsscreen/Thermograph.png", //你的封面地址
        height: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          progressControl: false, // 进度条
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions1: {
        height: "360px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "https://video-qn.ibaotu.com/19/43/28/676888piCjnm.mp4" //url地址
          }
        ],
        poster: "../../../static/image/Statisticsscreen/Thermograph.png", //你的封面地址
        height: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions2: {
        height: "360px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "https://video-qn.ibaotu.com/00/29/81/967888piC4SU.mp4" //url地址
          }
        ],
        poster: "../../../static/image/Statisticsscreen/Thermograph.png", //你的封面地址
        height: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      playerOptions3: {
        height: "360px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "https://video-qn.ibaotu.com/00/98/99/98z888piCTeW.mp4" //url地址
          }
        ],
        poster: "../../../static/image/Statisticsscreen/Thermograph.png", //你的封面地址
        height: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {
    //视频监控
    videomonitoring() {
      this.$router.push({ path: "/videomonitoring" });
    },
    //视频监控
    alarmtrendCharts() {
      let alarmtrend = echarts.init(
        document.getElementById("alarmtrendEcharts")
      );
      let sizeFun = function() {
        alarmtrend.resize();
      };
      window.addEventListener("resize", sizeFun);
      alarmtrend.setOption({
        grid: {
          // width:315 //调整折线图的宽度
          top: 50,
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
            "5.1",
            "5.2",
            "5.3",
            "5.4",
            "5.5",
            "5.6",
            "5.7",
            "5.8",
            "5.9",
            "5.10",
            "5.1",
            "5.2",
            "5.3",
            "5.4",
            "5.5",
            "5.6",
            "5.7",
            "5.8",
            "5.9",
            "5.10",
            "5.1",
            "5.2",
            "5.3",
            "5.4",
            "5.5",
            "5.6",
            "5.7",
            "5.8",
            "5.9",
            "5.10"
          ].map(function(str) {
            return str.replace(" ", "\n");
          }),
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
            data: [
              0,
              25,
              20,
              50,
              10,
              40,
              18,
              25,
              0,
              0,
              25,
              20,
              50,
              10,
              40,
              18,
              25,
              0,
              0,
              25,
              20,
              50,
              10,
              40,
              18,
              25,
              0,
              0,
              25,
              20,
              50,
              10,
              40,
              18,
              25,
              0
            ]
          }
        ]
      });
    },
    //切换管理系统事件
    switchClick() {
      this.$router.push({ path: "/homeShow" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onPlayerPlay(e) {
      console.log(e);
    }
  },
  //调用
  mounted() {
    this.alarmtrendCharts();
  }
};
</script>
<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}

.statisticsScreen {
  position: relative;
  width: 100%;
  height: 100%;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background: mix(#494166, #424b50) url('../../../static/image/Statisticsscreen/videomonitoring_gl.png') center no-repeat;
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
      float: left;
    }

    .right_people {
      padding: 13px 0 0 44px;
      float: left;
    }

    .right_management {
      float: left;
      padding: 13px 0 0 80px;
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
      background: url('../../../static/image/Statisticsscreen/he_cneter_bj.png') no-repeat;
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
    width: 260px;
    height: 952px;
    background: rgba(4, 8, 73, 1);
    border: 1px solid rgba(33, 109, 253, 1);
    opacity: 1;

    .windIcon {
      width: 22px;
      height: 22px;
      margin-right: 30px;
      margin-left: 43px;
    }

    span {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 17px;
      color: rgba(8, 132, 195, 1);
      opacity: 1;
    }

    .point {
      width: 7px;
      height: 7px;
      background: rgba(82, 220, 255, 1);
      border-radius: 50%;
      opacity: 1;
      margin-left: 38px;
      margin-right: 40px;
    }
  }

  .dp_center {
    width: 65%;
    float: left;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 30px;
    position: relative;

    .center_video {
      width: 100%;
      height: 600px;

      .video_operation {
        background: red;
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        height: 72px;
        background: url('../../../static/image/Statisticsscreen/video_operation.png') no-repeat;
        background-size: 100% 100%;

        ul li {
          float: left;
          margin-top: 45px;
          font-size: 10px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(109, 170, 252, 1);
          opacity: 1;

          img {
            width: 16px;
            height: 16px;
            float: right;
          }

          &:first-child {
            padding-left: 74px;
            padding-right: 80px;
          }
           &:nth-child(3){
            float: right;
             padding-right:45px;
          }
          &:nth-child(4){
            float: right;
             padding-right:75px;
          }
          &:nth-child(5){
            float: right;
            padding-right:45px;
          }
        }
      }
    }
  }

  .dp_right {
    width: 18.5%;
    float: left;
    height: 600px;
    margin-top: 30px;

    .right_video {
      width: 100%;
      height: 200px;
    }
  }

  .bottom_Chart {
    width: 84.5%;
    margin-top: 30px;
    height: 290px;
    background: url('../../../static/image/Statisticsscreen/bottom_bj.png') no-repeat;
    background-size: 100% 100%;
    float: right;

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

.switch {
  width: 40px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 60px;
  cursor: pointer;

  img {
    width: 11px;
    height: 11px;
    float: left;
    margin-top: 2px;
  }

  h6 {
    height: 14px;
    font-size: 10px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 14px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    float: right;
  }
}

.dialogBox /deep/ .el-dialog__body {
  padding: 0 0;
}

.dialogBox /deep/ .el-dialog__header {
  padding: 0 0;
}

.el-table__body-wrapper {
  margin-top: 20px;
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
  background-color: red !important; /* 替换为你需要的颜色，觉得优先级不够就加!important */
}

.el-header {
  padding: 0 0;
}
</style>