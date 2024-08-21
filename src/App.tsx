import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardHeader, Chip, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from "react";
import { fetchData } from "./db";
import GridTable from "./components/GridTable";

function ChipTypography({ title, name }: { title: string, name: string }) {
  return (
    <>
      <Chip label={title} />
      <Typography variant="subtitle2" fontWeight={700}>{name}</Typography>
    </>
  )
}


const WorkflowStep = ({ name_title, params_extra }: { name_title: string, params_extra: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(pre => !pre)
  }

  return (
    <Box display='flex' gap={1}>
      <Box>
        <button style={{ display: 'inline-block' }} onClick={handleToggle}>{isOpen ? "➖" : "➕"}</button>
      </Box>
      <Accordion expanded={isOpen} sx={{ width: '100%', '::before': { margin: 0 } }}>
        <AccordionSummary
        >
          {name_title}
        </AccordionSummary>
        <AccordionDetails>
          {
            React.Children.toArray(
              Object.keys(params_extra).filter(el => params_extra[el]).map(el => <div>{el} :
                {
                  typeof params_extra[el] == 'object' ? <> {JSON.stringify(params_extra[el].toString())}</> : params_extra[el]
                }
              </div>)
            )
          }
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};



export default function App(): React.ReactElement {

  const [data, setData] = useState<any[]>([]);
  const { table_headers = [], table_data = [], workflow_steps = [], row_count = 0 }: any = data;

  useEffect(() => {
    (async () => {
      setData(await fetchData() as any)
    })()
  }, [])

  return (
    <Box marginTop={10}>
      <Container maxWidth="xl" >
        <Grid container gap={1}>
          <Grid lg={8} xl={8} md={8} >
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' gap={1} alignItems='center'>
                  <ChipTypography title="Project name" name="ETL New Demo 2" />
                  <ChipTypography title="OutPut Database Name" name="ETL N_02" />
                  <ChipTypography title="Last Run" name="Not Available" />
                </Box>
                <Typography fontWeight={700}>Rows: {row_count}</Typography>
              </CardContent>
              <CardContent>
                <GridTable column={table_headers} row={table_data} />
              </CardContent>
            </Card>
          </Grid>
          <Grid lg={3} xl={3} md={3}>
            <Card>
              <CardContent>
                <Box>
                  <Typography fontWeight={700}>WorkFlow</Typography>
                </Box>
              </CardContent>
              <CardContent>
                <Box>
                  {
                    React.Children.toArray(
                      workflow_steps.map(({ name_title, params_extra }: any) => <WorkflowStep params_extra={params_extra} name_title={name_title} />)
                    )
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
}


