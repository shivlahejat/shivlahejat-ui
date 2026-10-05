import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { theme } from "@/components/ui/theme";

export default function ResizableDemo() {
  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          height: 200,
          border: `1px solid ${theme.color.border}`,
          borderRadius: theme.radius.md,
          overflow: "hidden",
        }}
      >
        <ResizablePanelGroup>
          <ResizablePanel defaultSize="50%">
            <div style={{ display: "grid", placeItems: "center", height: "100%", fontSize: 14 }}>One</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="40%">
                <div style={{ display: "grid", placeItems: "center", height: "100%", fontSize: 14 }}>Two</div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize="60%">
                <div style={{ display: "grid", placeItems: "center", height: "100%", fontSize: 14 }}>
                  Three
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
