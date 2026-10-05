/**
 * The short "Usage" snippet on each component page: the import, then the smallest useful JSX.
 * The full example lives in demos/<name>.tsx and is shown in the Code tab.
 */
export const usage: Record<string, { imports: string; code: string }> = {
  accordion: {
    imports: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";`,
    code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  alert: {
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";`,
    code: `<Alert variant="default | destructive">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components with the CLI.</AlertDescription>
</Alert>`,
  },
  "alert-dialog": {
    imports: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";`,
    code: `<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  "aspect-ratio": {
    imports: `import { AspectRatio } from "@/components/ui/aspect-ratio";`,
    code: `<AspectRatio ratio={16 / 9}>
  <img src="/photo.jpg" alt="Photo" />
</AspectRatio>`,
  },
  attachment: {
    imports: `import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";`,
    code: `<Attachment state="idle | uploading | processing | error | done">
  <AttachmentMedia>{/* icon */}</AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>report.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`,
  },
  avatar: {
    imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";`,
    code: `<Avatar size="sm | default | lg">
  <AvatarImage src="/me.png" alt="@me" />
  <AvatarFallback>SL</AvatarFallback>
</Avatar>`,
  },
  badge: {
    imports: `import { Badge } from "@/components/ui/badge";`,
    code: `<Badge variant="default | secondary | outline | destructive">Badge</Badge>`,
  },
  breadcrumb: {
    imports: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";`,
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  bubble: {
    imports: `import { Bubble, BubbleContent } from "@/components/ui/bubble";`,
    code: `<Bubble variant="default | secondary | muted | tinted | outline | ghost | destructive" align="start | end">
  <BubbleContent>Hello!</BubbleContent>
</Bubble>`,
  },
  button: {
    imports: `import { Button } from "@/components/ui/button";`,
    code: `<Button variant="default | secondary | outline | ghost | destructive | link" size="default | sm | lg | icon">
  Button
</Button>`,
  },
  "button-group": {
    imports: `import { ButtonGroup } from "@/components/ui/button-group";`,
    code: `<ButtonGroup orientation="horizontal | vertical">
  <Button variant="outline">One</Button>
  <Button variant="outline">Two</Button>
</ButtonGroup>`,
  },
  calendar: {
    imports: `import { Calendar } from "@/components/ui/calendar";`,
    code: `const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar mode="single" selected={date} onSelect={setDate} />`,
  },
  card: {
    imports: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";`,
    code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>Card Content</CardContent>
  <CardFooter>Card Footer</CardFooter>
</Card>`,
  },
  carousel: {
    imports: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";`,
    code: `<Carousel>
  <CarouselContent>
    <CarouselItem>One</CarouselItem>
    <CarouselItem>Two</CarouselItem>
    <CarouselItem>Three</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  chart: {
    imports: `import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";`,
    code: `const config = { desktop: { label: "Desktop" } } satisfies ChartConfig;

<ChartContainer config={config} style={{ minHeight: 200 }}>
  <BarChart data={data}>
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>`,
  },
  checkbox: {
    imports: `import { Checkbox } from "@/components/ui/checkbox";`,
    code: `<Checkbox id="terms" />`,
  },
  collapsible: {
    imports: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";`,
    code: `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>Yes. Free to use for personal and commercial projects.</CollapsibleContent>
</Collapsible>`,
  },
  combobox: {
    imports: `import { Combobox } from "@/components/ui/combobox";`,
    code: `<Combobox
  placeholder="Select framework"
  options={[
    { value: "next", label: "Next.js" },
    { value: "astro", label: "Astro" },
  ]}
  onValueChange={(value) => console.log(value)}
/>`,
  },
  command: {
    imports: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";`,
    code: `<Command>
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  "context-menu": {
    imports: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";`,
    code: `<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  "data-table": {
    imports: `import { DataTable, SortableHeader, type ColumnDef } from "@/components/ui/data-table";`,
    code: `const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: ({ column }) => <SortableHeader column={column} title="Email" /> },
];

<DataTable columns={columns} data={payments} filterColumn="email" />`,
  },
  "date-picker": {
    imports: `import { DatePicker } from "@/components/ui/date-picker";`,
    code: `<DatePicker onValueChange={(date) => console.log(date)} />`,
  },
  dialog: {
    imports: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";`,
    code: `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  direction: {
    imports: `import { DirectionProvider } from "@/components/ui/direction";`,
    code: `<html dir="rtl">
  <body>
    <DirectionProvider dir="rtl">{children}</DirectionProvider>
  </body>
</html>`,
  },
  drawer: {
    imports: `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";`,
    code: `<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
  },
  "dropdown-menu": {
    imports: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";`,
    code: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  empty: {
    imports: `import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";`,
    code: `<Empty>
  <EmptyHeader>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create your first project to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>`,
  },
  field: {
    imports: `import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";`,
    code: `<Field orientation="vertical | horizontal | responsive">
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" />
  <FieldDescription>We'll never share your email.</FieldDescription>
  <FieldError errors={errors.email} />
</Field>`,
  },
  "hover-card": {
    imports: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";`,
    code: `<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>The React Framework, created and maintained by @vercel.</HoverCardContent>
</HoverCard>`,
  },
  input: {
    imports: `import { Input } from "@/components/ui/input";`,
    code: `<Input type="email" placeholder="Email" />`,
  },
  "input-group": {
    imports: `import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";`,
    code: `<InputGroup>
  <InputGroupInput placeholder="Search…" />
  <InputGroupAddon align="inline-start | inline-end | block-start | block-end">{/* icon */}</InputGroupAddon>
</InputGroup>`,
  },
  "input-otp": {
    imports: `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";`,
    code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  item: {
    imports: `import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";`,
    code: `<Item variant="default | outline | muted" size="default | sm">
  <ItemMedia variant="icon">{/* icon */}</ItemMedia>
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>A short description.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm">Action</Button>
  </ItemActions>
</Item>`,
  },
  kbd: {
    imports: `import { Kbd, KbdGroup } from "@/components/ui/kbd";`,
    code: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
  },
  label: {
    imports: `import { Label } from "@/components/ui/label";`,
    code: `<Label htmlFor="email">Your email address</Label>`,
  },
  marker: {
    imports: `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";`,
    code: `<Marker variant="default | border | separator">
  <MarkerIcon>{/* icon */}</MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>`,
  },
  menubar: {
    imports: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";`,
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarItem>New Window</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  message: {
    imports: `import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";`,
    code: `<Message align="start | end">
  <MessageAvatar>{/* <Avatar /> */}</MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`,
  },
  "message-scroller": {
    imports: `import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";`,
    code: `<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((m) => (
          <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
            {/* <Message /> */}
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`,
  },
  "native-select": {
    imports: `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";`,
    code: `<NativeSelect>
  <NativeSelectOption value="todo">Todo</NativeSelectOption>
  <NativeSelectOption value="done">Done</NativeSelectOption>
</NativeSelect>`,
  },
  "navigation-menu": {
    imports: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";`,
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/docs">Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  pagination: {
    imports: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";`,
    code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  popover: {
    imports: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";`,
    code: `<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>`,
  },
  progress: {
    imports: `import { Progress } from "@/components/ui/progress";`,
    code: `<Progress value={33} />`,
  },
  questionnaire: {
    imports: `import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";`,
    code: `<Questionnaire onSubmit={(e) => console.log(new FormData(e.currentTarget))}>
  <QuestionnaireItem name="framework" required>
    <QuestionnaireTitle>Which framework?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="next">Next.js</QuestionnaireChoice>
      <QuestionnaireChoice value="vite">Vite</QuestionnaireChoice>
    </QuestionnaireChoices>
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`,
  },
  "radio-group": {
    imports: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`,
    code: `<RadioGroup defaultValue="option-one">
  <RadioGroupItem value="option-one" id="option-one" />
  <RadioGroupItem value="option-two" id="option-two" />
</RadioGroup>`,
  },
  resizable: {
    imports: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";`,
    code: `<ResizablePanelGroup orientation="horizontal | vertical">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>`,
  },
  "scroll-area": {
    imports: `import { ScrollArea } from "@/components/ui/scroll-area";`,
    code: `<ScrollArea style={{ height: 200, width: 350 }}>
  Lots of content here…
</ScrollArea>`,
  },
  select: {
    imports: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";`,
    code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`,
  },
  separator: {
    imports: `import { Separator } from "@/components/ui/separator";`,
    code: `<Separator orientation="horizontal | vertical" />`,
  },
  sheet: {
    imports: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";`,
    code: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right | left | top | bottom">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  sidebar: {
    imports: `import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";`,
    code: `<SidebarProvider>
  <Sidebar collapsible="offcanvas | icon | none" variant="sidebar | floating | inset">
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as="a" href="/" isActive>Home</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {children}
  </SidebarInset>
</SidebarProvider>`,
  },
  skeleton: {
    imports: `import { Skeleton } from "@/components/ui/skeleton";`,
    code: `<Skeleton style={{ width: 100, height: 20, borderRadius: 999 }} />`,
  },
  slider: {
    imports: `import { Slider } from "@/components/ui/slider";`,
    code: `<Slider defaultValue={[33]} max={100} step={1} />`,
  },
  spinner: {
    imports: `import { Spinner } from "@/components/ui/spinner";`,
    code: `<Spinner />`,
  },
  switch: {
    imports: `import { Switch } from "@/components/ui/switch";`,
    code: `<Switch />`,
  },
  table: {
    imports: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";`,
    code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  tabs: {
    imports: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";`,
    code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
  },
  textarea: {
    imports: `import { Textarea } from "@/components/ui/textarea";`,
    code: `<Textarea placeholder="Type your message here." />`,
  },
  toast: {
    imports: `import { Toaster, toast } from "@/components/ui/toast";`,
    code: `// Once, in app/layout.tsx
<Toaster />

// Anywhere in a client component
toast("Event has been created.");
toast.success("Saved");`,
  },
  toggle: {
    imports: `import { Toggle } from "@/components/ui/toggle";`,
    code: `<Toggle variant="default | outline" size="default | sm | lg">Toggle</Toggle>`,
  },
  "toggle-group": {
    imports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";`,
    code: `<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`,
  },
  tooltip: {
    imports: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";`,
    code: `<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
  },
  typography: {
    imports: `import { Heading, InlineCode, Text } from "@/components/ui/typography";`,
    code: `<Heading as="h1" size="xl | lg | md | sm">Heading</Heading>
<Text variant="default | muted | lead | small">Body text</Text>
<InlineCode>npm install</InlineCode>`,
  },
};
