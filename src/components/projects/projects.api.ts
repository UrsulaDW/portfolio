import type { IProjectsHeaderType } from './type'
import type { IProjectsType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneProjectsHeader = async (): Promise<IProjectsHeaderType> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/item/portfolioprojectsheadersingleton`,
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

  return (await response.json()) as IProjectsHeaderType
}

export const findAllProjects = async (): Promise<IProjectsType[]> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/items/portfolioprojectscollection`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IProjectsType[]
}
