import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="p-4 sm:p-8">
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
        <Sheet>
          <SheetTrigger className="block sm:hidden">
            <GiHamburgerMenu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {" "}
                <Link href="/">
                  <div className="relative overflow-hidden group">
                    <div className="flex gap-x-2 items-center font-bold">
                      <Image
                        src="/logo.png"
                        height={52}
                        width={52}
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
              </SheetTitle>
              <SheetDescription>
                <ul className="uppercase flex flex-col items-center mt-4">
                  <li className="w-full">
                    <Link href="/about">
                      <Button className="uppercase w-full" variant="link">
                        About us
                      </Button>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link href="/contact">
                      <Button className="uppercase w-full" variant="link">
                        Contact us
                      </Button>
                    </Link>
                  </li>
                  <Separator orientation="vertical" />
                  <li className="w-full">
                    <Link href="/history">
                      <Button className="uppercase w-full">History</Button>
                    </Link>
                  </li>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
