import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
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
import { CiBurger } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="p-8">
      <nav className="flex justify-between">
        <Link href="/">
          <div className="relative overflow-hidden group">
            <div className="flex gap-x-2 items-center font-bold">
              <Image
                src="/logo.png"
                height={32}
                width={32}
                alt="QR Code of my github as a logo"
              />
              QR Scanner
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-150%] rotate-45 group-hover:translate-x-[150%] 
                  transition-transform duration-500 ease-in-out"
            ></div>
          </div>
        </Link>
        <ul className="hidden gap-2 uppercase itmes-center sm:flex">
          <li>
            <Link href="/about">
              <Button className="uppercase" variant="link">
                About us
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <Button className="uppercase" variant="link">
                Contact us
              </Button>
            </Link>
          </li>
          <Separator orientation="vertical" />
          <li>
            <Link href="/history">
              <Button className="uppercase">History</Button>
            </Link>
          </li>
        </ul>
        <Drawer>
          <DrawerTrigger className="block sm:hidden">
            <CiBurger />
          </DrawerTrigger>
          <DrawerContent className="overflow-y-auto flex flex-col items-center justify-center">
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex gap-x-2 items-center font-bold">
                  <Image
                    src="/logo.png"
                    height={32}
                    width={32}
                    alt="QR Code of my github as a logo"
                  />
                  QR Scanner
                </div>
              </DrawerTitle>
              <DrawerDescription>
                Simply way of reading QR Codes
              </DrawerDescription>
            </DrawerHeader>
            <ul className="uppercase itmes-center flex flex-col">
              <li className="w-full">
                <Link href="/about">
                  <Button className="uppercase" variant="link">
                    About us
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <Button className="uppercase" variant="link">
                    Contact us
                  </Button>
                </Link>
              </li>
              <Separator orientation="vertical" />
              <li>
                <Link href="/history">
                  <Button className="uppercase">History</Button>
                </Link>
              </li>
            </ul>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
