import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  ReconciliationOutlined,
  SafetyOutlined,
  StopOutlined,
  HddOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  FileUnknownOutlined,
  ProfileOutlined,
  LoginOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  FileProtectOutlined,
  TeamOutlined,
  SnippetsOutlined
} from '@ant-design/icons';

import { MdPayment } from 'react-icons/md'
import { APP_PREFIX_PATH } from 'configs/AppConfig'


const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboards-default',
      path: `${APP_PREFIX_PATH}/dashboards/default`,
      title: 'sidenav.dashboard.default',
      icon: DashboardOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-analytic',
      path: `${APP_PREFIX_PATH}/dashboards/analytic`,
      title: 'sidenav.dashboard.analytic',
      icon: DotChartOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-Sales',
      path: `${APP_PREFIX_PATH}/dashboards/sales`,
      title: 'sidenav.dashboard.sales',
      icon: FundOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-task',
      path: `${APP_PREFIX_PATH}/dashboards/task`,
      title: 'sidenav.dashboard.task',
      icon: FileDoneOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'dashboards-task-tasklist',
          path: `${APP_PREFIX_PATH}/dashboards/task/tasklist`,
          title: 'sidenav.dashboard.task.tasklist',
          icon: UnorderedListOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'dashboards-task-taskAdd',
          path: `${APP_PREFIX_PATH}/dashboards/task/taskadd`,
          title: 'sidenav.dashboard.task.taskadd',
          icon: PlusCircleOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'dashboards-task-taskOnBoard',
          path: `${APP_PREFIX_PATH}/dashboards/task/taskonboard`,
          title: 'sidenav.dashboard.task.taskonboard',
          icon: DesktopOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'dashboards-task-taskreports',
          path: `${APP_PREFIX_PATH}/dashboards/task/taskreports`,
          title: 'sidenav.dashboard.task.taskreports',
          icon: InfoCircleOutlined,
          breadcrumb: true,
          submenu: []
        },
      ]
    },
    {
      key: 'dashboards-fileManager',
      path: `${APP_PREFIX_PATH}/dashboards/file_manager`,
      title: 'sidenav.dashboard.fileManager',
      icon: FileProtectOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'dashboards-employees',
      path: `${APP_PREFIX_PATH}/dashboards/employees`,
      title: 'sidenav.dashboard.employees',
      icon: TeamOutlined,
      breadcrumb: true,
      submenu: []
    },

  ]
}]

