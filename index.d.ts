type ResultPoint = {
  x: number;
  y: number;
  estimatedModuleSize: number;
  count?: number;
};

type QRCodeScanResult = {
  text: string;
  rawBytes: Record<string, number>;
  numBits: number;
  resultPoints: ResultPoint[];
  format: number;
  timestamp: number;
  resultMetadata: Record<string, unknown>;
};
