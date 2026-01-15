// import AddOrder from "./AddOrder";
// import AddUser from "./AddUser";
// import AddCategory from "./AddCategory";
// import AddProduct from "./AddProduct";
import { Sidebar, SidebarSeparator } from "@/components/ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarMenu from "./app-sidebar-menu";
import AppSidebarNavMenu from "./app-sidebar-nav-menu";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <SidebarSeparator />
      <AppSidebarNavMenu />
      <AppSidebarMenu />
    </Sidebar>
  );
}
