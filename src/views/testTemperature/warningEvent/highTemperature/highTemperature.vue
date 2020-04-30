<template>
  <div class="main-box">
    <!-- 高温预警头部 -->
    <div class="highTemperature-header clearfix">
        <div class="ht-h-l fl">
            <div class="ht-h-l-imgbox">
                <div class="ht-h-l-imgminbox">
                    <img src="../../../../assets/images/peopleTemperature/high-thermometer.png" alt="">
                </div>
            </div>
            <div class="ht-h-l-text">
                <span>测温异常总数</span>
                <p>45678</p>
            </div>
        </div>
        <div class="ht-h-c fl">
            <span>疫情期间，请注意防护</span>
        </div>
        <div class="ht-h-r fl">
            <img src="../../../../assets/images/peopleTemperature/high-line.png" alt="">
        </div>
    </div>
    <!-- 高温预警主体 -->
    <div class="highTemperature-main">
		<div class="th-m-title">
            <span>异常体温携带人脸图片库</span>
        </div>
		<div class="th-m-main-imgbox">
            <ul>
                <li class="th-m-main-img-frame fl">
                    <div class="fl">
                        <div>
                            <img src="../../../../assets/images/peopleTemperature/high-img.png" alt="">
                        </div>
                    </div>
                    <div class="th-m-main-img-text fl">
                        <ul>
                            <li>
                                <span>姓名：</span>
                                <span>张三</span>
                            </li>
                            <li>
                                <span>工种：</span>
                                <span>水电工</span>
                            </li>
                            <li>
                                <span>班组：</span>
                                <span>昌平南廷三班</span>
                            </li>
                            <li>
                                <span>测温时间：</span>
                                <span>14时56分</span>
                            </li>
                            <li>
                                <span>测温设备：</span>
                                <span>海淀五路居A口</span>
                            </li>
                            <li>
                                <span>体温：</span>
                                <span>38.6℃</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
		<div class="th-m-page-box" style="text-align: center;">
            <el-pagination
                background
                layout="prev, pager, next"
            >
            </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
	methods: {
		
    }
};
</script>

<style lang="stylus" scoped>
.highTemperature-header {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    margin-bottom 30px;
    position: relative;
}
.ht-h-l{
    position: relative;
}
.ht-h-l-imgbox{
    width: 128px;
    height: 128px;
    position: absolute;
    z-index: 1;
    left: 40px;
    top: 15px;
}
.ht-h-l-imgminbox {
    width:68px;
    height:68px;
    background:linear-gradient(180deg,rgba(237,125,115,1) 0%,rgba(238,41,22,1) 100%);
    box-shadow:0px 3px 6px rgba(242,61,61,0.16);
    border-radius:50%;
    opacity:1;
    position: absolute;
}
.ht-h-l-imgbox img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 5px;
    top: 5px;
}
.ht-h-l-text{
    margin-left: 155px;
    padding-top: 6px;
}
.ht-h-l-text span {
    font-size: 13px;
    font-family:Microsoft YaHei;
    line-height:35px;
    color:rgba(99,99,99,1);
    opacity:1;
}
.ht-h-l-text p {
    font-size:32px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:36px;
    color:rgba(51,51,51,1);
    opacity:1;
}
.ht-h-c{
    margin-left: 103px;
}
.ht-h-c span{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:100px;
    color:rgba(235,43,25,1);
    opacity:1;
}
.ht-h-r{
    position:absolute;
    right: 0;
    margin-left: 89px;
    width: 60%;
    height: 100%;
}
@media screen and (max-width: 1280px) {
    .ht-h-r {
        width: 100%;
    }
}
.ht-h-r img{
    width: 100%;
    height: 100%;
}
// 主体
.highTemperature-main {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    padding-bottom: 30px;
}
.th-m-title{
    text-align: center;
    padding: 30px 0;
}
.th-m-title span{
    font-size:19px;
    font-family:AdobeHeitiStd-Regular;
    color:rgba(238,41,22,1);
    opacity:1;
}
.th-m-main-imgbox{
    width: 96%;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.th-m-main-imgbox .th-m-main-img-frame{
    width: 25%;
}
.th-m-main-imgbox li img{
    width: 174px;
    height: 204px;
}
.th-m-main-img-text{
    padding-top:25px;
}
.th-m-main-imgbox li span{
    display: inline-block;
    font-size: 13px;
    line-height: 25px;
}
</style>

<style lang="stylus">

</style>
