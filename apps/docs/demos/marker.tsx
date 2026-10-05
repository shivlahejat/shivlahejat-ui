import { Flex } from "shivlahejat";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";

export default function MarkerDemo() {
  return (
    <>
      <Flex direction="column" gap={12} fullWidth style={{ maxWidth: 360 }}>
        <Marker>
          <MarkerIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </MarkerIcon>
          <MarkerContent>Explored 4 files</MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerContent>Edited registry/ui/button.tsx</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Yesterday</MarkerContent>
        </Marker>
      </Flex>
    </>
  );
}
