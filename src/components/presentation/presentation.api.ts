import type { IPresentationType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOnePresentation = async (): Promise<IPresentationType> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/item/portfoliopresentationsingleton`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IPresentationType
}
