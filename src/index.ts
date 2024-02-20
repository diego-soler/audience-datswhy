import { generateFakeDevices } from "./datswhy";


const devices = generateFakeDevices(1);

console.log(JSON.stringify(devices, null, 2));