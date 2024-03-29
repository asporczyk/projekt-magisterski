import type { MeasurementItem } from '@/types/MeasurementItem'

export const AvailableMeasurements: MeasurementItem[] = [
  {
    name: 'blood-pressure',
    color: 'red-darken-4',
    icon: 'mdi-water',
  },
  {
    name: 'heart-rate',
    color: 'blue-lighten-4',
    icon: 'mdi-pulse',
  },
  {
    name: 'blood-oxygen-level',
    color: 'green-lighten-4',
    icon: 'mdi-heart-pulse',
    notYetImplemented: true,
  },
  {
    name: 'temperature',
    color: 'orange-lighten-4',
    icon: 'mdi-thermometer',
  },
  {
    name: 'mental-health',
    color: 'purple-lighten-4',
    icon: 'mdi-emoticon-happy',
    notYetImplemented: true,
  },
  {
    name: 'sleep',
    color: 'blue-grey-lighten-4',
    icon: 'mdi-sleep',
    notYetImplemented: true,
  },
  {
    name: 'blood-sugar',
    color: 'amber-lighten-4',
    icon: 'mdi-blood-bag',
    notYetImplemented: true,
  },
]
