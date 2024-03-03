type BloodPressureMeasurement = Omit<Measurement, 'value'> & {
  systolic: number
  diastolic: number
  heartRate: number
}
