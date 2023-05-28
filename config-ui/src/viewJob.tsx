import React from 'react';
import { Box, FormGroup, Grid, Input, InputLabel, Tab, Tabs, Typography } from '@mui/material';
import Button from '@mui/material/Button';

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
// form data
//             {
      //                 "dag_id": "test_dag_2",
      //                 "dag_description": "test_dag",
      //                 "dag_type": "SFTP",
      //                 "dag_schedule_interval": "@daily",
      //                 "dag_start_date": "2019-01-01",
      //                 "dag_end_date": "2019-12-31",
      //                 "parameters": {
      //                     "sftp_config": {
      //                         "host": "some_host",
      //                         "port": 22,
      //                         "username": "some_username",
      //                         "password": "some_password",
      //                         "remote_path": "/some_remote_path",
      //                         "local_path": "/some_local_path",
      //                         "gcs_bucket": "some_gcs_bucket",
      //                         "gcs_path": "some_gcs_path" 
      //                 }
      //             }
      //         }
      //     ]}
export default function ViewJob(props:any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log("props", props)

    const renderJobs = (jobConfig:any)=>{
        console.log(jobConfig[0]['jobs'], "jobConfig")
       
        const jobConfigs = jobConfig[0]['jobs'].map((job:any, index:number)=>{
            return (
            <Box key={"box_"+index} sx={{ width: '100%' }}>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {job.job_id}
                </Typography> */}
                <Grid key={"grid_"+index} container spacing={2} >
                    <Grid container item xs={6} direction="column" >
                        <InputLabel htmlFor="component-simple">Job ID</InputLabel>
                        <Input id="component-simple" value={job.job_id} />
                        <br />
                        <InputLabel htmlFor="component-simple">Patterns</InputLabel>
                        <Input id="component-simple" value={job.patterns} />
                    </Grid>
                    {/* <Grid container item xs={6} direction="column" >
                        <FormGroup sx={{ width: '100%' }}>
                            <InputLabel htmlFor="component-simple">Date Start Position</InputLabel>
                            <Input id="component-simple" value={job.Parameters.Date_start_position} />
                        </FormGroup>
                        <FormGroup sx={{ width: '100%' }}>
                            <InputLabel htmlFor="component-simple">Date End Position</InputLabel>
                            <Input id="component-simple" value={job.Parameters.Date_end_position} />
                        </FormGroup>
                    </Grid> */}
                </Grid>
                <br/>
            </Box>)
        })
        return (
            <TabPanel value={value} index={2}>
                {jobConfigs}
            </TabPanel>
        )
    }
  return (
    <div>
        
            {props.data &&
        <div>
        <h1>{props.data.dag_type}</h1>
            
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={handleChange}
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab key={0} label={"General"} />
                        <Tab key={1} label={"Parameters"} />
                        <Tab key={2} label={"Jobs"} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                    
                        <Grid container spacing={2}>
                            <Grid container item xs={6} direction="column" >
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG ID</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_id} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Description</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_description} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Type</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_type} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Schedule Interval</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_schedule_interval} />
                                </FormGroup>
                            </Grid>
                            <Grid container item xs={6} direction="column" >
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Start Date</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_start_date} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG End Date</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_end_date} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Owner</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_owner} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Email</InputLabel>
                                    <Input id="component-simple" value={props.data.dag_email} />
                                </FormGroup>
                            </Grid>
                        </Grid>

                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <h2>{props.data['parameters']['sftp_config']}</h2> */}
                    <Grid container spacing={2}>
                        <Grid container item xs={6} direction="column" >
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Host</InputLabel>
                                <Input id="component-simple" value={props.data['parameters']['sftp_config']['host']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Port</InputLabel>
                                <Input id="component-simple" value={props.data['parameters']['sftp_config']['port']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Username</InputLabel>
                                <Input id="component-simple" value={props.data['parameters']['sftp_config']['username']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Password</InputLabel>
                                <Input id="component-simple" value={props.data['parameters']['sftp_config']['password']} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </TabPanel>
                    {renderJobs(props.data.job_config)}
                </Box></div>}
            

        </div>
  );
}