<template>
  <div class="videoView" style="overflow: hidden;">
    <el-row type="flex" :gutter="15" justify="right" v-show="!fullscreen">
      <el-col :span="4"></el-col>
      <!-- <el-col :span="8">
        
      </el-col>
      <el-col :span="8">
        
      </el-col>
      <el-col :span="8">
        
      </el-col>-->
      <el-col :span="20">
        <div class="grid-content_box bg-purple">
          <img src="../../../static/image/gaoqing.png" class="gaoqing" />
          <img src="../../../static/image/layout.png" class="layoutIcon" />
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="margin-top:12px;margin-left:6px"
          >
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
              </el-dropdown-item>
              <el-dropdown-item command="4">
                <img src="../../../static/image/singular/4.png" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <span class="selector">{{screenNum}}</span>
          <!-- <img src="../../../static/image/layout.png" class="layoutIcon" /> -->
          <el-dropdown
            @command="handleCommand"
            trigger="click"
            style="margin-top:12px;margin-left:6px"
          >
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <el-dropdown-item command="single">1</el-dropdown-item>
              <el-dropdown-item command="fourSingle">4</el-dropdown-item>
              <el-dropdown-item command="nineSingle">9</el-dropdown-item>
              <el-dropdown-item command="sixteenSingle">16</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- gaoqing -->
          <!-- <el-button-group>
            <el-button :type="classtype1" @click="selecttype('classtype1',1,24)">单屏</el-button>
            <el-button :type="classtype2" @click="selecttype('classtype2',4,12)">四分屏</el-button>
            <el-button :type="classtype3" @click="selecttype('classtype3',9,8)">九分屏</el-button>
            <el-button :type="classtype4" @click="selecttype('classtype4',16,6)">十六分屏</el-button>
            <el-button>
              <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                  <i class="el-icon-rank"></i>
                </el-tooltip>
              </div>
            </el-button>
          </el-button-group>-->
        </div>
      </el-col>
    </el-row>

    <div class="main" v-if="mainShow">
      <div class="conter">
        <el-row :gutter="10">
          <el-col
            v-for="(n,index) in fornum"
            :xs="24"
            :sm="24"
            :md="clonum"
            :lg="clonum"
            :xl="clonum"
            :class="videoclass"
            :key="index"
          >
            <div
              class="player-wrapper"
              element-loading-text="加载中..."
              element-loading-background="#000"
            >
              <div class="video-wrapper" :style="videoclass" :id="`videoid${n}`">
                <div
                  class="video-inner live hide-waiting"
                  style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;"
                >
                  <div class="alt">
                    <div class="talbetop">
                      <table>
                        <tr>
                          <td>无信号</td>
                        </tr>
                      </table>
                      <div v-show="true" class="selectchannel" @click="dialogFormVisible=true">选择通道</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer"></div>
    </div>
    <div class="box1">
      <div class="box1_top"></div>
      <div class="box1_right">
        <div class="box1_right_c"></div>
        <div class="box1_right_c" style="margin-top:3px"></div>
      </div>
      <div class="box1_bottom"></div>
      <div class="box1_bottom"></div>
      <div class="box1_bottom"></div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      这是测试
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreen: false,
      fornum: 4,
      clonum: 12,
      dialogFormVisible: false,
      videoclass:
        "padding-bottom: 40.25%; position: relative; margin: 0px auto;",
      classtype1: "",
      classtype2: "primary",
      classtype3: "",
      classtype4: "",
      items: [false, false, false, false],
      screenNum: "4",
      mainShow: false
    };
  },
  created() {
    let that = this;
    window.onresize = function() {
      if (!that.checkFull()) {
        //  alert(that.videoclass)
        // 退出全屏后要执行的动作
        console.log("退出全屏");
        that.fullscreen = false;
        //alert(that.fornum)
        for (let n = 1; n <= that.fornum; n++) {
          //alert('videoid'+n)
          // alert(document.getElementById('videoid'+n))
          document.getElementById("videoid" + n).style =
            "padding-bottom: 40.25%; position: relative; margin: 0px auto;";
        }
        // that.videoclass="padding-bottom: 43.25%; position: relative; margin: 0px auto; overflow: hidden;",
        //document.getElementById('videoid1').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
        // document.getElementById('videoid2').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
        // document.getElementById('videoid3').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
        //document.getElementById('videoid4').style = "padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;";
        // that.tableclass="table-c"
      } else {
        for (let n = 1; n <= that.fornum; n++) {
          // alert('videoid'+n)
          // alert(document.getElementById('videoid'+n))
          document.getElementById("videoid" + n).style =
            "padding-bottom: 52.25%; position: relative; margin: 0px auto;";
        }
        //document.getElementById('videoid1').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
        //document.getElementById('videoid2').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
        //document.getElementById('videoid3').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
        //document.getElementById('videoid4').style='padding-bottom: 54.25%; position: relative; margin: 0px auto; overflow: hidden;';
      }
    };
  },
  methods: {
    showselect(item1) {
      this.items = [];
      // alert(this.items.length)
      for (let i = 0; i < this.fornum; i++) {
        if (item1 == i) {
          // alert(item1)
          this.items[i] = true;
        } else {
          this.items[i] = false;
        }
      }
    },
    selecttype(item, fnum, clo) {
      //  alert( this.items[0])
      this.items = [];
      for (let i = 0; i < fnum; i++) {
        this.items[i] = false;
      }
      this.fornum = fnum;
      this.clonum = clo;

      if (item === "classtype1") {
        this.classtype1 = "primary";
        this.classtype2 = "";
        this.classtype3 = "";
        this.classtype4 = "";
      } else if (item === "classtype2") {
        this.classtype1 = "";
        this.classtype2 = "primary";
        this.classtype3 = "";
        this.classtype4 = "";
      } else if (item === "classtype3") {
        this.classtype1 = "";
        this.classtype2 = "";
        this.classtype3 = "primary";
        this.classtype4 = "";
      } else if (item === "classtype4") {
        this.classtype1 = "";
        this.classtype2 = "";
        this.classtype3 = "";
        this.classtype4 = "primary";
      }
    },
    singularCommand(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "1":
          this.selecttype("classtype2", 4, 12);
          // this.screenNum = "4"
          break;
        case "2":
          this.selecttype("classtype3", 7, 12);
          // this.screenNum = "4"
          break;
        case "3":
          // this.selecttype('classtype3',9,8)
          // this.screenNum = "9"
          break;
        case "4":
          // this.selecttype('classtype4',16,6)
          // this.screenNum = "16"
          break;
      }
    },
    //下拉选择分评数
    handleCommand(cmditem) {
      console.log("cmditem====", cmditem);
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "single":
          this.selecttype("classtype1", 1, 24);
          this.screenNum = "1";
          break;
        case "fourSingle":
          this.selecttype("classtype2", 4, 12);
          this.screenNum = "4";
          break;
        case "nineSingle":
          this.selecttype("classtype3", 9, 8);
          this.screenNum = "9";
          break;
        case "sixteenSingle":
          this.selecttype("classtype4", 16, 6);
          this.screenNum = "16";
          break;
      }
    },
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },

    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      let that = this;
      // alert(this.fullscreen)
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        // alert("ddd")
        //that.videoclass='padding-bottom: 42.25%; position: relative; margin: 0px auto; overflow: hidden;';
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
        // this.videoclass='';
        // this.tableclass='table-c'

        //this.tableclass='alt'
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style lang="stylus" scoped>
.videoView {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;

  .grid-content_box {
    float: right;
    width: 200px;
    height: 40px;
    background: rgba(0, 88, 162, 1);
    opacity: 1;
    border-radius: 10px;
    margin-right: 60px;
    margin-top: 10px;

    .gaoqing {
      width: 30px;
      height: 30px;
      margin: 5px 0 0 20px;
      float: left;
    }
  }

  .layoutIcon {
    float: left;
    width: 24px;
    height: 24px;
    margin: 8px 0 0 20px;
  }

  .el-icon-caret-bottom {
    color: #fff;
  }
}

