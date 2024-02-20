import { faker } from '@faker-js/faker';
import { AudienceSegments } from './audience_segments';
import { AudienceMeasurementTypes , Array24 } from './audience_measurements';

export class DeviceData {
  [key: string]: unknown;
  constructor() {
    for (const segment in AudienceSegments) {
      const audienceSegment: { [key: string]: Array24<number>} = {};
      for (const measurementType in AudienceMeasurementTypes) {
        audienceSegment[measurementType] = this.generateFakeArray24(measurementType as AudienceMeasurementTypes);
      }
      this[segment] = audienceSegment;
    }
  }

  private generateFakeArray24(measurement: AudienceMeasurementTypes): Array24<number> {
    let max:number;
    let min: number;
    switch (measurement) {
      case AudienceMeasurementTypes.audience_impressions:
        max = 10000;
        min = 0;
        break;
      case AudienceMeasurementTypes.audience_frequency:
        max = 1500;
        min = 1;
        break;
      case AudienceMeasurementTypes.audience_unique_reach:
        max = 3000;
        min = 0;
        break;
      case AudienceMeasurementTypes.audience_exposure:
        max = 5542;
        min = 0;
        break;
      default:
        max = 5000;
        min = 0;
    }
    
    const tmpArray: Array24<number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < 24; i++) {
      const n = faker.number.int({ min, max });
      tmpArray[i] = n;
    }
    return tmpArray;
  }
}