import { Card, CardContent, Grid, Box, CardHeader } from '@mui/material';
import React, { useContext } from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import { PUContext } from '../context/PUContext';

export default function Main() {
    const { pu, searched } = useContext(PUContext);
    return (
        <Box sx={{ flexGrow: 1, height: '100%', marginTop: 2 }}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" >
                        <CardHeader
                            title="Search Here!"
                            subheader="Find your perfect SEP location" />
                        <CardContent>
                            <SearchForm />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* 
                        Results Component
                     */}
                    <Card variant="outlined" sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                        {searched ? (
                            <CardHeader
                                title="Partner Universities" subheader={`Displaying ${pu.results_count} universities`} />)
                            : (
                                <CardHeader title="Partner Universities" />
                            )}
                        <CardContent>
                            <Results />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}