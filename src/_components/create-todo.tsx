import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./date-picker";
import { DateRange } from "react-day-picker";
import { PlusIcon } from "lucide-react";
import { AuthContext } from "@/context/authContext";

export function CreateTodo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="w-full rounded-md  flex flex-col"
        >
          <div className="flex items-center justify-center">
            <div className=" rounded-lg bg-[#333333] flex flex-col items-center justify-center text-white cursor-pointer px-20 py-[78px]">
              <PlusIcon />
              <p className="font-bold">Create Todo</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#0D0D0D] outline-none border-none text-[#F2F2F2] p-10 space-y-4">
          <DialogHeader>
            <DialogTitle>Create Todo</DialogTitle>
            <DialogDescription>
              Create your TODO here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <div className="flex items-center justify-center w-full">
            <div className=" aspect-video rounded-lg w-full bg-[#333333] flex flex-col items-center justify-center text-white cursor-pointer ">
              <PlusIcon />
              <p className="font-bold">Create Todo</p>
            </div>
          </div>
      </DrawerTrigger>
      <DrawerContent className="bg-[#0D0D0D] outline-none border-none text-[#F2F2F2] p-4 space-y-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Todo</DrawerTitle>
          <DrawerDescription>
            Create your TODO here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="text-black">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [inputDescription, setInputDescription] = React.useState();
  const [title, setTitle] = React.useState();
  const [inputTime, setInputTime] = React.useState();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const {apiUrl} = React.useContext(AuthContext)

  const formatDate = (date: Date | undefined) => {
    return date
      ? date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formattedDateRange = {
      from: formatDate(dateRange?.from),
      to: formatDate(dateRange?.to),
    };
    const start_date = formattedDateRange?.from;
    const deadline = formattedDateRange?.to;
    const body = {
      description: inputDescription,
      title,
      inputTime,
      start_date,
      deadline,
    };
    console.log(body);
    //   console.log(formattedDateRange?.from)

    const res = await fetch(`${apiUrl}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    window.location.href = "/mytodo";
    console.log(res);
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          className="bg-[#0D0D0D] outline-none "
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={inputDescription}
          onChange={(e: any) => setInputDescription(e.target.value)}
          className="bg-[#0D0D0D] outline-none "
        />
      </div>
      <div className="grid gap-2">
        <DatePickerWithRange
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          aria-label="Time"
          value={inputTime}
          onChange={(e: any) => setInputTime(e.target.value)}
          className="bg-[#0D0D0D] outline-none "
        />
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE]"
      >
        Save changes
      </Button>
    </form>
  );
}
