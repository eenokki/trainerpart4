import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { format, parseISO } from 'date-fns'
import { Button } from "uiw";

import Edittraining from './Edittraining';


function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    //const [participant, setParticipant] = useState('');

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
        }
    }

    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity',
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => { return (format(parseISO(row.value), "PP. HH:mm")) }
        },
        {
            Header: 'Duration',
            accessor: 'duration',
        },
        {
            Header: 'Participant',
            accessor: 'links[2].href',
            Cell: row => {
                const [participant, setParticipant] = useState('');
                    fetch(row.value)
                    .then(response => response.json())
                    .then(data => setParticipant((data.firstname) + ' ' + (data.lastname)))
                return (participant)
            }
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Edittraining updateTraining={updateTraining} training={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button type="danger" style={{ margin: 10 }} icon="delete" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>
        }

    ]

    return (

        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}
export default Traininglist;