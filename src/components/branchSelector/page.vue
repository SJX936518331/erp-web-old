<template>
    <div>
        <Button @click="selectBranch">选择分支机构</Button>

        <Modal v-model="modalVisible" title="选择分支机构" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Table :columns="columns" :data="branchs"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'branch',
                branchs: [],
                modalVisible: false,
                columns: [
                    {
                        title: "分支机构编号",
                        key: "code"
                    },
                    {
                        title: "分支机构",
                        key: 'name'
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
                                                this.selectBranchItem(this.branchs[params.index])
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
            selectBranch() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.branchs = data.data
                        console.log(this.branchs)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectBranchItem(branch) {
                console.log('选择了', branch)
                this.modalVisible = false
                this.$emit('select', branch)
            },
            modalOk() {
            },
            modalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
