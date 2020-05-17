<template>
  <div class="cxgl">
    <div id="cxgl" style="width:100%;height: 200px;"></div>
  </div>
</template>
<script>
import myChart from "echarts";
export default {
  data() {
    return {};
  },
  methods: {
    cxglFun() {
      var color = ["#4FC5EA", "#3CD5B3", "#005CD9"];
      var dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 40,
          borderWidth: 10,
          shadowColor: "rgba(0, 0, 0, 0)" //边框阴影
        }
      };
      var placeHolderStyle = {
        normal: {
          color: "#393d50",
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: "#393d50"
        }
      };
      let cjrsEcharts = myChart.init(document.getElementById("cxgl"));
      let sizeFun1 = function() {
        cjrsEcharts.resize();
      };
      window.addEventListener("resize", sizeFun1);
      cjrsEcharts.setOption({
        title: {
          text: "",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: 24,
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          show: true,
          formatter: "{b} : <br/>{d}%",
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
        },
        legend: {
          orient: "vertical",
          // icon: 'circle',
          right: "10",
          top: "40",
          itemGap: 20,
          data: ["低       0-30%", "中       30-60%", "高       60-100%"],
          textStyle: {
            color: "#fft"
          }
        },
        series: [
          {
            name: "Line 3",
            type: "pie",
            clockWise: false,
            // radius: [106, 120],
            // center:['35%','35%'],
            radius: [30, 35],
            center: ["30%", "40%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: 30,
                name: "低       0-30%",
                itemStyle: {
                  normal: {
                    color: new myChart.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: color[2]
                      },
                      {
                        offset: 1,
                        color: color[2]
                      }
                    ])
                  }
                }
              },
              {
                value: 0,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: "Line 2",
            type: "pie",
            clockWise: false,
            radius: [45, 50],
            center: ["30%", "40%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [
              {
                value: 56.7,
                name: "中       30-60%",
                itemStyle: {
                  normal: {
                    color: new myChart.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: color[1]
                      },
                      {
                        offset: 1,
                        color: color[1]
                      }
                    ])
                  }
                }
              },
              {
                value: 43.3,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: "Line 1",
            type: "pie",
            clockWise: false,
            // radius: [20, 30],
            // center:['35%','35%'],

            radius: [60, 65],
            center: ["30%", "40%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            label: {
              borderRadius: "10"
            },
            data: [
              {
                value: 54.6,
                name: "高       60-100%",
                itemStyle: {
                  normal: {
                    color: new myChart.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: color[0]
                      },
                      {
                        offset: 1,
                        color: color[0]
                      }
                    ])
                  }
                }
              },
              {
                value: 45.4,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.cxglFun();
    //   alert("ooo")
    //   console.log(data)
  }
};
</script>





