type MeasurementListItem = Omit<MeasurementDto, 'timestamp'> & {
  timestamp: string
}
