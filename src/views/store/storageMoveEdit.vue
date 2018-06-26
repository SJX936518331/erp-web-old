<template>
  <div>
    <Card class="admin-card" v-if="curObject">
      <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="单号" prop="code">
          <div>{{ curObject.code }}</div>
        </FormItem>
        <FormItem label="调入仓库" prop="in_store_id">
          {{ curObject.in_store_name }}
          <my-inStore-selector @select="onInStoreSelect" />
        </FormItem>
        <FormItem label="调出仓库" prop="out_store_id">
          {{ curObject.out_store_name }}
          <my-outStore-selector @select="onOutStoreSelect" />
        </FormItem>
        <FormItem label="单据类型" prop="bill_type">
          {{ curObject.bill_type }}
          <my-billType-selector @select="onbillTypeSelect" />
        </FormItem>
        <FormItem label="制单人" prop="make_user_name">
          {{ curObject.make_username }}
        </FormItem>
        <FormItem label="制单日期" prop="make_time">
          {{ curObject.make_time }}
        </FormItem>
        <FormItem label="部门" prop="department_id">
          {{ curObject.department_name }}
          <my-department-selector @select="onDepartmentSelect" />
        </FormItem>
        <FormItem label="分支机构" prop="branch_id">
          {{ curObject.branch_name }}
          <!--<my-department-selector @select="onBranchSelect" />-->
        </FormItem>
        <FormItem label="业务员" prop="business_user_id">
          {{ curObject.business_username }}
          <my-user-selector @select="onSelectBusinessUser" />
        </FormItem>

        <div>
          <FormItem label="审核人" prop="check_user_id">
            {{ curObject.check_username }}
          </FormItem>
          <FormItem label="审核时间" prop="check_time">
            {{ curObject.check_time }}
          </FormItem>
        </div>
        <FormItem label="摘要" prop="note">
          <Input v-model="curObject.note" placeholder=""></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save">保存</Button>
          <Button @click="check">审核</Button>
          <Button type="ghost">取消</Button>
        </FormItem>
      </Form>
    </Card>

    <Card class="admin-card" v-if="curObjectId">
      <div class="admin-card-title" slot="title">
        调拨商品
      </div>
      <div class="admin-tool-bar">
        <div class="tool-left">
        </div>
        <div class="tool-right">
          <my-product-selector @select="onProductSelect" />
        </div>
      </div>
      <my-table v-model="items" :columns-list="columns" :editIncell="true" ref="table"></my-table>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelName: "storage_move",
      curObjectId: null,
      curObject: null,
      validate: {
        // make_time: [
        //   {
        //     required: true,
        //     message: "日期不能为空",
        //     trigger: "storage_io_type_id"
        //   }
        // ],
        in_store_id: [
          {
            required: true,
            message: "调入仓库不能为空",
            trigger: "in_store"
          }
        ],
        out_store_id: [
          {
            required: true,
            message: "调出仓库不能为空",
            trigger: "out_store"
          }
        ],
        business_user_id: [
          {
            required: true,
            message: "业务员不能为空",
            trigger: "title"
          }
        ],
        department_id: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "content"
          }
        ],
        bill_type: [
          {
            required: true,
            message: "请选择单据类型",
            trigger: "bill_type"
          }
        ]
      },
      types: [],

      columns: [
        {
          title: "产品编号",
          key: "id"
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "规格",
          key: "product_spec"
        },
        {
          title: "单位",
          key: "unit"
        },
        {
          title: "调拨数量",
          key: "number",
          editable: true
        },
        {
          title: "单价",
          key: "price",
          editable: true
        },
        {
          title: "金额",
          key: "price",
          render: (h, params) => {
            let item = this.items[params.index];
            return h("div", item.number * item.price);
          }
        },
        {
          title: "备注",
          key: "note",
          editable: true
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
                      this.saveItem(this.items[params.index], params.index);
                    }
                  }
                },
                "保存"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeItem(this.items[params.index], params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.curObjectId = this.$route.params.id;
      if (!this.curObjectId) {
        this.curObject = {
          department_id: "",
          department_name: "",
          business_user_id: "",
          business_username: "",
          make_username: "",
          make_time: "2018-3-21 10:22:33",
          bill_type: "",
          branch_id: this.$util.getBranch().id,
          branch_name: this.$util.getBranch().name
        };
        return;
      }
      this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
        response => {
          let data = response.data;
          this.curObject = data.data;
          this.items = this.curObject.items;
          console.log(this.curObject);
        },
        response => {
          console.log(response);
        }
      );
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$Message.error("请完善表单");
          return;
        }
        // this.curObject.check_user_id = 1;
        // this.curObject.branch_id = 1;
        let url = this.curObjectId
          ? `/${this.modelName}/update`
          : `/${this.modelName}/add`;
        this.$http.post(url, this.curObject).then(
          response => {
            this.$Message.success("保存成功");
            this.$router.replace(`/storage_moves/${response.data.data}/edit`);
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    check() {
      this.$http.post(`/${this.modelName}/check?id=${this.curObjectId}`).then(
        response => {
          this.$Message.success("审核成功");
          this.getData();
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    },
    onInStoreSelect(in_store) {
      this.curObject.in_store_id = in_store.code;
      this.curObject.in_store_name = in_store.name;
    },
    onOutStoreSelect(out_store) {
      this.curObject.out_store_id = out_store.code;
      this.curObject.out_store_name = out_store.name;
    },
    onbillTypeSelect(billType) {
      // this.curObject.code = billType.code;
      this.curObject.make_user_id = billType.id;
      this.curObject.check_user_id = billType.id;
      this.curObject.code =  billType.id;
      this.curObject.branch_id = billType.id;
      this.curObject.bill_type = billType.name;
    },
    onDepartmentSelect(department) {
      console.log("选择了部门", department);
      this.curObject.department_id = department.id;
      this.curObject.department_name = department.name;
    },
    onBranchSelect(branch) {
      this.curObject.branch_id = branch.id;
      this.curObject.branch_name = branch.name;
    },
    onSelectBusinessUser(user) {
      console.log(this);
      console.log("选择了2", user);
      this.curObject.business_user_id = user.id;
      this.curObject.business_username = user.name;
    },
    onProductSelect(obj) {
      console.log("选择了2", obj);
      this.$http
        .post(`/storage_move_item/add`, {
          storage_io_id: this.curObjectId,
          sku_id: obj.sku.id,
          number: 1,
          note: "",
          price: obj.product.price
        })
        .then(
          response => {
            this.getData();
          },
          response => {
            console.log(response);
          }
        );
    },
    saveItem(item, index) {
      console.log("保存", item);
      this.$http
        .post(`/storage_io_item/update`, {
          id: item.id,
          sku_id: item.sku_id,
          number: item.number,
          note: item.note,
          price: item.price
        })
        .then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            console.log(response);
          }
        );
    },
    removeItem(item, index) {
      this.$http.post(`/storage_move_io/remove?id=` + item.id).then(
        response => {
          this.getData();
        },
        response => {
          console.log(response);
        }
      );
    }
  }
};
</script>
