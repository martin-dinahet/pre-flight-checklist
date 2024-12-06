import { Button } from "@headlessui/react";

export const MyButton = ({ children, variant = "default", ...props }) => {
  switch (variant) {
    case "delete":
      return (
        <>
          <Button
            className="p-2 border border-[#EF476F] rounded-md bg-[#EF476F] text-white flex items-center gap-2 w-fit"
            {...props}>
            {children}
          </Button>
        </>
      );
    case "edit":
      return (
        <>
          <Button
            className="p-2 border rounded-md bg-[#FFD166] border-[#FFD166] text-white flex  items-center gap-2 w-fit"
            {...props}>
            {children}
          </Button>
        </>
      );
    case "default":
      return (
        <>
          <Button
            className="p-2 border rounded-md bg-gray-50 text-black flex  items-center gap-2 w-fit"
            {...props}>
            {children}
          </Button>
        </>
      );
  }
};
