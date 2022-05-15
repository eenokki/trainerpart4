import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

function Statistics() {
    const [trainings, setTrainings] = React.useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            .catch(err => console.error(err))
    }

    const formattedData = trainings.map((training) => {
        return {
            title: training.activity.toLowerCase(),
            minutes: parseInt(training.duration)
        }
    })

    const data = _(formattedData)
        .groupBy("title")
        .map((value, key) => ({ title: key, minutes: _.sumBy(value, 'minutes') }))
        .value()


    return (
        <div>
 
            <BarChart width={800} height={500} data={data} >
                <Bar dataKey="minutes" fill="#FF5733" >
                </Bar>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
            </BarChart>

        </div>
    );
}
export default Statistics;