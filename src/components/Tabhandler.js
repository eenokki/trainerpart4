import React from 'react'
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

function Tabhandler() {
 
    return (
    <Tabs>
        <TabList>
            <Tab>Home</Tab>
            <Tab>Customers</Tab>
            <Tab>Trainings</Tab>
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
    </Tabs>
        )
  }
   
  export default Tabhandler;