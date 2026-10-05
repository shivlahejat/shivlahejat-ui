"use client";

import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as Recharts from "recharts";
import { styled } from "shivlahejat";
import { theme } from "./theme";

/**
 * Each series gets a label and a color. Colors become CSS variables (--color-<key>),
 * so use fill="var(--color-desktop)" in your recharts elements.
 */
export type ChartConfig = Record<string, { label?: ReactNode; icon?: () => ReactNode; color?: string }>;

const ChartContext = createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used inside <ChartContainer>");
  return ctx;
}

/** Default series colors, tuned for both themes. Override per series in ChartConfig. */
export const chartColors = [
  theme.color.chart1,
  theme.color.chart2,
  theme.color.chart3,
  theme.color.chart4,
  theme.color.chart5,
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  aspect-ratio: 16 / 9;
  font-size: 12px;
  & .recharts-cartesian-axis-tick text {
    fill: ${theme.color.mutedForeground};
  }
  & .recharts-cartesian-grid line[stroke="#ccc"],
  & .recharts-cartesian-grid line {
    stroke: color-mix(in srgb, ${theme.color.border} 70%, transparent);
  }
  & .recharts-curve.recharts-tooltip-cursor,
  & .recharts-polar-grid [stroke="#ccc"] {
    stroke: ${theme.color.border};
  }
  & .recharts-rectangle.recharts-tooltip-cursor {
    fill: ${theme.color.muted};
  }
  & .recharts-dot[stroke="#fff"],
  & .recharts-sector[stroke="#fff"] {
    stroke: transparent;
  }
  & .recharts-layer,
  & .recharts-surface,
  & .recharts-sector {
    outline: none;
  }
`;

type ChartContainerProps = ComponentProps<"div"> & {
  config: ChartConfig;
  children: ComponentProps<typeof Recharts.ResponsiveContainer>["children"];
};

/** Wrap a recharts chart. Sets size, theme colors and the --color-* variables. */
export function ChartContainer({ config, children, style, ...props }: ChartContainerProps) {
  const id = useId();
  const colorVars: Record<string, string> = {};
  Object.entries(config).forEach(([key, item], i) => {
    colorVars[`--color-${key}`] = item.color ?? chartColors[i % chartColors.length];
  });
  return (
    <ChartContext.Provider value={{ config }}>
      <Container data-chart={id} style={{ ...colorVars, ...style } as CSSProperties} {...props}>
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </Container>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = Recharts.Tooltip;
export const ChartLegend = Recharts.Legend;

const TooltipBox = styled.div`
  display: grid;
  gap: 6px;
  min-width: 128px;
  padding: 6px 10px;
  font-size: 12px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
`;

const TooltipLabel = styled.div`
  font-weight: 500;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Swatch = styled.span`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 2px;
  background: var(--swatch);
`;

const Value = styled.span`
  margin-left: auto;
  padding-left: 12px;
  font-family: ${theme.font.mono};
  font-variant-numeric: tabular-nums;
  font-weight: 500;
`;

type PayloadItem = {
  dataKey?: string | number;
  name?: string | number;
  value?: unknown;
  color?: string;
  payload?: Record<string, unknown> & { fill?: string };
};

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: readonly PayloadItem[];
  label?: ReactNode;
  hideLabel?: boolean;
  /** Format the heading, e.g. turn an ISO date into "Oct 5". */
  labelFormatter?: (label: ReactNode) => ReactNode;
  /** Use another field of the data as the row key, e.g. "browser" for pie charts. */
  nameKey?: string;
  formatter?: (value: unknown, name: string) => ReactNode;
};

/** Pass as <ChartTooltip content={<ChartTooltipContent />} />. */
export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel,
  nameKey,
  formatter,
  labelFormatter,
}: ChartTooltipContentProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;
  const raw = typeof label === "string" ? (config[label]?.label ?? label) : label;
  const labelText = labelFormatter && raw != null ? labelFormatter(raw) : raw;
  return (
    <TooltipBox>
      {!hideLabel && labelText != null && <TooltipLabel>{labelText}</TooltipLabel>}
      {payload.map((item, i) => {
        const key = String((nameKey && item.payload?.[nameKey]) ?? item.dataKey ?? item.name ?? i);
        const entry = config[key];
        const color = item.payload?.fill ?? item.color ?? `var(--color-${key})`;
        return (
          <Row key={key}>
            <Swatch style={{ "--swatch": color } as CSSProperties} />
            <span>{entry?.label ?? item.name}</span>
            <Value>
              {formatter
                ? formatter(item.value, key)
                : typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : String(item.value)}
            </Value>
          </Row>
        );
      })}
    </TooltipBox>
  );
}

const LegendBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 12px;
  font-size: 12px;
`;

type ChartLegendContentProps = {
  payload?: ReadonlyArray<{
    value?: unknown;
    dataKey?: unknown;
    color?: string;
    payload?: Record<string, unknown>;
  }>;
  nameKey?: string;
};

/** Pass as <ChartLegend content={<ChartLegendContent />} />. */
export function ChartLegendContent({ payload, nameKey }: ChartLegendContentProps) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return (
    <LegendBox>
      {payload.map((item, i) => {
        const key = String((nameKey && item.payload?.[nameKey]) ?? item.dataKey ?? item.value ?? i);
        const entry = config[key];
        return (
          <Row key={key}>
            {entry?.icon ? (
              entry.icon()
            ) : (
              <Swatch style={{ "--swatch": item.color ?? `var(--color-${key})` } as CSSProperties} />
            )}
            <span>{entry?.label ?? String(item.value)}</span>
          </Row>
        );
      })}
    </LegendBox>
  );
}
