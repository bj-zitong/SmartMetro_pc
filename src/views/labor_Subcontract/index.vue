<template>
  <div
    class="main-box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="劳务公司：">
            <el-select v-model="screenForm.company">
              <el-option
                v-for="item in company"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人：">
            <el-input v-model="screenForm.responsiblePersonName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="合同类型：">
            <el-select v-model="screenForm.contractType">
              <el-option label="劳务分包" value="1"></el-option>
              <el-option label="专业分包" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTable(0)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>

    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="addClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportBatchClick">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importBatchClick">导入</el-button>
          </el-upload>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          :header-cell-style="headClass"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          id="out-table"
        >
          <el-table-column
            type="selection"
            fixed
            prop="pLabourCompanyId"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="company" label="公司名称" min-width="100"></el-table-column>
          <el-table-column prop="responsiblePersonName" label="负责人" min-width="90"></el-table-column>
          <el-table-column prop="responsiblePersonPhone" label="联系方式" min-width="110"></el-table-column>
          <el-table-column prop="serviceCompany" label="服务单位" min-width="80"></el-table-column>
          <el-table-column prop="projectCode" label="项目编号" min-width="100"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" min-width="100"></el-table-column>
          <el-table-column prop="contractCode" label="合同编号" min-width="120"></el-table-column>
          <!-- <el-table-column label="有效时间" min-width="200">
            <template slot-scope="scope">
              <span>{{scope.row.startDate}}</span> 至
              <span>{{scope.row.endDate}}</span>
            </template>
          </el-table-column>-->
          <el-table-column prop="contractPeriodType" label="合同期限类型" min-width="210">
            <template slot-scope="scope">
              <span v-if="scope.row.contractPeriodType==0">固定期限合同</span>
              <span v-if="scope.row.contractPeriodType==1">以完成一定工作为期限的合同</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractType" label="合同类型" min-width="210">
            <template slot-scope="scope">
              <span v-if="scope.row.contractType==1">劳务分包</span>
              <span v-if="scope.row.contractType==2">专业分包</span>
            </template>
          </el-table-column>
          <el-table-column prop="corpCode" label="组织机构代码" min-width="120"></el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click.native="editRowClick(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                class="T-R-B-Grey"
                size="mini"
                @click.native="deleteRowClick(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                class="T-R-B-Violet"
                size="mini"
                @click="createdTeamClick(scope.$index, scope.row)"
              >创建班组</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <!-- 添加 -->
    <el-dialog
      width="450px"
      class="popupDialog abow_dialog"
      :title="titleLabor"
      :visible.sync="dialogVisibleLabor"
      :close-on-click-modal="false"
      :center="true"
      :show-close="false"
      :hide-required-asterisk="true"
    >
      <el-form
        ref="refLabor"
        :rules="rulesForm"
        :model="formLabor"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="pLabourCompanyId">
          <el-input v-model="formLabor.pLabourCompanyId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="company" label="公司名称">
          <el-input v-model="formLabor.company"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="负责人">
          <el-input v-model="formLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="联系方式">
          <el-input v-model="formLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位">
          <el-input v-model="formLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目编号">
          <el-input v-model="formLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称">
          <el-input v-model="formLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="合同编号">
          <el-input v-model="formLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="开始日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="formLabor.startDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="formLabor.endDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="contractPeriodType" label="合同期限类型">
          <el-select v-model="formLabor.contractPeriodType">
            <el-option label="固定期限合同" value="0"></el-option>
            <el-option label="以完成一定工作为期限的合同" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contractType" label="合同类型">
          <el-select v-model="formLabor.contractType">
            <el-option label="劳务分包" value="1"></el-option>
            <el-option label="专业分包" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpCode" label="所属企业组织机构代码" class="labelWidth">
          <el-input v-model="formLabor.corpCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click.native="cloneLaborForm('refLabor')">取消</el-button>
          <el-button class="F-Blue" round @click.native="submiLabortForm('refLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 创建班组 -->
    <el-dialog
      width="450px"
      title="新增班组"
      class="popupDialog"
      :visible.sync="dialogVisibleTeam"
      :center="true"
      :show-close="false"
      :close-on-click-modal="false"
      :hide-required-asterisk="true"
    >
      <el-form ref="refTeam" label-width="100px" :rules="rulesForm" :model="formTeam" action>
        <el-form-item prop="pLabourCompanyId">
          <el-input v-model="formTeam.pLabourCompanyId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="工程名称：">
          <el-input v-model="formTeam.projectName" type="text" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamName" label="班组名称：">
          <el-input v-model="formTeam.teamName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamType" label="班组类型：">
          <el-select v-model="formTeam.teamType">
            <el-option
              v-for="item in teamOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="teamLeaderName" label="班组长：">
          <el-input v-model="formTeam.teamLeaderName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamLeaderPhone" label="手机号码：">
          <el-input v-model="formTeam.teamLeaderPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click.native="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click.native="submitTeamForm('refTeam')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";
