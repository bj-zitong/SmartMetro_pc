<template>
    <div class="main-box">
        <div class="main-top">
            <div>
                <div>
                    <h2>历史火警统计</h2>
                    <ul>
                        <li>
                            <span>火灾字段报警系统</span>
                        </li>
                        <li>
                            <span>消防视频监控系统</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <div id="left1" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
            <div>
                <div>
                    <h2>设备状态统计</h2>
                    <ul>
                        <li>
                            <span>在线</span>
                        </li>
                        <li>
                            <span>离线</span>
                        </li>
                        <li>
                            <span>故障</span>
                        </li>
                        <li>
                            <span>报警</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <div id="left2" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
            <div>
                <div>
                    <h2>报警统计（7天）</h2>
                    <h1>1,567次</h1>
                    <ul>
                        <li>
                            <span>未穿戴安全帽</span>
                        </li>
                        <li>
                            <span>现场有明火</span>
                        </li>
                        <li>
                            <span>未穿戴防护服</span>
                        </li>
                        <li>
                            <span>进入危险区</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <div id="left3" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
        </div>
        <div class="main-con">
            <div>
                <div id="left4" style="width: 100%; height: 100%;"></div>
            </div>
            <div>
                <div>
                    <div>
                        <span>未响应</span>
                        <p>28.26%</p>
                    </div>
                    <div>
                        <span>+25.58%</span>
                        <div id="left5" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div>
                    <div>
                        <span>响应率</span>
                        <p>39.18%</p>
                    </div>
                    <div>
                        <span>-25.58%</span>
                        <div id="left6" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>
                <div>
                    <div>
                        <span>平均响应时间</span>
                        <p>14时15分20秒</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    activated() {
        this.drawLeft1();
        this.drawLeft2();
        this.drawLeft3();
        this.drawLeft4();
        this.drawLeft5();
        this.drawLeft6();
    },
    methods: {
        drawLeft1() {
            //  获取echarts
            let left1 = this.$echarts.init(document.getElementById("left1"));
            //  绘制图表
            let option = {
                tooltip: { // hover 悬浮窗
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '历史火警统计',
                        type: 'pie',
                        radius: '86%',
                        center: ['50%', '50%'],
                        label: { // 饼形图上面显示值
                            normal: {
                                show: true,
                                position: 'inner',
                                textStyle: { // 字体样式
                                    fontWeight: 500,
                                    fontSize:12
                                },
                                formatter: '{d}%' // 转换百分比
                            }
                        },
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                        '#457EFD', '#F19A2B',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        data: [
                            {value: 335, name: '火灾字段报警系统'},
                            {value: 792, name: '消防视频监控系统'}
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
            left1.setOption(option)
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
        drawLeft2() {
            //  获取echarts
            let left2 = this.$echarts.init(document.getElementById("left2"));
            //  绘制图表
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        name: '设备状态统计',
                        type: 'pie',
                        radius: ['50%', '86%'],
                        center: ['50%', '50%'],
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
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                        '#60D0FF', '#FFD44F', '#00A6FF', '#FF6060'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        data: [
                            {value: 660, name: '在线'},
                            {value: 90, name: '故障'},
                            {value: 380, name: '离线'},
                            {value: 210, name: '报警'}
                        ]
                    }
                ]
            };
            left2.setOption(option)
            window.addEventListener("resize", function () {
                left2.resize();
            });
        },
        drawLeft3() {
            //  获取echarts
            let left3 = this.$echarts.init(document.getElementById("left3"));
            //  绘制图表
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        name: '报警统计',
                        type: 'pie',
                        radius: ['50%', '90%'],
                        center: ['50%', '50%'],
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
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色 FFD44F FF6060 00A6FF 60D0FF
                                    var colorList = [          
                                        '#FFD44F', '#FF6060', '#00A6FF', '#60D0FF'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        data: [
                            {value: 470, name: '未穿戴安全帽'},
                            {value: 100, name: '现场有明火'},
                            {value: 380, name: '未穿戴防护服'},
                            {value: 210, name: '进入危险区'}
                        ]
                    }
                ]
            };
            left3.setOption(option)
            window.addEventListener("resize", function () {
                left3.resize();
            });
        },
        drawLeft4() {
            //  获取echarts
            let left4 = this.$echarts.init(document.getElementById("left4"));
            //  绘制图表
            let option = {
                title : {
                    text: '近6月已确认报警状态统计',
                    textStyle:{
                        color:"#394565"
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top:'20%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['2020/02', '2020/03', '2020/04', '2020/05', '2020/06', '2020/07'],
                    axisTick: {
                        show: false  
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#8995CB' //字体颜色
                        }
                    },
                    splitLine:{
                        show:false
                        
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                                    show: false  
                                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '##8995CB' //字体颜色
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color: '#D6DEE5'
                            
                        }
                        
                    },
                }],
                series: [
                    {
                        name: '报警状态',
                        type: 'line',
                        smooth: true,
                        //  symbol: "none", //去掉折线点
                        stack: 100,
                        itemStyle: {
                            normal: { 
                                color: '#399DF2'
                                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                //     offset: 0,
                                //     color: '#399DF2' // 0% 处的颜色
                                // }, {
                                //     offset: 0.5,
                                //     color: '#399DF2' // 100% 处的颜色
                                // }, {
                                //     offset: 1,
                                //     color: '#FFFFFF' // 100% 处的颜色
                                // }]), //背景渐变色
                                // lineStyle: { // 系列级个性化折线样式
                                //     width: 0.5,
                                //     type: 'solid',
                                //     color: "#399DF2"
                                // }
                            }
                        }, //线条样式
                        symbolSize: 8, //折线点的大小
                        areaStyle: {
                            normal: {}
                        },
                        data: [20, 60, 50, 80, 120, 100],
                    },
                ]
            };
            left4.setOption(option)
            window.addEventListener("resize", function () {
                left4.resize();
            });
        },
        drawLeft5() {
            //  获取echarts
            let left5 = this.$echarts.init(document.getElementById("left5"));
            //  绘制图表
            let option = {
                grid: {
                    top: '10%',
                    bottom: '10%',
                    left: '10%',
                    right: '10%'
                },
                xAxis: {
                    type: 'category',
                    show:false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    show:false
                },
                series: [{
                    data: [100, 120, 150, 130, 210, 310, 110],
                    type: 'line',
                    symbol: "none",
                    smooth: true,
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#fff'
                            }
                        }
                }
                }]
            };
            left5.setOption(option)
            window.addEventListener("resize", function () {
                left5.resize();
            });
        },
        drawLeft6() {
            //  获取echarts
            let left6 = this.$echarts.init(document.getElementById("left6"));
            //  绘制图表
            let option = {
                grid: {
                    top: '10%',
                    bottom: '10%',
                    left: '10%',
                    right: '10%'
                },
                xAxis: {
                    type: 'category',
                    show:false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    show:false
                },
                series: [{
                    data: [100, 120, 150, 130, 210, 310, 110],
                    type: 'line',
                    symbol: "none",
                    smooth: true,
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#fff'
                            }
                        }
                }
                }]
            };
            left6.setOption(option)
            window.addEventListener("resize", function () {
                left6.resize();
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
    .main-box {
        display:flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        padding-bottom: 30px;
        .main-top {
            display: flex;
            flex: 1;
            flex-direction: row;
            & > div{
                display: flex;
                flex: 1;
                background:rgba(255,255,255,1);
                box-shadow:3px 3px 10px rgba(112,112,112,0.16);
                border-radius:10px;
                padding: 30px;
                margin-bottom: 30px;
                h2 {
                    flex: 1;
                    font-size:24px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(57,69,101,1);
                    margin: 0;
                }
                li {
                    list-style-type: disc;
                    font-size:19px;
                    font-family:SourceHanSansCN-Regular;
                    & > span {
                        color: #7988AD;
                    }
                }
            }
            // 历史火警统计
            & > div:nth-child(1) {
                & > div {
                    display: flex;
                    flex: 1;
                }
                & > div:nth-child(1) {
                    display: flex;
                    flex-direction: column;
                    & > ul {
                        display: flex;
                        flex-direction: column;
                        flex:1;
                        padding: 20px;
                        & > li:nth-child(1) {
                            flex:1;
                            color: #4882FD;
                        }
                        & > li:nth-child(2) {
                            flex:.8;
                            color: #EC9229;
                        }
                    }
                }
            }
            // 设备状态统计
            & > div:nth-child(2) {
                margin-left: 30px;
                margin-right: 30px;
                & > div {
                    display: flex;
                    flex: 1;
                }
            }
            // 报警统计（7天）
            & > div:nth-child(3) {
                h1 {
                    flex:1;
                    font-size:48px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(57,69,101,1);
                }
                & > div:nth-child(1) {
                    display: flex;
                    flex: 1;
                }
                & > div:nth-child(2) {
                    display: flex;
                    flex: .6;
                }
            }
            & > div:nth-child(2), & > div:nth-child(3) {
                
                & > div:nth-child(1) {
                    display: flex;
                    flex-direction: column;
                    & > ul {
                        display: flex;
                        flex-direction: row;
                        flex:1;
                        padding: 20px;
                        flex-wrap: wrap;
                        & > li {
                            width: 50%;
                        }
                        & > li:nth-child(1) {
                            color: #60D0FF;
                        }
                        & > li:nth-child(2) {
                            color: #00A6FF;
                        }
                        & > li:nth-child(3) {
                            color: #FFD44F;
                        }
                        & > li:nth-child(4) {
                            color: #FF6060;
                        }
                    }
                }
            }
            
        }
        .main-con {
            display: flex;
            flex: 1.8;
            & > div {
                display: flex;
                padding: 30px;
                background:rgba(255,255,255,1);
                box-shadow:3px 3px 10px rgba(112,112,112,0.16);
                border-radius:10px;
            }
            & > div:nth-child(1) {
                display:flex;
                flex: 3.4;
                padding: 30px;
            }
            & > div:nth-child(2) {
                display:flex;
                flex: 1;
                flex-direction: column;
                margin-left: 30px;
                padding: 30px;
                & > div {
                    display:flex;
                    flex: 1;
                    border-radius:10px;
                    flex-direction: row;
                    padding: 20px 40px;
                    & > div {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                    }
                    & > div:nth-child(1) {
                        & > span {
                            flex: 1;
                            font-size:20px;
                            font-family:SourceHanSansCN-Medium;
                            color: #fff;
                        }
                        & > p {
                            flex: 1;
                            font-size:36px;
                            font-family:SourceHanSansCN-Medium;
                            color: #fff;
                        }
                    }
                    & > div:nth-child(2) {
                        & > span {
                            flex: 1;
                            text-align: right;
                            font-size:16px;
                            font-family:SourceHanSansCN-Regular;
                            color:#fff;
                        }
                        & > div {
                            flex: 1.5;
                        }
                    }
                }
                & > div:nth-child(1) {
                    background:rgba(255,127,129,1);
                }
                & > div:nth-child(2) {
                    margin: 30px 0;
                    background:rgba(120,213,191,1);
                }
                & > div:nth-child(3) {
                    background:rgba(54,166,226,1);
                }
            }
        }
    }
</style>