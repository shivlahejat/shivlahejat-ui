import { AspectRatio } from "@/components/ui/aspect-ratio";
import { theme } from "@/components/ui/theme";

export default function AspectRatioDemo() {
  return (
    <>
      <div style={{ width: "100%", maxWidth: 320 }}>
        <AspectRatio
          ratio={16 / 9}
          style={{
            background: `linear-gradient(135deg, ${theme.color.primary}, ${theme.color.accent})`,
            borderRadius: theme.radius.md,
          }}
        />
      </div>
    </>
  );
}
