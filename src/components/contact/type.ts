export interface IContactHeaderType {
  subtitle: string
  title: string
}

export interface IContactType {
  description: string
  mail: string
  mail_url: string
  mail_logo: {
    path: string
  }
  tel: string
  tel_url: string
  tel_logo: {
    path: string
  }
  mobility: string
  mobility_logo: {
    path: string
  }
  linkedin_url: string
  linkedin_logo: {
    path: string
  }
  git_url: string
  git_logo: {
    path: string
  }
}

export interface IContactFormulaireType {
  name: string
  mail_sender: string
  message: string
  send: string
}
