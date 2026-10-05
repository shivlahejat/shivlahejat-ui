import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Select } from "@/components/ui/select";

export default function NativeSelectDemo() {
  return (
    <>
      <NativeSelect aria-label="Status" defaultValue="">
        <NativeSelectOption value="" disabled>
          Select status
        </NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="doing">In progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
      </NativeSelect>
    </>
  );
}
