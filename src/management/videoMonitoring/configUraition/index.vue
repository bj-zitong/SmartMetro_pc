<template>
    <div class="main-box">
        <div class="main-top">
            <div>
                <!-- 进入警情 -->
                <div>
                    <div id="todayWarn" style="width: 100%; height: 100%;"></div>
                </div>
                <!-- 今日隐患 -->
                <div>
                    <div id="todayDanger" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
            <div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    :header-cell-style="headClass"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    max-height="200px"
                >
                    <el-table-column prop="deviceName" label="设备名称" min-width="100"></el-table-column>
                    <el-table-column prop="monitorName" label="监控点名称" min-width="80"></el-table-column>
                    <el-table-column prop="policeType" label="报警类型" min-width="100"></el-table-column>
                    <el-table-column prop="policeDate" label="报警时间" min-width="100"></el-table-column>
                    <el-table-column label="操作" width="80" fixed="right">
                        <template slot-scope="scope">
                        <el-button
                            class="T-R-B-Green"
                            size="mini"
                            @click.native="videoRowClick(scope.$index, scope.row)"
                        >视频</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页& -->
                <pagination
                class="pagination-box1"
                v-if="total>0"
                :total="total"
                :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pageSize"
                @pagination="getTable"
                />
            </div>
        </div>
        <div class="main-con">
            <div>
                <div id="trendThirty" style="width: 100%; height: 100%;"></div>
            </div>
        </div>
    </div>
</template>
<script>

import Pagination from "@/components/pagination";

