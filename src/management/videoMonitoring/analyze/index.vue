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
            <div>3</div>
        </div>
        <div class="main-con">
            <div>1</div>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
    </div>
</template>
<script>
import historyBar from "./charts/historyBar";
export default {
    data() {
        return {
            
        }
    },
    activated() {
        this.drawLeft1();
        this.drawLeft2();
        // this.drawLeft3();
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
        }
    }
}
</script>
<style lang="stylus">
    .main-box {
        display:flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 30px;
        .main-top {
            display: flex;
            flex: 1;
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
                & > div:nth-child(1) {
                    display: flex;
                    flex-direction: column;
                    & > ul {
                        display: flex;
                        flex-direction: row;
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
            // 报警统计（7天）
            & > div:nth-child(3) {
                
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
                    border-radius:10px;
                    flex: 1;
                    padding: 20px 40px;
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