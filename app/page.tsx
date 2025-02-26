"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiCircleCheck } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import {
  IoArrowBack,
  IoCloseCircleOutline,
  IoCopy,
  IoDocumentLockOutline,
  IoQrCode,
} from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phaseUpload, setPhaseUpload] = useState<number>(1);
  const [customError, setCustomError] = useState<string>("");

  const handleImageUpload = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const getContent = () => {
    if (uploadedImage) {
      setPhaseUpload(2);
    } else {
      setCustomError("Please upload image to proceed");
    }
  };

  return (
    <div className=" bg-white rounded-md max-w-screen-2xl mx-auto">
      <Navbar />
      <Separator orientation="horizontal" />
      <Header />
      <Separator orientation="horizontal" />
      <Tabs
        defaultValue="upload"
        className="p-8 flex flex-col justify-center items-center max-w-screen-md mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload an image</TabsTrigger>
          <TabsTrigger value="take">Take a picture</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="max-w-screen-md w-full">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR code from image</CardTitle>
              <CardDescription>
                Simply upload an image or take a photo of a QR code to reveal
                its content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 mt-2">
              <div
                className={`border-t-4 rounded-lg p-2 ${
                  phaseUpload == 1
                    ? "border-t-yellow-500"
                    : "border-t-green-500"
                } ${customError && "border border-red-500"} shadow-xl`}
              >
                <div className="flex justify-between">
                  <h1 className="flex items-center gap-2">
                    {phaseUpload == 1 ? (
                      <>
                        <CiCircleCheck /> Select QR Image
                      </>
                    ) : (
                      <>
                        <IoQrCode /> Scanned Data
                      </>
                    )}
                  </h1>
                  {phaseUpload === 2 && (
                    <Button
                      variant="link"
                      onClick={() => {
                        setPhaseUpload(1);
                      }}
                      className="flex items-center gap-2"
                    >
                      <IoArrowBack /> Go back
                    </Button>
                  )}
                </div>

                <div className="bg-gray-50 p-2">
                  <div className="border-2 border-dashed">
                    {phaseUpload == 1 &&
                      (!uploadedImage ? (
                        <label
                          htmlFor="fileUpload"
                          className="flex flex-col justify-center items-center gap-y-2  p-2 cursor-pointer"
                        >
                          <Image
                            src="/web/upload.webp"
                            alt="Upload Image"
                            width="100"
                            height="100"
                          />
                          <div>
                            <p className="text-sm font-bold">Browse</p>
                            <p className="text-xs text-gray-500">
                              All image types are allowed
                            </p>
                          </div>
                        </label>
                      ) : (
                        <div className="p-2 flex justify-center items-center">
                          <div className="relative">
                            <Image
                              src={uploadedImage}
                              alt="Uploaded Image"
                              width="100"
                              height="100"
                            />
                            <button
                              type="button"
                              className="bg-red-500 text-white w-5 h-5 rounded-full absolute -top-[10px] -right-[15px] hover:bg-red-400 flex justify-center items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedImage("");
                              }}
                            >
                              <IoCloseCircleOutline />
                            </button>
                          </div>
                        </div>
                      ))}
                    {phaseUpload == 2 && <Textarea />}
                  </div>
                </div>

                {phaseUpload === 1 && (
                  <>
                    <Input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <i className="text-sm text-gray-400 flex items-center gap-2">
                      <IoDocumentLockOutline />
                      Built with the most used and secure{" "}
                      <a
                        className="underline cursor-pointer"
                        href="https://www.npmjs.com/package/@zxing/library"
                      >
                        Google's Zxing library
                      </a>
                      .
                    </i>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {phaseUpload == 1 ? (
                <Button
                  onClick={() => getContent()}
                  className={`${customError && "border border-red-500"}`}
                >
                  <FaPlus />
                  Get content
                </Button>
              ) : (
                <Button variant="default" size="lg">
                  <IoCopy /> COPY RESULTS
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="take" className="max-w-screen-md w-full">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1"></div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
