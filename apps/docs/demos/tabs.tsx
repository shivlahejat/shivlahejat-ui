import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/typography";

export default function TabsDemo() {
  return (
    <>
      <Tabs defaultValue="account" style={{ width: "100%" }}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text variant="muted">Update your name and email address.</Text>
        </TabsContent>
        <TabsContent value="password">
          <Text variant="muted">Change your password. You will be signed out on other devices.</Text>
        </TabsContent>
      </Tabs>
    </>
  );
}
