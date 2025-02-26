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
  IoCamera,
} from "react-icons/io5";
import Image from "next/image";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phaseUpload, setPhaseUpload] = useState<number>(1);
  const [customError, setCustomError] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setUploadedImageFile(file);
      e.target.value = "";
    }
  };

  const processImage = async (imageSrc: string) => {
    setIsLoading(true);
    setCustomError("");

    try {
      const image = new window.Image();
      image.src = imageSrc;

      image.onload = async () => {
        try {
          const codeReader = new BrowserMultiFormatReader();
          const result = await codeReader.decodeFromImageElement(image);
          setResult(result.getText());
          toast.success("QR code scanned successfully!");
          setPhaseUpload(2);
        } catch {
          setResult("No QR code found");
          toast.error("No QR code detected in the image");
        } finally {
          setIsLoading(false);
        }
      };
    } catch {
      toast.error("Failed to process image");
      setIsLoading(false);
    }
  };

  const getContent = () => {
    if (!uploadedImageFile) {
      setCustomError("Please upload an image to proceed");
      toast.error("Failed to upload image");
      return;
    }
    processImage(URL.createObjectURL(uploadedImageFile));
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    setPhaseUpload(1);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      toast.error("Camera access denied or unavailable");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, 300, 300);
      const imageSrc = canvasRef.current.toDataURL("image/png");
      setUploadedImage(imageSrc);
      processImage(imageSrc);
    }

    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  return (
    <div className="bg-white rounded-md max-w-screen-2xl mx-auto">
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
                  phaseUpload === 1
                    ? "border-t-yellow-500"
                    : "border-t-green-500"
                } ${customError && "border border-red-500"} shadow-xl`}
              >
                <div className="flex justify-between">
                  <h1 className="flex items-center gap-2">
                    {phaseUpload === 1 ? (
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
                        setResult("");
                      }}
                      className="flex items-center gap-2"
                    >
                      <IoArrowBack /> Go back
                    </Button>
                  )}
                </div>

                <div className="bg-gray-50 p-2">
                  <div className="border-2 border-dashed">
                    {phaseUpload === 1 &&
                      (!uploadedImage ? (
                        <label
                          htmlFor="fileUpload"
                          className="flex flex-col justify-center items-center gap-y-2 p-2 cursor-pointer"
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
                              className="bg-red-500 text-white w-4 h-4 rounded-full absolute -top-[10px] -right-[12px] hover:bg-red-400 flex justify-center items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedImage("");
                                setUploadedImageFile(null);
                              }}
                            >
                              <IoCloseCircleOutline />
                            </button>
                          </div>
                        </div>
                      ))}
                    {phaseUpload === 2 && <Textarea value={result} readOnly />}
                  </div>
                </div>

                {phaseUpload === 1 && (
                  <>
                    <Input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <i className="text-sm text-gray-400 flex items-center gap-2">
                      <IoDocumentLockOutline />
                      Built with the most used and secure{" "}
                      <a
                        className="underline cursor-pointer"
                        href="https://www.npmjs.com/package/@zxing/library"
                      >
                        Google&apos;s Zxing library
                      </a>
                      .
                    </i>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {phaseUpload === 1 ? (
                <Button
                  onClick={getContent}
                  className={`${customError && "border border-red-500"}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <FaPlus /> Get content
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <IoCopy /> COPY RESULTS
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="take" className="max-w-screen-md w-full">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code using Webcam</CardTitle>
              <CardDescription>
                Use your webcam to scan QR codes in real-time and get the
                content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 mt-2">
              <div
                className={`border-t-4 rounded-lg p-2 ${
                  phaseUpload === 1
                    ? "border-t-yellow-500"
                    : "border-t-green-500"
                } ${customError && "border border-red-500"} shadow-xl`}
              >
                <div className="flex justify-between">
                  <h1 className="flex items-center gap-2">
                    {phaseUpload === 1 ? (
                      <>
                        <IoCamera /> Open Webcam
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
                        setResult("");
                      }}
                      className="flex items-center gap-2"
                    >
                      <IoArrowBack /> Go back
                    </Button>
                  )}
                </div>

                <div className="bg-gray-50 p-2">
                  <div className="border-2 border-dashed">
                    {phaseUpload === 1 && !isCameraActive ? (
                      <div className="flex flex-col justify-center items-center gap-y-2 p-2 cursor-pointer">
                        <Button
                          onClick={startCamera}
                          className="flex items-center gap-2"
                        >
                          <IoCamera /> Open Webcam
                        </Button>
                        <p className="text-sm text-gray-500">
                          Click to activate your webcam and start scanning QR
                          codes.
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        {isCameraActive && (
                          <video
                            ref={videoRef}
                            className="border-2 rounded-lg w-full"
                            width="300"
                            height="200"
                            autoPlay
                            muted
                          ></video>
                        )}
                        {isCameraActive && (
                          <Button
                            onClick={capturePhoto}
                            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white"
                          >
                            <IoQrCode /> Capture & Scan
                          </Button>
                        )}
                      </div>
                    )}
                    {phaseUpload === 2 && <Textarea value={result} readOnly />}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {phaseUpload === 1 ? (
                <Button
                  onClick={startCamera}
                  className={`${customError && "border border-red-500"}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <FaPlus /> Start Scanning
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <IoCopy /> COPY RESULTS
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
