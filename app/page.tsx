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

export default function Home() {
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
            <CardContent className="space-y-2"></CardContent>
            <CardFooter>
              <Button>Save changes</Button>
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