.main {
  padding: 10px;
  width: auto;
  height: 100%;
}

html, body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}

.video-wrapper {
  position: relative;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.alt {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  color: #fff;
  text-align: center;
}

.alt table {
  width: 100%;
  height: 100%;
}

.talbetop {
  width: 100%;
  height: 100%;
  position: relative;
}

.selectchannel {
  position: absolute;
  right: 5px;
  top: 5px;
}

.video-close {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
  font-size: 12px;
  background-color: hsla(0, 0%, 50%, 0.5);
  padding: 2px 5px;
  cursor: pointer;
  border-radius: 2px;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.table-c table {
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.table-c table td {
  border-left: 2px solid #fff;
  border-top: 2px solid #fff;
}

.player-wrapper {
  padding-bottom: 5px;
}

.footer {
  background: #000;
  height: 10%;
}

.selector {
  padding: 3px 6px;
  background: #fff;
  font-size: 10px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 17px;
  color: rgba(0, 88, 162, 1);
  opacity: 1;
  margin-left: 10px;
}

.singular-dropdown {
  background: rgba(0, 88, 162, 1);
  opacity: 0.8;
  border-radius: 10px;

  img {
    width: 16px;
    height: 16px;
  }
}

.box1 {
  margin: 0 10px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.box1_top {
  width: 70%;
  height: 300px;
  background: #000;
  float: left;
  margin: 0 3px;
}

.box1_right {
  width: 29%;
  height: 300px;
  float: left;

  .box1_right_c {
    height: 150px;
    width: 100%;
    background: red;
  }
}
.box1_bottom{
  width:33%;
  height: 300px;
  background: red;
  float:left;
  margin: 0 2px;
}
</style>