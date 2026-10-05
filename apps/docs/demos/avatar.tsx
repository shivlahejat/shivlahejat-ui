import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <>
      <Avatar>
        <AvatarImage src="/missing-photo.png" alt="" />
        <AvatarFallback>SL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>PS</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>LI</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>+3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </>
  );
}