import axios from "axios";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "excelExport",
  components: {
    Pagination
  },
  data() {
    return {
      total: "",
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      tableData: [], // 初始化表格
      loading: true,
      gridData: [], // 查看下属表格初始化
      dialogVisibleLabor: false, // 添加/编辑弹窗
      dialogVisibleTeam: false, // 班组
      formTeam: {
        //班组初始化
        pLabourCompanyId: null,
        projectName: "",
        teamName: "",
        teamType: "",
        teamLeaderName: "",
        teamLeaderPhone: ""
      },
      teamOptions: [
        { id: 1, name: "班组1" },
        { id: 2, name: "班组2" }
      ],
      titleLabor: "", // 标题
      seeBranch: false, // 创建班组弹窗
      screenForm: {
        //  筛选
        company: "",
        responsiblePersonName: "",
        contractType: ""
      },
      company: [
        // { id: null, name: "" },
        // { id: 1, name: "第一公司" },
        // { id: 2, name: "第二公司" }
      ],
      // 新增/编辑 劳务人员
      formLabor: {
        pLabourCompanyId: null,
        company: "",
        responsiblePersonName: "",
        responsiblePersonPhone: "",
        serviceCompany: "",
        projectCode: "",
        projectName: "",
        contractCode: "",
        startDate: "",
        endDate: "",
        contractPeriodType: "",
        corpCode: "",
        contractType: ""
      },
      // 自定义表单验证
      rulesForm: {
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        responsiblePersonName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        responsiblePersonPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ],
        serviceCompany: [
          { required: true, message: "请输入服务单位", trigger: "blur" }
        ],
        projectCode: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        contractCode: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "change" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "change" }
        ],
        contractPeriodType: [
          { required: true, message: "请选择合同期限类型", trigger: "change" }
        ],
        contractType: [
          { required: true, message: "请选择合同类型", trigger: "change" }
        ],
        corpCode: [
          { required: true, message: "请输入组织机构代码", trigger: "blur" }
        ],
        teamName: [
          { required: true, message: "请输入班组名称", trigger: "blur" }
        ],
        teamType: [
          { required: true, message: "请选择班组类型", trigger: "change" }
        ],
        teamLeaderName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        teamLeaderPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ]
      }
    };
  },
  activated() {
    // 页面加载时获取信息
    this.getTable();
    this.company = [];
    var data = JSON.stringify({
      pageSize: 100,
      page: 1
    });
    //请求
    var url =
      "/bashUrl/smart/worker/labour/" +
      sessionStorage.getItem("userId") +
      "/company/management";
    this.http.post(url, data).then(res => {
      if (res.code == 200) {
        var rows = res.data.rows;
        this.company.push({ id: null, name: "" });
        for (var i = 0; i < rows.length; i++) {
          this.company.push({
            id: rows[i].pLabourCompanyId,
            name: rows[i].company
          });
        }
      }
    });
  },
  methods: {
    // 表格加载请求
    getTable(val) {
      if (val == 0) {
        this.loading = true;
      }
      var data = JSON.stringify({
        company: this.screenForm.company,
        responsiblePersonName: this.screenForm.responsiblePersonName,
        contractType: this.screenForm.contractType,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      //请求
      var url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          var rows = res.data.rows;
          this.tableData = rows;
          this.total = total;
          this.loading = false;
        }
      });
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pLabourCompanyId;
        ids.push(id);
      }
      return ids;
    },

    //  添加/编辑 提交
    submiLabortForm(refLabor) {
      // 验证
      this.$refs[refLabor].validate(valid => {
        if (valid) {
          let form = this.$refs[refLabor].model;
          // 判断id是否为空
          if (form.pLabourCompanyId == null) {
            let url =
              "/bashUrl/smart/worker/labour/" +
              sessionStorage.getItem("userId") +
              "/company";
            let data = JSON.stringify(this.formLabor);
            this.http
              .post(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
            this.dialogVisibleLabor = false;
          } else {
            let url =
              "/bashUrl/smart/worker/labour/" +
              sessionStorage.getItem("userId") +
              "/company";
            let data = JSON.stringify(this.formLabor);
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
            this.dialogVisibleLabor = false;
          }
          this.cloneLaborForm(refLabor);
        } else {
          return false;
        }
      });
    },

    //  新增/编辑   关闭
    cloneLaborForm(refLabor) {
      this.$refs[refLabor].resetFields();
      Object.assign(this.$data.formLabor, this.$options.data().formLabor); // 初始化data
      this.dialogVisibleLabor = false;
    },
    //  新增劳务公司
    addClick() {
      this.titleLabor = "新增劳务公司";
      this.dialogVisibleLabor = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑劳务公司";
      this.formLabor = JSON.parse(JSON.stringify(row));
      this.dialogVisibleLabor = true;
    },

    //  批量删除
    deleteBatchClick() {
      let ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除吗？")
        .then(res => {
          let data = JSON.stringify(ids);
          let url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/company";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTable();
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //  导出
    exportBatchClick() {
      /* 从表生成工作簿对象 */
      // var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      // var wbout = XLSX.write(wb, {
      //     bookType: "xlsx",
      //     bookSST: true,
      //     type: "array"
      // });
      // try {
      //     FileSaver.saveAs(
      //     //Blob 对象表示一个不可变、原始数据的类文件对象。
      //     //Blob 表示的不一定是JavaScript原生格式的数据。
      //     //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //     //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     //设置导出文件名称
      //     "sheetjs.xlsx"
      //     );
      // } catch (e) {
      //     if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;

      axios({
        url:
          "/bashUrl/smart/worker/labour/" +
          sessionStorage.getItem("userId") +
          "/company/management/export", //获取文件流的接口路径
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          company: this.screenForm.company,
          responsiblePersonName: this.screenForm.responsiblePersonName,
          contractType: this.screenForm.contractType,
          pageSize: this.listQuery.pageSize,
          page: this.listQuery.currentPage
        }),
        responseType: "blob" // 表明返回服务器返回的数据类型 很重要！！  arraybuffer
      })
        .then(res => {
          // var res=[{name:1,age:1}];
          // require.ensure([], () => {
          // const { export_json_to_excel } = require('../../../src/excel/Export2Excel')
          // const tHeader = ['公司名称','负责人','联系方式','服务单位','项目编号','项目名称','合同编号','合同期限类型','合同类型','组织机构代码']
          //   const filterVal = ['company', 'responsiblePersonName','responsiblePersonPhone','serviceCompany','projectCode','projectName','contractCode','contractPeriodType','contractType','corpCode']
          //   const list = this.tableData
          //   console.log(list.contractPeriodType)
          //    console.log(list)
          //  for(var i=0;i<list.length;i++){
          //     if(list[i].contractPeriodType=='0'){
          //       list[i].contractPeriodType='固定期限合同'
          //   }else{
          //     list[i].contractPeriodType='以完成一定工作为期限的合同'
          //   }
          //   if(list[i].contractType=='1'){
          //       list[i].contractType='劳务分包'
          //   }else{
          //     list[i].contractType='专业分包'
          //   }
          //  }
          // const data = this.formatJson(filterVal, list)
          // export_json_to_excel(tHeader, res, '导出列表名称')
          // })
          debugger;

          // //将文件流转成blob形式
          const blob = new Blob([res], {
            type:
              "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }); //application/vnd.ms-excel
          //创建一个超链接，将文件流赋进去，然后实现这个超链接的单击事件
          const elink = document.createElement("a");
          elink.download = "1.xls"; // 重命名文件
          elink.style.display = "none";
          let url = URL.createObjectURL(blob);
          elink.href = url;
          // const fileName = decodeURI(res.headers['filename']);
          // elink.setAttribute('download', fileName);
          // document.body.appendChild(elink);
          document.body.appendChild(elink);
          elink.click();
          // URL.revokeObjectURL(url); // 释放URL 对象
          document.body.removeChild(elink);
        })
        .catch(error => {
          this.$message.error("导出失败");
          // console.log(error)
        });

      //       // link.href = objectUrl;
      //       // link.download = excelName; // 自定义文件名
      //       // link.click(); // 下载文件
      //       // URL.revokeObjectURL(objectUrl); // 释放内存

      // let company = this.screenForm.company;
      // let responsiblePersonName = this.screenForm.responsiblePersonName;
      // let contractType = this.screenForm.contractType;
      // let _this = this;
      // let data = JSON.stringify({
      //   company: company,
      //   responsiblePersonName: responsiblePersonName,
      //   contractType: contractType,
      //   pageSize: _this.listQuery.pageSize,
      //   page: _this.listQuery.currentPage
      // });

      // let url =
      //   "/bashUrl/smart/worker/labour/" +
      //   sessionStorage.getItem("userId") +
      //   "/company/management/export";

      //     this.http.post(url, data).then(res => {
      //       let d = new Date();
      //       let month = d.getMonth() + 1;
      //       let excelName =
      //         "劳务公司人员-" +
      //         d.getFullYear() +
      //         month +
      //         d.getDate() +
      //         d.getHours() +
      //         d.getMinutes() +
      //         d.getSeconds();
      //       // let blob = new Blob([res]);
      //       // let link = document.createElement("a");
      //       // let objectUrl = URL.createObjectURL(blob); // 创建URL
      //       // link.href = objectUrl;
      //       // link.download = excelName; // 自定义文件名
      //       // link.click(); // 下载文件
      //       // URL.revokeObjectURL(objectUrl); // 释放内存
      //  const content = res

      //   let blob = new Blob([res.data], {
      //         type: "application/vnd.ms-excel"
      //       });
      //   const fileName = 'a';
      //   if ('download' in document.createElement('a')) { // 非IE下载
      //     const elink = document.createElement('a')
      //     elink.download = fileName
      //     elink.style.display = 'none'
      //     elink.href = URL.createObjectURL(blob)
      //     document.body.appendChild(elink)
      //     elink.click()
      //     URL.revokeObjectURL(elink.href) // 释放URL 对象
      //     document.body.removeChild(elink)
      //   } else { // IE10+下载
      //     navigator.msSaveBlob(blob, fileName)
      //   }
      //     });
    },
    //  导入
    importBatchClick() {
      let url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management/import";
      let params = new FormData();
      params.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, params).then(res => {
        if (res.code == 200) {
          this.getTable();
        }
      });
    },
    //  删除
    deleteRowClick(index, row) {
      let ids = [];
      ids.push(row.pLabourCompanyId);
      handleCofirm("确定删除吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/company";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTable();
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
    //  班组
    createdTeamClick(index, row) {
      this.formTeam.pLabourCompanyId = JSON.parse(
        JSON.stringify(row.pLabourCompanyId)
      );
      this.dialogVisibleTeam = true;
    },
    // 班组提交
    submitTeamForm(refTeam) {
      this.$refs[refTeam].validate(valid => {
        if (valid) {
          let form = this.$refs[refTeam].model;
          let data = JSON.stringify(this.formTeam);
          let url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
          this.http
            .post(url, data)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
              }
            })
            .catch(res => {
              return false;
            });
          this.dialogVisibleTeam = false;
        } else {
          return false;
        }
      });
      this.$refs[refTeam].resetFields();
    },
    cloneTeamForm(refTeam) {
      this.$refs[refTeam].resetFields();
      this.dialogVisibleTeam = false;
    },
    // 表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    }
  }
};
</script>
