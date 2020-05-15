<template>
    <div class="home-box">
<!-- 头部 -->
        <div class="home-header">
            <div class="home-header-min-box af">
                <div class="home-header-left fl">
                <div class="header-left fl">
                    <img src="../assets/images/home/home-logo1.png" alt="">
                </div>
                <div class="header-right fr">城市轨道交通智慧工地管理系统</div>
                </div>
                <div class="home-header-right fr">
                <div class="out fl">
                    <el-link class="out-text">13号线02标中铁二局</el-link>
                </div>
                <div class="interval fl"></div>
                <div class="name fl">
                    <div class="fl">
                    <a href="javascript:;">
                        <img src="../assets/images/home/home-head.png" alt="">
                    </a>
                    </div>
                    <p href="javascript:;" class="name-text fr">用户名</p>
                </div>
                </div>
            </div>
        </div>
<!-- 主体 -->
        <div class="home-main">
            <div style="width:100%; height:100%">
                <el-row :gutter="30" class="home-min-box">
                    <el-col :span="7" class=" h-m-l h100">
                        <div class="grid-content h-m-l1">
                            <div class="h-m-title">
                                <span>现场人员</span>
                            </div>
                            <div style="width: 100%;height: 100%" id="left1"></div>
                        </div>
                        <div class="grid-content h-m-l2">
                            <div class="h-m-title">
                                <span>在岗参建单位人数</span>
                            </div>
                            <div style="padding-top: 60px;">
                            <el-progress :percentage="50"></el-progress>
                            </div>
                            <!-- <div style="width: 100%;height: 100%" id="left2"></div> -->
                        </div>
                        <div class="grid-content h-m-l3">
                            <div class="h-m-title">
                                <span>近期人员变化</span>
                            </div>
                            <div style="width: 100%;height: 100%" id="left3"></div>
                        </div>
                        <div class="grid-content h-m-l4">4</div>
                    </el-col>
                    <el-col :span="12" class="h-m-c h100">
                        <div class="grid-content h-m-c1">1</div>
                        <div class="grid-content h-m-c2">2</div>
                        <div class="grid-content h-m-c3">3</div>
                    </el-col>
                    <el-col :span="5" class="h-m-r h100">
                        <div class="grid-content h-m-r1">1</div>
                        <div class="grid-content h-m-r2">2</div>
                    </el-col>
                </el-row> 
            </div>
        </div>
    </div> 
</template> 

