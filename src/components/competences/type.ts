export interface ICompetencesHeaderType {
  subtitle: string
  title: string
}

export interface ICompetencesType {
  logo: {
    path: string
  }
  name: string
  is_certified: boolean
  certification: string
  master: string
  step: number
}
