import { DirectionProvider } from "@/components/ui/direction";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DirectionDemo() {
  return (
    <div dir="rtl" style={{ display: "grid", gap: 24, width: "100%", maxWidth: 320 }}>
      <DirectionProvider dir="rtl">
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">الحساب</TabsTrigger>
            <TabsTrigger value="two">كلمة المرور</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Arrow keys follow right-to-left order.</TabsContent>
          <TabsContent value="two">The slider fills from the right.</TabsContent>
        </Tabs>
        <Slider defaultValue={[30]} aria-label="Volume" />
      </DirectionProvider>
    </div>
  );
}
