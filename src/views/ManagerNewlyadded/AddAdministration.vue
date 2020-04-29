<template>
  <el-container class="AddOther">
    <el-main class="main">
      <p>添加管理人员</p>
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
            <el-form-item label="电话">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="部门">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="承建单位">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="岗位/职责">
              <el-select v-model="form.region" placeholder="婚姻状况"></el-select>
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
          <el-col :span="14">
            <el-form-item label="现居住地">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
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
          <el-col :span="7">
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
          <el-col :span="10">
            <el-form-item label="政治面貌">
              <el-select v-model="form.region" placeholder="政治面貌">
                <el-option label="企业自有职工" value="shanghai"></el-option>
                <el-option label="劳务派遣人员" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div class="role">
            <el-form-item label="角色">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="超级管理员" name="type"></el-checkbox>
                <el-checkbox label="项目负责人" name="type"></el-checkbox>
                <el-checkbox label="项目技术负责人" name="type"></el-checkbox>
                <el-checkbox label="智慧工地管理员" name="type"></el-checkbox>
                <el-checkbox label="BIM管理" name="type"></el-checkbox>
                <el-checkbox label="物资管理" name="type"></el-checkbox>
                <el-checkbox label="质量管理" name="type"></el-checkbox>
                <el-checkbox label="劳务管理" name="type"></el-checkbox>
                <el-checkbox label="生产管理" name="type"></el-checkbox>
                <el-checkbox label="安全管理" name="type"></el-checkbox>
                <el-checkbox label="其他" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
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
.role{
    float left;
    position absolute;
    bottom :50px
}
</style>