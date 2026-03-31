import { createRouter, createWebHistory } from 'vue-router'
import { AccessEnum } from '@/access/accessEnum'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserProfilePage from '@/pages/user/UserProfilePage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import PictureDetailPage from '@/pages/PictureDetailPage.vue'
import AddPictureBatchPage from '@/pages/AddPictureBatchPage.vue'
import SpaceManagePage from '@/pages/admin/SpaceManagePage.vue'
import AddSpacePage from '@/pages/AddSpacePage.vue'
import SpaceDetailPage from '@/pages/SpaceDetailPage.vue'
import SpaceAnalyzePage from '@/pages/SpaceAnalyzePage.vue'
import MySpacePage from '@/pages/MySpacePage.vue'
import SearchPicturePage from '@/pages/SearchPicturePage.vue'
import SpaceUserManagePage from '@/pages/admin/SpaceUserManagePage.vue'
import TeamSpacePage from '@/pages/TeamSpacePage.vue'
import NoAuthPage from '@/pages/NoAuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
    {
      path: '/user/profile',
      name: '个人资料',
      component: UserProfilePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/no-auth',
      name: '无权限',
      component: NoAuthPage,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagePage,
      meta: { access: AccessEnum.ADMIN },
    },
    {
      path: '/spaceUserManage/:id',
      name: '空间成员管理',
      component: SpaceUserManagePage,
      props: true,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagePage,
      meta: { access: AccessEnum.ADMIN },
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true,
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: AddPictureBatchPage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/admin/spaceManage',
      name: '空间管理',
      component: SpaceManagePage,
      meta: { access: AccessEnum.ADMIN },
    },
    {
      path: '/add_space',
      name: '创建空间',
      component: AddSpacePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/space/:id',
      name: '空间详情',
      component: SpaceDetailPage,
      props: true,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/space_analyze',
      name: '空间分析',
      component: SpaceAnalyzePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/my_space',
      name: '我的空间',
      component: MySpacePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/team_space',
      name: '团队空间',
      component: TeamSpacePage,
      meta: { access: AccessEnum.LOGIN },
    },
    {
      path: '/search_picture',
      name: '图片搜索',
      component: SearchPicturePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
