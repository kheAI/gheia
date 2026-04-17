// A simple in-memory store for local demonstration purposes.
// In a production app, use Redis, PostgreSQL, or Firebase.

type SensorReading = {
    nodeId: string;
    timestamp: string;
    metrics: {
      soilMoisture: string;
      temperatureC: string;
      humidity: string;
      lightLevelLux: number;
    };
  };
  
  export const globalSensorData: SensorReading[] = [];
  
  // Helper to get max 10 latest readings
  export function getLatestReadings() {
    return [...globalSensorData].reverse().slice(0, 10);
  }
  
  export function addReading(reading: SensorReading) {
    globalSensorData.push(reading);
    if (globalSensorData.length > 50) {
      globalSensorData.shift(); // Keep it from growing infinitely
    }
  }
  