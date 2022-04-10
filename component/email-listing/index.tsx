import axios from 'axios'
import styles from '../../styles/Emails.module.css'
import { useEffect, useState } from 'react'
import Email from '../email'
import { IEmail } from '../../types'
import EmailBody from '../email-body'
import { useDispatch, useSelector } from 'react-redux'
import { addToRead, getAllEmails, getEmail } from '../../redux/slice/emailSlice'
import { RootState } from '../../redux/store'
import { Status } from '../../redux/constant'
import { getPaginationArr, getTotalPages } from '../../utils/emailUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

export default function EmailListing() {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const { list, total, status, favorites, read, category } = useSelector(
    (state: RootState) => state.email
  )

  const selectedEmail = useSelector(
    (state: RootState) => state.email.selectedEmail
  )
  const { id } = selectedEmail

  useEffect(() => {
    dispatch(getAllEmails(page))
  }, [page])

  if (status === Status.PENDING) {
    return <>Fetching emails.. </>
  }

  const getFilteredEmails = (arr, category: string) => {
    let emails = list
    if (category === 'Favorites') {
      emails = arr.filter(({ id }) => favorites.includes(id))
    }
    if (category === 'Read') {
      emails = arr.filter(({ id }) => read.includes(id))
    }
    return emails
  }

  const emails = getFilteredEmails(list, category)

  return (
    <>
      <div className={styles.emailContainer}>
        <div className={styles.emailList}>
          {emails.map(email => (
            <div
              key={email.id}
              onClick={() => {
                dispatch(addToRead(email.id))
                dispatch(
                  getEmail({
                    id: email.id,
                    name: email.from.name,
                    date: email.date,
                    subject: email.subject,
                  })
                )
              }}
            >
              <Email data={email} bodyData={selectedEmail} selectedId={id} />
            </div>
          ))}
        </div>
        {id && <EmailBody bodyData={selectedEmail} />}
      </div>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={styles.paginationBtn}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      {getPaginationArr(getTotalPages(total)).map((_, i) => (
        <button
          key={Math.random()}
          className={
            page === i + 1 ? styles.activePaginationBtn : styles.paginationBtn
          }
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        className={styles.paginationBtn}
        disabled={getTotalPages(total) === page}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </>
  )
}
