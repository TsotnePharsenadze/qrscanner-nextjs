"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IoMailOutline,
  IoLogoGithub,
  IoSendOutline,
  IoPersonOutline,
  IoInformationCircle,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import sendContact from "@/actions/sendContact";
import { toast } from "sonner";

type FormDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const save = await sendContact(data);
    if (!save) {
      toast.error("Something went wrong! try again later");
    } else {
      toast.success(
        "Thank you for your message! We'll respond to you shortly."
      );
    }

    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="bg-white rounded-md max-w-screen-2xl mx-auto">
      <Navbar />
      <Separator orientation="horizontal" />
      <Header />
      <Separator orientation="horizontal" />

      <div className="p-8 flex flex-col items-center max-w-screen-md mx-auto customEditForContactUsCardWrapper">
        <Card className="w-full customEditForContactUsCard">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              Have questions or feedback? We&apos;d love to hear from you!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <IoInformationCircle className="text-blue-500" />
                Get in Touch
              </h2>
              <p className="text-gray-700">
                Whether you&apos;re experiencing an issue, want to provide
                feedback, or have questions about our QR Scanner, please fill
                out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoPersonOutline className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className={`pl-10 w-full p-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMailOutline className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`pl-10 w-full p-2 border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your.email@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`w-full p-2 border rounded-md ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="What's this about?"
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full p-2 border rounded-md ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your message here..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message as string}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-blue-500 text-sm text-gray-700">
                <p>
                  <strong>Privacy Note:</strong> We value your privacy. Any
                  information you provide will only be used to respond to your
                  inquiry and will not be shared with third parties.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <IoSendOutline
                  className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
                />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6 customEditForAboutUsCardFooter">
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

            <Button variant="outline" onClick={() => router.push("/")}>
              <IoMailOutline className="mr-2" />
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
