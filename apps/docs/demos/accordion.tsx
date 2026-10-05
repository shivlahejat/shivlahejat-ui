import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <>
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Do these work in Server Components?</AccordionTrigger>
          <AccordionContent>
            Static ones do. Interactive ones are client components built on Radix.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Can I change the styles?</AccordionTrigger>
          <AccordionContent>
            Yes. The source is copied into your project, so edit it like any file.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Is there a style registry to set up?</AccordionTrigger>
          <AccordionContent>No. React 19 hoists and dedupes the style tags for you.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
