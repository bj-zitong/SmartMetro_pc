<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工号">
            <el-input v-model="formInline.user" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <el-container class="boxMap">
      <el-aside class="list_map" width="230px">
        <div class="personal_list">
          <img src="../../../../static/image/touxiang.png" class="touxiang" />
          <div class="list_message">
            <ul>
              <li>
                <img src="../../../../static/image/xingming.png" />
                <span>张三</span>
              </li>
              <li>
                <img src="../../../../static/image/gongzhong.png" />
                <span>电梯维修工</span>
              </li>
              <li>
                <img src="../../../../static/image/gonghao.png" />
                <span>3246225456</span>
              </li>
            </ul>
          </div>
          <el-button type="mini" class="Track_process">
            轨迹进程
            <img src="../../../../static/image/dingweiicon.png" class="dingweiicon" />
          </el-button>
        </div>
        <div class="personal_list">
          <img src="../../../../static/image/touxiang.png" class="touxiang" />
          <div class="list_message">
            <ul>
              <li>
                <img src="../../../../static/image/xingming.png" />
                <span>张三</span>
              </li>
              <li>
                <img src="../../../../static/image/gongzhong.png" />
                <span>电梯维修工</span>
              </li>
              <li>
                <img src="../../../../static/image/gonghao.png" />
                <span>3246225456</span>
              </li>
            </ul>
          </div>
          <el-button type="mini" class="Track_process">
            轨迹进程
            <img src="../../../../static/image/dingweiicon.png" class="dingweiicon" />
          </el-button>
        </div>
        <div class="personal_list">
          <img src="../../../../static/image/touxiang.png" class="touxiang" />
          <div class="list_message">
            <ul>
              <li>
                <img src="../../../../static/image/xingming.png" />
                <span>张三</span>
              </li>
              <li>
                <img src="../../../../static/image/gongzhong.png" />
                <span>电梯维修工</span>
              </li>
              <li>
                <img src="../../../../static/image/gonghao.png" />
                <span>3246225456</span>
              </li>
            </ul>
          </div>
          <el-button type="mini" class="Track_process">
            轨迹进程
            <img src="../../../../static/image/dingweiicon.png" class="dingweiicon" />
          </el-button>
        </div>
        <div class="personal_list">
          <img src="../../../../static/image/touxiang.png" class="touxiang" />
          <div class="list_message">
            <ul>
              <li>
                <img src="../../../../static/image/xingming.png" />
                <span>张三</span>
              </li>
              <li>
                <img src="../../../../static/image/gongzhong.png" />
                <span>电梯维修工</span>
              </li>
              <li>
                <img src="../../../../static/image/gonghao.png" />
                <span>3246225456</span>
              </li>
            </ul>
          </div>
          <el-button type="mini" class="Track_process">
            轨迹进程
            <img src="../../../../static/image/dingweiicon.png" class="dingweiicon" />
          </el-button>
        </div>
        <div class="personal_list">
          <img src="../../../../static/image/touxiang.png" class="touxiang" />
          <div class="list_message">
            <ul>
              <li>
                <img src="../../../../static/image/xingming.png" />
                <span>张三</span>
              </li>
              <li>
                <img src="../../../../static/image/gongzhong.png" />
                <span>电梯维修工</span>
              </li>
              <li>
                <img src="../../../../static/image/gonghao.png" />
                <span>3246225456</span>
              </li>
            </ul>
          </div>
          <el-button type="mini" class="Track_process">
            轨迹进程
            <img src="../../../../static/image/dingweiicon.png" class="dingweiicon" />
          </el-button>
        </div>
      </el-aside>

      <el-main class="right_map">
        <div id="container">
          <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
        
            <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
         
            <bm-geolocation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :showAddressBar="true"
              :autoLocation="true"
            ></bm-geolocation>
          
            <bm-marker
              :position="map.center"
              :dragging="map.dragging"
              animation="BMAP_ANIMATION_DROP"
            >
            
              <bm-info-window :show="map.show">Hello~</bm-info-window>
            </bm-marker>
          </baidu-map>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  name: "echarts",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      map: {
        center: { lng: 116.329311, lat: 39.913343 },
        zoom: 100,
        show: true,
        dragging: true
      }
    };
  },
  methods: {
    onSubmit() {},
    handler({ BMap, map }) {
      let me = this;
      console.log(BMap, map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  padding: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  color: #333;
  opacity: 1;
  border-radius: 10px;
  height: 100px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.glry {
  padding-top: 30px;

  .demo-form-inline {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.roster {
  margin: 0 30px;
}

.glry_bottonView {
  margin-top: 25px;

  .btnView {
    padding-left: 30px;
    padding-top: 30px;
    height: 100%;
  }

  .tableView {
    margin-top: 30px;
  }

  .paging {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 15px;
  }
}

.boxMap {
  width: 100%;
  height: 100vh;
  margin-top: 30px;

  .personal_list {
    .touxiang {
      width: 90px;
      height: 90px;
      float: left;
      margin-top: 20px;
      margin-left: 30px;
    }

    .list_message {
      width: 110px;
      height: 100px;
      float: left;
      font-size: 10px;

      ul li {
        text-align: left;
        float: left;

        img {
          width: 10px;
          height: 10px;
          margin-left: 20px;
          float: left;
          margin-right: 5px;
        }

        span {
          float: left;
        }
      }
    }
  }
}

.list_message ul li:not(:first-child) {
  padding-top: 10px;
}

.list_message ul li:first-child {
  padding-top: 25px;
}

.list_map {
  width: 230px;
  height: 100vh;
  background: rgba(250, 252, 255, 1);
  box-shadow: 3px 3px 10px rgba(0, 88, 162, 0.39);
}

.right_map {
  width: 1370px;
  height: 100vh;
  margin-left: 30px;
}

.Track_process {
  width: 90px;
  background: rgba(0, 88, 162, 1);
  opacity: 1;
  border-radius: 4px;
  font-size: 11px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-left: 110px;
  position: relative;
  top: -20px;
  left: 10px;

  .dingweiicon {
    width: 13px;
    height: 13px;
  }
}

.map {
  width: 100%;
  height: 800px;
}
</style>