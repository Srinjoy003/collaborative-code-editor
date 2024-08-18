import React from "react";
import Link from 'next/link';
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";

export function PopoverDemo() {
  // Assuming "/repel" is the correct path that you've set up to point to the desired page
  return (
    <Link href="/repel" passHref>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Button variant="default">Code now</Button>
    </Link>
  );
}