const appsNavTree = [{
  key: 'apps',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.apps',
  icon: AppstoreOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'apps-mail',
      path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
      title: 'sidenav.apps.mail',
      icon: MailOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'apps-chat',
      path: `${APP_PREFIX_PATH}/apps/chat`,
      title: 'sidenav.apps.chat',
      icon: MessageOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'apps-calendar',
      path: `${APP_PREFIX_PATH}/apps/calendar`,
      title: 'sidenav.apps.calendar',
      icon: CalendarOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'apps-project',
      path: `${APP_PREFIX_PATH}/apps/project`,
      title: 'sidenav.apps.project',
      icon: BulbOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'apps-project-list',
          path: `${APP_PREFIX_PATH}/apps/project/list`,
          title: 'sidenav.apps.project.list',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-project-scrumboard',
          path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
          title: 'sidenav.apps.project.scrumboard',
          icon: '',
          breadcrumb: true,
          submenu: []
        }
      ]
    },
    {
      key: 'apps-ecommerce',
      path: `${APP_PREFIX_PATH}/apps/ecommerce`,
      title: 'sidenav.apps.ecommerce',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'apps-ecommerce-productList',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
          title: 'sidenav.apps.ecommerce.productList',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-ecommerce-addProduct',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
          title: 'sidenav.apps.ecommerce.addProduct',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'apps-ecommerce-editProduct',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/12`,
          title: 'sidenav.apps.ecommerce.editProduct',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'apps-ecommerce-orders',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
          title: 'sidenav.apps.ecommerce.orders',
          icon: '',
          breadcrumb: true,
          submenu: []
        }
      ]
    }
  ]
}]

const docsNavTree = [{
  key: 'docs',
  path: `${APP_PREFIX_PATH}/docs`,
  title: 'sidenav.docs',
  icon: BookOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'docs-documentation',
      path: `${APP_PREFIX_PATH}/docs/documentation`,
      title: 'sidenav.docs.documentation',
      icon: FileUnknownOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'docs-changelog',
      path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
      title: 'sidenav.docs.changelog',
      icon: ProfileOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}]
const clientNavTree = [{
  key: 'client',
  path: `${APP_PREFIX_PATH}/client`,
  title: 'sidenav.client',
  icon: BookOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
        {
          key: 'client_list',
          path: `${APP_PREFIX_PATH}/client/list`,
          title: 'sidenav.client.list',
          icon: HomeOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'client_company',
          path: `${APP_PREFIX_PATH}/client/company`,
          title: 'sidenav.client.company',
          icon: HomeOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'client_manual_payment',
          path: `${APP_PREFIX_PATH}/client/manual_payment`,
          title: 'sidenav.client.manual_payment',
          icon: DollarCircleOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'client_password',
          path: `${APP_PREFIX_PATH}/client/password`,
          title: 'sidenav.client.password',
          icon: ProfileOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'client_login_detail',
          path: `${APP_PREFIX_PATH}/client/login_details`,
          title: 'sidenav.client.login_details',
          icon: LoginOutlined ,
          breadcrumb: true,
          submenu: []
        },
  ]
}]
const paymentNavTree = [{
  key: 'payment',
  path: `${APP_PREFIX_PATH}/payment`,
  title: 'sidenav.payment',
  icon: DollarCircleOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'payment-Receipt',
      path: `${APP_PREFIX_PATH}/payment/receipt`,
      title: 'sidenav.payment.receipt',
      icon: ReconciliationOutlined ,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'payment-invoice',
      path: `${APP_PREFIX_PATH}/payment/invoice`,
      title: 'sidenav.payment.invoice',
      icon: DollarCircleOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'payment-invoicelist',
          path: `${APP_PREFIX_PATH}/payment/invoice_list`,
          title: 'sidenav.payment.invoice_list',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'payment-custom_invoice',
          path: `${APP_PREFIX_PATH}/payment/custom_invoice`,
          title: 'sidenav.payment.custom_invoice',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
      ]
    },
   

  ]
}]




const leaveNavTree =[{
  key: 'leave',
  path: `${APP_PREFIX_PATH}/leave`,
  title:  'sidenav.leaves',
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'leave',
      path: `${APP_PREFIX_PATH}/leave`,
      title: 'sidenav.leaves.leave',
      icon: FileTextOutlined ,
      breadcrumb: true,
      isGroupTitle: false,
      submenu: [
        {
          key: 'leave-admin',
          path: `${APP_PREFIX_PATH}/leave/AdminLeave`,
          title: 'sidenav.leaves.adminleave',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        { 
          key: 'leave-employeeleave',
          path: `${APP_PREFIX_PATH}/leave/Employeeleave`,
          title: 'sidenav.leaves.employeeleave',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        { 
          key: 'leave-manageHoliday',
          path: `${APP_PREFIX_PATH}/leave/manageHoliday`,
          title: 'sidenav.leaves.manageholiday',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        


      ]
    }

  ]
}]
const reportsNavTree = [{
  key: 'reports',
  path: `${APP_PREFIX_PATH}/reports`,
  title: 'sidenav.reports',
  icon: SnippetsOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'reports',
      path: `${APP_PREFIX_PATH}/reports`,
      title: 'sidenav.reports',
      icon: SnippetsOutlined,
      breadcrumb: true,
      isGroupTitle: false,
      submenu: [
        {
          key: 'reports-performance',
          path: `${APP_PREFIX_PATH}/reports/performance`,
          title: 'sidenav.reports.performance',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'reports-due',
          path: `${APP_PREFIX_PATH}/reports/due_report`,
          title: 'sidenav.reports.due',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'reports-attendancelog',
          path: `${APP_PREFIX_PATH}/reports/attendance_log`,
          title: 'sidenav.reports.attendancelog',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'reports-attendancereport',
          path: `${APP_PREFIX_PATH}/reports/attendance_report`,
          title: 'sidenav.reports.attendancereport',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'reports-gst',
          path: `${APP_PREFIX_PATH}/reports/gst_report`,
          title: 'sidenav.reports.gst',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
      ]
    }

  ]


}]
const settingNavTree = [{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/settings`,
  title: 'sidenav.settings',
  icon: SettingOutlined,
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'settings',
      path: `${APP_PREFIX_PATH}/settings`,
      title: 'sidenav.settings',
      icon: SettingOutlined,
      breadcrumb: true,
      isGroupTitle: false,
      submenu: [
        {
          key: 'settings-payment',
          path: `${APP_PREFIX_PATH}/settings/payment`,
          title: 'sidenav.settings.payment',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-expences',
          path: `${APP_PREFIX_PATH}/settings/expences`,
          title: 'sidenav.settings.expences',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-sms',
          path: `${APP_PREFIX_PATH}/settings/smsconfig`,
          title: 'sidenav.settings.sms',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-noti',
          path: `${APP_PREFIX_PATH}/settings/notifiactionconfig`,
          title: 'sidenav.settings.noti',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-testing',
          path: `${APP_PREFIX_PATH}/settings/testing`,
          title: 'sidenav.settings.testing',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-depart',
          path: `${APP_PREFIX_PATH}/settings/department`,
          title: 'sidenav.settings.depart',
          icon: "",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'settings-vault',
          path: `${APP_PREFIX_PATH}/settings/vaultM`,
          title: 'sidenav.settings.vault',
          icon: "",
          breadcrumb: true,
          submenu: []
        },

      ]
    }

  ]


}]


const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...clientNavTree,
  ...paymentNavTree,
  ...leaveNavTree,
  ...reportsNavTree,
  ...settingNavTree,
  ...docsNavTree,


]

export default navigationConfig;
