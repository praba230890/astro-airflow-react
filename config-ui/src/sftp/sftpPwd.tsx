import React, { useEffect } from 'react';
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

export default function ViewSFTPPwdJob(props:any) {
    const [value, setValue] = React.useState<any>(0);
    const [sftpData, setSftpData] = React.useState(props.data);

    console.log(props.item);
    useEffect(() => {
        const fetchJsonData = async () => {
            // Replace the setTimeout with your actual data fetching logic
            setSftpData(props.data);
          };
      
          fetchJsonData();
    }, [props.item]);
    
    const handleTabChange = (event: React.SyntheticEvent, value:Number) => {
        console.log((event.target as HTMLInputElement).value, value)
        // const value = parseInt((event.target as HTMLInputElement).value);
        setValue(value);

    }


    const handleChange = (event: React.SyntheticEvent) => {
        console.log(event)
        const { name } = event.target as HTMLButtonElement;
        const value = (event.target as HTMLInputElement).value;
        console.log(name,value, " handlechange")
        setSftpData({...sftpData, [name]: value });
    };

    const handleChangeparams = (event: React.SyntheticEvent) => {
        console.log(event)  // for debug only
        const { name, value } = event.target as HTMLInputElement;
        console.log(name, value, " handlechangeparams")
        const paramsSFTPConfig = {...sftpData.parameters.sftp_config, [name]: value };
        const sftpDataParams = {...sftpData.parameters, "sftp_config": paramsSFTPConfig};

        setSftpData({...sftpData, parameters: sftpDataParams });
    }

    const handleJobChange = (event: React.SyntheticEvent, index:any) => {
        const { name, value } = event.target as HTMLInputElement;
        console.log(name, value, " handlechangeparams")
        let jobConfig = sftpData.job_config[0]['jobs'][index];
        jobConfig = {...jobConfig, [name]: value };
        // let jobConfigs = {...sftpData.job_config};
        // jobConfigs[index] =   jobConfig;

        let finalJobConfigs = {...sftpData.job_config};
        finalJobConfigs[0]['jobs'][index] = jobConfig;
        console.log(jobConfig, finalJobConfigs)
        setSftpData({...sftpData, "job_config": finalJobConfigs});
    }

    console.log("props", props)

    const renderJobs = (jobConfig:any)=>{
        console.log(jobConfig[0]['jobs'], "jobConfig")
       
        const jobConfigs = jobConfig[0]['jobs'].map((job:any, index:Number)=>{
            return (
            <Box sx={{ width: '100%' }}>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {job.job_id}
                </Typography> */}
                <Grid container spacing={2} >
                    <Grid container item xs={6} direction="column" >
                        <InputLabel htmlFor="component-simple">Job ID</InputLabel>
                        <Input id="component-simple" name='job_id' onChange={(e)=>handleJobChange(e,index)} value={job.job_id} />
                        <br />
                        <InputLabel htmlFor="component-simple">Patterns</InputLabel>
                        <Input id="component-simple"  name='patterns' onChange={(e)=>handleJobChange(e,index)} value={job.patterns} />
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
                        onChange={handleTabChange}
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab key={0} label={"General"} />
                        <Tab key={1} label={"Parameters"} />
                        <Tab key={2} label={"Jobs"} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <h3>SFTP DAG M</h3>

                        <Grid container spacing={2}>
                            <Grid container item xs={6} direction="column" >
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG ID</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_id' value={sftpData.dag_id} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Description</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_description' value={sftpData.dag_description} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Type</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_type' value={sftpData.dag_type} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Schedule Interval</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_schedule_interval' value={sftpData.dag_schedule_interval} />
                                </FormGroup>
                            </Grid>
                            <Grid container item xs={6} direction="column" >
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Start Date</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_start_date' value={sftpData.dag_start_date} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG End Date</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_end_date' value={sftpData.dag_end_date} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Owner</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_owner' value={sftpData.dag_owner} />
                                </FormGroup>
                                <br/>
                                <FormGroup sx={{ width: '100%' }}>
                                    <InputLabel htmlFor="component-simple">DAG Email</InputLabel>
                                    <Input id="component-simple" onChange={handleChange} name='dag_email' value={sftpData.dag_email} />
                                </FormGroup>
                            </Grid>
                        </Grid>

                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <h2>{sftpData['parameters']['sftp_config']}</h2> */}
                    <Grid container spacing={2}>
                        <Grid container item xs={6} direction="column" >
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Host</InputLabel>
                                <Input id="component-simple"  onChange={handleChangeparams} name='host' value={sftpData['parameters']['sftp_config']['host']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Port</InputLabel>
                                <Input id="component-simple" onChange={handleChangeparams} name='port' value={sftpData['parameters']['sftp_config']['port']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Username</InputLabel>
                                <Input id="component-simple" onChange={handleChangeparams} name='username' value={sftpData['parameters']['sftp_config']['username']} />
                            </FormGroup>
                            <br/>
                            <FormGroup sx={{ width: '100%' }}>
                                <InputLabel htmlFor="component-simple">SFTP Password</InputLabel>
                                <Input  id="outlined-password-input" onChange={handleChangeparams} type='password' name='password' value={sftpData['parameters']['sftp_config']['password']} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </TabPanel>
                {renderJobs(sftpData.job_config)}
            </Box>
            </div>
            
            }
            <br/>
            <Button key={props.dag_index+"_update"} style={{margin: "4px"}} variant="contained" onClick={()=>props.updateDags(sftpData, props.dag_index)}>Update</Button>
            <Button key={props.dag_index+"_delete"} style={{margin: "4px"}} variant="contained">Delete</Button>

        </div>
  );
}