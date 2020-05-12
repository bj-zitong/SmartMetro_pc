<template>
    <div class="main-box">
        <el-container>
        <el-menu class="main-top-box pl30">
            <div class="main-btn-box" style="margin-bottom: 30px; padding-left: 0;">
                <el-button class="T-H-B-DarkBlue" @click="addOpen = true">添加</el-button>
                <el-button class="T-H-B-DarkGreen" @click="editPlanClick">编辑</el-button>
            </div>
            <div class="plan-list">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content grid-bg1">
                            <p class="plan-title">满足全面复工工点劳务人员计划人数</p>
                            <p class="plan-num">325</p>
                            <img src="../../../assets/images/sicknessManage/plan-personnel.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-bg2">
                            <p class="plan-title">工点现有劳务人员人数</p>
                            <p class="plan-num">65</p>
                            <img src="../../../assets/images/sicknessManage/labor-personnel.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-bg3">
                            <p class="plan-title">今日工点劳务人员到岗人数</p>
                            <p class="plan-num">189</p>
                            <img src="../../../assets/images/sicknessManage/arrive-personnel.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-bg4">
                            <p class="plan-title">满足全面复工工点管理人员计划人数</p>
                            <p class="plan-num">260</p>
                            <img src="../../../assets/images/sicknessManage/plan-personnel.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-bg5">
                            <p class="plan-title">工点现有管理人员人数</p>
                            <p class="plan-num">32</p>
                            <img src="../../../assets/images/sicknessManage/labor-personnel.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content grid-bg6">
                            <p class="plan-title">今日工点管理人员到岗人数</p>
                            <p class="plan-num">149</p>
                            <img src="../../../assets/images/sicknessManage/arrive-personnel.png" alt="">
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-menu>
        </el-container>
        <el-container>
        <el-menu class="main-con-box pl30" style="padding-bottom: 0;">
            <!-- echarts -->
            <div style="width: 100%;height: 450px;" id="myChart"></div>
        </el-menu>
        </el-container>
    </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";

export default {
    name: "echarts",
    data() {
        editPlanClick: {
        }
    },
    created: {},
    mounted() {
        this.drawBar();
    },
    methods: {
        
        editPlanClick() {},
        drawBar() {
        //  获取echarts
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        //  绘制图表
        myChart.setOption({
            title: {
            //  标题
                text: "数据说明 : 未来一周返场人数计划", //   主标题内容
                x: "40%" //   x轴左边便宜
            },
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
                barWidth: 45,
                itemStyle: {
                normal: {
                    color: "#5D95E0" //  柱状图颜色
                }
                },
                markPoint: {
                symbol: "pin", //标记(气泡)的图形
                symbolSize: 50, //标记(气泡)的大小
                itemStyle: {
                    normal: {
                    borderColor: "#5D95E0",
                    borderWidth: 1, // 标注边线线宽，单位px，默认为1
                    label: {
                        show: true
                    }
                    }
                },
                data: [
                    //配置项
                    { value: "12", xAxis: 0, yAxis: 12 },
                    { value: "32", xAxis: 1, yAxis: 32 },
                    { value: "16", xAxis: 2, yAxis: 16 },
                    { value: "23", xAxis: 3, yAxis: 23 },
                    { value: "45", xAxis: 4, yAxis: 45 },
                    { value: "35", xAxis: 5, yAxis: 35 },
                    { value: "52", xAxis: 6, yAxis: 52 }
                ]
                },
                data: [12, 32, 16, 23, 45, 35, 52,]
            }
            ]
        });
        }
    }
};
</script>

<style lang="stylus" scoped>
.main-title {
    width: 100%;
    font-size: 20px;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
    text-align: center;
    margin-bottom: 64px;
}
.plan-list {
    padding: 0 30px 20px 0;
}
.plan-list .grid-content{
    width: 200px;
    height: 100px;
    border-radius:4px;
    position: relative;
    padding-top: 20px;
}
.plan-list .grid-content p.plan-title {
    font-size: 12px;
    -webkit-transform: scale(0.9);
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-bottom: 13px;
}
.plan-list .grid-content p.plan-num {
    font-size:28px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-left: 24px;
}
.plan-list .grid-content img {
    position: absolute;
    width: 49px;
    height: 56px;
    right: 0;
    bottom:0;
}

.plan-list .grid-bg1 {
    background:rgba(249,205,51,1);
}
.plan-list .grid-bg2 {
    background:rgba(247,145,77,1);
}
.plan-list .grid-bg3 {
    background:rgba(29,158,238,1);
}
.plan-list .grid-bg4 {
    background:rgba(96,90,216,1);
}
.plan-list .grid-bg5 {
    background:rgba(128,209,251,1);
}
.plan-list .grid-bg6 {
    background:rgba(94,216,169,1);
}
@media screen and (max-width: 1610px) {
    .grid-content {
        width: 1000px;
    }
}
</style>

<style lang="stylus"></style>
