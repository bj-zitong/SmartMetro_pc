<template>
  <div class="player">
    <div class="blockTime">
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" style="margin-top:10px"></el-date-picker>
      <el-button type="primary" @click="handleUserList">搜索</el-button>
    </div>
    <div class="videoParent">
      <video
        ref="video"
        :controls="false"
        controlslist="nodownload"
        src="../../../static/image/1591471387770648.mp4"
      >
        <!-- <source  type="video/mp4" /> -->
      </video>

      <div class="OperationLayer">
        <div class="Capture">
          <img src="../../../static/image/kz.png" />
          <img src="../../../static/image/shou.png" @click="snapshot(0)" />
          <img src="../../../static/image/xiaoping.png" ref="fullScreen" />
          <canvas id="icanvas" style="display:none;width:600px;height:600px;"></canvas>
        </div>
        <div class="Playcollection">
          <img src="../../../static/image/qianjin.png" />
          <img :src="TogglePausePlayback" class="play" ref="isPlay" />
          <!-- <img src="../../../static/image/bofang.png" class="icon"/> -->
          <img src="../../../static/image/houtui.png" />
          <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
              {{num}}
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0.5">0.5</el-dropdown-item>
              <el-dropdown-item command="1.0">1.0</el-dropdown-item>
              <el-dropdown-item command="1.25">1.25</el-dropdown-item>
              <el-dropdown-item command="1.5">1.5</el-dropdown-item>
              <el-dropdown-item command="2.0">2.0</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <input type="range" ref="ran" :value="ranVal" />
          <div ref="progress" style="height:10px;background:#f00;" v-show="progressShow">
            <div ref="bar" style="height:5px;background:#0f0;"></div>
            <div ref="buffer" style="height:5px;background:#00f;"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="btns">
           
    </div>-->
  </div>
</template>

