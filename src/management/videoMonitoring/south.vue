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
          <img :src="imgtab" class="layoutIcon" />
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
              <el-dropdown-item command="5">
                <img src="../../../static/image/singular/5.png" />
              </el-dropdown-item>
              <!-- <el-dropdown-item command="6">
                <img src="../../../static/image/singular/6.png" />
              </el-dropdown-item>-->
              <el-dropdown-item command="6">
                <img src="../../../static/image/singular/7.png" />
              </el-dropdown-item>
              <el-dropdown-item command="7">
                <img src="../../../static/image/singular/8.png" />
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
        <div class="datetimebox">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
          <el-button type="primary" @click="handlevideoList">搜索</el-button>
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
              @click="videoParticularsClick"
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
                      <!-- <div v-show="true" class="selectchannel" @click="dialogFormVisible=true">选择通道</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="box1 main" v-if="box1">
      <div class="box1_top">
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px;margin-top:15px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div class="box1_right">
        <div class="box1_right_c">
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px;margin-top:15px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div class="box1_right_c">
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px;margin-top:15px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
      </div>
      <div class="box1_bottom">
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px;margin-top:15px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px;margin-top:15px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px;margin-top:15px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
      </div>
    </div>
    <div class="box2" v-if="box2">
      <div class="box2_box">
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div class="box2_box">
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div class="box2_box">
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div class="box2_box box2_last_box" style="background:#fff">
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
        <div>
          <div class="box2_title">
            <p>南区建设工地 2020-4-29 10:26:32</p>
            <el-dropdown
              trigger="click"
              @command="singularCommand"
              style="float:right;margin-right:10px"
            >
              <!-- ppp -->
              <div class="avatar-wrapper">
                <div class="username-wrapper">
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <el-dropdown-menu class="singular-dropdown" slot="dropdown">
                <el-dropdown-item command="1">
                  <img src="../../../static/image/singular/1.png" />
                  云台控制
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <img src="../../../static/image/singular/2.png" />
                  截图抓拍
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <img src="../../../static/image/singular/3.png" />
                  全屏展示
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span>无信号</span>
        </div>
      </div>
    </div>
    <div class="box3" v-if="box3">
      <div class="box3_top">
        <span>无信号</span>
      </div>
      <div class="box3_right">
        <div class="box3_right_c">
          <span>无信号</span>
        </div>
        <div class="box3_right_c">
          <span>无信号</span>
        </div>
        <div class="box3_right_c">
          <span>无信号</span>
        </div>
      </div>
      <div class="box3_bottom">
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
      </div>
    </div>
    <div class="box4" v-if="box4">
      <div class="box4_bottom">
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
      </div>
      <div class="box4_left">
        <div class="box4_left_c">
          <span>无信号</span>
        </div>
        <div class="box4_left_c">
          <span>无信号</span>
        </div>
      </div>
      <div class="box4_top">
        <span>无信号</span>
      </div>
      <div class="box4_right">
        <div class="box4_right_c">
          <span>无信号</span>
        </div>
        <div class="box4_right_c">
          <span>无信号</span>
        </div>
      </div>
      <div class="box4_bottom">
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
      </div>
    </div>

    <div class="box5" v-if="box5">
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
      <div>
        <div class="box2_title">
          <p>南区建设工地 2020-4-29 10:26:32</p>
          <el-dropdown
            trigger="click"
            @command="singularCommand"
            style="float:right;margin-right:10px"
          >
            <!-- ppp -->
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="singular-dropdown" slot="dropdown">
              <el-dropdown-item command="1">
                <img src="../../../static/image/singular/1.png" />
                云台控制
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <img src="../../../static/image/singular/2.png" />
                截图抓拍
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <img src="../../../static/image/singular/3.png" />
                全屏展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>无信号</span>
      </div>
    </div>
    <div class="box6" v-if="box6">
      <div class="box6_top">
        <div>
          <span>无信号</span>
        </div>
        <div>
          <span>无信号</span>
        </div>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
      <div>
        <span>无信号</span>
      </div>
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
      mainShow: false,
      box1: false,
      box2: false,
      box3: false,
      box4: false,
      box5: false,
      box6: false,
      imgtab: "../../../static/image/layout.png",
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
  created() {
    let that = this;
    that.selecttype("classtype2", 4, 12);
    (this.mainShow = true),
      (window.onresize = function() {
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
      });
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
    handlevideoList() {},
    singularCommand(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "1":
          this.selecttype("classtype2", 4, 12);
          this.imgtab = "../../../static/image/singular/1.png";
          (this.mainShow = true),
            (this.box1 = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "2":
          this.box1 = true;
          this.imgtab = "../../../static/image/singular/2.png";
          (this.mainShow = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "3":
          this.imgtab = "../../../static/image/singular/3.png";
          (this.mainShow = false), (this.box2 = true);
          (this.mainShow = false), (this.box1 = false);
          (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "4":
          this.imgtab = "../../../static/image/singular/4.png";
          (this.mainShow = false), (this.box2 = false);
          this.box1 = false;
          (this.box3 = true),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "5":
          this.imgtab = "../../../static/image/singular/5.png";
          (this.mainShow = false), (this.box2 = false);
          this.box1 = false;
          (this.box3 = false),
            (this.box4 = true),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "6":
          this.imgtab = "../../../static/image/singular/7.png";
          (this.mainShow = false), (this.box2 = false);
          this.box1 = false;
          (this.box3 = false),
            (this.box4 = false),
            (this.box5 = true),
            (this.box6 = false);
          break;
        case "7":
          this.imgtab = "../../../static/image/singular/8.png";
          (this.mainShow = false), (this.box2 = false);
          this.box1 = false;
          (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = true);
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
          (this.mainShow = true),
            (this.box1 = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "fourSingle":
          this.selecttype("classtype2", 4, 12);
          this.screenNum = "4";
          (this.mainShow = true),
            (this.box1 = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "nineSingle":
          this.selecttype("classtype3", 9, 8);
          this.screenNum = "9";
          (this.mainShow = true),
            (this.box1 = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
        case "sixteenSingle":
          this.selecttype("classtype4", 16, 6);
          this.screenNum = "16";
          (this.mainShow = true),
            (this.box1 = false),
            (this.box2 = false),
            (this.box3 = false),
            (this.box4 = false),
            (this.box5 = false),
            (this.box6 = false);
          break;
      }
    },
    //点击进入详情
    videoParticularsClick(){
           this.$router.push({ path: "/videoParticulars" });
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

  .datetimebox {
    float: right;
    margin-top: 12px;
    margin-right: 30px;
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

  .el-dropdown-menu__item {
    color: #fff;
  }

  .el-dropdown-menu__item:hover {
    background: #ccc;
  }
}
.box1 span {
  color: #fff;
  position: relative;
  /* top: 50%; */
  text-align: center;
  width: 100%;
  display: block;
}

.box1_top {
  width: 70%;
  height: 300px;
  float: left;
  background: #000;

  .box2_title {
    width: 100%;
    color: #fff;
    height: 50px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.7;
    margin-top: 5px;

    h6 {
      width: 6px;
      height: 6px;
      background: #4bc766;
      border-radius: 50%;
      opacity: 1;
      float: left;
      margin: 0;
      margin: 5px;
    }

    p {
      padding-top: 2px;
      font-size: 8px;
      float: left;
      padding-left: 10px;
      line-height: 47px;
    }

    .el-dropdown {
      width: 10px;
      height: 10px;
      margin-top: -4px;
    }

    .avatar-wrapper {
      height: 0;
    }

    .username-wrapper {
      height: 0;
    }
  }
}

.box1_right {
  width: 29%;
  height: 300px;
  float: left;
  margin-left: 10px;

  .box1_right_c {
    height: 150px;
    width: 100%;
    background: #000;

    .box2_title {
      width: 100%;
      color: #fff;
      height: 50px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;

      // margin-top:5px;
      h6 {
        width: 6px;
        height: 6px;
        background: #4bc766;
        border-radius: 50%;
        opacity: 1;
        float: left;
        margin: 0;
        margin: 5px;
      }

      p {
        padding-top: 2px;
        font-size: 8px;
        float: left;
        padding-left: 10px;
        line-height: 47px;
      }

      .el-dropdown {
        width: 10px;
        height: 10px;
        margin-top: -4px;
      }

      .avatar-wrapper {
        height: 0;
      }

      .username-wrapper {
        height: 0;
      }
    }
  }

  &>:last-child {
    margin-top: 5px;
    height: 145px;
  }
}

.box1_bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    width: 32.8%;
    height: 300px;
    background: #000;
    margin-top: 5px;

    .box2_title {
      width: 100%;
      color: #fff;
      height: 50px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;

      // margin-top:5px;
      h6 {
        width: 6px;
        height: 6px;
        background: #4bc766;
        border-radius: 50%;
        opacity: 1;
        float: left;
        margin: 0;
        margin: 5px;
      }

      p {
        padding-top: 2px;
        font-size: 8px;
        float: left;
        padding-left: 10px;
        line-height: 47px;
      }

      .el-dropdown {
        width: 10px;
        height: 10px;
        margin-top: -4px;
      }

      .avatar-wrapper {
        height: 0;
      }

      .username-wrapper {
        height: 0;
      }
    }
  }
}

.box2 {
  padding: 10px;
  width: auto;
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  .box2_box {
    width: 49.6%;
    height: 300px;
    background: #000;
    margin-top: 5px;

    .box2_title {
      width: 100%;
      color: #fff;
      height: 50px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;

      h6 {
        width: 6px;
        height: 6px;
        background: #4bc766;
        border-radius: 50%;
        opacity: 1;
        float: left;
        margin: 0;
        margin: 5px;
      }

      p {
        padding-top: 2px;
        font-size: 8px;
        float: left;
        padding-left: 10px;
        line-height: 47px;
      }

      .el-dropdown {
        width: 10px;
        height: 10px;
        margin-top: 15px;
      }

      .avatar-wrapper {
        height: 0;
      }

      .username-wrapper {
        height: 0;
      }
    }

    span {
      color: #fff;
      position: relative;
      left: 45%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }

  .box2_last_box {
    display: flex;
    width: 49.6%;
    flex-wrap: wrap;
    justify-content: space-between;
     
    div {
      width: 49.6%;
      height: 49%;
      background: #000;
    }

    &>:nth-child(3) {
      margin-top: 5px;
    }

    &>:nth-child(4) {
      margin-top: 5px;
    }
  }
}

.box3 {
  padding: 10px;
  width: auto;
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  .box3_top {
    width: 70%;
    height: 300px;
    background: #000;
    float: left;
  }

  .box3_right {
    width: 29%;
    height: 300px;
    float: left;
    margin-left: 10px;

    .box3_right_c {
      height: 100px;
      width: 100%;
      background: #000;
    }

    &>:last-child {
      margin-top: 5px;
      height: 95px;
      // height: 145px;
    }

    &>:nth-child(2) {
      margin-top: 5px;
      height: 95px;
      // height: 145px;
    }
  }

  .box3_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;

    div {
      width: 24.4%;
      height: 300px;
      background: #000;
      margin-top: 5px;
    }
  }

  span {
    color: #fff;
    position: relative;
    left: 45%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

.box4 {
  padding: 10px;
  width: auto;
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  .box4_left {
    width: 24.4%;
    height: 300px;
    float: left;
    margin-top: 5px;

    .box4_left_c {
      height: 150px;
      width: 100%;
      background: #000;
    }

    &>:last-child {
      margin-top: 5px;
      height: 145px;
      // height: 145px;
    }
  }

  .box4_top {
    width: 49.5%;
    height: 300px;
    margin-left: 9px;
    margin-top: 5px;
    background: #000;
    float: left;
  }

  .box4_right {
    width: 24.4%;
    height: 300px;
    float: left;
    margin-left: 10px;
    margin-top: 5px;

    .box4_right_c {
      height: 150px;
      width: 100%;
      background: #000;
    }

    &>:last-child {
      margin-top: 5px;
      height: 145px;
      // height: 145px;
    }
  }

  .box4_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;

    div {
      width: 24.4%;
      height: 150px;
      background: #000;
      margin-top: 5px;
    }
  }

  span {
    color: #fff;
    position: relative;
    left: 45%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

.box5 {
  padding: 10px;
  width: auto;
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 19.5%;
    height: 120px;
    // margin-left: 2px;
    margin-top: 5px;
    background: #000;

    .box2_title {
      width: 100%;
      color: #fff;
      height: 20px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.7;

      h6 {
        width: 6px;
        height: 6px;
        background: #4bc766;
        border-radius: 50%;
        opacity: 1;
        float: left;
        margin: 0;
        margin: 5px;
      }

      p {
        padding-top: 2px;
        font-size: 8px;
        float: left;
        padding-left: 10px;
      }

      .el-dropdown {
        width: 10px;
        height: 10px;
        margin-top: -4px;
      }

      .avatar-wrapper {
        height: 0;
      }

      .username-wrapper {
        height: 0;
      }
    }
  }

  span {
    color: #fff;
    // padding-top:50px;
    position: relative;
    left: 40%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

.box6 {
  padding: 10px;
  width: auto;
  height: 100%;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  .box6_top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 5px;
    background: #fff;
    height: 140px;

    div {
      width: 49.7%;
      height: 140px;
    }
  }

  div {
    width: 19.5%;
    height: 90px;
    // margin-left: 2px;
    margin-top: 5px;
    background: #000;
    // float: left;
  }

  span {
    color: #fff;
    position: relative;
    left: 40%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>