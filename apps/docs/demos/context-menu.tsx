import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { theme } from "@/components/ui/theme";

export default function ContextMenuDemo() {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: 300,
              height: 140,
              fontSize: 14,
              border: `1px dashed ${theme.color.border}`,
              borderRadius: theme.radius.md,
            }}
          >
            Right click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent style={{ width: 220 }}>
          <ContextMenuItem>
            Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Save page as…</ContextMenuItem>
              <ContextMenuItem>Developer tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>Show bookmarks</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
