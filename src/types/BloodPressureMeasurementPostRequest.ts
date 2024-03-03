type BloodPressureMeasurementPostRequest = Omit<
  BasicMeasurementPostRequest,
  'value'
> & {
  systolic: number
  diastolic: number
  heartRate: number
}
