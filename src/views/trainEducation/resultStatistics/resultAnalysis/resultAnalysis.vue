<template>
<!-- 成績分析 -->
    <div class="main-box">
        <div class="echarts-box">
            <div id="myChart" :style="{width: '90%', height: '500px'}"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        //  获取echarts
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        //  绘制图表
        myChart.setOption({
            title: {//  标题
                text: '人员成绩统计分析图',//   主标题内容
                x:"46%"//   x轴左边便宜
            },
            tooltip: {},//  鼠标悬浮
            xAxis: {//  x轴配置
                name: "分数(分)",// 坐标轴名称
                nameTextStyle:{//   坐标轴名称字体设置
                    color:"#C0C0C0"
                },
                splitLine: {
                    show: false,
            　　},
                axisTick:{
                    show:false
                },
                axisLabel:{color:'rgb(51,51,51)'},
                axisLine:{
                    lineStyle:{color:'rgb(237,237,255)'}
                },
                data: ["1-10","11-20","21-30","41-50","51-60","61-70","71-80","81-90","91-100"]
            },
            yAxis: {
                name: "人数(个)",
                type: 'value',
                nameTextStyle:{
                    color:"#C0C0C0"
                },
                splitLine: {
                    show: true,
                        lineStyle:{
                        color: ['#EDEDFF'],
                        width: 1,
                        type: 'solid'
                    }
            　　},
                axisTick:{
                    show:false
                },
                axisLabel:{color:'rgb(51,51,51)'},
                axisLine:{
                    lineStyle:{color:'rgb(237,237,255)'}
                }
            },
            series: [{
                name: '分数',
                type: 'bar',
                barWidth: 45,
                itemStyle:{
                    normal:{
                        color:'#5D95E0',//  柱状图颜色
                    }
                },
                markPoint:{
                    symbol: 'pin', //标记(气泡)的图形
                    symbolSize: 50, //标记(气泡)的大小
                    itemStyle: {
                        normal: {
                            borderColor: '#5D95E0',
                            borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                            label: {
                                show: true
                            }
                        }
                    },
                    data : [//配置项
                        {value:'12',xAxis:0, yAxis: 12},
                        {value:'32',xAxis:1, yAxis: 32},
                        {value:'16',xAxis:2, yAxis: 16},
                        {value:'23',xAxis:3, yAxis: 23},
                        {value:'45',xAxis:4, yAxis: 45},
                        {value:'35',xAxis:5, yAxis: 35},
                        {value:'52',xAxis:6, yAxis: 52},
                        {value:'24',xAxis:7, yAxis: 24},
                        {value:'18',xAxis:8, yAxis: 18},
                        {value:'41',xAxis:9, yAxis: 41}
                    ]
                },
                data: [12, 32, 16, 23, 45, 35, 52, 24, 18, 41]
            }]
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
.echarts-box{
    padding: 32px 30px;
    background:rgba(255,255,255,1);
    box-shadow:3px 3px 10px rgba(112,112,112,0.16);
    opacity:1;
    border-radius:10px;
}
</style>

<style lang="stylus">
.el-message-box{
	width:350px;
	height:200px;
	background:rgba(255,255,255,1);
	opacity:1;
	border-radius:10px;
}
.el-message-box__content{
	margin-bottom : 25px;
}
.el-table__row td{
    text-align: center;
}
.detDel{
	background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);
}
.el-message-box__btns button:nth-child(2) {
	margin-left: 56px;
}
.cancelClone{
	background:linear-gradient(180deg,rgba(225,225,225,1) 0%,rgba(190,190,190,1) 100%);
}
</style>