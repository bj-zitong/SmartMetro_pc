<template>
    <div style="height:100%;">
        <div class="home-box">
            <div class="main-left">
                <div class="h-m-l1">
                    <div class="min-box">
                        <div class="main-title">
                            <span>现场人员</span>
                        </div>
                        <div id="left1" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div class="h-m-l2">
                    <div class="min-box">
                        <div class="main-title">
                            <span>在岗参建单位人数</span>
                        </div>
                        <div id="left2" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div class="h-m-l3">
                    <div class="min-box">
                        <div class="main-title">
                            <span>近期人员变化</span>
                        </div>
                        <div id="left3" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div class="h-m-l4">
                    <div class="min-box">
                        <div class="main-title">
                            <span>培训通过</span>
                        </div>
                        <div id="left4" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="main-center">
                <div class="h-m-c1">
                    <div class="min-box">
                        <div class="main-title">
                            <span>近7天出勤情况</span>
                        </div>
                        <el-tabs v-model="attendance" class="attendance" type="card" @tab-click="attendanceClick">
                            <el-tab-pane label="班组" name="team">
                                <div style="padding: 0 100px;">
                                    <el-row :gutter="30">
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组1</p>
                                                <p class="tab-con">51612</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组2</p>
                                                <p class="tab-con">3254</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组3</p>
                                                <p class="tab-con">4888</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组4</p>
                                                <p class="tab-con">57159</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组5</p>
                                                <p class="tab-con">249</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="工种" name="workType">工种</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="h-m-c2">
                    <div class="min-box">
                        <div id="center2" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div class="h-m-c3">
                    <div class="min-box" style="display:flex;">
                        <div style="width:25%;">
                            <div id="center31" class="charts" style="width: 100%; height: 100%;"></div>
                        </div>
                        <div style="width:25%;">
                            <div id="center32" class="charts" style="width: 100%; height: 100%;"></div>
                        </div>
                        <div style="width:25%;">
                            <div id="center33" class="charts" style="width: 100%; height: 100%;"></div>
                        </div>
                        <div style="width:25%;">
                            <div id="center34" class="charts" style="width: 100%; height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-right">
                <div class="h-m-r1">
                    <div class="min-box">
                        <div class="main-title">
                            <span>计划返京员工统计</span>
                        </div>
                        <div id="right1" class="charts" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div class="h-m-r2">
                    <div class="min-box">
                        <div class="main-title">
                            <span>人员动态</span>
                        </div>
                        <el-tabs v-model="dynamic" class="dynamic" type="card" @tab-click="dynamicClick">
                            <el-tab-pane label="最近出勤" name="dynamicTab1">
                                <div style="text-algin: center;">
                                        <el-row>
                                            <el-col :span="6" :push="4"><div class="grid-tab-title">姓名</div></el-col>
                                            <el-col :span="6" :push="2"><div class="grid-tab-title">工号</div></el-col>
                                            <el-col :span="6" :push="1"><div class="grid-tab-title">班组</div></el-col>
                                            <el-col :span="6"><div class="grid-tab-title">时间</div></el-col>
                                        </el-row>
                                    </div>
                                    <div class="con" style="padding-top: 20px">
                                        <el-row class="dynamicRow">
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row class="dynamicRow">
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row class="dynamicRow">
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row class="dynamicRow">
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row class="dynamicRow">
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                    </div>
                            </el-tab-pane>
                            <el-tab-pane label="最近出场" name="dynamicTab2">最近出场</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            attendance: 'team',
            dynamic: 'dynamicTab1'
        }
    },
    mounted() {
        this.drawLeft1();
        this.drawLeft2();
        this.drawLeft3();
        this.drawLeft4();
        this.drawCon2();
        this.drawCon31();
        this.drawCon32();
        this.drawCon33();
        this.drawCon34();
        this.drawRight1();
    },
    methods: {
        // 近7天出勤情况
        attendanceClick(tab, event) {
            console.log(tab,event)
        },
        dynamicClick(tab, event) {
            console.log(tab,event)
        },
        drawLeft1() {
            //  获取echarts
            let left1 = this.$echarts.init(document.getElementById("left1"));
            //  绘制图表
            let left1Option = {
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
            };
            left1.setOption(left1Option)
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
        // 近期人员变化
        drawLeft2() {
            //  获取echarts
            let left2 = this.$echarts.init(document.getElementById("left2"));
            //  绘制图表
            var data = [70, 34, 60, 78, 69]
            var titlename = ['劳务一组', '劳务二组', '劳务三组', '劳务四组', '劳务五组'];
            var valdata = [100,100,100,100,100]
            let left2Option = {
                grid:{
                    top:'20%',
                    left:'20%',
                    right:'20%',
                    bottom: '10%'
                },
                xAxis: {
                    show: false,
                    type:'value'
                },
                yAxis: [
                    {
                        show: true,
                        data: titlename,
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {// y轴文字
                            color: '#0D69F1'
                        },
                    },
                   
                    {
                        show: true,
                        inverse: true,
                        data: valdata,
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,
                                color: '#ccc',
                            },
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },

                    }
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: data,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: '#0D69F1',
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        }
                    },
                    {
                        name: '框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100],
                        barWidth: 11,
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: '#70AAFF',
                                borderWidth: 3,
                                barBorderRadius: 15,
                            }
                        },
                        barCateGoryGap:20
                    }
                ]
            };
            left2.setOption(left2Option)
            window.addEventListener("resize", function () {
                left2.resize();
            });
        },
        // 近期人员变化
        drawLeft3() {
            //  获取echarts
            let left3 = this.$echarts.init(document.getElementById("left3"));
            //  绘制图表
            let left3Option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid:{
                    x:50,
                    y:50,
                    x2:50,
                    y2:30
                },
                xAxis: {
                    name:'日期',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    type: 'category',
                    axisLine:{      //  坐标轴线
                        show:false  //  隐藏
                    },
                    axisTick: {     //刻度线
                        show: false //隐藏
                    },
                    splitLine: {    //坐标轴在grid区域的分隔线
                        show: true
                    },
                    data: ['4-21', '4-22', '4-23', '4-24', '4-25', '4-26', '4-27']
                },
                yAxis: {
                    name:'人数(个)',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    axisLine:{      //坐标轴线
                        show:false  //隐藏
                    },
                    axisTick: {     //刻度线
                        show: false //隐藏
                    },
                    type: 'value'
                },
                series: [
                    {
                        name:'在职人员',
                        type: 'line',
                        stack:'在职人员',
                        areaStyle: {},//折线区域填充
                        smooth: true,    //折线弧度
                        // symbolSize:0,   // 折线点标记大小
                        itemStyle: {// 填充区域颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#71BCFE' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#36BC64' // 100% 处的颜色
                                }, {
                                    offset: 1, color: '#B2FFB7' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }, //线条样式
                        data: [170, 50, 99, 220, 86, 27, 71]
                    },
                    {
                        name:'离职人员',
                        type: 'line',
                        stack:'离职人员',
                        areaStyle: {},//折线区域填充
                        smooth: true,    //折线弧度
                        // symbolSize:0,   // 折线点标记大小
                        itemStyle: {// 填充区域颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#FAA1A1' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#F0374B' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }, //线条样式
                        data: [45, 84, 25, 75, 195, 57, 37]
                    }
                ]
            };
            left3.setOption(left3Option)
            window.addEventListener("resize", function () {
                left3.resize();
            });
        },
        // 近期人员变化
        drawLeft4() {
            //  获取echarts
            let left4 = this.$echarts.init(document.getElementById("left4"));
            //  绘制图表
            let left4Option = {
                tooltip: {}, //  鼠标悬浮
                grid: {
                    top:'40%',
                    left:'10%',
                    bottom:'15%',
                    right:'10%'
                },
                xAxis: {
                    //  x轴配置
                    name: "日期", // 坐标轴名称
                    nameTextStyle: {
                        //   坐标轴名称字体设置
                        color: "#C0C0C0"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: { color: "rgb(51,51,51)" },
                    axisLine: {
                        lineStyle: { color: "rgb(237,237,255)" }
                    },
                    data: ['1', '2', '3', '4', '5', '6', '7']
                },
                yAxis: {
                name: "人数(个)",
                type: "value",
                nameTextStyle: {
                    color: "#C0C0C0"
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: ["#EDEDFF"],
                    width: 1,
                    type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: { color: "rgb(51,51,51)" },
                axisLine: {
                    lineStyle: { color: "rgb(237,237,255)" }
                }
                },
                series: [
                    {
                        name: "分数",
                        type: "bar",
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color: "#5D95E0" //  柱状图颜色
                            }
                        },
                        data: [12, 32, 51, 23, 18, 35, 52,]
                    }
                ]
            };
            left4.setOption(left4Option)
            window.addEventListener("resize", function () {
                left4.resize();
            });
        },
        // 进7天出勤情况
        drawCon2() {
            //  获取echarts
            let center2 = this.$echarts.init(document.getElementById("center2"));
            //  绘制图表
            let center2Option = {
                tooltip: {}, //  鼠标悬浮
                xAxis: {
                    //  x轴配置
                    name: "日期", // 坐标轴名称
                    nameTextStyle: {
                        //   坐标轴名称字体设置
                        color: "#C0C0C0"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: { color: "rgb(51,51,51)" },
                    axisLine: {
                        lineStyle: { color: "rgb(237,237,255)" }
                    },
                    data: ['1', '2', '3', '4', '5', '6', '7']
                },
                yAxis: {
                name: "人数(个)",
                type: "value",
                nameTextStyle: {
                    color: "#C0C0C0"
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: ["#EDEDFF"],
                    width: 1,
                    type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: { color: "rgb(51,51,51)" },
                axisLine: {
                    lineStyle: { color: "rgb(237,237,255)" }
                }
                },
                series: [
                {
                    name: "分数",
                    type: "bar",
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color: "#5D95E0" //  柱状图颜色
                        }
                    },
                    data: [12, 32, 16, 23, 45, 35, 52,]
                }
                ]
            }
            center2.setOption(center2Option)
            window.addEventListener("resize", function () {
                center2.resize();
            });
        },
        // 进7天出勤情况
        drawCon31() {
            //  获取echarts
            let center31 = this.$echarts.init(document.getElementById("center31"));
            //  绘制图表
            let data = [80]
            let center31Option = {
                title: {
                    text: '管理人员',
                    x: 'center',
                    y:'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#BA31FF',
                        fontSize: '14'
                    },
                    subtext:data+'%',
                    subtextStyle:{
                        color:'#BA31FF',
                        fontSize: '20',
                        x: 'center',
                        y:'center'
                    }
                },
                color: ['#F9F9F9'], 
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['50%', '66%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth:5
                        }
                    },
                    hoverAnimation: false, 
                    data: [{
                        value: data,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#BA31FF' // 0% 处的颜色
                            } 
                        }
                    }, {
                        name: '02',
                        value: 20
                    }]
                }]
            }
            center31.setOption(center31Option)
            window.addEventListener("resize", function () {
                center31.resize();
            });
        },
        drawCon32() {
            //  获取echarts
            let center32 = this.$echarts.init(document.getElementById("center32"));
            //  绘制图表
            let data = [80]
            let center32Option = {
                title: {
                    text: '劳务人员',
                    x: 'center',
                    y:'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#FA8E22',
                        fontSize: '14'
                    },
                    subtext:data+'%',
                    subtextStyle:{
                        color:'#FA8E22',
                        fontSize: '20',
                        x: 'center',
                        y:'center'
                    }
                },
                color: ['#F9F9F9'], 
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['50%', '66%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth:5
                        }
                    },
                    hoverAnimation: false, 
                    data: [{
                        value: data,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#FA8E22' // 0% 处的颜色
                            } 
                        }
                    }, {
                        name: '02',
                        value: 20
                    }]
                }]
            }
            center32.setOption(center32Option)
            window.addEventListener("resize", function () {
                center32.resize();
            });
        },
        drawCon33() {
            //  获取echarts
            let center33 = this.$echarts.init(document.getElementById("center33"));
            //  绘制图表
            let data = [80]
            let center33Option = {
                title: {
                    text: '设备管理人员',
                    x: 'center',
                    y:'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#46D797',
                        fontSize: '14'
                    },
                    subtext:data+'%',
                    subtextStyle:{
                        color:'#46D797',
                        fontSize: '20',
                        x: 'center',
                        y:'center'
                    }
                },
                color: ['#F9F9F9'], 
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['50%', '66%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth:5
                        }
                    },
                    hoverAnimation: false, 
                    data: [{
                        value: data,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#46D797' // 0% 处的颜色
                            } 
                        }
                    }, {
                        name: '02',
                        value: 20
                    }]
                }]
            }
            center33.setOption(center33Option)
            window.addEventListener("resize", function () {
                center33.resize();
            });
        },
        drawCon34() {
            //  获取echarts
            let center34 = this.$echarts.init(document.getElementById("center34"));
            //  绘制图表
            let data = [80]
            let center34Option = {
                title: {
                    text: '其他服务类人员',
                    x: 'center',
                    y:'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#67BCFF',
                        fontSize: '14'
                    },
                    subtext:data+'%',
                    subtextStyle:{
                        color:'#67BCFF',
                        fontSize: '20',
                        x: 'center',
                        y:'center'
                    }
                },
                color: ['#F9F9F9'], 
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['50%', '66%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth:5
                        }
                    },
                    hoverAnimation: false, 
                    data: [{
                        value: data,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#67BCFF' // 0% 处的颜色
                            } 
                        }
                    }, {
                        name: '02',
                        value: 20
                    }]
                }]
            }
            center34.setOption(center34Option)
            window.addEventListener("resize", function () {
                center34.resize();
            });
        },
        drawRight1() {
            //  获取echarts
            let right1 = this.$echarts.init(document.getElementById("right1"));
            //  绘制图表
            let right1Option = {
                grid: {
                    top: '30%',
                    left: '15%',
                    right: '15%',
                    bottom:'15%'
                },
                xAxis: {
                    type: 'category',
                    data: ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            };
            right1.setOption(right1Option)
            window.addEventListener("resize", function () {
                right1.resize();
            });
        },
    }
}
</script>

