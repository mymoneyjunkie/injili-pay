// src/deviceId.js
// import { v4 as uuidv4 } from 'uuid';

// export const getDeviceId = () => {
//   let deviceId = localStorage.getItem('device_id');
//   if (!deviceId) {
//     deviceId = uuidv4();
//     localStorage.setItem('device_id', deviceId);
//   }
//   return deviceId;
// }

import { v4 as uuidv4 } from 'uuid';

export const getDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    const fullUuid = uuidv4(); // e.g., '2f1c68ec-3ef4-4263-9b11-ec60fc8fc7da'
    const minLength = 9;
    const maxLength = 20;
    const desiredLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    // Trim from start to maintain dash positions
    deviceId = fullUuid.substring(0, desiredLength);
    
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};
