import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

export default function ItemDemo() {
  return (
    <>
      <ItemGroup style={{ width: "100%", maxWidth: 420 }}>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>New deployment</ItemTitle>
            <ItemDescription>Production build finished in 42s.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              View
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator style={{ margin: "8px 0", background: "transparent" }} />
        <Item variant="muted" size="sm">
          <ItemContent>
            <ItemTitle>Two-factor authentication is on</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </>
  );
}
