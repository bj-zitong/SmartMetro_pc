<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="项目中心：" prop="projectName">
            <el-input v-model="screenForm.projectName" placeholder="请输入"></el-input>
            <!-- <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="getTable()"
            ></i> -->
          </el-form-item>
          <el-form-item label="标段/工地：" prop="section">
            <el-input v-model="screenForm.section" placeholder="请输入"></el-input>
            <!-- <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="getTable()"
            ></i> -->
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
          <el-button class="T-H-B-DarkBlue" @click="addClick()">新增</el-button>
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
          <el-table-column prop="status" label="状态"></el-table-column>
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
        <el-pagination
          background
          class="pagination-box"
          :page-sizes="[10, 50,100]"
          layout="total, sizes,prev, pager,next,jumper"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          @prev-click="prev"
          @next-click="next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
          <el-button class="F-Grey" round @click="cloneLaborForm('refLabor')">取消</el-button>
          <el-button class="F-Blue" round @click="submiLabortForm('refLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";

export default {
  name: "excelExport",
  data() {
    return {
      //  初始化页面
      page: 1, // 初始页
      pageSize: 10, // 默认每页数据量
      total: 0, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleLabor: false, // 添加/编辑弹窗
      titleLabor: "", // 标题
      screenForm: {
        //  筛选
        projectName: "",
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
      }
    };
  },
  created() {
    // 页面加载时获取信息
    this.getTable();
  },
  components: {},
  methods: {
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
    // 每页显示多少条 @size-change
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTable();
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    // 点击跳转第几页 @current-change
    handleCurrentChange(page) {
      this.page = page;
      this.getTable();
    },
    // 上一页 @prev-click
    prev(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 下一页 @next-click
    next(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        projectCenter: this.screenForm.projectName,
        siteName: this.screenForm.section
      });
      //请求
      ///smart/auth/{userId}/org/management
      var url =
        "/smart/auth/" + sessionStorage.getItem("userId") + "/org/management";
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
          orgSiteId: 1,
          projectCenter: "第一公司",
          status: "未提交",
          line: "13号线",
          siteName: "霍营",
          buildCorpName: "第一单位",
          responsiblePersonName: "张三",
          cellPhone: "15236985965",
          location: "xxxxx",
          createTime: "2019-10-01"
        },
        {
          orgSiteId: 2,
          projectCenter: "第二公司",
          status: "未提交",
          line: "12",
          siteName: "xxxxx",
          buildCorpName: "第二单位",
          responsiblePersonName: "王五",
          cellPhone: "15236985697",
          contractCode: "HT654321",
          location: "xxxxx",
          createTime: "2020-10-07"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      console.log(arrays);
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].orgSiteId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      //  this.multipleSelection = val;
    },
    //  添加/编辑 提交
    submiLabortForm(refLabor) {
      // 验证
      this.$refs[refLabor].validate(valid => {
        if (valid) {
          let form = this.$refs[refLabor].model;
          // 判断id是否为空 /smart/auth/{userId}/org
          var url = "/smart/auth/" + sessionStorage.getItem("userId") + "/org";
          if (form.orgSiteId == null) {
            let data = JSON.stringify(this.formLabor);
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
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          } else {
            let data = JSON.stringify(this.formLabor);
            var url =
              "/smart/auth/" +
              sessionStorage.getItem("userId") +
              "/org/" +
              this.formLabor.orgSiteId;
            var data = JSON.stringify({
              projectCenter: this.formLabor.projectCenter,
              line:this.formLabor.line,
              siteName:this.formLabor.siteName,
              buildCorpName:this.formLabor.buildCorpName,
              responsiblePersonName:this.formLabor.responsiblePersonName,
              cellPhone:this.formLabor.cellPhone,
              location:this.formLabor.location
            });
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  新增/编辑   关闭
    cloneLaborForm(refLabor) {
      this.$refs[refLabor].resetFields();
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
      this.formLabor = row;
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
          ///smart/auth/{userId}/org
          let url = "/smart/auth/" + sessionStorage.getItem("userId") + "/org";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              let total = res.total;
              let rows = res.rows;
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
    //  删除
    deleteRowClick(index, row) {
      let ids = [];
      ids.push(row.orgSiteId);
      handleCofirm("确定删除该信息吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          var url = "/smart/auth/" + sessionStorage.getItem("userId") + "/org";
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

<style lang="stylus"></style>
