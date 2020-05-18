<template>
    <div class="home-box">
        <div class="home-main">
            <el-row :gutter="30" style="height: 100%;">
                <el-col :span="7" style="height: 100%;">
                    <div class="grid-content h-m-l1">
                        <div class="home-title">
                            <span>现场人员</span>
                        </div>
                        <div style="width: 100%; height: 220px;" ref="left1" id="left1"></div>
                    </div>
                    <div class="grid-content h-m-l2">
                        <div class="home-title">
                            <span>在岗参建单位人数</span>
                        </div>
                        <div style="padding-top:50px;">
                            <el-row style="margin-bottom:20px;">
                                <el-col :span="7" :push="2">
                                    <div class="grid-station">
                                        <span>劳务一组</span>
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="grid-station">
                                        <el-progress :text-inside="true" :stroke-width="16" :percentage="50"></el-progress>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row style="margin-bottom:20px;">
                                <el-col :span="7" :push="2">
                                    <div class="grid-station">
                                        <span>劳务二组</span>
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="grid-station">
                                        <el-progress :text-inside="true" :stroke-width="16" :percentage="50"></el-progress>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="7" :push="2">
                                    <div class="grid-station">
                                        <span>劳务三组</span>
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="grid-station">
                                        <el-progress :text-inside="true" :stroke-width="16" :percentage="50"></el-progress>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="grid-content h-m-l3">
                        <div class="home-title">
                            <span>近期人员变化</span>
                        </div>
                        <div style="width: 100%; height: 150px" id="left3"></div>
                    </div>
                    <div class="grid-content h-m-l4">
                        <div class="home-title">
                            <span>培训通过</span>
                        </div>
                        <div style="width: 100%; height: 220px" id="left4"></div>
                    </div>
                </el-col>
                <el-col :span="12" style="height: 100%;">
                    <div class="grid-content h-m-c1">
                        <div class="home-title">
                            <span>近7天出勤情况</span>
                        </div>
                        <el-tabs
                            v-model="activeCenter1"
                            type="card"
                            @tab-click="handleAttendanceClick"
                            tab-position="top"
                        >
                            <el-tab-pane label="班组" name="team">
                                <div style="padding: 0 100px;">
                                    <el-row :gutter="30">
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组1</p>
                                                <p class="tab-con">51612</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组2</p>
                                                <p class="tab-con">3254</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组3</p>
                                                <p class="tab-con">4888</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组4</p>
                                                <p class="tab-con">57159</p>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-tabshow">
                                                <p class="tab-title">班组5</p>
                                                <p class="tab-con">249</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="工种" name="work">工种</el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="grid-content h-m-c2">
                        <div class="home-title">
                            <span>1111111111</span>
                        </div>
                        <div style="width: 100%; height: 400px;" id="center2"></div>
                    </div>
                    <div class="grid-content h-m-c3">
                        <div class="home-title">
                            <span>出勤率</span>
                        </div>
                        <div style="padding: 7% 8% 0;">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <div class="">
                                        <el-progress
                                            type="circle"
                                            color="#BA31FF"
                                            :stroke-width="10"
                                            :percentage="25"
                                            
                                        ></el-progress>
                                        
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="">
                                        <el-progress
                                            type="circle"
                                            color="#FA8E22"
                                            :stroke-width="10"
                                            :percentage="50"
                                        ></el-progress>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="">
                                        <el-progress
                                            type="circle"
                                            color="#46D797"
                                            :stroke-width="10"
                                            :percentage="75"
                                        ></el-progress>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="">
                                        <el-progress
                                            type="circle"
                                            color="#67BCFF"
                                            :stroke-width="10"
                                            :percentage="100"
                                        ></el-progress>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5" style="height: 100%;">
                    <div class="grid-content h-m-r1">
                        <div class="home-title">
                            <span>计划返京员工统计</span>
                        </div>
                        <div style="width: 100%; height: 200px;" id="right1"></div>
                    </div>
                    <div class="grid-content h-m-r2" id="h-m-r-tab">
                        <div class="home-title">
                            <span>人员动态</span>
                        </div>
                        <div>
                            <el-tabs
                                v-model="activeRight2"
                                type="card" 
                                @tab-click="handleDynamicClick"
                                class="tab-Dynamic"
                            >
                                <el-tab-pane label="最近出勤" name="attendance">
                                    <div style="text-algin: center;">
                                        <el-row>
                                            <el-col :span="6" :push="4"><div class="grid-tab-title">姓名</div></el-col>
                                            <el-col :span="6" :push="2"><div class="grid-tab-title">工号</div></el-col>
                                            <el-col :span="6" :push="1"><div class="grid-tab-title">班组</div></el-col>
                                            <el-col :span="6"><div class="grid-tab-title">时间</div></el-col>
                                        </el-row>
                                    </div>
                                    <div class="con" style="padding-top: 20px">
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="最近出场" name="comeout">
                                    <div style="text-algin: center;">
                                        <el-row>
                                            <el-col :span="6" :push="4"><div class="grid-tab-title">姓名</div></el-col>
                                            <el-col :span="6" :push="2"><div class="grid-tab-title">工号</div></el-col>
                                            <el-col :span="6" :push="1"><div class="grid-tab-title">班组</div></el-col>
                                            <el-col :span="6"><div class="grid-tab-title">时间</div></el-col>
                                        </el-row>
                                    </div>
                                    <div class="con" style="padding-top: 20px">
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平三班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="2">
                                                <div class="grid-con">
                                                    <img src="../../assets/images/home/home-logo1.png" width="24px" height="24px">
                                                </div>
                                            </el-col>
                                            <el-col :span="4" :push="1"><div class="grid-con">紫通</div></el-col>
                                            <el-col :span="5"><div class="grid-con">3265421532</div></el-col>
                                            <el-col :span="5" :push="1"><div class="grid-con">昌平二班</div></el-col>
                                            <el-col :span="8"><div class="grid-con">2020-4-30 15:00</div></el-col>
                                        </el-row>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div> 
