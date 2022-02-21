// Write your code here
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {details, isStaredApp} = props
  const {id, title, date, isStared} = details

  const starApp = () => {
    isStaredApp(id)
  }

  return (
    <li className="app-item">
      <div className="title-date-cont">
        <h1 className="app-title">{title}</h1>

        <p className="date-time">
          {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        className="start-btn"
        type="button"
        onClick={starApp}
        testid="star"
      >
        <img
          src={
            !isStared
              ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
          }
          alt="star"
        />
      </button>
    </li>
  )
}

export default AppointmentItem
