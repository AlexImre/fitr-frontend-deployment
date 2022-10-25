import React, { useState } from 'react'
import { Header } from '../Components/Header/Header';
import { ActivityTimeChart } from '../Components/Charts/ActivityTimeChart';
import { TotalTimeChart } from '../Components/Charts/MonthlyTimeChart';
import { Footer } from '../Components/Footer/Footer';
import './Analytics.css';

export const Analytics = (props) => {
    // GET STATE DATA
    const setAllEvents = props.setAllEvents;
    const allEvents = props.allEvents;
    const activityLog = props.activityLog;
    const monthlyLog = props.monthlyLog;

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

    const [toggleChartView, setToggleChartView] = useState(false);
    const toggleView = (boolean) => {
        setToggleChartView(boolean);
    };

    return (
        <>
        <div className='AnalyticsContainer'>
            <div className='AnalyticsWrapper'>
                <Header toggleActivityMenu={toggleActivityMenu} toggleAddActivityButton={false} setAllEvents={setAllEvents} />

                <div className="AppActivityLogContainer">
                    <button className='AppYearlyView button-6' onClick={() => toggleView(false)}>Yearly</button>
                    <button className='AppMonthlyView button-6' onClick={() => toggleView(true)}>Monthly</button>
                </div>
                <div className='AppChartContainer'>
                    {toggleChartView ? <TotalTimeChart activityLog={activityLog} allEvents={allEvents} monthlyLog={monthlyLog}/> : <ActivityTimeChart allEvents={allEvents} activityLog={activityLog}  /> }
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}