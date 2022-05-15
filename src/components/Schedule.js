import React, {useEffect, useState} from 'react';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addMinutes from 'date-fns/addMinutes';

function Schedule(props) {
    const [trainings, setTrainings] = React.useState([]);   
    
    useEffect(() => {
        fetchData()
    });

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch((err)=> console.error(err));
    }

    const event = trainings.map((training) =>{

        return {
            title: training.activity + " - " + training.customer.firstname + " "
            + training.customer.lastname,
        
            start: new Date(training.date),

            end: addMinutes(new Date (training.date), parseInt(training.duration)),
        }
    })


    const locales = {
        'en-US': enUS,
      }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={event} 
                style={{ height: 750 }}
                startAccessor="start"
                endAccessor="end" 
                views={['month','week','day']}
            />
        </div>
    )
}
export default Schedule;