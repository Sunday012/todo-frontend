import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-14">
      <Link to="/mytodo">
      <Button className=" p-2 bg-amber-500/85 hover:bg-amber-500/100">
      Create Your First Todo
      </Button>
      </Link>
      <h1 className="md:text-5xl text-4xl font-bold max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#4EA8DE] via-[#5E60CE] to-purple-500 w-full text-center p-6 md:pt-10 pt-6">
        Hello there!, start planning your day with our APP
      </h1>
      <p className=" text-sky-400 text-lg font-semibold md:mt-4 mt-2">The No.1 Todo App on the planet</p>
      <div className="w-60 h-64 mt-2">
      <img src="/todohero.png" alt="man_contemplating" className="w-full h-full" />
      </div>
    </div>
  );
};
