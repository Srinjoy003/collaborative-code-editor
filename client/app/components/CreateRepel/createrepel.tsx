"use client";
import * as React from "react"
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Calendar } from "@/components/ui/calendar";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import { Box } from "lucide-react";
import ExploreMenu2 from "../ExploreMenu/languages";

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-100.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5 mt-4">
              <div className="flex flex-col space-y-5">
              <Label htmlFor="framework">Framework</Label>
              </div>
              <Select>
                <SelectTrigger id="framework">
                <SelectValue placeholder="Framework of your project" />
                </SelectTrigger>
                <SelectContent position="popper">
                <option value="" disabled>Select a framework</option>
                  <SelectItem value="c">c</SelectItem>
                  <SelectItem value="c++">c++</SelectItem>
                  <SelectItem value="assembly">Assembly</SelectItem>
                  <SelectItem value="Html">Html</SelectItem>
                  <SelectItem value="css">css</SelectItem>
                  <SelectItem value="js(web development)">js(web development)</SelectItem>
                  <SelectItem value="javascript">javascript</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="kotlin">kotlin</SelectItem>
                  <SelectItem value="java">java</SelectItem>
                  <SelectItem value="java">haskell</SelectItem>
                  <SelectItem value="java">Python</SelectItem>
                  <SelectItem value="java">Rust</SelectItem>
                  <SelectItem value="java">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" style={{ marginRight: '16px' }}>Cancel</Button>
        <Button>Create repel</Button>    
      </CardFooter>
    <CardContent>
    <ExploreMenu2/>
    </CardContent>
    </Card>
  )
}
