//About page related stuff

import {
  IoCamera,
  IoQrCode,
  IoShieldOutline,
  IoSpeedometer,
} from "react-icons/io5";

export const privacySecurityLi = [
  "No images or QR code data are uploaded to any server",
  "All processing happens within your browser",
  "No personal data is collected or stored",
  "No cookies are used for tracking purposes",
];

export const technologyStack = [
  {
    title: "React",
    src: "/react.svg",
    alt: "React.js",
  },
  {
    title: "TypeScript",
    src: "/typescript.svg",
    alt: "TypeScript",
  },
  {
    title: "Next.js",
    src: "/nextjs.svg",
    alt: "Next.js",
  },
  {
    title: "Zxing",
    src: "/zxing.svg",
    alt: "Zxing",
  },
];

export const keyFeatures = [
  {
    title: "File Upload Scanning",
    description:
      "Upload QR code images from your device and instantly retrieve the encoded content.",
    icon: IoQrCode,
  },
  {
    title: "Camera Scanning",
    description:
      "Use your device's camera to scan QR codes in real-time without downloading any additional apps.",
    icon: IoCamera,
  },
  {
    title: "Privacy-Focused",
    description:
      "All processing happens directly in your browser. No images or QR code data are sent to any server.",
    icon: IoShieldOutline,
  },
  {
    title: "Fast & Reliable",
    description:
      "Built on Google's ZXing library, providing the most reliable QR code detection available.",
    icon: IoSpeedometer,
  },
];
