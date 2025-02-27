"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  IoCalendarOutline,
  IoCamera,
  IoCodeSlash,
  IoInformation,
  IoInformationCircle,
  IoLogoGithub,
  IoMailOutline,
  IoQrCode,
  IoShieldCheckmark,
  IoShieldOutline,
  IoSpeedometer,
  IoStarOutline,
} from "react-icons/io5";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { keyFeatures, privacySecurityLi, technologyStack } from "@/data";

export default function About() {
  const router = useRouter();
  return (
    <div className="bg-white rounded-md max-w-screen-2xl mx-auto">
      <Navbar />
      <Separator orientation="horizontal" />
      <Header />
      <Separator orientation="horizontal" />

      <div className="p-8 flex flex-col items-center max-w-screen-md mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              About QR Scanner
            </CardTitle>
            <CardDescription>
              A powerful, secure QR code scanner built with modern web
              technologies
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <IoInformationCircle className="text-blue-500" />
                About This App
              </h2>
              <p className="text-gray-700">
                QR Scanner is a web application designed to provide fast,
                secure, and reliable QR code scanning capabilities directly in
                your browser. Whether you need to scan a QR code from an image
                file or capture one using your device's camera, this tool makes
                the process simple and efficient.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <IoStarOutline className="text-yellow-500" />
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      {<feature.icon className="text-green-500" />}
                      {feature.title}
                    </div>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <IoCodeSlash className="text-purple-500" />
                Technology Stack
              </h2>
              <div className="border-t-4 border-t-purple-500 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {technologyStack.map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-2">
                      <div className="w-12 h-12 flex items-center justify-center mb-2">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={40}
                          height={40}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <IoShieldCheckmark className="text-green-500" />
                Privacy & Security
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-green-500">
                <p className="text-gray-700">
                  We take your privacy seriously. This QR scanner works entirely
                  client-side, meaning:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  {privacySecurityLi.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <IoInformation />
                Version 1.0.0
              </div>
              <div className="flex items-center gap-2">
                <IoCalendarOutline />
                Last Updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() =>
                window.open(
                  "https://github.com/TsotnePharsenadze/qrscanner-nextjs"
                )
              }
            >
              <IoLogoGithub className="mr-2" />
              View on GitHub
            </Button>

            <Button onClick={() => router.push("/contact")}>
              <IoMailOutline className="mr-2" />
              Contact Us
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
