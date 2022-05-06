import React, {useEffect, useState }  from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {format, parseISO} from 'date-fns'


function Traininglist(){
    const [trainings, setTrainings] = useState([]);   
    
    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const columns = [
        { 
             Header: 'Activity',
             accessor: 'activity',
         },
         { 
             Header: 'Date',
             accessor: 'date',
            Cell: row =>{return(format(parseISO(row.value), "PP.HH.mm"))}
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
                    .then(data => setParticipant((data.firstname)+' '+(data.lastname)))
                return(participant)       
            }
         }

        ]

  return(

    <div>
        <ReactTable filterable={true} data={trainings} columns={columns}/>
    </div>
  );
}
  export default Traininglist;