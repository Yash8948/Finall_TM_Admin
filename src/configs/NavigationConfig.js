import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
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
  ProfileOutlined
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
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-ecommerce-editProduct',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/12`,
          title: 'sidenav.apps.ecommerce.editProduct',
          icon: '',
          breadcrumb: true,
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
      key: 'client-company',
      path: `${APP_PREFIX_PATH}/client/company`,
      title: 'sidenav.client.company',
      icon: FileUnknownOutlined,
      breadcrumb: true,
      isGroupTitle: true,
      submenu: [
        {
          key: 'docs-changelog',
          path: `${APP_PREFIX_PATH}/client/clientM_Payment`,
          title: 'sidenav.client.clientM_payment',
          icon: ProfileOutlined,
          breadcrumb: true,
          submenu: []
        }
      ]
    },

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
      isGroupTitle: true,
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
  ...settingNavTree,
  ...docsNavTree,

]

export default navigationConfig;
