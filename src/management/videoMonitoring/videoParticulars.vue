<template>
  <div class="video_Particulars1">
    <div class="blocktime">
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" style="margin-top:10px"></el-date-picker>
      <el-button type="primary" @click="handlevideoList">搜索</el-button>
    </div>
    <div class="player">

      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
      >99996633333</video-player>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mp4url: "https://video-qn.ibaotu.com/19/49/09/08b888piCYxu.mp4",
      playerOptions: {
        height: "360px",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:7", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
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
      pickerOptions: {
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
      value1: "",
      value2: "",
      value3: ""
    };
  },
  activated() {},
  methods: {
    onPlayerPlay(e) {
      console.log(e);
    }
    //获得详情
  }
};
</script>
<style lang="stylus" scoped>
.video_Particulars1{
    width:98%;
    height:100%;
    background:#fff
    margin:0 auto;
    // position:relative
}
.player{
   width: 100%;
   height: 750px;
   margin:0 auto;
   background:#fff;
   float:left
}
.blocktime {
float: right;
    height: 54px;
    margin-right: 30px;
}
</style>
