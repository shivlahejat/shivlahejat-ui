import type { ComponentProps } from "react";
import { styled, vars } from "shivlahejat";

const Box = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: var(--aspect-ratio, 1);
  overflow: hidden;
  & > img,
  & > video,
  & > iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type AspectRatioProps = ComponentProps<"div"> & {
  /** Width divided by height, e.g. 16 / 9. */
  ratio?: number;
};

/** Plain CSS aspect-ratio, so it works in Server Components with no JS. */
export function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return <Box style={vars({ "aspect-ratio": ratio }, style)} {...props} />;
}
