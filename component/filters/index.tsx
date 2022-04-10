import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getAllFavoriteEmails,
  setCurrentCategory,
} from '../../redux/slice/emailSlice'
import styles from '../../styles/Filters.module.css'

export default function Filters() {
  const [currentFilter, setCurrentFilter] = useState('Unread')
  const filters = ['Unread', 'Read', 'Favorites']

  const dispatch = useDispatch()

  return (
    <div className={styles.chipContainer}>
      <span className={styles.filterHeading}>Filter By:</span>
      {filters.map((filter: string) => (
        <button
          key={filter}
          className={`${
            filter === currentFilter ? styles.activeFilter : styles.filter
          }`}
          style={{}}
          onClick={() => {
            setCurrentFilter(filter)
            dispatch(setCurrentCategory(filter))
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
