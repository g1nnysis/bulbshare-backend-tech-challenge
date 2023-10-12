export interface FilterCriteria {
  age?: [number, number]
  gender?: string[]
  country?: number[]
}

export interface AggregatedResponse {
  [option: string]: number
}

export interface AverageCompletionResponse {
  average: number
}
