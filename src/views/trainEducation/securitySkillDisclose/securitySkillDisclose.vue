

<template>
  <div class="container">
    <el-container>
      <el-main class="main-head">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="交底单位:">
            <el-select v-model="formInline.company" placeholder="请选择交底单位" @change="selectCompany()">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工种：" style="margin-left:60px">
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
          <el-form-item label="时间" style="margin-left:60px">
            <el-date-picker v-model="formInline.time" type="date" placeholder="选择时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectSkillList()" style="margin-left:30px;">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-button">
        <el-button @click="dialogFormVisible = true" type="success" class="T-H-B-DarkBlue">新增</el-button>
        <el-button @click="deleteAllClick()" type="danger" class="T-H-B-Grey" style="margin-left:30px;">删除</el-button>
        <el-button @click="download()" type="primary" class="T-H-B-Cyan" style="margin-left:30px;">下载</el-button>
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
              prop="userId"
              @selection-change="changeFun()"
            ></el-table-column>
            <el-table-column prop="company" label="施工单位" width="100"></el-table-column>
            <el-table-column prop="tellAbstract" label="交底部位" width="100"></el-table-column>
            <el-table-column prop="workType" label="工种" width="120"></el-table-column>
            <el-table-column prop="tellPerson" label="交底人" width="100"></el-table-column>
            <el-table-column prop="duty" label="职务" width="100"></el-table-column>
            <el-table-column prop="reciveTell" label="接收人" width="150"></el-table-column>
            <el-table-column prop="reciveDuty" label="接收人职务" width="100"></el-table-column>
            <el-table-column prop="checkState" label="审核状态" width="100" fixed="right"></el-table-column>
            <el-table-column prop="accessory" label="附件" width="100" fixed="right"></el-table-column>
            <el-table-column label="操作" style="width:500px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" class="T-R-B-Green" @click="handleEdit(scope.row)" type="success">编辑</el-button>
                <el-button size="mini" class="T-R-B-Violet" @click="download(scope.row)" type="primary">下载</el-button>
                <el-button size="mini" class="T-R-B-Grey" @click="handleDelete(scope.row)" type="info">删除</el-button>
                <el-button size="mini" class="T-R-B-Orange" @click="getDetail(scope.row)" type="success">查看详情</el-button>
                <el-button size="mini" class="T-R-B-Cyan" @click="upload(scope.row)" type="primary">上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"
        -->
        <el-pagination
          class="page-end"
          @size-change="handleSizeChange()"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre()"
          @next-click="next()"
          @current-change="handleCurrentChange()"
          hide-on-single-page
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
    <!--新增-->
    <el-dialog title="安全技术交底" :visible.sync="dialogFormVisible" width="500px" :center="true" top="0vh">
      <el-form :model="form">
        <el-form-item label="施工单位">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="交底部位">
          <el-input v-model="form.tellAbstract"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-input v-model="form.workType"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input type="textarea" :rows="6" placeholder="请输入交底内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input type="textarea" :rows="6" placeholder="请输入针对性交底" v-model="form.aimContent"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="交底人" style="width:200px;float:left">
            <el-input v-model="form.tellPerson"></el-input>
          </el-form-item>
          <el-form-item label="职务" style="width:200px;float:right">
            <el-input v-model="form.tellPerson"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="接收人" style="width:200px;float:left">
            <el-input v-model="form.reciveTell"></el-input>
          </el-form-item>
          <el-form-item label="职务" style="width:200px;float:right">
            <el-input v-model="form.tellPerson"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel-style">取 消</el-button>
        <el-button type="primary" @click="addSkillClick('form')" style="border-radius:18px">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: null, // token
      dialogFormVisible: false,
      // 动态数据
      tableData: [],
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
        company: "",
        tellAbstract: null,
        workType: "",
        content: "",
        aimContent: "",
        tellAbstract: "",
        tellPerson: "",
        reciveTell: ""
      }
    };
  },
  created: function() {
    var result = [
      {
        company: "安保部一",
        userId: 1,
        tellAbstract: "123",
        workType: "瓦工",
        tellPerson: "123",
        duty: "1111",
        reciveDuty: "55555",
        reciveTell: "22222222",
        checkState: "22222222",
        accessory: 2,
        accessory: "444444"
      },
      {
        userId: 2,
        company: "22222222",
        workType: "泥工",
        tellPerson: "44444",
        duty: "5555",
        reciveDuty: "444444",
        breachProject: "44444",
        tellAbstract: "1111",
        reciveTell: "444",
        checkState: 44444,
        accessory: 1,
        accessory: "444444"
      }
    ];
    this.tableData = result;
  },
  method: {
    addSkillClick: function(form) {
      
    },
    skillList: function() {
      // 列表请求
      // 获得搜索的内容
      var company = this.formInline.company;
      var profession = this.formInline.profession;
      var time = this.formInline.time;
      //   // 获得当前用户的id
      // var  uid = sessionStorage.getItem('uid')
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        company: company,
        profession: profession,
        time: time
      });
      var url = "";
      var result = [
        {
          userId: 1,
          projectName: "地铁安保部",
          company: "安保部一",
          breachProject: "部门一",
          tellAbstract: "123",
          tellPerson: "123",
          reciveTell: "22222222",
          checkState: "22222222",
          accessory: 2
        },
        {
          userId: 2,
          projectName: "22222222",
          company: "44444",
          breachProject: "44444",
          tellAbstract: "1111",
          tellPerson: "44444",
          reciveTell: "444",
          checkState: 44444,
          accessory: 1
        }
      ];
      this.tableData = result;
    },
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size; //每页下拉显示数据
      // this.handleUserList()
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.handleUserList(); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    // 下拉框获得值
    selectCompany(vid) {
      let obj = {};
      obj = this.companys.find(item => {
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
    //列表
    selectSkillList() {},
    //删除
    deleteAllClick() {},
    handleDelete(row) {},
    //编辑
    handleEdit(row) {},
    //上传
    upload(row) {},
    //详情
    getDetail(row) {},
    //下载
    download() {},
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId;
        ids.push(id);
      }
      return ids;
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
      // padding: 30px;
    }
  }

  .page-end {
    text-align: center;
  }
}

  .cancel-style{
    border-radius:18px;
    width:80px;
    height:35px;
    background:linear-gradient(180deg,rgba(225,225,225,1) 0%,rgba(190,190,190,1) 100%);
    opacity:1;
  }
</style>

<style lang="stylus">
.el-dialog__header {
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
}
</style>
