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
        key: 'dashboard.sales',
        path: `${APP_PREFIX_PATH}/dashboards/sales`,
        component: React.lazy(() => import('views/app-views/dashboards/sales')),
    },
    {
        key: 'dashboard.Task-List',
        path: `${APP_PREFIX_PATH}/dashboards/TaskList`,
        component: React.lazy(() => import('views/app-views/apps/project/scrumboard')),
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
    {
        key: 'docs.documentation',
        path: `${APP_PREFIX_PATH}/docs/documentation/*`,
        component: React.lazy(() => import('views/app-views/docs')),
    }
]