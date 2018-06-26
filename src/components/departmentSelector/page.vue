<template>
    <div>
        <Button @click="selectUser">选择部门</Button>

        <Modal v-model="modalVisible" title="选择部门" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="userColumn" :data="departments"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'department',
                departments: [],
                modalVisible: false,
                userColumn: [
                    {
                        title: "员工编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        width: 240,
                    },
                    {
                        title: '职位',
                        key: 'position',
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectUserItem(this.departments[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        props: {
//            onSelect: {
//                type: Function
//            }
        },
        methods: {
            selectUser() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.departments = data.data
                        console.log(this.departments)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                console.log(this.onSelect)
                this.modalVisible = false
//                this.onSelect && this.onSelect(user)
                this.$emit('select', user)
            },
            userModalOk() {
            },
            userModalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
