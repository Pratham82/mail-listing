import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../redux/constant'
import {
  addToFavorites,
  removeSelectedEmail,
} from '../../redux/slice/emailSlice'
import { RootState } from '../../redux/store'
import styles from '../../styles/Emails.module.css'
import { getFormattedDate } from '../../utils/emailUtils'

export default function EmailBody({ bodyData }) {
  const { id, name, subject, date, body } = bodyData
  const { emailStatus } = useSelector((state: RootState) => state.email)
  const dispatch = useDispatch()
  return (
    <div className={styles.emailBody}>
      {emailStatus === Status.PENDING ? (
        <div>Loading Email...</div>
      ) : (
        <>
          <section className={styles.imageContainer}>
            <img
              src={`https://ui-avatars.com/api/?name=${name}&background=E54065&color=FFF`}
              className={styles.avatar}
              alt=""
            />
            <div className={styles.subjectContainer}>
              <span className={styles.subjectHeader}>{subject}</span>
              <p>{getFormattedDate(date)}</p>
              {id}
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.favoriteBtn}
                onClick={() => dispatch(addToFavorites(bodyData.id))}
              >
                Mark as Favorite
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => dispatch(removeSelectedEmail())}
              >
                Close
              </button>
            </div>
          </section>
          <section
            className={styles.bodySection}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </>
      )}
    </div>
  )
}
