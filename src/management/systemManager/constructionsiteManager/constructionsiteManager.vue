<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item prop="projectName" label="项目中心">
          <el-select v-model="screenForm.projectName" placeholder="请选择" @change="selectCenters">
            <el-option v-for="item in centers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="标段/工地：" prop="section">
            <el-input v-model="screenForm.section" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTable()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="addClick('refLabor')">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteBatchClick()">删除</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          :header-cell-style="headClass"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            fixed
            prop="orgSiteId"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="projectCenter" label="项目中心" min-width="100"></el-table-column>
          <el-table-column prop="line" label="线路" min-width="90"></el-table-column>
          <el-table-column prop="siteName" label="标段/工地" min-width="110"></el-table-column>
          <el-table-column prop="buildCorpName" label="承建单位" min-width="80"></el-table-column>
          <el-table-column prop="responsiblePersonName" label="项目负责人姓名" min-width="100"></el-table-column>
          <el-table-column prop="cellPhone" label="联系电话" min-width="100"></el-table-column>
          <el-table-column prop="location" label="所在位置" min-width="120"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#00A854"
                on-text="启动"
                on-value="1"
                off-color="#F04134"
                off-text="禁止"
                off-value="0"
                @change="changeSwitch(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click="editRowClick(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                class="T-R-B-Grey"
                size="mini"
                @click="deleteRowClick(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <!-- 添加 编辑 -->
    <el-dialog
      width="450px"
      class="popupDialog"
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
        <el-form-item prop="orgSiteId">
          <el-input v-model="formLabor.orgSiteId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="projectCenter" label="项目中心">
          <el-select v-model="formLabor.projectCenter" placeholder="请选择" @change="selectProfession">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="line" label="线路">
          <el-select v-model="formLabor.line" placeholder="请选择" @change="selectProfession2">
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="siteName" label="标段/工地">
          <el-input v-model="formLabor.siteName"></el-input>
        </el-form-item>
        <el-form-item prop="buildCorpName" label="承建单位">
          <el-input v-model="formLabor.buildCorpName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="项目负责人姓名">
          <el-input v-model="formLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="cellPhone" label="联系电话">
          <el-input v-model="formLabor.cellPhone"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="所在位置">
          <el-input v-model="formLabor.location"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click.native="cloneLaborForm('refLabor')">取消</el-button>
          <el-button class="F-Blue" round @click.native="submiLabortForm('refLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../../components/pagination";
export default {
  name: "excelExport",
  components: {
    Pagination
  },
  data() {
    return {
      //  初始化页面
      total: 0, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleLabor: false, // 添加/编辑弹窗
      titleLabor: "", // 标题
      screenForm: {
        //  筛选
        projectName: 0,
        section: "" //标段
      },
      options: [
        { id: 0, name: "请选择" },
        { id: 1, name: "中心一" },
        { id: 2, name: "中心二" },
        { id: 3, name: "中心三" }
      ],
      options2: [
        { id: 0, name: "请选择" },
        { id: 1, name: "线路一" },
        { id: 2, name: "线路二" },
        { id: 3, name: "线路三" }
      ],
      centers:[
        { id: 0, name: "请选择" },
        { id: 1, name: "中心一" },
        { id: 2, name: "中心二" },
        { id: 3, name: "中心三" }
      ],
      // 新增/编辑
      formLabor: {
        orgSiteId: null,
        projectCenter: "",
        line: "",
        siteName: "",
        buildCorpName: "",
        responsiblePersonName: "",
        cellPhone: "",
        location: ""
      },
      // 自定义表单验证
      rulesForm: {
        projectCenter: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        line: [{ required: true, message: "请选择", trigger: "change" }],
        siteName: [{ required: true, message: "请输入标段", trigger: "blur" }],
        buildCorpName: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
        responsiblePersonName: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ],
        cellPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        location: [
          { required: true, message: "请输入所在位置", trigger: "blur" }
        ]
      },
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  activated() {
    // 页面加载时获取信息
    this.getTable();
  },
  methods: {
     changeSwitch(val) {
      //获得状态的值
      var data = null;
      var status = val.status;
      if (status) {
        //该状态为启用
        data = JSON.stringify({
          status: 0,
          orgSiteId: val.orgSiteId
        });
        //禁用
      } else {
        data = JSON.stringify({
          status: 1,
          orgSiteId: val.orgSiteId
        });
      }
      var url = "/systemUrl/smart/auth/" + sessionStorage.getItem("userId") + "/org";
      this.http
        .put(url, data)
        .then(res => {
          if (res.code == 200) {
          }
        })
        .catch(res => {
          return false;
        });
    },
    // 下拉框 中心
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formLabor.projectCenter = obj.id;
    },
    //line
    selectProfession2(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formLabor.line = obj.id;
    },
    //搜索的下拉选择
    selectCenters(vid){
      let obj = {};
      obj = this.centers.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.screenForm.projectName=obj.id;
    },
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        projectCenterId: this.screenForm.projectName,
        siteName: this.screenForm.section
      });
      //请求
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/org/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          this.tableData = res.data.rows;
          for (var i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].projectCenterId==1){
               this.tableData[i].projectCenter = '中心一';
            }else if(this.tableData[i].projectCenterId==2){
               this.tableData[i].projectCenter = '中心二';
            }else{
               this.tableData[i].projectCenter = '中心三';
            }
            if(this.tableData[i].lineId==1){
               this.tableData[i].line = '线路一';
            }else if(this.tableData[i].lineId==2){
               this.tableData[i].line = '线路二';
            }else{
               this.tableData[i].line = '线路三';
            }

            if (this.tableData[i].status == "0") {
              this.tableData[i].status = true;
            } else {
              this.tableData[i].status = false;
            }
          }
          this.total = total;
        }
      });
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].orgSiteId;
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
          // 判断id是否为空 /smart/auth/{userId}/org
          var url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/org";
          if (form.orgSiteId == null) {
            //this.formLabor
            let data = JSON.stringify({
              projectCenterId:form.projectCenter,
              lineId:form.line,
              siteName:form.siteName,
              buildCorpName:form.buildCorpName,
              responsiblePersonName:form.responsiblePersonName,
              cellPhone:form.cellPhone,
              location: form.location
            });
            this.http
              .post(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message("添加成功！");
                  this.cloneLaborForm(refLabor);
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
          } else {
            let data = JSON.stringify(this.formLabor);
            var url =
              "/systemUrl/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/org";
            var data = JSON.stringify({
              projectCenterId: form.projectCenter,
              lineId: form.line,
              siteName: form.siteName,
              buildCorpName:form.buildCorpName,
              responsiblePersonName: form.responsiblePersonName,
              cellPhone: form.cellPhone,
              location: form.location,
              orgSiteId: form.orgSiteId
            });
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message("编辑成功！");
                  this.cloneLaborForm(refLabor);
                  this.getTable();
                }
              })
              .catch(res => {
                return false;
              });
          }
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
    //  新增
    addClick() {
      this.titleLabor = "添加";
      this.dialogVisibleLabor = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑";
      var id = row.orgSiteId;
      // this.formLabor = row;
      var url =
        "/systemUrl/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/org/" +
        id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.formLabor = JSON.parse(JSON.stringify(result));
          this.formLabor.projectCenter=result.projectCenterId;
          this.formLabor.line=result.lineId;
        }
      });
      this.dialogVisibleLabor = true;
    },
    //  批量删除
    deleteBatchClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          let data = JSON.stringify(ids);
          let url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/org";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message("已删除！");
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
    //  删除
    deleteRowClick(index, row) {
      let ids = [];
      ids.push(row.orgSiteId);
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/org";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message("已删除！");
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
    //  表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    }
  }
};
</script>

<style lang="stylus" scoped>
.R-L-wrap {
  width: 100%;
  height: 100%;
}

.R-L-S, .R-L-T {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.screen-form-h {
  height: 36px;
}
</style>

