import React, { useContext } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, Chip, Stack, Alert, TableContainer, Table, TableCell, Paper, TableHead, TableRow, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PUContext } from '../context/PUContext';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import PublicIcon from '@mui/icons-material/Public';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Results() {
    const { pu, searched } = useContext(PUContext);
    const items = pu?.data?.results || [];
    const render = [];
    if (searched && pu.results_count > 0) {
        Object.keys(items).map((uni, index) => (
            render.push(
                <Accordion key={`${uni}_${index}`} TransitionProps={{ timeout: 150 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{uni}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                                <Chip label={items[uni][0].region} color="secondary" icon={<PublicIcon />} size="small" />
                                <Chip label={items[uni][0].country} color="warning" icon={<FlagCircleIcon />} size="small" />
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table size="small" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NUS Course</TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell align="right">Units</TableCell>
                                            <TableCell>PU Course</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Units</TableCell>
                                            <TableCell align="right">Pre-approved?</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {items[uni].map((item, subIndex) => (
                                            <TableRow key={subIndex} >
                                                <TableCell component="th" scope="row">{item.nus_course_id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="right">{item.nus_course_units}</TableCell>
                                                <TableCell>{item.pu_course}</TableCell>
                                                <TableCell>{item.pu_course_name}</TableCell>
                                                <TableCell align="right">{item.pu_course_units}</TableCell>
                                                <TableCell align="right">{item.pre_approved ? (
                                                    <CheckIcon style={{ color: 'green' }} />
                                                ) : (
                                                    <CloseIcon style={{ color: 'red' }} />
                                                )}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            )
        ))
    }
    return (
        <div>
            {pu.results_count > 0 ? (
                <List>{render}</List>
            ) : (
                <div>
                    {searched ? (
                        <Alert severity="warning">Please refine your search! We could not find a suitable PU for you :(</Alert>
                    ) : (
                        <Alert severity="info">Please start your search</Alert>
                    )}
                </div>
            )}
        </div>
    );
}