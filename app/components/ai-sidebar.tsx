import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "../components/ui/sidebar";
import { History, Settings } from "lucide-react";

const historyItems = [
  "Resumo das vendas",
  "Produtos em alta",
  "Calendario sazonal",
  "Sugestoes de reposicao",
];

export default function AiSidebar() {
  return (
    <Sidebar>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Historico</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <History className="size-4" />
                <span>Historico</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {historyItems.map((item) => (
                  <SidebarMenuSubItem key={item}>
                    <SidebarMenuSubButton>{item}</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="size-4" />
              <span>Configuracoes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
