"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IoCamera, IoTrashBin } from "react-icons/io5";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiCircleCheck } from "react-icons/ci";
import { FaCheck, FaCopy } from "react-icons/fa";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HistoryPage() {
  const [scannedResults, setScannedResults] = useState<any[]>([]);
  const [copy, setCopy] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const storedResults = localStorage.getItem("scannedResults");
    if (storedResults) {
      setScannedResults(JSON.parse(storedResults));
    }
  }, []);

  const handleRemoveItem = (id: string) => {
    const updatedResults = scannedResults.filter((item) => item.id !== id);

    setScannedResults(updatedResults);

    localStorage.setItem("scannedResults", JSON.stringify(updatedResults));
    toast.success("Successfully removed an item");
  };

  return (
    <div className="bg-white rounded-md max-w-screen-2xl mx-auto">
      <Navbar />
      <Separator orientation="horizontal" />
      <Header />
      <Separator orientation="horizontal" />
      <div className="p-8 flex flex-col items-center max-w-screen-md mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <CardDescription>
              All of the data are saved in your browsers local storage.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="border-t-4 border-t-purple-500 rounded-lg p-4 shadow-sm">
                <div className="">
                  <Table>
                    <TableCaption>
                      A list of your recently scanned QR Codes.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">QR Code</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(scannedResults) &&
                        scannedResults.length > 0 &&
                        scannedResults.map((result, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger>
                                    <Image
                                      src={result.src}
                                      width={40}
                                      height={40}
                                      alt={result.src}
                                    />
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle className="text-center py-4">
                                        {result.content.text}
                                      </DialogTitle>
                                      <Separator className="py-4" />
                                      <DialogDescription className="flex justify-center items-center py-4">
                                        <Image
                                          src={result.src}
                                          width={250}
                                          height={250}
                                          alt={result.src}
                                        />
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                              <TableCell>
                                {result.type === "Uploaded Image" ? (
                                  <span className="flex items-center gap-2">
                                    <CiCircleCheck /> {result.type}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <IoCamera /> {result.type}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {result.id.slice(0, 16).split("T").join(" ")}
                              </TableCell>
                              <TableCell>{result.content.text}</TableCell>
                              <TableCell className="flex gap-2">
                                <Button
                                  size="icon"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      result.content.text
                                    );
                                    toast.success("Copied to clipboard!");
                                    setCopy(result.id);
                                    setTimeout(() => {
                                      setCopy("");
                                    }, 2500);
                                  }}
                                >
                                  {copy === result.id ? (
                                    <FaCheck />
                                  ) : (
                                    <FaCopy />
                                  )}
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemoveItem(result.id)}
                                >
                                  <IoTrashBin />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {scannedResults.length == 0 && (
                        <TableCell colSpan={4} className="text-center">
                          <p>
                            There are no items currently.{" "}
                            <span
                              className="underline font-bold cursor-pointer hover:no-underline"
                              onClick={() => {
                                router.push("/");
                              }}
                            >
                              Scan your first QR Code here
                            </span>
                          </p>
                        </TableCell>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
