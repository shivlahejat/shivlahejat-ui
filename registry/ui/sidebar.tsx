"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import { styled, css } from "shivlahejat";
import { theme, focusRing } from "./theme";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

const COOKIE_NAME = "sidebar_state";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const WIDTH = "16rem";
const WIDTH_MOBILE = "18rem";
const WIDTH_ICON = "3rem";
const KEYBOARD_SHORTCUT = "b";
const MOBILE_BREAKPOINT = 768;

/* ───────────────────────── State ───────────────────────── */

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return ctx;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

const Wrapper = styled.div`
  --sidebar-width: ${WIDTH};
  --sidebar-width-icon: ${WIDTH_ICON};
  display: flex;
  width: 100%;
  min-height: 100svh;
  &:has([data-variant="inset"]) {
    background: ${theme.color.sidebar};
  }
`;

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Wrap your layout. Remembers open/closed in a cookie (read it in your layout to avoid a flash)
 * and toggles with ⌘B / Ctrl+B.
 */
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;

  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value);
      else setInner(value);
      document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}`;
    },
    [onOpenChange]
  );

  const toggleSidebar = useCallback(
    () => (isMobile ? setOpenMobile((o) => !o) : setOpen(!open)),
    [isMobile, open, setOpen]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, setOpen, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <Wrapper style={style as CSSProperties} {...props}>
        {children}
      </Wrapper>
    </SidebarContext.Provider>
  );
}

/* ───────────────────────── Shell ───────────────────────── */

const Peer = styled.div`
  display: none;
  color: ${theme.color.sidebarForeground};
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    display: block;
  }
`;

/** Reserves space in the page flow so content sits beside the fixed sidebar. */
const Gap = styled.div`
  position: relative;
  width: var(--sidebar-width);
  background: transparent;
  transition: width 200ms linear;
  [data-collapsible="offcanvas"] > & {
    width: 0;
  }
  [data-collapsible="icon"] > & {
    width: var(--sidebar-width-icon);
  }
  [data-collapsible="icon"][data-variant="floating"] > &,
  [data-collapsible="icon"][data-variant="inset"] > & {
    width: calc(var(--sidebar-width-icon) + 16px);
  }
`;

const Panel = styled.div`
  position: fixed;
  inset-block: 0;
  z-index: 10;
  display: flex;
  width: var(--sidebar-width);
  height: 100svh;
  transition:
    left 200ms linear,
    right 200ms linear,
    width 200ms linear;
  [data-side="left"] > & {
    left: 0;
  }
  [data-side="right"] > & {
    right: 0;
  }
  [data-side="left"][data-collapsible="offcanvas"] > & {
    left: calc(var(--sidebar-width) * -1);
  }
  [data-side="right"][data-collapsible="offcanvas"] > & {
    right: calc(var(--sidebar-width) * -1);
  }
  [data-collapsible="icon"] > & {
    width: var(--sidebar-width-icon);
  }
  [data-variant="floating"] > &,
  [data-variant="inset"] > & {
    padding: 8px;
  }
  [data-collapsible="icon"][data-variant="floating"] > &,
  [data-collapsible="icon"][data-variant="inset"] > & {
    width: calc(var(--sidebar-width-icon) + 16px + 2px);
  }
  [data-variant="sidebar"][data-side="left"] > & {
    border-right: 1px solid ${theme.color.sidebarBorder};
  }
  [data-variant="sidebar"][data-side="right"] > & {
    border-left: 1px solid ${theme.color.sidebarBorder};
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${theme.color.sidebar};
  [data-variant="floating"] & {
    border: 1px solid ${theme.color.sidebarBorder};
    border-radius: ${theme.radius.lg};
    box-shadow: ${theme.shadow.sm};
  }
`;

type SidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  /** offcanvas: slides away. icon: shrinks to icons. none: always open. */
  collapsible?: "offcanvas" | "icon" | "none";
};

const Static = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100%;
  background: ${theme.color.sidebar};
  color: ${theme.color.sidebarForeground};
`;

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") return <Static {...props}>{children}</Static>;

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          showClose={false}
          style={{ width: WIDTH_MOBILE, padding: 0, gap: 0, background: theme.color.sidebar }}
        >
          <VisuallyHidden>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </VisuallyHidden>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Peer
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      <Gap />
      <Panel {...props}>
        <Inner data-sidebar="sidebar">{children}</Inner>
      </Panel>
    </Peer>
  );
}

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

export function SidebarTrigger({ onClick, ...props }: Omit<ComponentProps<typeof Button>, "as">) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle sidebar"
      style={{ width: 28, height: 28 }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </Button>
  );
}

const RailButton = styled.button`
  position: absolute;
  inset-block: 0;
  z-index: 20;
  display: none;
  width: 16px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: ew-resize;
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
  }
  [data-side="left"] & {
    right: -8px;
  }
  [data-side="right"] & {
    left: -8px;
  }
  &::after {
    content: "";
    position: absolute;
    inset-block: 0;
    left: 50%;
    width: 2px;
    transition: background-color 150ms;
  }
  &:hover::after {
    background: ${theme.color.sidebarBorder};
  }
`;

/** Thin strip on the sidebar's edge: click to toggle. */
export function SidebarRail(props: ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();
  return (
    <RailButton
      aria-label="Toggle sidebar"
      tabIndex={-1}
      title="Toggle sidebar"
      onClick={toggleSidebar}
      {...props}
    />
  );
}

/** The main content area beside the sidebar. */
export const SidebarInset = styled.main`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  background: ${theme.color.background};
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    [data-variant="inset"] ~ & {
      margin: 8px 8px 8px 0;
      border-radius: ${theme.radius.lg};
      box-shadow: ${theme.shadow.sm};
    }
    [data-variant="inset"][data-state="collapsed"] ~ & {
      margin-left: 8px;
    }
  }
`;

