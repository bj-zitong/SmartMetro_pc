<template>
    <div class="main">
        <div class="min-box">
            <div class="min-top">
                <div class="switch-box">
                    <div class="switch-HD">
                        <img src="../../assets/images/videoMonitoring/HD.png" alt="">
                    </div>
                    <div class="switch-grid">
                        <el-dropdown trigger="click" @command="handleCompanyChange">
                            <span class="el-dropdown-link switch-link">
                                <img src="../../assets/images/videoMonitoring/HD.png" width="50%" height="50%" alt="">
                                <i class="el-icon-caret-bottom el-icon--right" style="padding-top:5px;"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item 
                                    v-for="(item,index) in companyOptions" 
                                    :key="index" 
                                    :command="item"
                                >
                                    {{item.name}}
                                </el-dropdown-item>
                                <!-- <el-dropdown-item
                                v-for="item in index"
                                :key="item"
                                :command="item.name">{{item.name}}</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="bb">4</el-dropdown-item> -->
                                <!-- <el-dropdown-item>1+5</el-dropdown-item>
                                <el-dropdown-item>3+4</el-dropdown-item>
                                <el-dropdown-item>1+7</el-dropdown-item>
                                <el-dropdown-item>9</el-dropdown-item>
                                <el-dropdown-item>1+12</el-dropdown-item>
                                <el-dropdown-item>16</el-dropdown-item>
                                <el-dropdown-item>2+18</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="switch-layout">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link switch-link">
                                <img src="../../assets/images/videoMonitoring/HD.png" width="50%" height="50%" alt="">
                                <i class="el-icon-caret-bottom el-icon--right" style="padding-top:5px;"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>25</el-dropdown-item>
                                <el-dropdown-item>36</el-dropdown-item>
                                <el-dropdown-item>49</el-dropdown-item>
                                <el-dropdown-item>64</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
            <div class="min-con">2</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            companyOptions:[
                {item:'1', index: 1},
                {item:'4', index: 2}
            ]
        }
    },
    created() {

    },
    methods: {
        handleCompanyChange(command){
            console.log("command",command);
        }
    }
}
</script>
<style lang="stylus" scoped>

.main {
    width: 100%;
    height: 100%;
    padding: 0 30px 30px;

    .min-box {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 5px;

        .min-top {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding: 0 25px 5px 0;
            .switch-box {
                display: flex;
                flex-direction: row;
                width:188px;
                height:40px;
                background:rgba(0,88,162,1);
                opacity:1;
                border-radius:10px;
                padding: 0 10px;
                
                & > div {
                    flex: 1;
                    padding: 5px;
                }
                
                .switch-HD {
                    & > img {
                        width:30px;
                        height:30px;
                    }
                }
                .switch-link {
                    width: 100%;
                    height: 100%;
                    display:flex;
                    padding-top: 3px;
                    color: #fff;
                }
                
            }
        }

        .min-con {
            display: flex;
            flex: 1;
            flex-direction: row;
            justify-content: flex-start;
            background: black;
        }
    }
}
</style>