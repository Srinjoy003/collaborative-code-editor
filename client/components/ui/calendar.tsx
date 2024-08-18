"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("yp-3", className)}
      classNames={{
        months: "yflex yflex-col sm:yflex-row yspace-y-4 sm:yspace-x-4 sm:yspace-y-0",
        month: "yspace-y-4",
        caption: "yflex yjustify-center ypt-1 yrelative yitems-center",
        caption_label: "ytext-sm yfont-medium",
        nav: "yspace-x-1 yflex yitems-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "yh-7 yw-7 ybg-transparent yp-0 yopacity-50 hover:yopacity-100"
        ),
        nav_button_previous: "yabsolute yleft-1",
        nav_button_next: "yabsolute yright-1",
        table: "yw-full yborder-collapse yspace-y-1",
        head_row: "yflex",
        head_cell:
          "ytext-muted-foreground yrounded-md yw-9 yfont-normal ytext-[0.8rem]",
        row: "yflex yw-full ymt-2",
        cell: "yh-9 yw-9 ytext-center ytext-sm yp-0 yrelative [&:has([aria-selected].day-range-end)]:yrounded-r-md [&:has([aria-selected].day-outside)]:ybg-accent/50 [&:has([aria-selected])]:ybg-accent first:[&:has([aria-selected])]:yrounded-l-md last:[&:has([aria-selected])]:yrounded-r-md focus-within:yrelative focus-within:yz-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "yh-9 yw-9 yp-0 yfont-normal aria-selected:yopacity-100"
        ),
        day_range_end: "yday-range-end",
        day_selected:
          "ybg-primary ytext-primary-foreground hover:ybg-primary hover:ytext-primary-foreground focus:ybg-primary focus:ytext-primary-foreground",
        day_today: "ybg-accent ytext-accent-foreground",
        day_outside:
          "yday-outside ytext-muted-foreground yopacity-50 aria-selected:ybg-accent/50 aria-selected:ytext-muted-foreground aria-selected:yopacity-30",
        day_disabled: "ytext-muted-foreground yopacity-50",
        day_range_middle:
          "aria-selected:ybg-accent aria-selected:ytext-accent-foreground",
        day_hidden: "yinvisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="yh-4 yw-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="yh-4 yw-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
