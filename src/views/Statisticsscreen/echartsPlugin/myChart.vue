<template>
  <div class="china">
    <div id="chinaMap" style="width:100%;height: 200px;"></div>
  </div>
</template>
<script>
import myChart from "echarts";
import "../../../../node_modules/echarts/map/js/china";
export default {
  data() {
    return {};
  },
  methods: {
    chinamapFun() {
      var name_fontFamily = "等线";
      var subname_fontSize = 15;
      var name_fontSize = 18;
      var mapName = "china";
      var data = [
        {
          name: "北京",
          value: 177
        },
        {
          name: "天津",
          value: 42
        },
        {
          name: "河北",
          value: 102
        },
        {
          name: "山西",
          value: 81
        },
        {
          name: "内蒙古",
          value: 47
        },
        {
          name: "辽宁",
          value: 67
        },
        {
          name: "吉林",
          value: 82
        },
        {
          name: "黑龙江",
          value: 66
        },
        {
          name: "上海",
          value: 24
        },
        {
          name: "江苏",
          value: 92
        },
        {
          name: "浙江",
          value: 114
        },
        {
          name: "安徽",
          value: 109
        },
        {
          name: "福建",
          value: 116
        },
        {
          name: "江西",
          value: 91
        },
        {
          name: "山东",
          value: 119
        },
        {
          name: "河南",
          value: 137
        },
        {
          name: "湖北",
          value: 116
        },
        {
          name: "湖南",
          value: 114
        },
        {
          name: "重庆",
          value: 91
        },
        {
          name: "四川",
          value: 125
        },
        {
          name: "贵州",
          value: 62
        },
        {
          name: "云南",
          value: 83
        },
        {
          name: "西藏",
          value: 9
        },
        {
          name: "陕西",
          value: 80
        },
        {
          name: "甘肃",
          value: 56
        },
        {
          name: "青海",
          value: 10
        },
        {
          name: "宁夏",
          value: 18
        },
        {
          name: "新疆",
          value: 67
        },
        {
          name: "广东",
          value: 123
        },
        {
          name: "广西",
          value: 59
        },
        {
          name: "海南",
          value: 14
        }
      ];
      var geoCoordMap = {};
      var toolTipData = [
        {
          name: "北京",
          value: [
            {
              name: "文科",
              value: 95
            },
            {
              name: "理科",
              value: 82
            }
          ]
        },
        {
          name: "天津",
          value: [
            {
              name: "文科",
              value: 22
            },
            {
              name: "理科",
              value: 20
            }
          ]
        },
        {
          name: "河北",
          value: [
            {
              name: "文科",
              value: 60
            },
            {
              name: "理科",
              value: 42
            }
          ]
        },
        {
          name: "山西",
          value: [
            {
              name: "文科",
              value: 40
            },
            {
              name: "理科",
              value: 41
            }
          ]
        },
        {
          name: "内蒙古",
          value: [
            {
              name: "文科",
              value: 23
            },
            {
              name: "理科",
              value: 24
            }
          ]
        },
        {
          name: "辽宁",
          value: [
            {
              name: "文科",
              value: 39
            },
            {
              name: "理科",
              value: 28
            }
          ]
        },
        {
          name: "吉林",
          value: [
            {
              name: "文科",
              value: 41
            },
            {
              name: "理科",
              value: 41
            }
          ]
        },
        {
          name: "黑龙江",
          value: [
            {
              name: "文科",
              value: 35
            },
            {
              name: "理科",
              value: 31
            }
          ]
        },
        {
          name: "上海",
          value: [
            {
              name: "文科",
              value: 12
            },
            {
              name: "理科",
              value: 12
            }
          ]
        },
        {
          name: "江苏",
          value: [
            {
              name: "文科",
              value: 47
            },
            {
              name: "理科",
              value: 45
            }
          ]
        },
        {
          name: "浙江",
          value: [
            {
              name: "文科",
              value: 57
            },
            {
              name: "理科",
              value: 57
            }
          ]
        },
        {
          name: "安徽",
          value: [
            {
              name: "文科",
              value: 57
            },
            {
              name: "理科",
              value: 52
            }
          ]
        },
        {
          name: "福建",
          value: [
            {
              name: "文科",
              value: 59
            },
            {
              name: "理科",
              value: 57
            }
          ]
        },
        {
          name: "江西",
          value: [
            {
              name: "文科",
              value: 49
            },
            {
              name: "理科",
              value: 42
            }
          ]
        },
        {
          name: "山东",
          value: [
            {
              name: "文科",
              value: 67
            },
            {
              name: "理科",
              value: 52
            }
          ]
        },
        {
          name: "河南",
          value: [
            {
              name: "文科",
              value: 69
            },
            {
              name: "理科",
              value: 68
            }
          ]
        },
        {
          name: "湖北",
          value: [
            {
              name: "文科",
              value: 60
            },
            {
              name: "理科",
              value: 56
            }
          ]
        },
        {
          name: "湖南",
          value: [
            {
              name: "文科",
              value: 62
            },
            {
              name: "理科",
              value: 52
            }
          ]
        },
        {
          name: "重庆",
          value: [
            {
              name: "文科",
              value: 47
            },
            {
              name: "理科",
              value: 44
            }
          ]
        },
        {
          name: "四川",
          value: [
            {
              name: "文科",
              value: 65
            },
            {
              name: "理科",
              value: 60
            }
          ]
        },
        {
          name: "贵州",
          value: [
            {
              name: "文科",
              value: 32
            },
            {
              name: "理科",
              value: 30
            }
          ]
        },
        {
          name: "云南",
          value: [
            {
              name: "文科",
              value: 42
            },
            {
              name: "理科",
              value: 41
            }
          ]
        },
        {
          name: "西藏",
          value: [
            {
              name: "文科",
              value: 5
            },
            {
              name: "理科",
              value: 4
            }
          ]
        },
        {
          name: "陕西",
          value: [
            {
              name: "文科",
              value: 38
            },
            {
              name: "理科",
              value: 42
            }
          ]
        },
        {
          name: "甘肃",
          value: [
            {
              name: "文科",
              value: 28
            },
            {
              name: "理科",
              value: 28
            }
          ]
        },
        {
          name: "青海",
          value: [
            {
              name: "文科",
              value: 5
            },
            {
              name: "理科",
              value: 5
            }
          ]
        },
        {
          name: "宁夏",
          value: [
            {
              name: "文科",
              value: 10
            },
            {
              name: "理科",
              value: 8
            }
          ]
        },
        {
          name: "新疆",
          value: [
            {
              name: "文科",
              value: 36
            },
            {
              name: "理科",
              value: 31
            }
          ]
        },
        {
          name: "广东",
          value: [
            {
              name: "文科",
              value: 63
            },
            {
              name: "理科",
              value: 60
            }
          ]
        },
        {
          name: "广西",
          value: [
            {
              name: "文科",
              value: 29
            },
            {
              name: "理科",
              value: 30
            }
          ]
        },
        {
          name: "海南",
          value: [
            {
              name: "文科",
              value: 8
            },
            {
              name: "理科",
              value: 6
            }
          ]
        }
      ];
      /*获取地图数据*/
      // echarts.showLoading();
      var mapFeatures = myChart.getMap(mapName).geoJson.features;
      console.log(mapFeatures);
      // echarts.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let chinaMapName = myChart.init(document.getElementById("chinaMap"));
      let sizeFun = function() {
        chinaMapName.resize();
      };
      window.addEventListener("resize", sizeFun);
      chinaMapName.setOption({
        title: {
          text: "",
          subtext: "",
          x: "center",
          textStyle: {
            color: "",
            fontFamily: "",
            fontSize: name_fontSize
          },
          subtextStyle: {
            fontSize: subname_fontSize,
            fontFamily: ""
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              var toolTiphtml = "";
              for (var i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (var j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: false,
          top: "bottom",
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#14276c", "#14276c"] // 蓝绿
          }
        },
        /*工具按钮组*/
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
        aspectScale:1,
        zoom:1.2,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0 // 为 0 时不绘制该图形
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }
          ]
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin", //气泡
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#E73900" //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 1
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