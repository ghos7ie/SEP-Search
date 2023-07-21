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
        o_courses: [],
    });

    const [validationError, setValidationError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [master, setMaster] = useState({
        region: [],
        country: [],
        pu: [],
    });

    const [options, setOptions] = useState({
        region: [],
        country: [],
        faculty: [],
        pu: [],
        courses: [],
        o_courses: [],
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
                const regionData = response.data.data.region.map((item) => ({
                    id: item.id,
                    label: item.name,
                }));
                const countryData = response.data.data.country.map((item) => ({
                    id: item.id,
                    label: item.name,
                    r_id: item.region_id
                }));
                const facultyData = response.data.data.faculty.map((item) => ({
                    id: item.id,
                    label: item.name
                }));
                const puData = response.data.data.pu.map((item) => ({
                    id: item.id,
                    c_id: item.country_id,
                    r_id: String(item.region_id),
                    label: item.name
                }));

                setOptions({
                    region: regionData,
                    country: countryData,
                    faculty: facultyData,
                    pu: puData,
                    courses: courseData,
                    o_courses: courseData
                });
                setMaster({
                    region: regionData,
                    country: countryData,
                    pu: puData,
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

        // Check if the selected courses and o_courses have any common options
        switch (field) {
            // setting up filtering for the region, countries and pu
            case "region":
                // must filter if field is already populated too
                if (formValues.country.length !== 0) {
                    updatedValues.country = formValues.country.filter(c => value.some(r => c.r_id === r));
                }
                // update countries
                options.country = value.length === 0 ? master.country : master.country.filter(c => value.some(r => c.r_id === r.id));
                // must filter if field is already populated too
                if (formValues.pu.length !== 0) {
                    updatedValues.pu = formValues.pu.filter(p => value.some(r => p.r_id === r));
                }
                // update pu
                options.pu = value.length === 0 ? master.pu : master.pu.filter(p => value.some(r => p.r_id === r.id));
                break;
            case "country":
                // if country selected prior, then make sure to add region into region input
                // TODO
                // refilter pu if selected prior to country selection
                if (updatedValues.pu.length !== 0) {
                    updatedValues.pu = updatedValues.pu.filter(p => value.some(c => p.c_id === c));
                }
                // update pu
                options.pu = value.length === 0 ? master.pu : master.pu.filter(p => value.some(c => p.c_id === c.id));
                // if region is filled
                if (formValues.region.length !== 0) {
                    options.pu = options.pu.filter(p => formValues.region.some(r => p.r_id === r));
                }
                break;
            // ensure that selected courses does not appear in both course and o_courses
            case "courses":
                updatedValues.o_courses = updatedValues.o_courses.filter(
                    (id) => !updatedValues[field].includes(id)
                );
                break;
            case 'o_courses':
                updatedValues.courses = updatedValues.courses.filter(
                    (id) => !updatedValues[field].includes(id)
                );
                break;
            default:
                break;
        }

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
                    o_courses: formValues.o_courses,
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
                                label="Essential Courses"
                                placeholder="Select must-maps"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        fullWidth
                        options={options.o_courses}
                        getOptionLabel={(option) => option.label}
                        value={options.o_courses.filter((option) =>
                            formValues.o_courses.includes(option.id)
                        )}
                        onChange={(event, value) =>
                            handleChange("o_courses", value)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Optional Courses"
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
