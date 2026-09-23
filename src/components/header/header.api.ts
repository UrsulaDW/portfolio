import type { IHeaderType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneHeader = async (): Promise<IHeaderType> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/item/portfolioheadersingleton`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IHeaderType
}
