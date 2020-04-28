<template>
  <el-container class="AddOther">
    <el-main class="main">
      <p>添加其他服务类人员</p>
      <div class="AddEquipment_form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="7">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="性别">
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
          <el-col :span="7">
            <el-form-item label="手机号码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="政治面貌">
              <el-select v-model="form.region" placeholder="政治面貌">
                <el-option label="身份证" value="shanghai"></el-option>
                <el-option label="护照" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="紧急联系人">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电话">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="现居住地">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="籍贯">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="婚姻状况">
              <el-select v-model="form.region" placeholder="婚姻状况">
                <el-option label="已婚" value="shanghai"></el-option>
                <el-option label="未婚" value="beijing"></el-option>
                <el-option label="离异" value="beijing"></el-option>
                <el-option label="丧偶" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="学位">
              <el-select v-model="form.region" placeholder="婚姻状况">
                <el-option label="身份证" value="shanghai"></el-option>
                <el-option label="护照" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="文化程度">
              <el-select v-model="form.region" placeholder="婚姻状况">
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
          <el-col :span="7">
            <el-form-item label="证件类型">
              <el-select v-model="form.region" placeholder="证件类型">
                <el-option label="身份证" value="shanghai"></el-option>
                <el-option label="护照" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="证件编码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="工人类型">
              <el-select v-model="form.region" placeholder="工人类型">
                <el-option label="厨师" value="shanghai"></el-option>
                <el-option label="保安" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="持证上岗">
              <el-select v-model="form.region" placeholder="持证上岗">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="居住证">
              <el-select v-model="form.region" placeholder="持证上岗">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="7">
            <el-form-item label="居住证办理日期">
              <el-select v-model="form.region" placeholder="居住证办理日期">
                <el-option label="是" value="shanghai"></el-option>
                <el-option label="否" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
<style lang="stylus" scoped>
.AddOther {
  background: red;
  margin: 0 25px;

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
// el-form-item{
//     padding:0 50px
// }
</style>