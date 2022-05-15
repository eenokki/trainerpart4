import React from 'react'
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Schedule from './Schedule';
import Statistics from './Statistics';


function Tabhandler() {
 
    return (
    <Tabs>
        <TabList>
            <Tab>Home</Tab>
            <Tab>Customers</Tab>
            <Tab>Trainings</Tab>
            <Tab>Calendar</Tab>
            <Tab>Statistics</Tab>
        </TabList>
        <TabPanel>
            <h2>Welcome!</h2>
        </TabPanel>
        <TabPanel>
            <Customerlist/>
        </TabPanel>
        <TabPanel>
            <Traininglist/>
        </TabPanel>
        <TabPanel>
            <Schedule/>
        </TabPanel>
        <TabPanel>
            <Statistics/>
        </TabPanel>
    </Tabs>
        )
  }
   
  export default Tabhandler;