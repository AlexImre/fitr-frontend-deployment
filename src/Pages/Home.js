import './Home.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { AddActivity } from '../Components/AddActivity/AddActivity';
import { Header } from '../Components/Header/Header';
import { CalendarComponent } from '../Components/Calendar/CalendarComponent';
import { Footer } from '../Components/Footer/Footer';

export function Home(props) {
    // STATE VARIABLES
    const newEvent = props.newEvent;
    const setNewEvent = props.setNewEvent;
    const allEvents = props.allEvents;
    const setAllEvents = props.setAllEvents;

    // FUNCTIONS
    const [showAddActivityMenu, setShowAddActivityMenu] = useState(false);
    const toggleActivityMenu = () => {
        if(showAddActivityMenu) {
            setShowAddActivityMenu(false);
            return;
        } else {
            setShowAddActivityMenu(true);
        }
    };

    const handleAddEvent = () => {
        if (newEvent.length === 0 || newEvent.length > 500) {
            window.alert('Please enter valid length of activity.');
            return;
        }
        if(!newEvent.activity) {
            window.alert('Please select valid activity.');
            return;
        }
    }

    // DELETE ACTIVITY
    const updateStateAfterDeletingEvent = (e) => {
        const updatedAllEventsArray = allEvents.filter((element) => element._id !== e._id);
        setAllEvents(updatedAllEventsArray);
    }

    const handleEventSelection = async (e) => {
        console.log(e);
        const request = window.confirm("Would you like to remove this activity?");
        const eventId = e._id;
        console.log(eventId);
        if (request) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: eventId })
            };
            await fetch('/delete', requestOptions)
                .then(updateStateAfterDeletingEvent(e));
        }
    }

    return (
        <>
        <div 
            className='HomeContainer' 
            id='blur'
            style={showAddActivityMenu ? {
                    filter: 'blur(5px)',
                    PointerEvents: 'none', 
                    userSelect: 'none'} : {filter: 'none'}}>
            <div className='HomeWrapper'>
                {/* HEADER SECTION */}
                <Header toggleActivityMenu={toggleActivityMenu} toggleAddActivityButton={true} setAllEvents={setAllEvents} />

                {/* CALENDAR SECTION */}
                <CalendarComponent 
                    newEvent={newEvent}
                    allEvents={allEvents}
                    handleEventSelection={handleEventSelection} />
            </div>

            {/* FOOTER SECTION */}
            <Footer />
        </div>

        {/* ADDACTIVITY SECTION */}
        <div className='AppAddActivityContainer'>
            {showAddActivityMenu ? <AddActivity newEvent={newEvent} allEvents={allEvents} setAllEvents={setAllEvents} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} toggleActivityMenu={toggleActivityMenu} /> : '' }
        </div>
        </>
    );
}