<script>
export default {
    name: "echarts",
    data() {
        return {
            labelPosition: 'top',
            addOpen: false,
            editOpen: false,
            addPlan: {},
            editPlan: {},
            // 自定义验证规则
            rulesForm: {
                laborPersonnelPlan: [
                    { required: true, message: "请输入劳务人员计划人数", trigger: "blur" },
                    { type: 'number', message: "人数必须为数字值" }
                ],
                adminPersonnelPlan: [
                    { required: true, message: "请输入管理人员计划人数", trigger: "blur" },
                    { type: 'number', message: "人数必须为数字值" }
                ]
            }
        }
    },
    created: {},
    mounted() {
        this.drawLeft1();
        // this.drawLeft2();
        this.drawLeft3();
    },
    methods: {
        // 现场人员
        drawLeft1() {
            //  获取echarts
            let left1 = this.$echarts.init(document.getElementById("left1"));
            //  绘制图表
            left1.setOption({
                tooltip: { // hover 悬浮窗
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: { // 图例组件
                    type:'plain',    // plain 普通图例   scroll  可滚动图例（图例数量多的时候使用）
                    orient: 'vertical', // 横向 horizontal 纵向 vertical
                    top: 'middle',
                    right: '8%',
                    itemWidth: 12,
                    itemHeight: 5,
                    textStyle:{ // 公共文字设置
                        fontSize: '10',
                        padding:[0, 0, 0, 5]
                    },
                    data: ['钢筋工', '电焊工', '木工', '瓦工', '力工']
                },
                series: [
                    {
                        name: '现场人员',
                        type: 'pie',
                        radius: '70%',
                        center: ['45%', '50%'],
                        label: { // 饼形图上面显示值
                            normal: {
                                show: true,
                                position: 'inner',
                                textStyle: { // 字体样式
                                    fontWeight: 300,
                                    fontSize:12
                                },
                                formatter: '{d}%' // 转换百分比
                            }
                        },
                        data: [
                            {value: 335, name: '钢筋工'},
                            {value: 310, name: '电焊工'},
                            {value: 234, name: '木工'},
                            {value: 135, name: '瓦工'},
                            {value: 1548, name: '力工'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
        // 在岗参见单位人数
        drawLeft2() {
            //  获取echarts
            let left2 = this.$echarts.init(document.getElementById("left2"));
            //  绘制图表
            left2.setOption({
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
        // 近期人员变化
        drawLeft3() {
            //  获取echarts
            let left3 = this.$echarts.init(document.getElementById("left3"));
            //  绘制图表
            left3.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4-21', '4-22', '4-23', '4-24', '4-25', '4-26', '4-27']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            });
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
    }
}
/**
 * 现场人员 饼形图  二期优化 实现图例的 scroll
 * 
 */
</script>

<style lang="stylus" scoped>
.home-box {
  width 100%;
  height 100%;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style:none;
}
.home-box {
  position absolute;
}
/* 头部样式 */
.home-header {
  position relative;
  height 70px;
  background:rgba(0,88,162,1);
}
.home-header-min-box{
  position relative;
  padding 0 50px;
  height 100%;
}
.home-header-left{
  height 100%;
  box-sizing border-box;
  padding-top: 10px;
}
.header-left img{
  width: 50px;
  height: 50px;
}
.header-right{
    width:342px;
    height:31px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:50px;
    color:rgba(255,255,255,1);
}
.header-right img{
    width: 50px;
    height: 50px;
}
.home-header-right{
  height 100%;
  box-sizing border-box;
  padding-top 20px;
}
.interval{
  width:0px;
  height:20px;
  color:rgba(255,255,255,1);
  margin 5px 10px 0 5px;
  opacity:1;
}
.out{
  margin-right 10px;
  padding-top 6px;
}
.out-text{
  width:150px;
  height:21px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  opacity:1;
}
.out-text:hover {
    color:rgba(245,245,245,1);
    text-direction: none;
}
.name-text{
  width:60px;
  height:21px;
  margin-left 10px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:31px;
  color:rgba(255,255,255,1);
  opacity:1;
}
/* 主体样式 */
.home-main {
    width: 100%;
    height: calc(100% - 70px);
    background:rgba(246,247,248,1);
    padding: 30px;
}
.home-min-box {
    height: 100%;
}
.h100 {
    height: 100%;
}
.h-m-l1, .h-m-l2, .h-m-l3, .h-m-l4, .h-m-c1, .h-m-c2, .h-m-c3, .h-m-r1, .h-m-r2 {
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:10px;
    position: relative;
}
.h-m-l1, .h-m-l2, .h-m-l3, .h-m-c1, .h-m-c2, .h-m-r1 {
    margin-bottom: 20px;
}
.h-m-c1, .h-m-c2, .h-m-r1 {
    margin-bottom: 30px;
}
.h-m-l1, .h-m-r1 {
    height: 26%;
}
.h-m-l2 {
    height: 24%;
}
.h-m-l3 {
    height: 20%;
}
.h-m-l4 {
    height: 23%;
}
.h-m-c1 {
    height: 15%;
}
.h-m-c2 {
    height: 46%;
}
.h-m-c3 {
    height: 32%;
}
.h-m-r2 {
    height: 70.6%;
}
.h-m-title {
    position:absolute;
    top: 20px;
}
.h-m-title span{
    border-left: 4px solid #0058A2;
    border-radius: 3px;
    padding-left:11px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(0,88,162,1);
    opacity:1;
}
</style>