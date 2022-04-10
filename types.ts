type From = {
  email: string
  name: string
}
export interface IEmail {
  id: string
  from: From
  date: number
  subject: string
  short_description: string
}

export interface ISelectedEmail {
  id: string
  name: string
  body: string
  subject: string
  date: string
}
