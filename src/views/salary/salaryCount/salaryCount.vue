<template>
  <div class="container">
    <h3>工资</h3>
    <p style="text-align:left;">
      <span style="color:black;margin-left:20px;">工号：</span>
      <Input style="width:200px;" v-model="searchId" @on-change="init" placeholder="请输入你的工号进行查询"></Input>
      <span style="color:black;margin-left:20px;">姓名：</span>
      <Input style="width:200px;" v-model="searchName" @on-change="init" placeholder="请输入你的姓名进行查询"></Input>
      <Button style="margin:10px 10px;" type="primary" icon="search" @click="find">查找</Button>
      <Button style="margin:10px 0px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <Modal v-model="modal1" title="结算工资" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="工号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入你的工号"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="editForm.name" placeholder="请输入你的姓名"></Input>
        </FormItem>
        <FormItem label="月份" prop="month">
          <Select v-model="editForm.month" placeholder="请选择月份">
            <Option value="2018-3">2018-3</Option>
            <Option value="2018-4">2018-4</Option>
            <Option value="2018-5">2018-5</Option>
          </Select>
        </FormItem>
        <FormItem label="工资类型" prop="salaryType">
          <Select v-model="editForm.salaryType" placeholder="请选择工资类型">
            <Option value="按月度">按月度</Option>
            <Option value="按年度">按年度</Option>
            <Option value="按日">按日</Option>
          </Select>
        </FormItem>
        <FormItem label="计时工资" prop="salaryTime">
          <Input v-model="editForm.salaryTime" placeholder="请输入你的计时工资"></Input>
        </FormItem>
        <FormItem label="提成工资" prop="salaryAdd">
          <Input v-model="editForm.salaryAdd" placeholder="请输入你的提成工资"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Table style="margin:5px;" :columns="col" :data="initTable1" ref="table"></Table>
    <p style="float:right;">
      <a title="1">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">1</span>
      </a>
      <a title="2">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">2</span>
      </a>
      <a title="3">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">3</span>
      </a>
    </p>
    <div class="foot">
      <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究</p>
    </div>
  </div>

