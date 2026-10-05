import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardDemo() {
  return (
    <>
      <Card style={{ width: "100%", maxWidth: 380 }}>
        <CardHeader>
          <CardTitle>Invite your team</CardTitle>
          <CardDescription>They will get an email with a link to join.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gap: 8 }}>
            <Label htmlFor="invite">Email addresses</Label>
            <Input id="invite" placeholder="ana@acme.com, li@acme.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Send invites</Button>
          <Button variant="ghost">Cancel</Button>
        </CardFooter>
      </Card>
    </>
  );
}
