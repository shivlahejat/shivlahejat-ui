"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { theme } from "@/components/ui/theme";

export default function CarouselDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 280, margin: "0 56px" }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((n) => (
            <CarouselItem key={n}>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  aspectRatio: "1",
                  fontSize: 40,
                  fontWeight: 600,
                  border: `1px solid ${theme.color.border}`,
                  borderRadius: theme.radius.lg,
                }}
              >
                {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