</template> 

<script>
export default {
    name: "echarts",
    data() {
        return {
            activeCenter1: 'team',
            activeRight2: 'attendance'
        }
    },
    created: {},
    mounted() {
        this.drawLeft1();
        this.drawLeft3();
        this.drawLeft4();
        this.drawCon2();
        this.drawRight1();
        let left1 = echarts.init(this.$refs.left1);
        this.handleAttendanceClick();
        this.handleDynamicClick()
    },
    methods: {
        // 现场人员
        handleAttendanceClick(tab, event) {
            console.log(tab, event);
        },
        handleDynamicClick(tab,event) {
            console.log(tab, event);
        },
        drawLeft1() {
            //  获取echarts
            let left1 = this.$echarts.init(document.getElementById("left1"));
            //  绘制图表
            left1.setOption({
                tooltip: { // hover 悬浮窗
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                resize:'220px',
                legend: { // 图例组件
                    type:'plain',    // plain 普通图例   scroll  可滚动图例（图例数量多的时候使用）
                    orient: 'vertical', // 横向 horizontal 纵向 vertical
                    top: 'middle',
                    right: '8%',
                    itemWidth: 12,
                    itemHeight: 5,
                    textStyle:{ // 公共文字设置
                        fontSize: '10',
                        padding:[0, 0, 0, 5]
                    },
                    data: ['钢筋工', '电焊工', '木工', '瓦工', '力工']
                },
                series: [
                    {
                        name: '现场人员',
                        type: 'pie',
                        radius: '70%',
                        center: ['45%', '50%'],
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
                        data: [
                            {value: 335, name: '钢筋工'},
                            {value: 310, name: '电焊工'},
                            {value: 234, name: '木工'},
                            {value: 135, name: '瓦工'},
                            {value: 1548, name: '力工'}
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
            });
            left1.resize({height: this.autoHeight});
            window.addEventListener("resize", function () {
                left1.resize();
            });
        },
        // 在岗参见单位人数
        drawLeft2() {
            //  获取echarts
            let left2 = this.$echarts.init(document.getElementById("left2"));
            //  绘制图表
            left2.setOption({
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });
            // window.addEventListener("resize", function () {
            //     left1.resize();
            // });
        },
        
        // 近期人员变化
        drawLeft3() {
            //  获取echarts
            let left3 = this.$echarts.init(document.getElementById("left3"));
            //  绘制图表
            left3.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid:{
                    x:50,
                    y:50,
                    x2:50,
                    y2:30
                },
                xAxis: {
                    name:'日期',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    type: 'category',
                    axisLine:{      //  坐标轴线
                        show:false  //  隐藏
                    },
                    axisTick: {     //刻度线
                        show: false //隐藏
                    },
                    splitLine: {    //坐标轴在grid区域的分隔线
                        show: true
                    },
                    data: ['4-21', '4-22', '4-23', '4-24', '4-25', '4-26', '4-27']
                },
                yAxis: {
                    name:'人数(个)',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    axisLine:{      //坐标轴线
                        show:false  //隐藏
                    },
                    axisTick: {     //刻度线
                        show: false //隐藏
                    },
                    type: 'value'
                },
                series: [
                    {
                        name:'在职人员',
                        type: 'line',
                        stack:'在职人员',
                        areaStyle: {},//折线区域填充
                        smooth: true,    //折线弧度
                        // symbolSize:0,   // 折线点标记大小
                        itemStyle: {// 填充区域颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#71BCFE' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#36BC64' // 100% 处的颜色
                                }, {
                                    offset: 1, color: '#B2FFB7' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }, //线条样式
                        data: [170, 50, 99, 220, 86, 27, 71]
                    },
                    {
                        name:'离职人员',
                        type: 'line',
                        stack:'离职人员',
                        areaStyle: {},//折线区域填充
                        smooth: true,    //折线弧度
                        // symbolSize:0,   // 折线点标记大小
                        itemStyle: {// 填充区域颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#FAA1A1' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#F0374B' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }, //线条样式
                        data: [45, 84, 25, 75, 195, 57, 37]
                    }
                ]
            });
            // window.addEventListener("resize", function () {
            //     left3.resize();
            // });
        },
        // 培训通过
        // 近期人员变化
        drawLeft4() {
            //  获取echarts
            let left4 = this.$echarts.init(document.getElementById("left4"));
            //  绘制图表
            left4.setOption({
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
                        data: [12, 32, 51, 23, 18, 35, 52,]
                    }
                ]
            });
            // window.addEventListener("resize", function () {
            //     left4.resize();
            // });
        },
        drawCon2() {
            //  获取echarts
            let center2 = this.$echarts.init(document.getElementById("center2"));
            //  绘制图表
            center2.setOption({
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
                    data: [12, 32, 16, 23, 45, 35, 52,]
                }
                ]
            });
        },
        drawRight1() {
            //  获取echarts
            let right1 = this.$echarts.init(document.getElementById("right1"));
            //  绘制图表
            right1.setOption({
                grid:{
                    x:50,
                    y:50,
                    x2:50,
                    y2:30
                },
                xAxis: {
                    name:'日期',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    type: 'category',
                    data: ['4-21', '4-22', '4-23', '4-24', '4-25', '4-26', '4-27']
                },
                yAxis: {
                    name:'人数(个)',
                    nameTextStyle:{
                        color:'rgba(192,192,192,1)'
                    },
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            });
            // window.addEventListener("resize", function () {
            //     left3.resize();
            // });
        },
    }
}
/**
 * 现场人员 饼形图  二期优化 实现图例的 scroll
 * 
 */
