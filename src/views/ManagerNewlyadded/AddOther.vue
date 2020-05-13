<template>
  <el-container class="AddOther">
    <el-main class="main">
      <p>添加其他服务类人员</p>
      <div class="AddEquipment_form">
        <el-form
          :label-position="labelPosition"
          label-width="140px"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-col :span="8">
            <el-form-item label="姓名" prop="name" class="el-form-item">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="form.nation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicalOutlook">
              <el-input v-model="form.politicalOutlook" placeholder="请输入政治面貌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急联系人" prop="urgentLinkMan" class="el-form-item">
              <el-input v-model="form.urgentLinkMan" placeholder="请输入紧急联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="urgentLinkManPhone" class="el-form-item">
              <el-input v-model="form.urgentLinkManPhone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="现居住地">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="现居住地" prop="address" class="el-form-item">
              <el-input v-model="form.address" placeholder="请输入现居住地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="birthPlace" class="el-form-item">
              <el-input v-model="form.birthPlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="离异" value="离异"></el-option>
                <el-option label="丧偶" value="丧偶"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择学位">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="护照" value="护照"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="cultureLevelType">
              <el-select v-model="form.cultureLevelType" placeholder="请选择文化程度">
                <el-option label="大专" value="大专"></el-option>
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
                <el-option label="博士" value="博士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="documentType">
              <el-select v-model="form.documentType" placeholder="请选择证件类型">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件编码" prop="certificateCode">
              <el-input v-model="form.certificateCode" placeholder="请输入证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工人类型" prop="region">
              <el-select v-model="form.region" placeholder="工人类型">
                <el-option label="厨师" value="shanghai"></el-option>
                <el-option label="保安" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="10">
            <el-form-item label="持证上岗" prop="region">
              <el-select v-model="form.region" placeholder="工人类型">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证">
              <el-select v-model="form.region" placeholder="持证上岗">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="持证上岗">
              <el-select v-model="form.region" placeholder="持证上岗">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证">
              <el-select v-model="form.region" placeholder="持证上岗">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证办理日期">
              <el-select v-model="form.region" placeholder="居住证办理日期">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <div style="float:right">
            <div style="margin-top:50px">
              <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
              <el-button type="primary" round>提交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      labelPosition: "left",
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
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        politicalOutlook: [
          { required: true, message: "请输入政治面貌", trigger: "blur" }
        ],
        urgentLinkMan: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" }
        ],
        urgentLinkManPhone: [
          { required: true, message: "请输入电话", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入现居住地", trigger: "blur" }
        ], 
        birthPlace: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ], 
        maritalStatus: [
          { required: true, message: "请输入婚姻状况", trigger: "blur" }
        ],  
        degree: [
          { required: true, message: "请输入学位", trigger: "blur" }
        ],  
        cultureLevelType: [
          { required: true, message: "请输入文化程度", trigger: "blur" }
        ], 
        documentType: [
          { required: true, message: "请输入证件类型", trigger: "blur" }
        ], 
        certificateCode: [
          { required: true, message: "请输入证件编码", trigger: "blur" }
        ], 
        region:[
          { required: true, message: "请选择工人类型", trigger: "blur" }
        ], 
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
<style lang="stylus" scoped>
.AddOther {
  margin: 0 30px;

  .main {
    p {
      text-align: center;
      height: 60px;
      background: rgba(22, 155, 213, 1);
      line-height: 60px;
      font-size: 22px;
      font-weight: bold;
    }
  }
}

.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.AddEquipment_form {
  margin-top: 30px;
}

.el-form-item {
  margin-left: 30px;
}
</style>