import { DeviceData } from "./types";

export function generateFakeDevices(num: number): DeviceData[] {
  const devices: DeviceData[] = [];
  for (let i = 0; i < num; i++) {
    const device = new DeviceData();
    devices.push(device);
  }
  return devices;
}