<script>
// import { hasClass } from "@/commons/func";
export default {
  data() {
    return {
      bufferTimer: null,
      timer: null,
      video: null,
      zantingShow: false,
      enableMute: null,
      disableMute: null,
      ran: null,
      ranVal: 0,
      current: null,
      buffered: null,
      duration: null,
      fullScreen: null,
      progress: null,
      bar: null,
      buffer: null,
      num: "倍速",
      TogglePausePlayback: "../../../static/image/bofang.png",
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
      value3: "",
      canvasEl: null,
      videoEl: null,
      imageCanvasList: [],
      progressShow:false
    };
  },
  activated() {
    this.init();
    this.video.play();
    this.TogglePausePlayback = "../../../static/image/bofang.png";
  },
  methods: {
    //点击截图
    snapshot(order) {
      var video = document.querySelectorAll("video")[0]; //获取前台要截图的video对象，
      var canvas = document.querySelectorAll("canvas")[0]; //获取前台的canvas对象，用于作图
      var img = new Image(), //创建新的图片对象
      base64 = ""; //base64
      img.src = "../../../static/image/bofang.png";
      var ctx = canvas.getContext("2d"); //设置canvas绘制2d图，
      ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height); //将video视频绘制到canvas中
      var images = canvas.toDataURL("image/png"); //canvas的api中的toDataURL()保存图像
      this.downloadImage(images);
    },
    downloadImage(url) {
      var timestamp = Date.parse(new Date());
      var a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("id", "vid");
      a.setAttribute("download", "image" + +timestamp + ".png");
      let canSupportDownload = "download" in a;
      // 防止反复添加
      if (document.getElementById("vid")) {
        document.body.removeChild(document.getElementById("vid"));
      }

      if (canSupportDownload) {
        document.body.appendChild(a);
        a.click();
      } else {
        alert("不支持下载");
        window.open(url);
      }
    },
    init() {
      this.video = this.$refs.video; //获取video对象
      this.isPlay = this.$refs.isPlay; //获取播放/暂停按钮对象，element-ui库需要'.$el'获取
      // this.enableMute = this.$refs.enableMute.$el; //获取关闭声音按钮对象
      // this.disableMute = this.$refs.disableMute.$el; //获取开启声音按钮对象
      this.ran = this.$refs.ran; //获取滑块对象，方便调整音量大小
      this.ranVal = this.video.volume * 100;
      this.ran.style.backgroundSize = this.ranVal + "% 100%";
      // this.current = this.$refs.current; //获取显示当前播放时间进度的对象
      // this.buffered = this.$refs.buffered; //获取显示下载进度的对象，下载使用，暂时无用
      // this.duration = this.$refs.duration; //
      this.fullScreen = this.$refs.fullScreen;
      this.progress = this.$refs.progress;
      this.bar = this.$refs.bar;
      this.buffer = this.$refs.buffer;
      this.addEvent(this.isPlay, "click", this.playPause);
      // this.addEvent(this.video, "timeupdate", this.timeupdate);
      this.addEvent(this.progress, "click", this.changeProgress);
      this.addEvent(this.fullScreen, "click", this.launchFullScreen);
      // this.addEvent(this.enableMute, "click", this.closeVolume);
      // this.addEvent(this.disableMute, "click", this.openVolume);
      this.rangeSlider(this.ran, {
        min: 0,
        max: 100,
        step: 5,
        callback: this.setVolume
      });
    },
    hasClass(elem, classm) {
      return elem.className.indexOf(classm) > -1;
    },
    // 补零
    zeroFill(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 处理秒数为时分秒 h:m:s
    getTime(num) {
      let m = this.zeroFill(Math.floor(num / 60) % 60),
        s = this.zeroFill(Math.floor(num % 60)),
        h = this.zeroFill(Math.floor(Math.floor(num / 60) / 60)),
        time = "" + h + ":" + m + ":" + s + "";
      return time;
    },
    //全屏方法
    launchFullScreen() {
      if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen();
      } else if (this.video.msRequestFullscreen) {
        this.video.msRequestFullscreen();
      }
    },
    //播放和暂停
    playPause() {
      let classStr = this.isPlay.className;
      if (this.hasClass(this.isPlay, "stop")) {
        this.TogglePausePlayback = "../../../static/image/bofang.png";
        this.video.play();
        // if (this.video.buffered.length != 0) {
        //   this.bufferTimer = setInterval(() => {
        //     this.buffer.style.width =
        //       (this.video.buffered.end(0) / this.video.duration) * 100 + "%";
        //   }, 1000 / 30);
        //   if (this.video.buffered.end(0) == this.video.duration) {
        //     this.buffer.style.width = "100%";
        //     clearInterval(this.bufferTimer);
        //   }
        // }
        // this.timer = setInterval(() => {
        //   this.bar.style.width =
        //     (this.video.currentTime / this.video.duration) * 100 + "%";
        // }, 1000 / 30);
        this.isPlay.className = classStr.replace("stop", "play");
      } else if (this.hasClass(this.isPlay, "play")) {
        this.TogglePausePlayback = "../../../static/image/zanting.png";
        this.video.pause();
        // clearInterval(this.timer);
        this.isPlay.className = classStr.replace("play", "stop");
      }
    },
    //视频播放进度改变触发
    timeupdate() {
      this.current.innerHTML = this.getTime(this.video.currentTime);
      this.duration.innerHTML = this.getTime(this.video.duration);
      this.buffered.innerHTML = this.video.buffered.end(0);
      if (this.video.currentTime == this.video.duration) {
        this.isPlay.className = this.isPlay.className.replace("play", "stop");
      }
    },
    //点击进度条改变播放进度
    changeProgress(e) {
      let barLength = e.pageX - this.progress.offsetLeft;
      this.video.currentTime =
        (barLength / this.progress.clientWidth) * this.video.duration;
      this.bar.style.width =
        (barLength / this.progress.clientWidth) * 100 + "%";
    },
    //关闭声音
    closeVolume() {
      this.video.muted = true;
    },
    //开启声音
    openVolume() {
      this.video.muted = false;
    },
    //设置音量
    setVolume() {
      this.video.volume = this.ran.value / 100;
      this.video.muted = false;
    },
    rangeSlider(rangeElem, { min, max, step, callback }) {
      min = !isNaN(parseFloat(min)) ? Number(min) : null;
      max = !isNaN(parseFloat(max)) ? Number(max) : null;
      step = !isNaN(parseFloat(step)) ? Number(step) : 1;
      callback = callback ? callback : null;

      rangeElem.setAttribute("min", min);
      rangeElem.setAttribute("max", max);
      rangeElem.setAttribute("step", step);

      rangeElem.addEventListener("input", function(e) {
        var that = e.target;
        that.style.backgroundSize = this.value + "% 100%";
        if (typeof callback == "function") {
          callback(that);
        }
      });
    },
    handleUserList() {},
    handleClick(cmditem) {
      this.video.playbackRate = +cmditem;
      this.num = +cmditem+"x";
      // this.video.muted = true;
    },
    handleCommand(cmditem) {
      this.video.playbackRate = cmditem;
    }
  }
};
</script>

<style lang="stylus" scoped>
.player {
  width: 96%;
  height: 70%;
  margin: 0 auto;

  .blockTime {
    height: 60px;
    float: right;
    margin-right: 30px;
  }

  .videoParent {
    width: 100%;
    height: 70vh;
    position: relative;

    video {
      object-fit: fill;
      width: 100%;
      height: 100%;
    }

    .OperationLayer {
      height: 100px;
      width: 100%;
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;
      position: absolute;
      bottom: -60px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .Capture {
        width: 138px;
        height: 32px;
        background: rgba(0, 88, 162, 1);
        opacity: 1;
        border-radius: 10px;

        img {
          width: 20px;
          height: 20px;
          margin-left: 16px;
          margin-top: 5px;
        }
      }
    }

    .Playcollection {
      width: 180px;
      height: 32px;
      float: left;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 28px;
        height: 28px;
      }

      .stop, .play {
        width: 43px;
        height: 43px;
      }
    }
  }
}
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>