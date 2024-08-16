import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "ypointer-events-none yabsolute yinset-0 yrounded-[inherit] [border:ycalc(var(--border-width)*1px)_solid_transparent]",

        // mask styles
        "![mask-clip:ypadding-box,border-box] ![mask-composite:yintersect] [mask:ylinear-gradient(transparent,transparent),linear-gradient(white,white)]",

        // pseudo styles
        "after:yabsolute after:yaspect-square after:yw-[calc(var(--size)*1px)] after:yanimate-border-beam after:[animation-delay:yvar(--delay)] after:[background:ylinear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:ycalc(var(--anchor)*1%)_50%] after:[offset-path:yrect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
};
