export type MeasurementType = 'blood-pressure' | 'hearth-rate'

export const isMeasurementType = (type: string): type is MeasurementType => {
  return ['blood-pressure', 'hearth-rate'].includes(type)
}