export function SidebarInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} style={{ height: 32, background: theme.color.background, ...props.style }} />;
}

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

export function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  return <Separator {...props} style={{ margin: "0 8px", width: "auto", ...props.style }} />;
}

export const SidebarContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
  overflow: auto;
  [data-collapsible="icon"] & {
    overflow: hidden;
  }
`;

export const SidebarGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  padding: 8px;
`;

const hiddenWhenIcon = css`
  [data-collapsible="icon"] & {
    margin-top: -32px;
    opacity: 0;
    pointer-events: none;
  }
`;

export const SidebarGroupLabel = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: color-mix(in srgb, ${theme.color.sidebarForeground} 70%, transparent);
  border-radius: ${theme.radius.md};
  outline: none;
  transition:
    margin 200ms linear,
    opacity 200ms linear;
  ${hiddenWhenIcon}
`;

const actionStyles = css`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  ${focusRing}
  &:hover {
    background: ${theme.color.sidebarAccent};
  }
  & svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  [data-collapsible="icon"] & {
    display: none;
  }
`;

export const SidebarGroupAction = styled.button`
  ${actionStyles}
  top: 14px;
  right: 12px;
`;

export const SidebarGroupContent = styled.div`
  width: 100%;
  font-size: 14px;
`;

export const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SidebarMenuItem = styled.li`
  position: relative;
`;

const MenuButton = styled.button({
  base: css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    overflow: hidden;
    padding: 8px;
    font: inherit;
    font-size: 14px;
    text-align: left;
    color: inherit;
    text-decoration: none;
    background: transparent;
    border: 0;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    outline: none;
    transition:
      width 200ms,
      height 200ms,
      padding 200ms;
    ${focusRing}
    &:hover,
    &[data-state="open"] {
      background: ${theme.color.sidebarAccent};
    }
    &[data-active="true"] {
      background: ${theme.color.sidebarAccent};
      font-weight: 500;
    }
    &:disabled,
    &[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
    }
    li:has(> [data-sidebar="menu-action"]) > & {
      padding-right: 32px;
    }
    & > span:last-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    [data-collapsible="icon"] & {
      width: 32px !important;
      height: 32px !important;
      padding: 8px !important;
    }
  `,
  variants: {
    size: {
      default: "height: 32px;",
      sm: "height: 28px; font-size: 12px;",
      lg: "height: 48px; [data-collapsible='icon'] & { padding: 0 !important; }",
    },
    variant: {
      default: "",
      outline: `background: ${theme.color.background}; box-shadow: 0 0 0 1px ${theme.color.sidebarBorder};`,
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

type SidebarMenuButtonProps = ComponentProps<typeof MenuButton> & {
  isActive?: boolean;
  /** Shown when the sidebar is collapsed to icons. */
  tooltip?: ReactNode;
};

/** Use as="a" (or as={Link}) for navigation. */
export function SidebarMenuButton({ isActive = false, tooltip, ...props }: SidebarMenuButtonProps) {
  const { state, isMobile } = useSidebar();
  const button = <MenuButton data-sidebar="menu-button" data-active={isActive} {...props} />;
  if (!tooltip || state !== "collapsed" || isMobile) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

const MenuAction = styled.button`
  ${actionStyles}
  @media (hover: hover) {
    &[data-show-on-hover] {
      opacity: 0;
    }
    li:hover > &[data-show-on-hover],
    li:focus-within > &[data-show-on-hover],
    &[data-show-on-hover][data-state="open"] {
      opacity: 1;
    }
  }
`;

type SidebarMenuActionProps = ComponentProps<"button"> & {
  /** Only show on hover of the menu item (always visible on touch screens). */
  showOnHover?: boolean;
};

export function SidebarMenuAction({ showOnHover, style, ...props }: SidebarMenuActionProps) {
  return (
    <MenuAction
      data-sidebar="menu-action"
      data-show-on-hover={showOnHover || undefined}
      style={style}
      {...props}
    />
  );
}

export const SidebarMenuBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  border-radius: ${theme.radius.sm};
  pointer-events: none;
  user-select: none;
  [data-collapsible="icon"] & {
    display: none;
  }
`;

const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 8px;
  border-radius: ${theme.radius.md};
`;

/** Loading placeholder for a menu item. Width is randomised once per mount. */
export function SidebarMenuSkeleton({ showIcon = false }: { showIcon?: boolean }) {
  const [width] = useState(() => `${Math.floor(Math.random() * 40) + 50}%`);
  return (
    <SkeletonRow>
      {showIcon && <Skeleton style={{ width: 16, height: 16, borderRadius: 4 }} />}
      <Skeleton style={{ height: 16, flex: 1, maxWidth: width }} />
    </SkeletonRow>
  );
}

export const SidebarMenuSub = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  margin: 0 0 0 14px;
  padding: 2px 0 2px 10px;
  list-style: none;
  border-left: 1px solid ${theme.color.sidebarBorder};
  [data-collapsible="icon"] & {
    display: none;
  }
`;

export const SidebarMenuSubItem = styled.li`
  position: relative;
`;

const SubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  min-width: 0;
  padding: 0 8px;
  font-size: 14px;
  color: inherit;
  text-decoration: none;
  border-radius: ${theme.radius.md};
  outline: none;
  ${focusRing}
  &:hover,
  &[data-active="true"] {
    background: ${theme.color.sidebarAccent};
  }
  & > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export function SidebarMenuSubButton({
  isActive = false,
  ...props
}: ComponentProps<typeof SubButton> & { isActive?: boolean }) {
  return <SubButton data-active={isActive} {...props} />;
}
