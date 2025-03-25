import React from "react";
import Link from 'next/link';
import { Button } from "../ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";

export function PopoverDemo() {
  return (
    <Link href="/repel" passHref>
      <Button variant="default" >Code now</Button>
    </Link>
  );
}
