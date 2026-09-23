import type { ICompetencesHeaderType } from './type'
import type { ICompetencesType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneCompetencesHeader = async (): Promise<ICompetencesHeaderType> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/item/portfoliocompetencesheadersingleton`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': cockpitToken,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as ICompetencesHeaderType
}

export const findAllCompetences = async (): Promise<ICompetencesType[]> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/items/portfoliocompetencescollection`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': cockpitToken,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as ICompetencesType[]
}
