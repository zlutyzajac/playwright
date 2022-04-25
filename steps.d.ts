/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type TopNavbar = typeof import('./pages/fragments/Ribbon.js');
type SideMenu = typeof import('./pages/fragments/SideMenu.js');
type HomePage = typeof import('./pages/Search.js');
type chaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, TopNavbar: TopNavbar, SideMenu: SideMenu, HomePage: HomePage }
  interface Methods extends Playwright, chaiWrapper {}
  interface I extends ReturnType<steps_file>, WithTranslation<chaiWrapper> {}
  namespace Translation {
    interface Actions {}
  }
}
