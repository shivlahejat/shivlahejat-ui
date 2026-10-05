import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import { theme } from "@/components/ui/theme";

export default function NavigationMenuDemo() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul style={{ display: "grid", gap: 4, width: 320, margin: 0, padding: 0, listStyle: "none" }}>
                {[
                  ["Introduction", "Components you copy and own."],
                  ["Installation", "Add the CLI to a Next.js app."],
                  ["Theming", "Edit tokens in theme.tsx."],
                ].map(([title, text]) => (
                  <li key={title}>
                    <NavigationMenuLink href="#">
                      <span style={{ fontWeight: 500 }}>{title}</span>
                      <span style={{ color: theme.color.mutedForeground }}>{text}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul style={{ display: "grid", gap: 4, width: 220, margin: 0, padding: 0, listStyle: "none" }}>
                {["Button", "Dialog", "Select", "Table"].map((name) => (
                  <li key={name}>
                    <NavigationMenuLink href={`#${name.toLowerCase()}`}>{name}</NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
