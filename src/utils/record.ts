import {
  IFeedLossRecordData,
  IClearLossRecordData,
  IDivideRecordData,
  IPutRecordData,
  ISaleRecordData,
} from '@/request/record/typing';

export function flatRecordRes(
  recordRes: IFeedLossRecordData | IClearLossRecordData | IDivideRecordData | IPutRecordData | ISaleRecordData,
) {
  return flattenObject(recordRes);
}

export function flattenObject(obj: object, result: any = {}) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, result);
    } else {
      result[key] = value;
    }
  }
  return result;
}
