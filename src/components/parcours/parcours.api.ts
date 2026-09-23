import type { IParcoursHeaderType } from './type'
import type { IParcoursType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneParcoursHeader = async (): Promise<IParcoursHeaderType> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/item/portfolioparcoursheadersingleton`,
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

  return (await response.json()) as IParcoursHeaderType
}

export const findAllParcours = async (): Promise<IParcoursType[]> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/items/portfolioparcourscollection`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IParcoursType[]
}
