import { styled } from "shivlahejat";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <>
      <Button>Save changes</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Read the docs</Button>
      <Button size="sm" variant="outline">
        Small
      </Button>
      <Button size="lg">Large</Button>
      <Button as="a" href="#dialog" variant="outline">
        Link styled as button
      </Button>
    </>
  );
}
