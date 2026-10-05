import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      {[
        ["default", "Default"],
        ["comfortable", "Comfortable"],
        ["compact", "Compact"],
      ].map(([value, label]) => (
        <div key={value} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RadioGroupItem value={value} id={`density-${value}`} />
          <Label htmlFor={`density-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
