<template>
  <div class="main-box flex">
    <!-- 头部 -->
    <el-container>
        <el-menu class="main-top">
            <div class="left">
                <div class="left-img-box">
                    <img src="../../../../assets/images/peopleTemperature/high-thermometer.png" alt="">
                </div>
                <div class="left-text-box">
                    <span>测温异常总数</span>
                    <p>35358</p>
                </div>
            </div>
            <div class="center">
                <span>疫情期间，请注意防护</span>
            </div>
            <div class="right"></div>
        </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
        <el-menu class="main-con-box flex">
            <div class="main-min-title">
                <span>异常体温携带人脸图片库</span>
            </div>
            <div class="main-min-box">
                <ul class="main-img-box">
                    <li>
                        <div>
                            <img src="../../../../assets/images/peopleTemperature/high-img.png" alt="">
                        </div>
                        <div>
                            <el-row :gutter="2">
                                <el-col :span="12">姓名：</el-col>
                                <el-col :span="12">张三</el-col>
                            </el-row>
                        </div>
                    </li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                </ul>
            </div>
            <!-- 分页& -->
            <pagination
            class="pagination-box"
            v-if="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getTable"
            />
        </el-menu>
    </el-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            total:'',
            listQuery: {
                currentPage: 1, //与后台定义好的分页参数
                pageSize: 10
            },
        };
    },
	methods: {
		
    }
};
</script>

<style lang="stylus" scoped>
.flex{
    display:flex;
    flex-direction: column;
}
.main-top {
    margin-bottom: 30px;
    padding-left: 40px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    display:flex;
    flex-direction: row;
    overflow hidden
}
.main-top>div.left {
    flex:1;
}
.left-img-box {
    width:68px;
    height:68px;
    background:linear-gradient(180deg,rgba(237,125,115,1) 0%,rgba(238,41,22,1) 100%);
    box-shadow:0px 3px 6px rgba(242,61,61,0.16);
    border-radius:50%;
    opacity:1;
    position: absolute;
    top: 15%;
    left:40px;
}
.left-img-box img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 5px;
    top: 5px;
}
.left-text-box {
    margin-left: 90px;
    padding-top:15px;
}
.left-text-box span {
    font-size:13px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:30px;
    color:rgba(99,99,99,1);
    opacity:1;
}
.left-text-box p {
    font-size:32px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:36px;
    color:rgba(51,51,51,1);
    opacity:1;
}
.main-top>div.center {
    flex:1;
    text-align:center;
}
.main-top>div.center span {
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height 100px
    color:rgba(235,43,25,1);
    opacity:1;
}
.main-top>div.right {
    flex: 2.5;
    background: url('../../../../assets/images/peopleTemperature/high-line.png') no-repeat;
    background-size: 100% 100%;
}
.main-min-title {
    margin:0 auto;
    font-size:19px;
    font-family:AdobeHeitiStd-Regular;
    line-height:27px;
    color:rgba(238,41,22,1);
    opacity:1;
}
.main-min-box {
    padding: 20px 20px;
}
.main-img-box {
    display:flex;
    font-size:13px;
    line-height: 25px;
}
.main-img-box li {
    display:flex;
    flex: 1;
    background red
}
.main-img-box li>div {
    display:flex;
    flex: 1;
}
.main-img-box img {
    width: 100%;
    height:100%;
}
</style>