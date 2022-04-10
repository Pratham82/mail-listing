import moment from 'moment'

export const getFormattedDate = (date: number) => {
  const day_month = moment.unix(date).format('DD/MM/')
  const year = moment(date).get('year')
  const time = moment(date).format('hh:mmA')
  return `${day_month}${year} ${time}`
}

export const getTotalPages = posts => Math.ceil(posts / 10)

export const getPaginationArr = pages => Array(pages).fill(0)
