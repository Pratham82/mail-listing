import { useSelector } from 'react-redux'
import styles from '../../styles/Emails.module.css'
import { IEmail } from '../../types'
import { getFormattedDate } from '../../utils/emailUtils'
import { RootState } from '../../redux/store'

export default function Email({ data, selectedId, bodyData }) {
  const {
    id,
    from: { name, email },
    date,
    subject,
    short_description,
  }: IEmail = data
  const { favorites, read } = useSelector((state: RootState) => state.email)
  const isRead = read.includes(id)
  const isFav = favorites.includes(id)
  console.log(isRead)

  return (
    <div
      className={`${
        selectedId === id ? styles.selectedEmail : styles.emailCard
      } ${isRead && styles.readEmail}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=E54065&color=FFF`}
          className={styles.avatar}
          alt=""
        />
      </div>
      <div className={styles.emailDetails}>
        <span>
          From:{' '}
          <span className={styles.boldText}>
            {name} {`<${email}>`}
          </span>{' '}
        </span>
        <span>
          Subject:
          <span className={styles.boldText}>{subject}</span>
        </span>
        <span
          className={`${bodyData.id !== '' && styles.shortenedDescription} ${
            styles.description
          }`}
        >
          {short_description}
        </span>
        <span className={styles.pt10}>{getFormattedDate(date)}</span>
        <span className={`${styles.pt10} ${isFav && styles.favoriteEmail}`}>
          {isFav && 'Favorite'}
        </span>
      </div>
    </div>
  )
}
