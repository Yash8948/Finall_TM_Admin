import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/dashboards/analytic`,
        component: React.lazy(() => import('views/app-views/dashboards/analytic')),
    },
    {
        key: 'dashboard.task-taskList',
        path: `${APP_PREFIX_PATH}/dashboards/task/tasklist`,
        component: React.lazy(() => import('views/app-views/dashboards/Task/TaskList')),
    },
    {
        key: 'dashboard.task-taskAdd',
        path: `${APP_PREFIX_PATH}/dashboards/task/taskadd`,
        component: React.lazy(() => import('views/app-views/dashboards/Task/taskadd')),
    },
    {
        key: 'dashboard.task-taskOnBoard',
        path: `${APP_PREFIX_PATH}/dashboards/task/TaskOnBoard`,
        component: React.lazy(() => import('views/app-views/dashboards/Task/taskonboard')),
    },
    {
        key: 'dashboard.task-reports',
        path: `${APP_PREFIX_PATH}/dashboards/task/taskreports`,
        component: React.lazy(() => import('views/app-views/dashboards/Task/taskreports')),
    },
    {
        key: 'dashboard.sales',
        path: `${APP_PREFIX_PATH}/dashboards/sales`,
        component: React.lazy(() => import('views/app-views/dashboards/sales')),
    },
    {
        key: 'dashboard.employees',
        path: `${APP_PREFIX_PATH}/dashboards/employees`,
        component: React.lazy(() => import('views/app-views/dashboards/employees/index')),
    },
    {
        key: 'dashboard.employees',
        path: `${APP_PREFIX_PATH}/dashboards/employees/add_employee`,
        component: React.lazy(() => import('views/app-views/dashboards/employees/AddEmployeeForm')),
    },
    {
        key: 'dashboard.fileManager',
        path: `${APP_PREFIX_PATH}/dashboards/file_manager`,
        component: React.lazy(() => import('views/app-views/dashboards/file-manager')),
    },
    {
        key: 'dashboard.fileManager',
        path: `${APP_PREFIX_PATH}/dashboards/file_manager/view_dispatch_file`,
        component: React.lazy(() => import('views/app-views/dashboards/file-manager/ViewDispatchFile')),
    },
    {
        key: 'dashboard.fileManager',
        path: `${APP_PREFIX_PATH}/dashboards/file_manager/add_file_location`,
        component: React.lazy(() => import('views/app-views/dashboards/file-manager/ManageLocation')),
    },
    {
        key: 'dashboard.fileManager',
        path: `${APP_PREFIX_PATH}/dashboards/file_manager/add_location`,
        component: React.lazy(() => import('views/app-views/dashboards/file-manager/add-location/AddLocation')),
    },
    {
        key: 'dashboard.addfile',
        path: `${APP_PREFIX_PATH}/dashboards/file_manager/addfile`,
        component: React.lazy(() => import('views/app-views/dashboards/file-manager/AddFile')),
    },
    {
        key: 'apps',
        path: `${APP_PREFIX_PATH}/apps`,
        component: React.lazy(() => import('views/app-views/apps')),
    },
    {
        key: 'apps.mail',
        path: `${APP_PREFIX_PATH}/apps/mail/*`,
        component: React.lazy(() => import('views/app-views/apps/mail')),
    },
    {
        key: 'apps.chat',
        path: `${APP_PREFIX_PATH}/apps/chat/*`,
        component: React.lazy(() => import('views/app-views/apps/chat')),
    },
    {
        key: 'apps.calendar',
        path: `${APP_PREFIX_PATH}/apps/calendar`,
        component: React.lazy(() => import('views/app-views/apps/calendar')),
    },
    {
        key: 'apps.project',
        path: `${APP_PREFIX_PATH}/apps/project`,
        component: React.lazy(() => import('views/app-views/apps/project')),
    },
    {
        key: 'apps.project.list',
        path: `${APP_PREFIX_PATH}/apps/project/list`,
        component: React.lazy(() => import('views/app-views/apps/project/project-list/ProjectList')),
    },
    {
        key: 'apps.project.scrumboard',
        path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
        component: React.lazy(() => import('views/app-views/apps/project/scrumboard')),
    },
    {
        key: 'apps.ecommerce',
        path: `${APP_PREFIX_PATH}/apps/ecommerce`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce')),
    },
    {
        key: 'apps.ecommerce.add-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/add-product')),
    },
    {
        key: 'apps.ecommerce.edit-product',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/:id`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/edit-product')),
    },
    {
        key: 'apps.ecommerce.product-list',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/product-list')),
    },
    {
        key: 'apps.ecommerce.orders',
        path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
        component: React.lazy(() => import('views/app-views/apps/e-commerce/orders')),
    },
    // ========================== Payments ===========================//

    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/receipt`,
        component: React.lazy(() => import('views/app-views/payment/receipt/index')),
    },
    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/receipt/addreceiptform`,
        component: React.lazy(() => import('views/app-views/payment/receipt/addReceiptForm')),
    },
    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/invoice_list`,
        component: React.lazy(() => import('views/app-views/payment/invoice-list/index')),
    },
    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/add_invoice`,
        component: React.lazy(() => import('views/app-views/payment/invoice-list/AddNewInvoice')),
    },
    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/custom_invoice`,
        component: React.lazy(() => import('views/app-views/payment/custom-invoice/index')),
    },
    {
        key: 'payment',
        path: `${APP_PREFIX_PATH}/payment/addcustom_invoice`,
        component: React.lazy(() => import('views/app-views/payment/custom-invoice/addcutomInvoice')),
    },

    // ==========================leave ===========================//

    {
        key: 'leave',
        path: `${APP_PREFIX_PATH}/leave/adminleave`,
        component: React.lazy(() => import('views/app-views/leave/AdminLeave/index')),
    },
    {
        key: 'leave',
        path: `${APP_PREFIX_PATH}/leave/addadminleave`,
        component: React.lazy(() => import('views/app-views/leave/AdminLeave/addAdminLeave')),
    },
    {
        key: 'leave',
        path: `${APP_PREFIX_PATH}/leave/employeeleave`,
        component: React.lazy(() => import('views/app-views/leave/EmployeeLeave/index')),
    },
    {
        key: 'leave',
        path: `${APP_PREFIX_PATH}/leave/manageHoliday`,
        component: React.lazy(() => import('views/app-views/leave/ManageHoliday/index')),
    },
    {
        key: 'leave',
        path: `${APP_PREFIX_PATH}/leave/addmanageHoliday`,
        component: React.lazy(() => import('views/app-views/leave/ManageHoliday/manageHoliday')),
    },

    // ========================== Reports ===========================//
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/performance`,
        component: React.lazy(() => import('views/app-views/reports/performance/index')),
    },
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/due_report`,
        component: React.lazy(() => import('views/app-views/reports/due/index')),
    },
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/attendance_log`,
        component: React.lazy(() => import('views/app-views/reports/attendance-log/index')),
    },
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/attendance_report`,
        component: React.lazy(() => import('views/app-views/reports/attendance-report/index')),
    },
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/gst_report`,
        component: React.lazy(() => import('views/app-views/reports/gst/index')),
    },
    {
        key: 'reports',
        path: `${APP_PREFIX_PATH}/reports/attendance_log/add_attendance`,
        component: React.lazy(() => import('views/app-views/reports/attendance-log/AddAttendanceForm')),
    },

    // ==========================settings ===========================//
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/payment`,
        component: React.lazy(() => import('views/app-views/settings/payment/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/expences`,
        component: React.lazy(() => import('views/app-views/settings/expences/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/smsconfig`,
        component: React.lazy(() => import('views/app-views/settings/smsconfig/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/notifiactionconfig`,
        component: React.lazy(() => import('views/app-views/settings/notificationconfig/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/department`,
        component: React.lazy(() => import('views/app-views/settings/department/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/vaultM`,
        component: React.lazy(() => import('views/app-views/settings/vaultM/index')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/settings/addvaultmanger`,
        component: React.lazy(() => import('views/app-views/settings/vaultM/AddVaultManager')),
    },
    //clients
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/list`,
        component: React.lazy(() => import('views/app-views/client/client-list/index')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/company`,
        component: React.lazy(() => import('views/app-views/client/company/index')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/manual_payment`,
        component: React.lazy(() => import('views/app-views/client/clientM_payment/index')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/password`,
        component: React.lazy(() => import('views/app-views/client/client-password/index')),
    },


    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/login_details`,
        component: React.lazy(() => import('views/app-views/client/client-loginDetails/index')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/addclientform`,
        component: React.lazy(() => import('views/app-views/client/client-list/AddClientForm')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/addadmin_company`,
        component: React.lazy(() => import('views/app-views/client/company/AddAdminCo')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/manage_group`,
        component: React.lazy(() => import('views/app-views/client/company/ManageGroup')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/Add_company_group`,
        component: React.lazy(() => import('views/app-views/client/company/manage-group/AddCompanyGroup')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/manage_comments`,
        component: React.lazy(() => import('views/app-views/client/company/manage-comments/index')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client/add_comment`,
        component: React.lazy(() => import('views/app-views/client/company/manage-comments/ManageCommentsForm')),
    },
    {
        key: 'docs.documentation',
        path: `${APP_PREFIX_PATH}/docs/documentation/*`,
        component: React.lazy(() => import('views/app-views/docs')),
    }
]