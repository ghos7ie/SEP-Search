import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Autocomplete, Stack, Alert, Box, CircularProgress } from '@mui/material';
import searchAPI from '../api/searchAPI';
import { PUContext } from '../context/PUContext';

function FormCard() {
    const [formValues, setFormValues] = useState({
        region: [],
        country: [],
        faculty: [],
        pu: [],
        courses: [],
    });

    const [validationError, setValidationError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [options, setOptions] = useState({
        region: [],
        country: [],
        faculty: [],
        pu: [],
        courses: [],
    });

    const { setPUs, setSearched } = useContext(PUContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await searchAPI.get("/");
                const courseData = response.data.data.courses.map((item) => ({
                    id: item.id,
                    label: `${item.id}: ${item.name}`
                }));
                setOptions({
                    region: response.data.data.region.map((item) => ({
                        id: item.id,
                        label: item.name,
                    })),
                    country: response.data.data.country.map((item) => ({
                        id: item.id,
                        label: item.name,
                        rid: item.region_id
                    })),
                    faculty: response.data.data.faculty.map((item) => ({
                        id: item.id,
                        label: item.name
                    })),
                    pu: response.data.data.pu.map((item) => ({
                        id: item.id,
                        label: item.name
                    })),
                    courses: courseData,
                });
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
        // empty dependency array [], useEffect hook will only run when the component is mounted
    }, []);

    const handleChange = (field, value) => {
        let updatedValues = {
            ...formValues,
            [field]: value.map((option) => option.id),
        };
        setFormValues(updatedValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if at least one non-optional field is selected
        if (formValues.region.length === 0 && formValues.country.length === 0 && formValues.faculty.length === 0 && formValues.courses.length === 0 && formValues.pu.length === 0) {
            setValidationError(true);
            return;
        } else {
            setValidationError(false);
            setLoading(true);
            try {
                const response = await searchAPI.post("/mappings", {
                    region: formValues.region,
                    country: formValues.country,
                    faculty: formValues.faculty,
                    pu: formValues.pu,
                    courses: formValues.courses,
                });
                setLoading(false);
                setPUs(response.data);
                setSearched(true);
            }
            catch (err) { console.error("Error fetching data:", err) }
        }
    };

    return (
        <Box position="relative">

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.region}
                        getOptionLabel={(option) => option.label}
                        value={options.region.filter((option) =>
                            formValues.region.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("region", value)
                        }
                        disabled={formValues.country.length > 0}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Region"
                                placeholder="Select region(s)"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.country}
                        getOptionLabel={(option) => option.label}
                        value={options.country.filter((option) =>
                            formValues.country.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("country", value)
                        }
                        disabled={formValues.region.length > 0}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Country"
                                placeholder="Select country(s)"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.faculty}
                        getOptionLabel={(option) => option.label}
                        value={options.faculty.filter((option) =>
                            formValues.faculty.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("faculty", value)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Faculty"
                                placeholder="Select faculty(s)"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.pu}
                        getOptionLabel={(option) => option.label}
                        value={options.pu.filter((option) =>
                            formValues.pu.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("pu", value)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Partner University"
                                placeholder="Select partner university(s)"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.courses}
                        getOptionLabel={(option) => option.label}
                        value={options.courses.filter((option) =>
                            formValues.courses.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("courses", value)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Courses"
                                placeholder="Select may-maps"
                            />
                        )}
                    />
                    <Alert severity="info">If you have faculty and courses filled but get no results, try to leave faculty empty.</Alert>
                    {validationError && (
                        <Alert severity="error">Please select at least one country, faculty or course!</Alert>
                    )}
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress
                                size={26}
                                color="secondary"
                                sx={{ marginTop: 2 }}
                            />
                        </div>

                    ) : (
                        <Button type="submit" variant="contained" sx={{ marginTop: 2 }} color="primary" fullWidth>
                            Submit
                        </Button>
                    )}
                </Stack>
            </form>
        </Box>
    );
}

export default FormCard;
