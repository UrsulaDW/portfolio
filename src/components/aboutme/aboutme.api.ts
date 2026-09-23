import type { IAboutMeType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneAboutMe = async (): Promise<IAboutMeType> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/item/portfolioaboutmesingleton`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IAboutMeType
}
