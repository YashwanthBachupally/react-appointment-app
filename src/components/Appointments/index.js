// Write your code here
import {Component} from 'react'
import './index.css'
// import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], titleIp: '', dateIp: ''}

  onNewAppointment = e => {
    e.preventDefault()
    const {titleIp, dateIp} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleIp,
      date: dateIp,
      isStared: false,
    }
    this.setState(prev => ({
      appointmentList: [...prev.appointmentList, newAppointment],
      titleIp: '',
      dateIp: '',
    }))
  }

  isStarApp = id => {
    const {appointmentList} = this.state
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

  render() {
    const {appointmentList, titleIp, dateIp} = this.state

    console.log(dateIp, titleIp)

    return (
      <div className="app-cont">
        <div className="appiontment-card">
          <h1 className="hed">Add appiontment</h1>
          <div className="form-img-cont">
            <form className="form" onSubmit={this.onNewAppointment}>
              <p className="title">Title</p>
              <input type="text" className="title-ip" placeholder="Title" />
              <p className="daate">Date</p>
              <input type="date" className="date-ip" />
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
            <button className="isImp" type="button">
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {appointmentList.map(each => (
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
