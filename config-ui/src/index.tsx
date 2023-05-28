import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { useEffect, useState } from 'react';
import { Box, Grid, Input, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import AddDag from './AddDAG';
import ViewJob from './viewJob';
import ViewSFTPPwdJob from './sftp/sftpPwd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);




// import Switch from 'react-router';


let datas = [{
                  "dag_id": "test_dag",
                  "dag_description": "test_dag",
                  "dag_type": "SFTP",
                  "dag_schedule_interval": "@daily",
                  "dag_start_date": "2019-01-01",
                  "dag_end_date": "2019-12-31",
                  "parameters": {
                      "sftp_config": {
                          "host": "some_host",
                          "port": 22,
                          "username": "some_username",
                          "password": "some_password",
                          "remote_path": "/some_remote_path",
                          "local_path": "/some_local_path",
                          "gcs_bucket": "some_gcs_bucket",
                          "gcs_path": "some_gcs_path" 
                  }
              },"job_config": [{"jobs": [{"Parameters": {"Date_end_position": "20", "Date_start_position": "13", "File_name_end_position": "12", "File_name_start_position": "9"}, "job_id": "test_job_1"}, {"Parameters": {"Date_end_position": "20", "Date_start_position": "13", "File_name_end_position": "12", "File_name_start_position": "9"}, "job_id": "test_job_2"}]}]
          },
          {
              "dag_id": "test_dag_2",
              "dag_description": "test_dag",
              "dag_type": "SFTP",
              "dag_schedule_interval": "@daily",
              "dag_start_date": "2019-01-01",
              "dag_end_date": "2019-12-31",
              "parameters": {
                  "sftp_config": {
                      "host": "some_host",
                      "port": 22,
                      "username": "some_username",
                      "password": "some_password",
                      "remote_path": "/some_remote_path",
                      "local_path": "/some_local_path",
                      "gcs_bucket": "some_gcs_bucket",
                      "gcs_path": "some_gcs_path" 
              }
          },
          "job_config": [{"jobs": [{"Parameters": {"Date_end_position": "20", "Date_start_position": "13", "File_name_end_position": "12", "File_name_start_position": "9"}, "job_id": "test_job_1"}, {"Parameters": {"Date_end_position": "20", "Date_start_position": "13", "File_name_end_position": "12", "File_name_start_position": "9"}, "job_id": "test_job_2"}]}]
      }]

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{background:"white", color:"black", width:"70%"}}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function Home() {
// add type to data

  const [data, setData] = useState<any>(datas);
  // const [data, setData] = useState(data);
  const [value, setValue] = React.useState(0);
  const [addJobFlag, setAddJobFlag] = useState(false);
  const dagViews:any = {
    "SFTP": ViewSFTPPwdJob,
    "except": ViewJob
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    fetch("http://localhost:8080/mybaseview/data")
      .then(response => response.json())
      .then((data:any) => {
        console.log('data', data["jobs"][0]["dags_description"])
        setData(data["jobs"][0]["dags_description"])
      });
  }
  , [])

  const updateDags = (dag:any, index:number) => {
    let _data = [...data];
    _data[index] = dag;
    setData(_data);
    const finalData = {
      "test_plugin": {
          "jobs": [{
            "dags_description": _data,
            "source": "IERP"
          }]
        }
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      };
    fetch('http://localhost:8080/mybaseview/update-data', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log("updated in backend: ", data)
          setData(data["jobs"][0]["dags_description"])
        });
  }
  console.log(data, " data dagt")
  const renderData = () => {
    let data_html = null;
    console.log(data, " Datarender")
    if (data) {
      const _data:any = data;
      console.log(_data, " _Datarender")
      const tabs = _data.map((item:any, index:number) => {
        return (
          <Tab key={index} label={item.dag_id} {...a11yProps(index)} />
        )
      })
      const tabPanels = _data.map((item:any, index:number) => {
        console.log(item, index, " item, index")
        return (
          <TabPanel key={index} value={value} index={index}>
            {(
              () =>{
                if (item.dag_type === "SFTP"){
                  return <ViewSFTPPwdJob key={"viewJob"+index} data={item} dag_index={index} updateDags={updateDags} />
                } else {
                  return <ViewJob key={"viewJob"+index} data={item} />
                }
              }
            )()}
            
            
            {/* Item {index} - {item.dag_type} */}
            
          </TabPanel>
        )
      })
      console.log(tabPanels, " tabPanels")
      console.log(tabs, " tabs")

      data_html = (
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {tabs}
          </Tabs>
        
        {tabPanels}
      </Box>
      )
      return data_html
    }
    return data_html
  }


  return (
    <>
      {/* <Router>
        <Routes>
        <Route path='/' element={<AddDag />} />
        <Route path='/register' element={<AddDag />} />
        <Route path='/Login' element={<AddDag />} />
        </Routes>
    </Router> */}
      {renderData()}
      <Box style={{background:"white", margin: "auto"}}>
        <Button style={{margin: "4px"}} onClick={()=>setAddJobFlag(!addJobFlag)} variant="contained">Add Job</Button>
          {addJobFlag && 
          
          <Box sx={{
            width: 600,
            height: 600,
            margin: "auto"
          }}>
            <h1> Add Job </h1>
            <Grid container spacing={2}>
              <Grid item xs={8} sm={6}>
                <InputLabel id="demo-simple-select-label">Source</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  label="Source"
                >
                  <MenuItem value={10}>IERP</MenuItem>
                  <MenuItem value={20}>SFTP</MenuItem>
                  <MenuItem value={30}>GCS</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={8} sm={6}>
                <InputLabel id="demo-simple-select-label">DAG Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={10}
                  label="DAG Type"
                >
                  <MenuItem value={10}>SFTP</MenuItem>
                  <MenuItem value={20}>GCS</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={8} sm={6}>
                <InputLabel id="demo-simple-select-label">Dag ID</InputLabel>
                <Input id="dag_id" name="dag_id" />
              </Grid>
              <Grid item xs={8} sm={6}>
                <InputLabel id="demo-simple-select-label">Dag Description</InputLabel>
                <Input id="dag_description" name="dag_description" />
              </Grid>
            </Grid>
          </Box>
    }
      </Box>
    </>
  )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