export default {
    components: {
        Pagination
    },
    data() {
        return {
            total:5,
            listQuery: {
                currentPage: 1, //与后台定义好的分页参数
                pageSize: 10
            },
            tableData: [],
        }
    },
    activated() {
        this.getTable();
        this.todayWarn();
        this.todayDanger();
        this.trendThirty();
    },
    methods: {
        // 表格加载请求
        getTable() {
            var data = JSON.stringify({
                pageSize: this.listQuery.pageSize,
                page: this.listQuery.currentPage
            });
            //请求
            var url = "";
            this.http.post(url, data).then(res => {
                if (res.code == 200) {
                var total = res.total;
                var rows = res.rows;
                this.tableData = rows;
                this.total = total;
                }
            });
            var result = [
                {
                    deviceName: "设备1",
                    monitorName: "监控点1",
                    policeType: "紧急",
                    policeDate: "12:12"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
                {
                    deviceName: "设备2",
                    monitorName: "监控点2",
                    policeType: "一般",
                    policeDate: "19:19"
                },
            ];
            this.tableData = result;
            this.total = result.length;
        },
        // 表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        },
        // 今日警情
        todayWarn() {
            let todayWarn = this.$echarts.init(document.getElementById("todayWarn"));
            
            let title = '总量';
            let echartData = [
                { name: "未穿戴安全帽", value: "3720" },
                { name: "未穿戴防护服", value: "2920" },
                { name: "进入危险区", value: "2200" },
                { name: "现场有明火", value: "1420" },
                { name: "设备故障", value: "1420" },
                { name: "设备离线", value: "1420" }
            ];

            let formatNumber = function(num) {
                let reg = /(?=(\B)(\d{3})+$)/g;
                return num.toString().replace(reg, ',');
            }
            let total = echartData.reduce((a, b) => {
                return a + b.value * 1
            }, 0);

            let option = {
                color: ['#C355DF', '#FB765E', '#FBA900', '#1CD7FF', '#53A0F9', '#3B54EC'],
                title: [{
                    text: '{val|' + formatNumber(total) + '}\n{name|' + title + '}',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#98A9C4',
                                padding: [10, 0]
                            },
                            val: {
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#2D405E',
                            }
                        }
                    }
                },{
                    text: '今日警情',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 24,
                        color:'#394565',
                        fontWeight: 400
                    }
                }],
                legend: {
                    orient: 'vertical',
                    icon: 'circle',
                    x: '80%',
                    y: 'center',
                    itemWidth: 8,
                    itemHeight: 8,
                    align: 'left'
                },
                series: [{
                    type: 'pie',
                    radius: ['60%', '80%'],
                    center: ['50%', '50%'],
                    data: echartData,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            position: 'inner',
                            show : false
                        }
                    },
                }]
            };
            todayWarn.setOption(option)
            window.addEventListener("resize", function () {
                todayWarn.resize();
            });
        },
        // 今日隐患
        todayDanger() {
            let todayDanger = this.$echarts.init(document.getElementById("todayDanger"));
            
            let title = '总量';
            let echartData = [
                { name: "未穿戴安全帽", value: "3720" },
                { name: "未穿戴防护服", value: "2920" },
                { name: "进入危险区", value: "2200" },
                { name: "现场有明火", value: "1420" },
                { name: "设备故障", value: "1420" },
                { name: "设备离线", value: "1420" }
            ];

            let formatNumber = function(num) {
                let reg = /(?=(\B)(\d{3})+$)/g;
                return num.toString().replace(reg, ',');
            }
            let total = echartData.reduce((a, b) => {
                return a + b.value * 1
            }, 0);

            let option = {
                color: ['#C355DF', '#FB765E', '#FBA900', '#1CD7FF', '#53A0F9', '#3B54EC'],
                title: [{
                    text: '{val|' + formatNumber(total) + '}\n{name|' + title + '}',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#98A9C4',
                                padding: [10, 0]
                            },
                            val: {
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: '#2D405E',
                            }
                        }
                    }
                },{
                    text: '今日隐患',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 24,
                        color:'#394565',
                        fontWeight: 400
                    }
                }],
                legend: {
                    orient: 'vertical',
                    icon: 'circle',
                    x: '80%',
                    y: 'center',
                    itemWidth: 8,
                    itemHeight: 8,
                    align: 'left'
                },
                series: [{
                    type: 'pie',
                    radius: ['60%', '80%'],
                    center: ['50%', '50%'],
                    data: echartData,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            position: 'inner',
                            show : false
                        }
                    },
                }]
            };
            todayDanger.setOption(option)
            window.addEventListener("resize", function () {
                todayDanger.resize();
            });
        },
        // 近30天报警趋势
        trendThirty() {
            let trendThirty = this.$echarts.init(document.getElementById("trendThirty"));
            let option = {
                title : {
                    text: '近30天报警趋势',
                    textStyle:{
                        color:"#394565",
                        fontSize: 24
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    borderWidth:'0',
                    backgroundColor:'#fff',
                    formatter: function(params, ticket, callback) {
                        let res = `<div style="padding:1px 10px;"><div style="color: red;font-size:20px;margin-bottom:10px;">${params[0].data}</div><div style="color: #A7B1CA;font-size:16px;">${params[0].axisValue}</div></div>`;
                        return res;
                    }
                },
                grid: {
                    top:'18%',
                    left:'3%',
                    bottom: '10%',
                    right: '2%'
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                    show: false  
                    },
                    axisTick: {
                    show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#BABABA' //字体颜色
                        }
                    },
                    boundaryGap: false,
                    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11', '12', '13', '14', '15', '16', '17','18','19','20','21', '22', '23', '24', '25', '26', '27','28','29','30']
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                    show: false  
                    },
                    axisTick: {
                    show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#BABABA' //字体颜色
                        }
                    }
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932],
                    type: 'line',
                    smooth: true,
                    symbolSize: 10,
                    itemStyle: {
                        normal: { 
                            color: '#5962FF',
                            lineStyle:{
                                width:4,
                                color:'#5962FF' //折线颜色
                            }
                        }
                    },
                }]
            };
            trendThirty.setOption(option)
            window.addEventListener("resize", function () {
                trendThirty.resize();
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
                background:rgba(255,255,255,1);
                box-shadow:3px 3px 10px rgba(112,112,112,0.16);
                border-radius:10px;
                padding: 30px;
                margin-bottom: 30px;
            }
            // 饼图
            & > div:nth-child(1) {
                display: flex;
                flex: 1.32;
                flex-direction: row;
                & > div:nth-child(1) {
                    flex: 1;
                }
                & > div:nth-child(2) {
                    flex: 1;
                }
            }
            // 表格
            & > div:nth-child(2) {
                flex: 1;
                flex-direction: column;
                margin-left: 30px;
                padding-bottom: 0;
            }
            
        }
        .main-con {
            display: flex;
            flex: 1.07;
            // 近30天报警趋势
            & > div {
                display: flex;
                flex: 1;
                padding: 30px;
                background:rgba(255,255,255,1);
                box-shadow:3px 3px 10px rgba(112,112,112,0.16);
                border-radius:10px;
            }
        }
    }
</style>
<style lang="stylus">
.pagination-box1 {
    padding: 10px;
    text-align: center;
}
</style>