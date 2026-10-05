"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type KeyboardEvent,
} from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { styled } from "shivlahejat";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];

export type { CarouselApi };

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
}

const Root = styled.div`
  position: relative;
`;

type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  orientation?: "horizontal" | "vertical";
  /** Get the embla API to drive the carousel yourself (e.g. a slide counter). */
  setApi?: (api: CarouselApi) => void;
};

/** Swipeable slides built on embla-carousel. Arrow keys work when focused. */
export function Carousel({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "vertical" ? "y" : "x" },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((a: CarouselApi) => {
    if (!a) return;
    setCanScrollPrev(a.canScrollPrev());
    setCanScrollNext(a.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const prev = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (e.key === prev) {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === next) {
      e.preventDefault();
      scrollNext();
    }
  };

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <Root
        role="region"
        aria-roledescription="carousel"
        data-orientation={orientation}
        onKeyDownCapture={onKeyDown}
        {...props}
      >
        {children}
      </Root>
    </CarouselContext.Provider>
  );
}

const Viewport = styled.div`
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  margin-left: -16px;
  [data-orientation="vertical"] & {
    flex-direction: column;
    margin-left: 0;
    margin-top: -16px;
  }
`;

export function CarouselContent(props: ComponentProps<"div">) {
  const { carouselRef } = useCarousel();
  return (
    <Viewport ref={carouselRef}>
      <Track {...props} />
    </Viewport>
  );
}

const Slide = styled.div`
  min-width: 0;
  flex: 0 0 100%;
  padding-left: 16px;
  [data-orientation="vertical"] & {
    padding-left: 0;
    padding-top: 16px;
  }
`;

/** One slide. Set flex-basis (e.g. style={{ flexBasis: "33%" }}) to show several at once. */
export function CarouselItem(props: ComponentProps<"div">) {
  return <Slide role="group" aria-roledescription="slide" {...props} />;
}

const arrow = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const NavButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &[data-side="prev"] {
    left: -48px;
  }
  &[data-side="next"] {
    right: -48px;
  }
  [data-orientation="vertical"] > & {
    top: auto;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  [data-orientation="vertical"] > &[data-side="prev"] {
    top: -48px;
  }
  [data-orientation="vertical"] > &[data-side="next"] {
    bottom: -48px;
  }
  & > button {
    border-radius: 999px;
  }
`;

type NavProps = Omit<ComponentProps<typeof Button>, "as">;

export function CarouselPrevious({ variant = "outline", size = "icon", ...props }: NavProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <NavButton data-side="prev">
      <Button
        variant={variant}
        size={size}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous slide"
        {...props}
      >
        {arrow("m15 18-6-6 6-6")}
      </Button>
    </NavButton>
  );
}

export function CarouselNext({ variant = "outline", size = "icon", ...props }: NavProps) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <NavButton data-side="next">
      <Button
        variant={variant}
        size={size}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next slide"
        {...props}
      >
        {arrow("m9 18 6-6-6-6")}
      </Button>
    </NavButton>
  );
}