</script>

<style lang="stylus" scoped>
.home-box, .home-main {
    width: 100%;
    height: 100%;
}
.home-main {
    padding: 0 30px;
}
.home-main .grid-content {
    width:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:10px;
    position: relative;
}
.home-title {
    position: absolute;
    border-left:3px solid #0058A2;
    border-radius: 3px;
    padding-left: 10px;
    top: 15px;
}
.home-title span {
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(0,88,162,1);
    opacity:1;
}
.h-m-l1, .h-m-l2, .h-m-l3, .h-m-c1, .h-m-c2, .h-m-r1 {
    margin-bottom: 10px;
}
.h-m-l1 {
    height: 26%;
}
.h-m-l2 {
    height: 25%;
}
.h-m-l3 {
    height: 20%;
}
.h-m-l4 {
    height: 24%;
}
.h-m-c1 {
    height: 17%;
}
.h-m-c2 {
    height: 48%;
}
.h-m-c3 {
    height: 31.2%;
}
.h-m-r1 {
    height: 26%;
}
.h-m-r2 {
    height: 71.4%;
}
.tab-title {
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:19px;
    color:rgba(99,99,99,1);
    opacity:1;
}
.tab-con {
    text-align: center;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:50px;
    color:rgba(0,88,162,1);
    opacity:1;
}
.tab-Dynamic{
    padding-top: 54px;
}

</style>
<style lang="stylus">
html, body, .main-container1 {
    width: 100%;
    height: 100%;
}
.main-app {
    height: calc(100% - 40px)
}
.h-m-c1 .el-tabs__nav-scroll .el-tabs__nav is-top{
    position:absolute;
    right:'5%';
}
.h-m-c1 .el-tabs__item {
    border:1px solid rgba(225,225,225,1);
    border-radius: 20px;
    font-size: 12px;
    -webkit-transform: scale(0.8);
    color:#0058A2;
}
.tab-Dynamic .el-tabs__item {
    border:1px solid rgba(225,225,225,1);
    border-radius: 20px;
    font-size: 12px;
    -webkit-transform: scale(0.8);
    color:#0058A2;
}
.h-m-c1 .el-tabs__item.is-active {
    border:1px solid #0058A2;
    background: #0058A2;
    font-size: 12px;
    -webkit-transform: scale(0.8);
    color:#FFFFFF;
}
.tab-Dynamic .el-tabs__item.is-active {
    border:1px solid #0058A2;
    background: #0058A2;
    border-radius: 20px;
    font-size: 12px;
    -webkit-transform: scale(0.8);
    color:#FFFFFF;
}
.tab-Dynamic .el-tabs__nav-scroll {
    padding-left:100px;
}
.el-tabs__header {
    border: none;
}
.el-tabs__nav {
    width:200px;
    margin: 0 auto;
    border: none;
}
.tab-Dynamic .el-tabs__header,
.tab-Dynamic .el-tabs__header .el-tabs__nav
{
    border: none;
}
.grid-tab-title{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:19px;
    color:rgba(0,88,162,1);
    opacity:1;
}
.con {
    padding: 20px 20px;
}
.con .grid-con{
    font-size:12px;
    -webkit-transform: scale(0.8);
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:22px;
    color:rgba(51,51,51,1);
    opacity:1;
}
.el-progress-bar__innerText{
    font-size:12px;
    -webkit-transform: scale(0.8);
}
.grid-station span{
    font-size:12px;
    color: #0D69F1;
}
</style>