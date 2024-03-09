export type MeasurementType =
  | 'blood-pressure'
  | 'heart-rate'
  | 'blood-oxygen-level'
  | 'temperature'
  | 'mental-health'
  | 'sleep'
  | 'blood-sugar'
  | 'unknown'

export const isMeasurementType = (type: string): type is MeasurementType => {
  return [
    'blood-pressure',
    'heart-rate',
    'blood-oxygen-level',
    'temperature',
    'mental-health',
    'sleep',
    'blood-sugar',
  ].includes(type)
}
