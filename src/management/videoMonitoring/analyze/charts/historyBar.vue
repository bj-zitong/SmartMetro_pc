<template>
  <div class="china">
    <div id="historyBar" style="width:100%;height: 200px;"></div>
  </div>
</template>
<script>
import myChart from "echarts";
export default {
  data() {
    return {};
  },
  methods: {
    chinamapFun() {
      let cjrsEcharts = myChart.init(document.getElementById("historyBar"));
      let sizeFun1 = function() {
        cjrsEcharts.resize();
      };
      window.addEventListener("resize", sizeFun1);
      cjrsEcharts.setOption({
        tooltip: {
          show: false,
          formatter: "{b} <br> {c}%"
        },
        grid: {
          height: 130,
          left: '97',
          top:'40px'
        },
        legend: {
          icon: "circle",
          right: "2%",
          top: "5px",
          itemWidth: 7,
          itemHeight: 7,
          itemGap: 40,
          textStyle: {
            color: "#89A7AF"
          },
          data: [
            {
              name: "现有人数"
            },
            {
              name: "计划人数"
            }
          ]
        },
        xAxis: [
          {
            type: "value",
            max: 100,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            //type: 'category',
            data: ["劳务四组", "劳务三组", "劳务二组", "劳务一组"],
            axisTick: {
              show: false
            },
            // 隐藏y轴
            axisLine: {
              show: false
            },
            // 隐藏刻度线
            axisLabel: {
              textStyle: {
                color: "rgba(118,192,255,1)"
              }
            }
          }
        ],
        series: [
          {
            name: "现有人数",
            type: "bar",
            barWidth: 7,
            barGap: "1%", //柱图间距
            stack: "危货种类占比",
            label: {
              normal: {
                // borderWidth: 10,
                distance: 10,
                align: "center",
                verticalAlign: "middle",
                borderRadius: 1,
                borderColor: "#E8A61F",
                // backgroundColor: '#E8A61F',
                show: true,
                position: "top",
                fontSize: 7,
                color: "rgba(198,143,52,1)"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: [10, 0, 0, 10],
                color: "#E8A61F"
              },

              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 0, 0, 10],
                color: "#E8A61F"
              }
            },
            data: [
              {
                value: 55,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#E8A61F" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#E8A61F" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 44,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#E8A61F" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#E8A61F" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 53.1,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#E8A61F" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#E8A61F" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 53.1,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#E8A61F" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#E8A61F" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          },
          {
            name: "计划人数",
            type: "bar",
            barGap: "1%", //柱图间距
            barWidth: 7,
            stack: "危货种类占比",
            itemStyle: {
              emphasis: {
                barBorderRadius: [0, 10, 10, 0],
                color: "#0D69F1"
              },

              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [0, 10, 10, 0],
                color: "#0D69F1"
              }
            },
            label: {
              normal: {
                distance: 10,
                align: "center",
                verticalAlign: "middle",
                borderRadius: 1,
                borderColor: "#E8A61F",
                // backgroundColor: '#E8A61F',
                show: true,
                position: "top",
                fontSize: 7,
                color: "rgba(4,104,241,1)"
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0D69F1" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0D69F1" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 23,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0D69F1" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0D69F1" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 23,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0D69F1" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0D69F1" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              },
              {
                value: 23,
                itemStyle: {
                  normal: {
                    color: {
                      type: "bar",
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0D69F1" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0D69F1" // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.chinamapFun();
    //   alert("ooo")
    //   console.log(data)
  }
};
</script>