</template>
<style>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.container h3 {
  font-size: 24px;
  margin-bottom: 5px;
  display: inline-block;
}
.container p {
  font-size: 18px;
  color: rgb(92, 153, 133);
  margin-top: 5px;
}
.foot {
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  background-color: gray;
  /* 固定在底部的三种方式 */
  /* 方法1：使用CSS绝对定位
     position:absolute;
     bottom:0px;
     left:0px; */
  /* 方法2：使用CSS固定定位 
     position:fixed;
     bottom:0px;
     left:0px;  */
  /* 方法3：使用Float浮动定位(适用于div是body元素的子元素)
     float:right;
     bottom:0px; */
  /* 固定在顶部的三种方式跟这三种没区别，类似 */
}
.foot p {
  display: inline-block;
  color: white;
  height: 50px;
  line-height: 50px;
}
</style>
<script>
import Cookies from "js-cookie";
import table2excel from "@/libs/table2excel.js";
export default {
  data() {
    return {
      searchId: "",
      searchName: "",
      initTable1: [
        {
          index: 1,
          id: "1001",
          name: "张三",
          department: "销售部",
          salary: "2000"
        },
        {
          index: 2,
          id: "1002",
          name: "李四",
          department: "技术部",
          salary: "4000"
        },
        {
          index: 3,
          id: "1003",
          name: "小明",
          department: "技术部",
          salary: "4000"
        },
        {
          index: 4,
          id: "1004",
          name: "小庆",
          department: "开发部",
          salary: "4000"
        }
      ],
      searchArray: [],
      editForm: {
        id: "",
        name: "",
        month: "",
        salaryType: "",
        salaryTime: "",
        salaryAdd: "",
        beizhu: ""
      },
      validate: {
        id: [
          {
            required: true,
            message: "工号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        month: [
          {
            required: true,
            message: "月份不能为空",
            trigger: "blur"
          }
        ],
        salaryType: [
          {
            required: true,
            message: "工资类型不能为空",
            trigger: "blur"
          }
        ],
        salaryTime: [
          {
            required: true,
            message: "计时工资不能为空",
            trigger: "blur"
          }
        ],
        salaryAdd: [
          {
            required: true,
            message: "提成工资不能为空",
            trigger: "blur"
          }
        ],
        beizhu: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      modal2: false,
      excelFileName:"",
      deleteIndex: function() {
        var dataIndex = Cookies.get("deleteIndex");
        for (var i = 0; i < this.data1.length; i++) {
          if (i >= this.data1[dataIndex].index - 1) {
            if (this.data1.length != 1) {
              this.data1[i].index = this.data1[i].index - 1;
            }
          }
        }
      },
      col: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "工号",
          key: "id"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "部门",
          key: "department"
        },
        {
          title: "基本工资",
          key: "salary"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      var data_index = params.index;
                      // Cookies.set("data_index", data_index);

                      // if (data_index == first_index) {
                      //   // this.data1[data_index].name = this.editForm.name;
                      //   this.editForm.id = this.data1[first_index].id;
                      //   this.editForm.name = this.data1[first_index].name;
                      // } else {
                      //   this.editForm.id = this.data1[data_index].id;
                      //   this.editForm.name = this.data1[data_index].name;
                      // }
                      if (this.searchArray.length == 0) {
                        this.editForm.id = this.data1[data_index].id;
                        this.editForm.name = this.data1[data_index].name;
                      } else {
                        this.editForm.id = this.searchArray[data_index].id;
                        this.editForm.name = this.searchArray[data_index].name;
                      }
                      Cookies.set("data_index", data_index);
                      this.test();
                    }
                  }
                },
                "结算工资"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          index: 1,
          id: "1001",
          name: "张三",
          department: "销售部",
          salary: "2000"
        },
        {
          index: 2,
          id: "1002",
          name: "李四",
          department: "技术部",
          salary: "4000"
        },
        {
          index: 3,
          id: "1003",
          name: "小明",
          department: "技术部",
          salary: "4000"
        },
        {
          index: 4,
          id: "1004",
          name: "小庆",
          department: "开发部",
          salary: "4000"
        }
      ]
    };
  },
  methods: {
    exportExcel() {
      table2excel.transform(
        this.$refs.table,
        "hrefToExportTable",
        this.excelFileName
      );
    },
    init() {
      this.initTable1 = this.data1;
      this.searchArray = [];
    },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }
      return res;
    },
    handleSearch1() {
      this.initTable1 = this.data1;
      this.initTable1 = this.search(this.initTable1, {
        id: this.searchId
      });
      this.searchArray = this.initTable1;
    },
    handleSearch2() {
      this.initTable1 = this.data1;
      this.initTable1 = this.search(this.initTable1, {
        name: this.searchName
      });
      this.searchArray = this.initTable1;
    },
    find() {
      if (this.searchId == "" && this.searchName != "") {
        this.handleSearch2();
      } else if (this.searchId != "" && this.searchName == "") {
        this.handleSearch1();
      } else if (this.searchId == "" && this.searchName == "") {
        alert("你要输入工号或姓名其中一个，才能进行搜索哦！");
      } else {
        alert("不能同时输入工号和姓名");
      }
    },
    test() {
      this.modal1 = true;
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.month == "" ||
        this.editForm.salaryType == "" ||
        this.editForm.salaryTime == "" ||
        this.editForm.salaryAdd == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        var index_ = this.initTable1[dataIndex].index - 1;
        if (this.searchArray.length == 0) {
          this.data1[index_].id = this.editForm.id;
          this.data1[index_].name = this.editForm.name;
        } else {
          this.searchArray[dataIndex].id = this.editForm.id;
          this.searchArray[dataIndex].name = this.editForm.name;
        }
        var a = parseInt(this.editForm.salaryTime);
        var b = parseInt(this.editForm.salaryAdd);
        this.$Message.info("结算工资成功");
        Cookies.set("data_index", dataIndex);
        this.$Modal.info({
          title: "结算工资",
          content: `
          结算的工资为:${a + b}`
        });
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
