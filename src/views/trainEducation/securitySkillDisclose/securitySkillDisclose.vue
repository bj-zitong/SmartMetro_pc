

<template>
  <div class="container">
    <el-container>
      <el-main class="main-head">
        <el-form :inline="true" :model="formInline" class="search-head" ref="formInline">
          <el-form-item label="施工单位:">
            <el-select v-model="formInline.company" placeholder="请选择施工单位" @change="selectCompany()">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工种：" style="margin-left:60px" prop="profession">
            <el-select
              v-model="formInline.profession"
              placeholder="请选择工种"
              @change="selectProfession()"
            >
              <el-option
                v-for="item in professions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" style="margin-left:60px" prop="time">
            <el-date-picker
              v-model="formInline.time"
              type="date"
              placeholder="选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="skillList()" style="margin-left:30px;">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-button">
        <el-button @click="dialogFormVisible = true" type="success" class="T-H-B-DarkBlue">新增</el-button>
        <el-button
          @click="deleteAllClick()"
          type="danger"
          class="T-H-B-Grey"
          style="margin-left:30px;"
        >删除</el-button>
        <el-button
          @click="submitAll()"
          type="primary"
          class="T-H-B-Cyan"
          style="margin-left:30px;"
        >提交</el-button>
        <el-button
          @click="poiExcel()"
          type="primary"
          class="T-H-B-Cyan"
          style="margin-left:30px;"
        >导出</el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun()"
            stripe
            :header-cell-style="{background:'#0058A2'}"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="technicalId"
              @selection-change="changeFun()"
            ></el-table-column>
            <el-table-column prop="constructionOrg" label="施工单位" width="100"></el-table-column>
            <el-table-column prop="disclosurePart" label="交底部位" width="100"></el-table-column>
            <el-table-column prop="workType" label="工种" width="120"></el-table-column>
            <el-table-column prop="disclosurePerson" label="交底人" width="100"></el-table-column>
            <el-table-column prop="disclosurePersonDuty" label="职务" width="100"></el-table-column>
            <el-table-column prop="receiver" label="接收人" width="150"></el-table-column>
            <el-table-column prop="receiverDuty" label="接收人职务" width="100"></el-table-column>
            <el-table-column prop="status" label="审核状态" width="100"></el-table-column>
            <el-table-column label="操作" style="width:500px" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="T-R-B-Green"
                  @click="handleEdit(scope.row)"
                  type="success"
                >编辑</el-button>
                <el-button
                  size="mini"
                  class="T-R-B-Grey"
                  @click="handleDelete(scope.row)"
                  type="info"
                >删除</el-button>
                <el-button
                  size="mini"
                  class="T-R-B-Orange"
                  @click="getDetail(scope.row)"
                  type="success"
                >查看详情</el-button>
                <el-button
                  size="mini"
                  class="T-R-B-Violet"
                  @click="submit(scope.row,1)"
                  type="primary"
                >提交</el-button>
                <el-button
                  size="mini"
                  class="T-R-B-Cyan"
                  @click="submit(scope.row,2)"
                  type="primary"
                >通过</el-button>
                <el-button
                  size="mini"
                  class="T-R-B-Cyan"
                  @click="submit(scope.row,3)"
                  type="primary"
                >驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="skillList"
        />
      </el-main>
    </div>
    <!--新增-->
    <el-dialog
      title="安全技术交底"
      :visible.sync="dialogFormVisible"
      width="500px"
      :center="true"
      top="0vh"
      :show-close="false"
      class="popupDialog abow_dialog"
    >
      <el-form :model="form" label-width="80px" ref="form" :rules="formRules">
        <el-form-item label="施工单位" prop="constructionOrg">
          <el-input v-model="form.constructionOrg" placeholder="施工单位"></el-input>
        </el-form-item>
        <el-form-item label="交底部位" prop="disclosurePart">
          <el-input v-model="form.disclosurePart" placeholder="交底部位"></el-input>
        </el-form-item>
        <el-form-item label="工种" prop="workType">
          <el-input v-model="form.workType" placeholder="工种"></el-input>
        </el-form-item>
        <el-form-item label="交底日期" prop="disclosureDate">
          <el-date-picker
            v-model="form.disclosureDate"
            type="date"
            placeholder="选择时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="交底内容" prop="disclosureContent">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入交底内容"
            v-model="form.disclosureContent"
          ></el-input>
        </el-form-item>
        <el-form-item label="针对性交底" prop="aimDisclosureContent">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入针对性交底"
            v-model="form.aimDisclosureContent"
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="交底人" style="width:200px;float:left" prop="disclosurePerson">
            <el-input v-model="form.disclosurePerson" placeholder="交底人"></el-input>
          </el-form-item>
          <el-form-item label="职务" style="width:200px;float:right" prop="disclosurePersonDuty">
            <el-input v-model="form.disclosurePersonDuty" placeholder="职务"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="接收人" style="width:200px;float:left" prop="receiver">
            <el-input v-model="form.receiver" placeholder="接收人"></el-input>
          </el-form-item>
          <el-form-item label="职务" style="width:200px;float:right" prop="receiverDuty">
            <el-input v-model="form.receiverDuty" placeholder="职务"></el-input>
          </el-form-item>
        </div>
        <div class="dialog-footer" style="text-align:center;">
          <el-button @click.native="cancelForm('form')" class="F-Grey" round>取 消</el-button>
          <el-button
            type="primary"
            @click.native="addSkillClick('form')"
            class="F-Blue"
            round
            style="margin-left:60px"
          >确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 详情-->
    <el-dialog
      title
      :visible.sync="dialogFormVisibleDetail"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <div class="AddEquipment_form">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              施工单位:
              <span>{{showdata.constructionOrg}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              交底部位:
              <span>{{showdata.disclosurePart}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              工种:
              <span>{{showdata.workType}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              交底人:
              <span>{{showdata.disclosurePerson}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              职务:
              <span>{{showdata.disclosurePersonDuty}}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              接收人:
              <span>{{showdata.receiver}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              接收人职务:
              <span>{{showdata.receiverDuty}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              审核状态:
              <span>{{showdata.status}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <template slot="footer" class="dialog-footer">
        <el-button
          type="default"
          @click="dialogFormVisibleDetail = false"
          round
          class="T-R-B-Grey"
        >取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../../components/pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      token: null, // token
      dialogFormVisible: false,
      dialogFormVisibleDetail: false,
      // 动态数据
      tableData: [],
      showdata: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      ids: null, //选中的id
      options: [
        { id: 1, name: "单位一" },
        { id: 2, name: "单位二" },
        { id: 3, name: "单位三" }
      ],
      professions: [
        { id: 1, name: "水泥工" },
        { id: 2, name: "钢筋工" }
      ],
      formInline: {
        company: null,
        profession: null,
        time: null
      },
      form: {
        constructionOrg: "",
        disclosurePart: null,
        workType: "",
        disclosureDate: "",
        disclosureContent: "",
        aimDisclosureContent: "",
        disclosurePerson: "",
        disclosurePersonDuty: "",
        receiver: "",
        receiverDuty: "",
        technicalId: null
      },
      formRules: {
        constructionOrg: [
          { required: true, message: "请输入施工单位", trigger: "blur" }
        ],
        disclosurePart: [
          { required: true, message: "请输入交底部位", trigger: "blur" }
        ],
        workType: [{ required: true, message: "请输入工种", trigger: "blur" }],
        disclosureDate: [
          { required: true, message: "请选择交底日期", trigger: "change" }
        ],
        disclosureContent: [
          { required: true, message: "请输入交底内容", trigger: "blur" }
        ],
        aimDisclosureContent: [
          { required: true, message: "请输入针对性交底", trigger: "blur" }
        ],
        disclosurePerson: [
          { required: true, message: "请输入交底人", trigger: "blur" }
        ],
        disclosurePersonDuty: [
          { required: true, message: "请输入交底人职务", trigger: "blur" }
        ],
        receiver: [
          { required: true, message: "请输入接收人", trigger: "blur" }
        ],
        receiverDuty: [
          { required: true, message: "请输入接收人职务", trigger: "blur" }
        ]
      }
    };
  },
  activated() {
    this.skillList();
  },
  methods: {
    cancelForm(form) {
      this.$refs[form].resetFields();
      Object.assign(this.$data.form, this.$options.data().form); // 初始化data
      this.dialogFormVisible = false;
    },
    addSkillClick(form) {
      this.$refs[form].validate(valid => {
        //校验
        if (valid) {
          var form = this.$refs["form"].model;
          if (form.technicalId == null) {
            //新增 id为空
            var params = JSON.stringify({
              constructionOrg: form.constructionOrg,
              disclosurePart: form.disclosurePart,
              workType: form.workType,
              disclosureDate: form.disclosureDate,
              disclosureContent: form.disclosureContent,
              aimDisclosureContent: form.aimDisclosureContent,
              disclosurePerson: form.disclosurePerson,
              disclosurePersonDuty: form.disclosurePersonDuty,
              receiver: form.receiver,
              receiverDuty: form.receiverDuty
            });
            var url =
              "/smart/worker/train/" +
              sessionStorage.getItem("userId") +
              "/technical/2";
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.cancelForm(form);
              }
            });
          } else {
            //新增 id为空
            var params = JSON.stringify({
              constructionOrg: form.constructionOrg,
              disclosurePart: form.disclosurePart,
              workType: form.workType,
              disclosureDate: form.disclosureDate,
              disclosureContent: form.disclosureContent,
              aimDisclosureContent: form.aimDisclosureContent,
              disclosurePerson: form.disclosurePerson,
              disclosurePersonDuty: form.disclosurePersonDuty,
              receiver: form.receiver,
              receiverDuty: form.receiverDuty,
              technicalId: form.technicalId
            });
            var url =
              "/smart/worker/train/" +
              sessionStorage.getItem("userId") +
              "/technical/2";
            this.http.put(url, params).then(res => {
              if (res.code == 200) {
                this.cancelForm(form);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    skillList() {
      var company = this.formInline.company;
      var profession = this.formInline.profession;
      var time = this.formInline.time;
      //   // 获得当前用户的id
      // var  uid = sessionStorage.getItem('uid')
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        constructionOrg: company,
        workType: profession,
        disclosureDate: time
      });
      var url =
        "/smart/worker/train/" +
        sessionStorage.getItem("userId") +
        "/technical/management/2";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
      var result = [
        {
          technicalId: 1,
          constructionOrg: "安保部一",
          disclosurePart: "22222",
          workType: "xxxxx",
          disclosurePersonDuty: "2222",
          disclosurePerson: "123",
          receiver: "22222222",
          receiverDuty: "7777",
          status: "22222222"
        },
        {
          technicalId: 2,
          disclosurePart: "5555",
          constructionOrg: "44444",
          disclosurePerson: "44444",
          disclosurePersonDuty: "2222",
          receiver: "444",
          status: 44444,
          workType: "ccccc",
          receiverDuty: "7777"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    // 下拉框获得值
    selectCompany(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formInline.company = obj.id;
    },
    selectProfession(vid) {
      let obj = {};
      obj = this.professions.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formInline.profession = obj.id;
    },
    //删除
    deleteAllClick() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/technical/2";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete(row) {
      handleCofirm("确认删除")
        .then(res => {
          var ids = [];
          ids.push(row.technicalId);
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/technical/2";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    handleEdit(row) {
      var uid = row.technicalId;
      this.form.technicalId = uid;
      var url =
        "/smart/worker/train/" +
        sessionStorage.getItem("userId") +
        "/technical/2/" +
        uid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
        }
      });
      // this.form = row;
      this.dialogFormVisible = true;
    },
    //详情
    getDetail(row) {
      this.dialogFormVisibleDetail = true;
      this.showdata = row;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].technicalId;
        ids.push(id);
      }
      return ids;
    },
    submitAll() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择提交的数据！");
        return;
      }
      //未提交0 提交1 通过2 驳回3
      handleCofirm("确认提交")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/technical/common/2/1";
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.$message({
                type: "success",
                message: "提交成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    },
    submit(row, value) {
      var id = row.technicalId;
      var ids = [];
      ids.push(id);
      //未提交0 提交1 通过2 驳回3
      var title = "";
      var message = "";
      var cancelMessage = "";
      if (value == 1) {
        title = "确认提交";
        message = "提交成功！";
        cancelMessage = "已取消提交";
      }
      if (value == 2) {
        title = "确认通过";
        message = "已通过！";
        cancelMessage = "已取消";
      }
      if (value == 3) {
        title = "确认驳回";
        message = "已驳回！";
        cancelMessage = "已取消";
      }
      handleCofirm(title)
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/technical/common/2/" +
            value;
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: message
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: cancelMessage
          });
        });
    },
    //导出
    poiExcel() {
      // //获得token
      // var token = sessionStorage.getItem("token");
      var company = this.formInline.company;
      var profession = this.formInline.profession;
      var time = this.formInline.time;
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        constructionOrg: company,
        workType: profession,
        disclosureDate: time
      });
      var url =
        "/smart/worker/train/" +
        sessionStorage.getItem("userId") +
        "/technical/export/2";
      this.http.post(url, data).then(res => {
        // // 创建Blob对象，设置文件类型
        // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
        // let objectUrl = URL.createObjectURL(blob) // 创建URL
        // location.href = objectUrl;
        // URL.revokeObjectURL(objectUrl); // 释放内存
        // 创建Blob对象，设置文件类型
        // 自定义文件下载名称  Subway-User-20191223114607
        var d = new Date();
        var month = d.getMonth() + 1;
        var excelName =
          "Subway-User-" +
          d.getFullYear() +
          month +
          d.getDate() +
          d.getHours() +
          d.getMinutes() +
          d.getSeconds();
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel"
        });
        let objectUrl = URL.createObjectURL(blob); // 创建URL
        link.href = objectUrl;
        link.download = excelName; // 自定义文件名
        link.click(); // 下载文件
        URL.revokeObjectURL(objectUrl); // 释放内存
        // alert("调用导出！");
      });
    }
  }
};
</script>
<style  scoped lang="stylus">
.container {
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    padding: 0px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    color: #333;
    opacity: 1;
    border-radius: 10px;
    height: 100px;
  }

  .el-container {
    margin-bottom: 40px;
  }

  .main-head {
    padding-top: 30px;
    margin-left: 30px;
    margin-right: 30px;

    .search-head {
      margin-left: 30px;
    }

    . el-select {
      width: 180px;
    }
  }

  // 表格
  .table-main {
    margin-top: -30px;

    .table-button {
      height: 500px;
      padding: 30px;
    }

    .table-content {
      margin-top: 30px;
    }
  }

  .page-end {
    text-align: center;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #FFFFFF;
}

.bg-purple {
  background: #FFFFFF;
}

.bg-purple-light {
  background: #FFFFFF;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