<style scoped>
.home-box {
    display: flex;
    height: 100%;
    overflow: hidden;
    background: #eee;
    padding: 0 15px 15px;
}
.home-box>div {
    margin: 0 15px;
    height: 100%;
}
.home-box .main-left {
    /* height: 502px; */
    width: 30%;
}
.home-box .main-center {
    width: 50%;
}
.home-box .main-right {
    width: 20%;
}
.min-box {
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:10px;
    position: relative;
}
.min-box .charts{
    position: unset;
}
.main-title {
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:19px;
    color:rgba(0,88,162,1);
    opacity:1;
    position: absolute;
    top: 10px;
    left: 20px;

}
.h-m-l1 {
    height:27%;
}
.h-m-l2 {
    padding-top: 15px;
    height: 27%;
}
.h-m-l3 {
    padding-top: 15px;
    height: 22%;
}
.h-m-l4 {
    padding-top: 15px;
    height: 24%;
}
.h-m-c1 {
    height: 19%;
}
.h-m-c2 {
    padding-top: 15px;
    height: 49%;
}
.h-m-c3 {
    padding-top: 15px;
    height: 32%;
}
.h-m-r1 {
    height: 27%;
}
.h-m-r2 {
    padding-top: 15px;
    height: 73%;
}

/* @media screen and (max-width: 1600px) {
    .home-box {
        flex-direction: column;
    }
    .h-m-l1 {
        height: 300px;
    }
} */
/* | row-reverse | column | column-reverse */
</style>
<style lang="stylus">
.attendance .el-tabs__header {
    border:none !important;
}
.attendance .el-tabs__nav-scroll{
    padding-left:80%;
}
.attendance .el-tabs__header {
    padding-top:10px;
}
.attendance .el-tabs__nav {
    height:26px;
    border-bottom: 1px solid #E4E7ED !important;
}
.attendance .el-tabs__item {
    height:26px;
    line-height:26px;
}
.attendance .is-active {
    background: #0058A2;
    color:#fff;
}
.attendance .tab-title {
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:19px;
    color:rgba(99,99,99,1);
    opacity:1;
}
.attendance .tab-con {
    text-align: center;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:50px;
    color:rgba(0,88,162,1);
    opacity:1;
}
.dynamic .el-tabs__header {
    border:none !important;
    padding-top:40px;
}
.dynamic .el-tabs__nav-scroll {
    padding-left:30%;

}
.dynamic .el-tabs__item {
    height:26px;
    line-height:26px;
    font-size:12px;
    padding: 0 10px !important;
    border:none !important;
}
.dynamic .el-tabs__nav {
    border:none !important;
}
.dynamic .is-active {
    height:26px;
    background:rgba(0,88,162,1);
    color:#fff;
    opacity:1;
    border-radius:13px;
}
.dynamic .grid-tab-title {
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(0,88,162,1);
    opacity:1;
}
.dynamic .grid-con {
    font-size:10px;
    font-family:Microsoft YaHei;
    line-height:14px;
    color:rgba(51,51,51,1);
    opacity:1;
}
.dynamicRow {
    padding-left: 15px;
    height: 35px;
}
</style>
