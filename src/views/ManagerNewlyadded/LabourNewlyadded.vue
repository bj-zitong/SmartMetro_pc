<template>
  <div class="LabourNewlyaddedbox">
    <el-container class="LabourNewlyadded">
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 来源地消息 -->
          <el-tab-pane label="来源地消息" name="first">
            <el-form ref="form" :model="form" label-width="80px">
              <el-col :span="7">
                <el-form-item label="职务">
                  <el-select v-model="form.region" placeholder="职务">
                    <el-option label="劳务人员" value="shanghai"></el-option>
                    <el-option label="管理人员" value="beijing"></el-option>
                    <el-option label="监理人员" value="beijing"></el-option>
                    <el-option label="其他类人员" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="到京时间">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="返京地">
                  <el-input v-model="form.name" placeholder="返京地（省、市、县/旗）"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="返京地风险程度">
                  <el-select v-model="form.region" placeholder="返京地风险程度">
                    <el-option label="高" value="shanghai"></el-option>
                    <el-option label="中" value="beijing"></el-option>
                    <el-option label="低" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="是否有湖北接触史">
                  <el-select v-model="form.region" placeholder="是否有湖北接触史">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="是否有疑似人员">
                  <el-select v-model="form.region" placeholder="是否有疑似人员">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="是否有确诊人员">
                  <el-select v-model="form.region" placeholder="是否有确诊人员">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="是否到京">
                  <el-select v-model="form.region" placeholder="是否到京">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="到京方式">
                  <el-select v-model="form.region" placeholder="到京方式">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="列车/航班">
                  <el-select v-model="form.region" placeholder="列车/航班班次">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="隔离情况">
                  <el-select v-model="form.region" placeholder="隔离情况">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="是否满足">
                  <el-select v-model="form.region" placeholder="是否满足">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="返场时间">
                  <el-date-picker v-model="value1" type="date" placeholder="返场时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="返京制约因素">
                  <el-input type="textarea" v-model="form.desc" placeholder="返京制约因素具体原因及采取措施"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.desc" placeholder="备注（谁跟谁同村，谁跟谁是家庭亲属）"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <p>
                  风险程度：<br>
                  疫情高风险地区：
                  县、市、区、<br>旗累计确诊病例超过<br>50例，14天内有聚集性疫情。<br>
                  疫情中风险地区：
                  县、市、区、<br>旗14天内有新增确诊病例，累计确诊病例<br>不超过50例；或累计确诊病例超过<br>50例，14天内未发生聚集性疫情。
                  疫情低<br>风险地区：
                  县、市、区、旗为无确诊<br>病例，或连续14天无新增确诊病例。
                </p>
              </el-col>
               <div style="float:right">
              <el-button type="primary" round style="margin-top:60px;margin-left:80px">保存</el-button>
              <div style="margin-top:20px">
                <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
                <el-button type="primary" round>提交</el-button>
              </div>
            </div>
            </el-form>
          </el-tab-pane>
          <!-- 个人基本信息 -->
          <el-tab-pane label="个人基本信息" name="second" class="information">
            <el-form ref="form" :model="form" label-width="80px">
              <el-col :span="7">
                <el-form-item label="姓名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="年龄">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="民族">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="性别">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="工种">
                  <el-select v-model="form.region" placeholder="工种">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="政治面貌">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="电话">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="承建单位">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="部门">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="紧急联系人">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="电话">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="籍贯">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="现居住地">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="婚姻状况">
                  <el-select v-model="form.region" placeholder="婚姻状况">
                    <el-option label="已婚" value="shanghai"></el-option>
                    <el-option label="未婚" value="beijing"></el-option>
                    <el-option label="离异" value="beijing"></el-option>
                    <el-option label="丧偶" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="学位">
                  <el-select v-model="form.region" placeholder="学位">
                    <el-option label="身份证" value="shanghai"></el-option>
                    <el-option label="护照" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="文化程度">
                  <el-select v-model="form.region" placeholder="文化程度">
                    <el-option label="大专" value="shanghai"></el-option>
                    <el-option label="小学" value="beijing"></el-option>
                    <el-option label="初中" value="beijing"></el-option>
                    <el-option label="高中" value="beijing"></el-option>
                    <el-option label="本科" value="beijing"></el-option>
                    <el-option label="研究生" value="beijing"></el-option>
                    <el-option label="博士" value="beijing"></el-option>
                    <el-option label="硕士" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件类型">
                  <el-select v-model="form.region" placeholder="证件类型">
                    <el-option label="身份证" value="shanghai"></el-option>
                    <el-option label="护照" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户口类型">
                  <el-select v-model="form.region" placeholder="户口类型">
                    <el-option label="城市户口" value="shanghai"></el-option>
                    <el-option label="农村户口" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现居住地">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="班组长">
                  <el-select v-model="form.region" placeholder="班组长">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="参加培训">
                  <el-select v-model="form.region" placeholder="参加培训">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="持证上岗">
                  <el-select v-model="form.region" placeholder="持证上岗">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="居住证">
                  <el-select v-model="form.region" placeholder="居住证">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="居住证办理日期">
                  <div class="block">
                    <!-- <span class="demonstration">默认</span> -->
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="特殊工种体检情况">
                  <el-select v-model="form.region" placeholder="特殊工种体检情况">
                    <el-option label="通过" value="shanghai"></el-option>
                    <el-option label="不通过" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="班组">
                  <el-select v-model="form.region" placeholder="班组">
                    <el-option label="通过" value="shanghai"></el-option>
                    <el-option label="不通过" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="一寸照片">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
            <el-button type="primary" round class="add">保存</el-button>
            <div class="Operationbutton">
              <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
              <el-button type="primary" round>提交</el-button>
            </div>
          </el-tab-pane>
          <!-- 合同信息 -->
          <el-tab-pane label="合同信息" name="third">
            <el-form ref="form" :model="form" label-width="80px">
              <el-col :span="20">
                <el-form-item label="项目编号">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="项目名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="合同编号">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="合同期限">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="结算方式">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="所属企业组织机构代码">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <div style="float:right">
              <el-button type="primary" round style="margin-top:60px;margin-left:80px">保存</el-button>
              <div style="margin-top:20px">
                <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
                <el-button type="primary" round>提交</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- 工资记录 -->
          <el-tab-pane label="工资记录" name="fourth">
            <el-form ref="form" :model="form" label-width="80px" style="height:300px">
              <el-col :span="20">
                <el-form-item label="工资单编号">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="发放金额">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="发放日期">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发放方式">
                  <el-select v-model="form.region" placeholder="发放方式">
                    <el-option label="现金" value="shanghai"></el-option>
                    <el-option label="电汇" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发放银行">
                  <el-select v-model="form.region" placeholder="发放银行">
                    <el-option label="交通银行" value="shanghai"></el-option>
                    <el-option label="建设银行" value="beijing"></el-option>
                    <el-option label="工商银行" value="beijing"></el-option>
                    <el-option label="农业银行" value="beijing"></el-option>
                    <el-option label="招商银行" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="银行卡号">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <div style="float:right">
              <el-button type="primary" round style="margin-top:60px;margin-left:80px">保存</el-button>
              <div style="margin-top:20px">
                <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
                <el-button type="primary" round>提交</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资质证书" name="certificate">
            <el-form ref="form" :model="form" label-width="80px">
              <el-col :span="20">
                <el-form-item label="真伪查询">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="证书名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="发证机关">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="证书类型">
                  <el-select v-model="form.region" placeholder="证书类型">
                    <el-option label="类型一" value="shanghai"></el-option>
                    <el-option label="类型二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="专业编码">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="证书等级">
                  <el-select v-model="form.region" placeholder="证书等级">
                    <el-option label="一级" value="shanghai"></el-option>
                    <el-option label="二级" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="发证日期">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="有效时间">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="资格状态">
                  <el-select v-model="form.region" placeholder="资格状态">
                    <el-option label="未过期" value="shanghai"></el-option>
                    <el-option label="过期" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="附件上传">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
            <div style="float:right">
              <el-button type="primary" round style="margin-top:60px;margin-left:80px">保存</el-button>
              <div style="margin-top:20px">
                <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
                <el-button type="primary" round>提交</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史评价记录" name="evaluate">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="评价记录">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <div style="float:right">
                <el-button type="primary" round style="margin-top:60px;margin-left:80px">保存</el-button>
                <div style="margin-top:20px">
                  <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
                  <el-button type="primary" round>提交</el-button>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //日历选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //图片上传
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      value1: "",
      value2: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange() {}
  }
};
</script>
<style scoped lang="stylus">
.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.LabourNewlyaddedbox {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 25px;
  padding: 0px;
}

.add {
  position: relative;
  top: 550px;
}

.Operationbutton {
  position: relative;
  top: 570px;
  right: 80px;
}

.information {
  height: 650px;
}
</style>