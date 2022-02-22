// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], titleIp: '', dateIp: '', showStarred: false}

  filterStared = () => {
    const {showStarred} = this.state
    this.setState({showStarred: !showStarred})
  }

  isStarApp = id => {
    // const {appointmentList} = this.state
    this.setState(prev => ({
      appointmentList: prev.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  onEnterTitle = e => {
    this.setState({titleIp: e.target.value})
  }

  onEnterDate = e => {
    this.setState({dateIp: e.target.value})
  }

  onNewAppointment = e => {
    e.preventDefault()
    const {titleIp, dateIp} = this.state

    const formatedDate = dateIp
      ? format(new Date(dateIp), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleIp,
      date: formatedDate,
      isStared: false,
    }
    this.setState(prev => ({
      appointmentList: [...prev.appointmentList, newAppointment],
      titleIp: '',
      dateIp: '',
    }))
  }

  getStarred = () => {
    const {appointmentList, showStarred} = this.state
    if (showStarred) {
      return appointmentList.filter(each => each.isStared === true)
    }
    return appointmentList
  }

  render() {
    const {titleIp, dateIp, showStarred} = this.state
    const appointments = this.getStarred()
    console.log(dateIp, titleIp)
    const staredClass = showStarred ? 'showImp' : ''
    return (
      <div className="app-cont">
        <div className="appiontment-card">
          <h1 className="hed">Add appiontment</h1>
          <div className="form-img-cont">
            <form className="form" onSubmit={this.onNewAppointment}>
              <p className="title">Title</p>
              <input
                type="text"
                className="title-ip"
                placeholder="Title"
                value={titleIp}
                onChange={this.onEnterTitle}
              />
              <p className="daate">Date</p>
              <input
                type="date"
                className="date-ip"
                value={dateIp}
                onChange={this.onEnterDate}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              className="ppl-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line-br" />
          <div className="bottom-hed">
            <p className="appintment">Appointment</p>
            <button
              className={`isImp ${staredClass}`}
              type="button"
              onClick={this.filterStared}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {appointments.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                isStaredApp={this.isStarApp}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
