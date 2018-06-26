import Main from '@/views/Main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    title: "家",
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },

        // 部门
        { path: '/departments/:id', title: '部门详情', name: 'department_detail', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentDetail.vue') },
        { path: '/departments/:id/edit', title: '部门编辑', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentEdit.vue') },
        { path: '/department/add', title: '添加部门', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentEdit.vue') },
        // 员工
        { path: '/employees/:id/edit', title: '员工编辑', name: 'employeeEdit', icon: 'trophy', component: () => import('@/views/renshi/employee/employeeEdit.vue') },
        { path: '/employee/add', title: '添加部门', name: 'departmentAdd', icon: 'ribbon-b', component: () => import('@/views/renshi/employee/employeeEdit.vue') },
        // 角色
        { path: '/roles/:id/edit', title: '角色编辑', name: 'roleEdit', icon: 'trophy', component: () => import('@/views/renshi/roles/roleEdit.vue') },
        { path: '/role/add', title: '添加角色', name: 'roleAdd', icon: 'trophy', component: () => import('@/views/renshi/roles/roleEdit.vue') },
        // 仓库
        { path: '/stores/:id/edit', title: '仓库编辑', name: 'storeEdit', icon: 'trophy', component: () => import('@/views/store/storeEdit.vue') },
        { path: '/store/add', title: '添加仓库', name: 'storeAdd', icon: 'trophy', component: () => import('@/views/store/storeEdit.vue') },
        // 套餐
        { path: '/packages/:id/edit', title: '套餐编辑', name: 'packageEdit', icon: 'man', component: () => import('@/views/shop/packageEdit.vue') },
        { path: '/package/add', title: '添加套餐', name: 'packageAdd', icon: 'man', component: () => import('@/views/shop/packageEdit.vue') },
        // 产品
        { path: '/products/:id/edit', title: '产品编辑', name: 'productEdit', icon: 'man', component: () => import('@/views/shop/productEdit.vue') },
        { path: '/product/add', title: '添加产品', name: 'productAdd', icon: 'man', component: () => import('@/views/shop/productEdit.vue') },
        // 产品分类
        { path: 'product_categories/:id/edit', title: '产品分类编辑', name: 'productCategoryEdit', icon: 'person', component: () => import('@/views/shop/productCategoryEdit.vue') },
        { path: 'product_category//add', title: '添加产品分类', name: 'productCategoryAdd', icon: 'person', component: () => import('@/views/shop/productCategoryEdit.vue') },
        // 公告
        { path: 'notices/:id/edit', title: '公告编辑', name: 'noticeEdit', icon: 'compose', component: () => import('@/views/oa/noticeEdit.vue') },
        // 工资单
        { path: 'wages/:id/edit', title: '工资单编辑', name: 'wageEdit', icon: 'compose', component: () => import('@/views/finance/wageEdit.vue') },
        // 出入库类型
        { path: 'storage_io_types/:id/edit', title: '出入库类型编辑', name: 'storage_io_type_edit', icon: 'information', component: () => import('@/views/store/storageIoTypeEdit.vue') },
        { path: 'storage_io_type/add', title: '添加出入库类型', name: 'storage_io_type_add', icon: 'information', component: () => import('@/views/store/storageIoTypeEdit.vue') },
        // 出入库单
        { path: 'storage_io/add', title: '添加出入库单', name: 'storage_io_add', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        { path: 'storage_ios/:id/edit', title: '出入库单编辑', name: 'storage_io_edit', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        { path: 'storage_ios/:id', title: '出入库单详情', name: 'storage_io_detail', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        //调拨单
        { path: 'storage_move/add', title: '添加调拨单', name: 'storage_move_add', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        { path: 'storage_moves/:id/edit', title: '调拨单编辑', name: 'storage_move_edit', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        { path: 'storage_moves/:id', title: '调拨单详情', name: 'storage_move_detail', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        //盘点单
        { path: 'storage_check/add', title: '添加盘点单', name: 'storage_check_add', icon: 'information', component: () => import('@/views/store/logistics.vue') },
        { path: 'storage_checks/:id/edit', title: '盘点单编辑', name: 'storage_check_edit', icon: 'information', component: () => import('@/views/store/logistics.vue') },
        //物流
        { path: 'logistics/add', title: '添加物流', name: 'logistics_add', icon: 'information', component: () => import('@/views/store/logisticsEdit.vue') },
        { path: 'logisticss/:id/edit', title: '物流编辑', name: 'logistics_edit', icon: 'information', component: () => import('@/views/store/logisticsEdit.vue') },
        // 收支类型
        { path: 'balance_io_types/:id/edit', title: '收支类型', name: 'balanceIoTypeEdit', icon: 'person-stalker', component: () => import('@/views/finance/balanceIoTypeEdit.vue') },
        // 客户
        { path: 'customer_types/:id/edit', title: '客户类型编辑', name: 'customer_types_edit', icon: 'compose', component: () => import('@/views/crm/customerTypeEdit.vue') },
        { path: 'customer_type/add', title: '添加客户类型', name: 'customer_types_add', icon: 'compose', component: () => import('@/views/crm/customerTypeEdit.vue') },
        { path: '/departments/:id', title: '部门详情', name: 'department_detail', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentDetail.vue') },
        { path: '/departments/:id/edit', title: '部门编辑', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentEdit.vue') },
        { path: '/department/add', title: '添加部门', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/renshi/department/departmentEdit.vue') },

        { path: '/branchs/:id/edit', title: '编辑机构分支', name: 'branch_edit', icon: 'ios-pricetags', component: () => import('@/views/renshi/branchs/branch/branchEdit.vue') },
        { path: '/branch/add', title: '添加机构分支', name: 'branch_add', icon: 'ios-pricetags', component: () => import('@/views/renshi/branchs/branch/branchEdit.vue') },

        { path: '/notices/:id/edit', title: '公告编辑', name: 'notice_edit', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/notice/noticeEdit.vue') },
        { path: '/notice/add', title: '添加公告', name: 'notice_add', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/notice/noticeEdit.vue') },

        { path: '/logs/:id/edit', title: '日志编辑', name: 'log_edit', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/log/logEdit.vue') },
        { path: '/log/add', title: '添加日志', name: 'log_add', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/log/logEdit.vue') },

        { path: '/applys/:id/edit', title: '申请编辑', name: 'apply_edit', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/apply/applyEdit.vue') },
        { path: '/apply/add', title: '添加申请', name: 'apply_add', icon: 'ios-pricetags', component: () => import('@/views/officeManeger/apply/applyEdit.vue') },

        { path: '/customer/add', title: '添加客户', name: 'customer_add', icon: 'ios-pricetags', component: () => import('@/views/renshi/customerRelation/customerManagement/customerManagementEdit.vue') },

        { path: '/customerReturn/add', title: '添加回访记录', name: 'customerReturn_add', icon: 'ios-pricetags', component: () => import('@/views/renshi/customerRelation/customerVisits/customerVisit/customerVisit.vue') },
        { path: '/customerReturn/:id/edit', title: '编辑回访记录', name: 'customerReturn_edit', icon: 'ios-pricetags', component: () => import('@/views/renshi/customerRelation/customerVisits/customerVisit/customerVisit.vue') },

        { path: '/balanceType/add', title: '添加收支类型', name: 'balanceType_add', icon: 'ios-pricetags', component: () => import('@/views/financialManagement/balanceType/balanceTypeEdit.vue') },
        { path: '/balanceType/:id/edit', title: '收支类型编辑', name: 'balanceType_edit', icon: 'ios-pricetags', component: () => import('@/views/financialManagement/balanceType/balanceTypeEdit.vue') },

        { path: '/cashBank/add', title: '现金银行', name: 'cashBank_add', icon: 'ios-pricetags', component: () => import('@/views/financialManagement/cashBank/cashBankEdit.vue') },
        { path: '/cashBank/:id/edit', title: '现金银行编辑', name: 'cashBank_edit', icon: 'ios-pricetags', component: () => import('@/views/financialManagement/cashBank/cashBankEdit.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
        ]
    },
    {
        path: '/purchasingSystem',
        icon: 'bag',
        name: 'purchasingSystem',
        title: '采购系统',
        component: Main,
        children: [
            { path: 'plan', title: '采购计划单', name: 'plan', icon: 'information', component: () => import('@/views/purchasingSystem/plan/plan.vue') },
            { path: 'planEdit', title: '采购计划单编辑', name: 'planEdit', icon: 'ribbon-b', component: () => import('@/views/purchasingSystem/planEdit/planEdit.vue') },
            { path: 'dingdan', title: '采购订单', name: 'dingdan', icon: 'ios-book', component: () => import('@/views/purchasingSystem/dingdan/dingdan.vue') },
            { path: 'dingdanEdit', title: '采购订单编辑', name: 'dingdanEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/dingdanEdit/dingdanEdit.vue') },
            { path: 'openBill', title: '采购开单', name: 'openBill', icon: 'ios-book', component: () => import('@/views/purchasingSystem/openBill/openBill.vue') },
            { path: 'openBillEdit', title: '采购开单编辑', name: 'openBillEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/openBillEdit/openBillEdit.vue') },
            { path: 'apportionment', title: '采购费用分摊单', name: 'apportionment', icon: 'ios-book', component: () => import('@/views/purchasingSystem/apportionment/apportionment.vue') },
            { path: 'apportionmentEdit', title: '采购费用分摊单编辑', name: 'apportionmentEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/apportionmentEdit/apportionmentEdit.vue') },
            { path: 'supplier', title: '供应商', name: 'supplier', icon: 'clipboard', component: () => import('@/views/purchasingSystem/supplier/supplier.vue') },
            { path: 'supplierEdit', title: '供应商编辑', name: 'supplierEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/supplierEdit/supplierEdit.vue') },
            { path: 'receiptList', title: '采购收货单', name: 'receiptList', icon: 'clipboard', component: () => import('@/views/purchasingSystem/receiptList/receiptList.vue') },
            { path: 'receiptListEdit', title: '采购收货单编辑', name: 'receiptListEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/receiptListEdit/receiptListEdit.vue') },
            { path: 'purchaseOrder', title: '请购单', name: 'purchaseOrder', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchaseOrder/purchaseOrder.vue') },
            { path: 'purchaseOrderEdit', title: '请购单编辑', name: 'purchaseOrderEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/purchaseOrderEdit/purchaseOrderEdit.vue') }
        ]
    },
    {
        path: '/salesSystem',
        icon: 'ios-briefcase',
        name: 'salesSystem',
        title: '销售系统',
        component: Main,
        children: [
            { path: 'salesOrder', title: '销售单', name: 'salesOrder', icon: 'information', component: () => import('@/views/salesSystem/salesOrder/salesOrder.vue') },
            { path: 'salesOrderEdit', title: '销售单编辑', name: 'salesOrderEdit', icon: 'edit', component: () => import('@/views/salesSystem/salesOrderEdit/salesOrderEdit.vue') },
            { path: 'salesOrderDetail', title: '销售单详情', name: 'salesOrderDetail', icon: 'android-clipboard', component: () => import('@/views/salesSystem/salesOrderDetail/salesOrderDetail.vue') },
            { path: 'salesBilling', title: '销售开单', name: 'salesBilling', icon: 'document-text', component: () => import('@/views/salesSystem/salesBilling/salesBilling.vue') },
            { path: 'salesBillingEdit', title: '销售开单编辑', name: 'salesBillingEdit', icon: 'edit', component: () => import('@/views/salesSystem/salesBillingEdit/salesBillingEdit.vue') },
            { path: 'salesBillingDetail', title: '销售开单编辑', name: 'salesBillingDetail', icon: 'edit', component: () => import('@/views/salesSystem/salesBillingDetail/salesBillingDetail.vue') },
            { path: 'salesReceivables', title: '销售收款', name: 'salesReceivables', icon: 'ios-redo', component: () => import('@/views/salesSystem/salesReceivables/salesReceivables.vue') },
            { path: 'performanceTable', title: '业务员业绩表', name: 'performanceTable', icon: 'android-list', component: () => import('@/views/salesSystem/performanceTable/performanceTable.vue') },
            { path: 'saleDaily', title: '销售日报', name: 'saleDaily', icon: 'android-clipboard', component: () => import('@/views/salesSystem/saleDaily/saleDaily.vue') },
            { path: 'productYearSalesCount', title: '产品年度销售统计', name: 'productYearSalesCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/productYearSalesCount/productYearSalesCount.vue') },
            { path: 'shopYearSalesCount', title: '店铺年度销售统计', name: 'shopYearSalesCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/shopYearSalesCount/shopYearSalesCount.vue') },
            { path: 'allShopCount', title: '所有店铺业务统计', name: 'allShopCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/allShopCount/allShopCount.vue') }
        ]
    },
    {
        path: '/store',
        icon: 'home',
        name: 'store',
        title: '仓库系统',
        component: Main,
        children: [
            { path: 'warehouseManage', title: '仓库管理', name: 'warehouseManage', icon: 'home', component: () => import('@/views/store/store.vue') },
            { path: 'stock', title: '库存查询', name: 'stock', icon: 'home', component: () => import('@/views/store/stock.vue') },
            // { path: 'stock/merge', title: '库存查询', name: 'stock', icon: 'home', component: () => import('@/views/store/stock.vue') },

            { path: 'storage_io', title: '出入库单', name: 'storage_io', icon: 'information', component: () => import('@/views/store/storageIo.vue') },
            { path: 'storage_move', title: '调拨单', name: 'storage_move', icon: 'information', component: () => import('@/views/store/storageMove.vue') },
            { path: 'storage_check', title: '盘点单', name: 'storage_check', icon: 'information', component: () => import('@/views/store/storageCheck.vue') },
            { path: 'storage_io_type', title: '出入库类型', name: 'storage_io_type', icon: 'information', component: () => import('@/views/store/storageIoType.vue') },
            { path: 'logistics', title: '物流', name: 'logistics', icon: 'information', component: () => import('@/views/store/logistics.vue') },

            { path: 'allocationListEdit', title: '调拨单编辑', name: 'allocationListEdit', icon: 'edit', component: () => import('@/views/store/allocationListEdit/allocationListEdit.vue') },
            { path: 'reportLoss', title: '报损单', name: 'reportLoss', icon: 'information', component: () => import('@/views/store/reportLoss/reportLoss.vue') },
            { path: 'reportLossEdit', title: '报损单编辑', name: 'reportLossEdit', icon: 'edit', component: () => import('@/views/store/reportLossEdit/reportLossEdit.vue') },
            { path: 'priceList', title: '调价单', name: 'priceList', icon: 'information', component: () => import('@/views/store/priceList/priceList.vue') },
            { path: 'priceListEdit', title: '调价单编辑', name: 'priceListEdit', icon: 'edit', component: () => import('@/views/store/priceListEdit/priceListEdit.vue') },
            { path: 'outboundOrder', title: '出库单', name: 'outboundOrder', icon: 'information', component: () => import('@/views/store/outboundOrder/outboundOrder.vue') },
            { path: 'outboundOrderDetail', title: '出库单详情', name: 'outboundOrderDetail', icon: 'android-clipboard', component: () => import('@/views/store/outboundOrderDetail/outboundOrderDetail.vue') },
            { path: 'outboundOrderEdit', title: '出库单编辑', name: 'outboundOrderEdit', icon: 'edit', component: () => import('@/views/store/outboundOrderEdit/outboundOrderEdit.vue') },
            { path: 'inboundOrderDetail', title: '入库单详情', name: 'inboundOrderDetail', icon: 'android-clipboard', component: () => import('@/views/store/inboundOrderDetail/inboundOrderDetail.vue') },
            { path: 'inboundOrderEdit', title: '入库单编辑', name: 'inboundOrderEdit', icon: 'edit', component: () => import('@/views/store/inboundOrderEdit/inboundOrderEdit.vue') },
        ]
    },
    {
        path: '/renshi',
        icon: 'ios-people',
        name: 'renshi',
        title: '集团管理',
        component: Main,
        children: [
            { path: 'branch', title: '分支机构', name: 'branch', icon: 'compose', component: () => import('@/views/renshi/branchs/branch/branch.vue') },
            { path: 'companyInfo', title: '公司信息', name: 'companyInfo', icon: 'compose', component: () => import('@/views/renshi/companyInfo/companyInfo.vue') },
            { path: 'companies', title: '公司', name: 'company', icon: 'ribbon-b', component: () => import('@/views/renshi/company.vue') },
            { path: 'department', title: '部门', name: 'department', icon: 'ribbon-b', component: () => import('@/views/renshi/department/department.vue') },
            { path: 'employee', title: '员工', name: 'employee', icon: 'trophy', component: () => import('@/views/renshi/employee/employee.vue') },
            { path: 'customerManagement', title: '客户管理', name: 'customerManagement', icon: 'ios-pricetags', component: () => import('@/views/renshi/customerRelation/customerManagement/customerManagement.vue') },
            { path: 'customerVisits', title: '客户回访', name: 'customerVisits', icon: 'ios-pricetags', component: () => import('@/views/renshi/customerRelation/customerVisits/customerVisit/customerVisit.vue') },

        ]
    },
    {
        path: '/officeManeger',
        icon: 'ios-people',
        name: 'officeManeger',
        title: '办公管理',
        component: Main,
        children: [
            { path: 'notice', title: '公告', name: 'notice', icon: 'compose', component: () => import('@/views/officeManeger/notice/notice.vue') },
            { path: 'log', title: '日志', name: 'log', icon: 'compose', component: () => import('@/views/officeManeger/log/log.vue') },
            { path: 'apply', title: '申请与审批', name: 'apply', icon: 'compose', component: () => import('@/views/officeManeger/apply/apply.vue') },
        ]
    },
    {
        path: '/oa',
        icon: 'ios-people',
        name: 'oa',
        title: '办公',
        component: Main,
        children: [
            { path: 'notices', title: '公告', name: 'notice', icon: 'compose', component: () => import('@/views/oa/notice.vue') },
            { path: 'work_logs', title: '日志', name: 'work_log', icon: 'compose', component: () => import('@/views/oa/workLog.vue') },
            { path: 'applies', title: '申请', name: 'apply', icon: 'compose', component: () => import('@/views/oa/apply.vue') },
        ]
    },
    {
        path: '/customer',
        icon: 'ios-people',
        name: 'customer',
        title: '客户管理',
        component: Main,
        children: [
            { path: 'customers2', title: '客户', name: 'customer2', icon: 'compose', component: () => import('@/views/crm/customer.vue') },
            { path: 'customer_types', title: '客户类型', name: 'customer_types', icon: 'compose', component: () => import('@/views/crm/customerType.vue') },
            { path: 'customer_visits', title: '回访记录', name: 'customer_visits', icon: 'compose', component: () => import('@/views/crm/customerVisit.vue') },
        ]
    },
    {
        path: '/salary',
        icon: 'social-yen',
        name: 'salary',
        title: '工资',
        component: Main,
        children: [
            { path: 'wages', title: '工资单', name: 'wages', icon: 'compose', component: () => import('@/views/finance/wage.vue') },
            { path: 'wage_items', title: '工资汇总查询', name: 'wage_items', icon: 'compose', component: () => import('@/views/finance/wageItem.vue') },
            { path: 'salaryCount', title: '结算工资', name: 'salaryCount', icon: 'compose', component: () => import('@/views/salary/salaryCount/salaryCount.vue') },
            { path: 'salaryDetail', title: '工资记录', name: 'salaryDetail', icon: 'record', component: () => import('@/views/salary/salaryDetail/salaryDetail.vue') }
        ]
    },
    {
        path: '/shop',
        icon: 'bag',
        name: 'shop',
        title: '商场',
        component: Main,
        children: [
            { path: 'package', title: '套餐管理', name: 'package', icon: 'man', component: () => import('@/views/shop/package.vue') },
            { path: 'product', title: '产品管理', name: 'product', icon: 'person', component: () => import('@/views/shop/product.vue') },
            { path: 'product_category', title: '产品分类管理', name: 'productCategory', icon: 'person', component: () => import('@/views/shop/productCategory.vue') },
            { path: 'statistics', title: '销售统计', name: 'statistics', icon: 'stats-bars', component: () => import('@/views/shop/statistics/statistic.vue') }
        ]
    },
    {
        path: '/shouhou',
        icon: 'ios-people',
        name: 'shouhou',
        title: '售后管理',
        component: Main,
        children: [
            { path: 'return', title: '退货单', name: 'return', icon: 'arrow-return-right', component: () => import('@/views/shouhou/return/return.vue') },
            { path: 'repair', title: '维修单', name: 'repair', icon: 'wrench', component: () => import('@/views/shouhou/repair/repair.vue') }
        ]
    },
    {
        path: '/dingdan',
        icon: 'man',
        name: 'dingdan',
        title: '订单管理',
        component: Main,
        children: [
            { path: 'index', title: '订单', name: 'index', icon: 'clipboard', component: () => import('@/views/dingdan/index/index.vue') }
        ]
    },
    {
        path: '/assets',
        icon: 'ios-people',
        name: 'assets',
        title: '固定资产',
        component: Main,
        children: [
            { path: 'asset', title: '固定资产', name: 'asset', icon: 'social-usd-outline', component: () => import('@/views/assets/asset/asset.vue') },
            { path: 'book', title: '明细账本', name: 'book', icon: 'ios-book', component: () => import('@/views/assets/book/book.vue') },
            { path: 'purchase', title: '固定资产购置', name: 'purchase', icon: 'ios-cart', component: () => import('@/views/assets/purchase/purchase.vue') },
            { path: 'sellOff', title: '固定资产变卖', name: 'sellOff', icon: 'compose', component: () => import('@/views/assets/sellOff/sellOff.vue') },
            { path: 'depreciation', title: '固定资产折旧', name: 'depreciation', icon: 'social-codepen', component: () => import('@/views/assets/depreciation/depreciation.vue') }
        ]
    },
    {
        path: '/account',
        icon: 'ios-people',
        name: 'account',
        title: '账户',
        component: Main,
        children: [
            { path: 'acct', title: '账户', name: 'acct', icon: 'person-stalker', component: () => import('@/views/account/acct/acct.vue') },
            // { path: 'acctEdit', title: '账户编辑', name: 'acctEdit', icon: 'compose', component: () => import('@/views/account/acctEdit/acctEdit.vue') }
        ]
    },
    {
        path: '/financialManagement',
        icon: 'ios-people',
        name: 'financialManagement',
        title: '财务管理',
        component: Main,
        children: [
            { path: 'balanceType', title: '收支类型', name: 'balanceType', icon: 'social-yen', component: () => import('@/views/financialManagement/balanceType/balanceType.vue')},
            { path: 'cashBank', title: '现金银行', name: 'cashBank', icon: 'social-yen', component: () => import('@/views/financialManagement/cashBank/cashBank.vue')},
            { path: 'finance_index', title: '往来单位应收付', name: 'finance_index', icon: 'social-yen', component: () => import('@/views/financialManagement/finance_index/index.vue'), },
            { path: 'finance_detail', title: '应收付明细', name: 'finance_detail', icon: 'ios-book', component: () => import('@/views/financialManagement/finance_detail/detail.vue') },
            { path: 'receipt', title: '收款单', name: 'receipt', icon: 'arrow-graph-up-right', component: () => import('@/views/financialManagement/receipt/receiptAdd.vue') },
            { path: 'payment', title: '付款单', name: 'payment', icon: 'arrow-graph-down-right', component: () => import('@/views/financialManagement/payment/paymentAdd.vue') },
            { path: 'wh', title: '入库', name: 'wh', icon: 'reply', component: () => import('@/views/financialManagement/wh/wh.vue') },
            { path: 'warehouse', title: '入库单', name: 'warehouse', icon: 'compose', component: () => import('@/views/financialManagement/warehouse/warehouse.vue') },
            { path: 'ob', title: '出库', name: 'ob', icon: 'forward', component: () => import('@/views/financialManagement/ob/ob.vue') },
            { path: 'outbound', title: '出库单', name: 'outbound', icon: 'compose', component: () => import('@/views/financialManagement/outbound/outbound.vue') },
            { path: 'al', title: '调拨', name: 'al', icon: 'arrow-graph-down-left', component: () => import('@/views/financialManagement/al/al.vue') },
            { path: 'allocation', title: '调拨单', name: 'allocation', icon: 'grid', component: () => import('@/views/financialManagement/allocation/allocation.vue') }
            // { path: 'accounts', title: '会计科目', name: 'accounts', icon: 'person-stalker', component: () => import('@/views/finance/account.vue') },
            // { path: 'balance_in', title: '其他收入单', name: 'balanceIn', icon: 'person-stalker', component: () => import('@/views/finance/balanceIn.vue') },
            // { path: 'balance_out', title: '费用单', name: 'balanceOut', icon: 'person-stalker', component: () => import('@/views/finance/balanceOut.vue') },
            // { path: 'balance_io_types', title: '收支类型', name: 'balanceIoType', icon: 'person-stalker', component: () => import('@/views/finance/balanceIoType.vue') },
            // { path: 'banks', title: '现金银行', name: 'bank', icon: 'person-stalker', component: () => import('@/views/finance/bank.vue') },

            // { path: 'acct', title: '账户', name: 'acct', icon: 'person-stalker', component: () => import('@/views/account/acct/acct.vue') },
            // { path: 'finance_index', title: '往来单位应收付', name: 'finance_index', icon: 'social-yen', component: () => import('@/views/finance/finance_index/index.vue'), },
            // { path: 'finance_detail', title: '应收付明细', name: 'finance_detail', icon: 'ios-book', component: () => import('@/views/finance/finance_detail/detail.vue') },
            // { path: 'receipt', title: '收款单', name: 'receipt', icon: 'arrow-graph-up-right', component: () => import('@/views/finance/receipt/receiptAdd.vue') },
            // { path: 'payment', title: '付款单', name: 'payment', icon: 'arrow-graph-down-right', component: () => import('@/views/finance/payment/paymentAdd.vue') },
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: { i18n: 'international' },
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: { i18n: 'international' }, name: 'international_index', component: () => import('@/views/international/international.vue') }
        ]
    },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
            { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
            { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
        ]
    },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
