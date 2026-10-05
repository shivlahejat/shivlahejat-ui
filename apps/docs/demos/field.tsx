import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Field as FormField,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldDemo() {
  return (
    <>
      <FieldSet style={{ width: "100%", maxWidth: 400 }}>
        <FieldLegend>Payment</FieldLegend>
        <FieldGroup>
          <FormField>
            <FieldLabel htmlFor="card-name">Name on card</FieldLabel>
            <Input id="card-name" placeholder="Priya Shah" />
          </FormField>
          <FormField data-invalid="true">
            <FieldLabel htmlFor="card-number">Card number</FieldLabel>
            <Input id="card-number" defaultValue="1234" aria-invalid="true" />
            <FieldError errors={[{ message: "Enter all 16 digits." }]} />
          </FormField>
          <FieldSeparator />
          <FormField orientation="horizontal">
            <Checkbox id="same-address" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="same-address">Billing address matches shipping</FieldLabel>
              <FieldDescription>We&apos;ll use your saved address.</FieldDescription>
            </FieldContent>
          </FormField>
        </FieldGroup>
      </FieldSet>
    </>
  );
}
