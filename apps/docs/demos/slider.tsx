import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%", maxWidth: 320 }}>
      <Slider defaultValue={[40]} aria-label="Volume" />
      <Slider defaultValue={[20, 80]} aria-label="Price range" />
    </div>
  );
}
