import type { IContactHeaderType } from './type'
import type { IContactType } from './type'
import type { IContactFormulaireType } from './type'

import { cockpitApiBaseUrl, cockpitToken } from '@/shared/config.env'

export const findOneContactHeader = async (): Promise<IContactHeaderType> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/item/portfoliocontactheadersingleton`,
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

  return (await response.json()) as IContactHeaderType
}

export const findOneContact = async (): Promise<IContactType> => {
  const response = await fetch(`${cockpitApiBaseUrl}/content/item/portfoliocontactsingleton`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-key': cockpitToken,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  return (await response.json()) as IContactType
}

export const findOneContactFormulaire = async (): Promise<IContactFormulaireType> => {
  const response = await fetch(
    `${cockpitApiBaseUrl}/content/item/portfoliocontactformulairesingleton`,
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

  return (await response.json()) as IContactFormulaireType
}
