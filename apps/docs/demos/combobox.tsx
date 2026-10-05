import { Combobox } from "@/components/ui/combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "react-router", label: "React Router" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
];

export default function ComboboxDemo() {
  return <Combobox aria-label="Framework" placeholder="Select framework" options={frameworks} />;
}
