import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export const CalendarComponent = (props) => {

  const allEvents = props.allEvents;
  const eventStyleGetter = (event) => {
  let backgroundColor;
  if (event.activity === 'Run') {
    backgroundColor = '#ef476f'
  } else if (event.activity === 'Gym') {
    backgroundColor = '#06d6a0'
  } else if (event.activity === 'Row') {
    backgroundColor = '#ffd166'
  } else if (event.activity === 'Cycle') {
    backgroundColor = '#f78c6b'
  } else if (event.activity === 'Yoga') {
    backgroundColor = '#118ab2'
  } else if (event.activity === 'Other') {
    backgroundColor = '#073b4c'
  }
  var style = {
      backgroundColor: backgroundColor,
      color: 'black',
  };
  return {
      style: style
  };
}

  return (
    <div className='CalendarContainer'>
    <Calendar 
      localizer={localizer}
      views={['month']}
      events={allEvents} 
      startAccessor="start" 
      endAccessor="end" 
      titleAccessor="activity"
      showAllEvents={true}
      allEvents
      enableAutoScroll={true}
      style={{height: 600, margin: 50}} 
      onSelectEvent={props.handleEventSelection}
      eventPropGetter={eventStyleGetter} />
  </div>
  )
}