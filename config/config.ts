// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { winPath } = utils;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY ? { ga: GA_KEY } : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/livings',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: '居住',
              icon: 'home',
              path: '/livings',
              component: './living',
            },
            {
              name: '入住',
              path: '/livings/create/:roomId',
              component: './living/create',
              hideInMenu: true,
            },
            {
              name: '修改',
              path: '/livings/update/:recordId',
              component: './living/update',
              hideInMenu: true,
            },
            {
              name: '详情',
              path: '/livings/detail/:recordId',
              component: './living/detail',
              hideInMenu: true,
            },
            {
              name: '费用',
              icon: 'payCircle',
              path: '/bills',
              component: './bills',
            },
            {
              name: '维修',
              icon: 'tool',
              path: '/repairs',
              component: './repair',
            },
            {
              name: '统计',
              icon: 'barChart',
              path: '/statistics',
              component: './statistics',
            },
            {
              name: '基础结构',
              icon: 'apartment',
              path: '/basic',
              routes: [
                {
                  name: '入住记录',
                  icon: 'smile',
                  path: '/basic/records',
                  component: './basic/records',
                },
                {
                  name: '房间管理',
                  icon: 'smile',
                  path: '/basic/rooms',
                  component: './basic/rooms',
                },
                {
                  name: '区域管理',
                  icon: 'smile',
                  path: '/basic/areas',
                  component: './basic/areas',
                },
                {
                  name: '类型管理',
                  icon: 'smile',
                  path: '/basic/categories',
                  component: './basic/categories',
                },
                {
                  name: '收费规则',
                  icon: 'smile',
                  path: '/basic/charge-rules',
                  component: './basic/chargeRules',
                },
                {
                  name: '费用类型',
                  icon: 'smile',
                  path: '/basic/fee-types',
                  component: './basic/feeTypes',
                },
                {
                  name: '人员明细',
                  icon: 'smile',
                  path: '/basic/people',
                  component: './basic/people',
                },
                {
                  name: '公司明细',
                  icon: 'smile',
                  path: '/basic/companies',
                  component: './basic/companies',
                },
                {
                  name: '续签记录',
                  icon: 'smile',
                  path: '/basic/renews',
                  component: './basic/renews',
                },
                {
                  name: '公司改名',
                  icon: 'smile',
                  path: '/basic/renames',
                  component: './basic/renames',
                },
              ],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
