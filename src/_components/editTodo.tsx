import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "./date-picker"
import { DateRange } from "react-day-picker"

type EditTodoProps = {
    description : string;
    id: number;
}

type EditFormProps = {
    className?: string;
    description: string;
    todo_id: number;
}
export function EditTodo({description, id} : EditTodoProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button className="bg-[#333333] hover:bg-[#808080] text-[#F2F2F2]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.83518 0.590027L10.4382 2.07895L9.21617 3.2145L7.61314 1.72558L8.83518 0.590027ZM2.96381 7.53239H4.56684L8.46061 3.91579L6.85757 2.42686L2.96381 6.04346V7.53239Z"
              fill="#D9D9D9"
            />
            <path
              d="M8.84159 9.02131H3.04823C3.03434 9.02131 3.01991 9.02628 3.00602 9.02628C2.98839 9.02628 2.97075 9.02181 2.95258 9.02131H1.36077V2.073H5.01943L6.08812 1.08038H1.36077C0.771391 1.08038 0.292084 1.52508 0.292084 2.073V9.02131C0.292084 9.56924 0.771391 10.0139 1.36077 10.0139H8.84159C9.12503 10.0139 9.39685 9.90935 9.59727 9.7232C9.79769 9.53705 9.91028 9.28457 9.91028 9.02131V4.71931L8.84159 5.71193V9.02131Z"
              fill="#D9D9D9"
            />
          </svg>
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#0D0D0D] outline-none border-none text-[#F2F2F2] p-10 space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Make changes to your TODO here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm description={description} todo_id={id} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <Button className="bg-[#333333] hover:bg-[#808080] text-[#F2F2F2]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.83518 0.590027L10.4382 2.07895L9.21617 3.2145L7.61314 1.72558L8.83518 0.590027ZM2.96381 7.53239H4.56684L8.46061 3.91579L6.85757 2.42686L2.96381 6.04346V7.53239Z"
              fill="#D9D9D9"
            />
            <path
              d="M8.84159 9.02131H3.04823C3.03434 9.02131 3.01991 9.02628 3.00602 9.02628C2.98839 9.02628 2.97075 9.02181 2.95258 9.02131H1.36077V2.073H5.01943L6.08812 1.08038H1.36077C0.771391 1.08038 0.292084 1.52508 0.292084 2.073V9.02131C0.292084 9.56924 0.771391 10.0139 1.36077 10.0139H8.84159C9.12503 10.0139 9.39685 9.90935 9.59727 9.7232C9.79769 9.53705 9.91028 9.28457 9.91028 9.02131V4.71931L8.84159 5.71193V9.02131Z"
              fill="#D9D9D9"
            />
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#0D0D0D] outline-none border-none text-[#F2F2F2] p-4 space-y-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Todo</DrawerTitle>
          <DrawerDescription>
            Make changes to your TODO here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" description={description} todo_id={id} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="text-black">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({className, todo_id}: EditFormProps) {
    const [inputTitle, setInputTitle] = React.useState("");
  const [inputDescription, setInputDescription] = React.useState("");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({from: undefined, to: undefined})
  const [inputTime, setInputTime] = React.useState<string | undefined>(undefined);

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}) : null
  }
//   console.log(inputDescription)
  const handleUpdate = async (e : any) => {
    e.preventDefault()
    const formattedDateRange = {
        from : formatDate(dateRange?.from),
        to : formatDate(dateRange?.to)
    }
    const start_date = formattedDateRange?.from;
    const deadline = formattedDateRange?.to;
    try {
        const body = { description: inputDescription , title: inputTitle, start_date, deadline, inputTime};
        console.log(body);
        const res = await fetch(`http://localhost:5000/todo/${todo_id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
    
        console.log(res)
        window.location.href = "/mytodo"
    } catch (error) {
        console.error(error)
    }
  
  }
  return (
    <form className={cn("grid items-start gap-6", className)} onSubmit={handleUpdate}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" className="bg-[#0D0D0D] outline-none" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}  className="bg-[#0D0D0D] outline-none " />
      </div>
      <div className="grid gap-2">
        <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" aria-label="Time" value={inputTime} onChange={(e) => setInputTime(e.target.value)}  className="bg-[#0D0D0D] outline-none " />
      </div>
      <Button type="submit" className="bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE]">Save changes</Button>
    </form>
  )
}
