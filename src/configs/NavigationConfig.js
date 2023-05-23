import { 
  DashboardOutlined, 
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
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
  UnorderedListOutlined,
  FileUnknownOutlined,
  ProfileOutlined
} from '@ant-design/icons';


import { APP_PREFIX_PATH } from 'configs/AppConfig'


const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
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
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-Sales',
      path: `${APP_PREFIX_PATH}/dashboards/sales`,
      title: 'sidenav.dashboard.sales',
      icon: FundOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-Task-List',
      path: `${APP_PREFIX_PATH}/dashboards/TaskList`,
      title: 'sidenav.dashboard.TaskList',
      icon: UnorderedListOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]
const appsNavTree = [{
  key: 'apps',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.apps',
  icon: AppstoreOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'apps-mail',
      path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
      title: 'sidenav.apps.mail',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-chat',
      path: `${APP_PREFIX_PATH}/apps/chat`,
      title: 'sidenav.apps.chat',
      icon: MessageOutlined,
      breadcrumb: false,
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
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'apps-project-scrumboard',
          path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
          title: 'sidenav.apps.project.scrumboard',
          icon: '',
          breadcrumb: false,
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
          breadcrumb: false,
          submenu: []
        }
      ]
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  
]

export default navigationConfig;
