import { MultiSelect, Button, Title, Stack, createStyles} from '@mantine/core';
import PUFinder from '../api/PUFinder';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Country, Course, Faculty, Region, Search, SearchContext } from '../context/SearchContext';


const useStyles = createStyles((theme, _params, getRef) => ({
    multiselect: {
        width: 450
    }
}));

export default function FormSEP() {
    const { classes } = useStyles();
    const { search, setSearch } = useContext(SearchContext);
    // must use string[] cuz mantineUI cute
    const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [selectedOptionalCourses, setSelectedOptionalCourses] = useState<string[]>([]);

    // Pulling api data and population
    try {
        useEffect(() => {
            const data = async () => {
                await PUFinder.get("").then((response) => {
                    setSearch({
                        region: response.data.data.region,
                        country: response.data.data.country,
                        faculty: response.data.data.faculty,
                        com_courses: response.data.data.courses,
                        op_courses: response.data.data.courses
                    });
                });

            }
            data();
        }, [setSearch]);
    } catch (e) { console.error("Error fetching field data:", e); }

    return (
        <Stack spacing="xl">
            <Title order={2}>Partner University Filter</Title>
            <form style={{ width: '100%' }}>
                <MultiSelect
                    data={
                        search && search.region.map((region: Region) => ({
                            value: region.id,
                            label: region.name
                        }))} radius="lg" size="md"
                    label="Region" placeholder="Select your region"
                    searchable nothingFound="Nothing found"
                    clearButtonProps={{ 'aria-label': 'Clear selection' }} clearable
                    withAsterisk
                    value={selectedRegion}
                    onChange={e => setSelectedRegion(e)}
                />
                <MultiSelect
                    data={
                        search && search.country.map((country: Country) => ({
                            value: country.id,
                            label: country.name,
                        }))}
                    mt="md" radius="lg" size="md"
                    label="Country" placeholder="Select your country"
                    searchable nothingFound="Nothing found"
                    clearButtonProps={{ 'aria-label': 'Clear selection' }} clearable
                    withAsterisk
                />
                <MultiSelect
                    data={
                        search && search.faculty.map((faculty: Faculty) => ({
                            value: faculty.id,
                            label: faculty.name,
                        }))}
                    mt="md" radius="lg" size="md"
                    label="Faculty" placeholder="Select your faculty"
                    searchable nothingFound="Nothing found"
                    clearButtonProps={{ 'aria-label': 'Clear selection' }} clearable
                    withAsterisk />
                <MultiSelect
                    data={
                        search && search.com_courses.map((course: Course) => ({
                            value: course.id,
                            label: `${course.id}: ${course.name}`,
                        }))}
                    mt="md" radius="lg" size="md"
                    label="Compulsory Courses" placeholder="For the must map"
                    searchable nothingFound="Nothing found"
                    clearButtonProps={{ 'aria-label': 'Clear selection' }} clearable
                    dropdownPosition="top"
                    maxDropdownHeight={200}
                    withAsterisk />
                <MultiSelect
                    data={
                        search && search.op_courses.map((course: Course) => ({
                            value: course.id,
                            label: `${course.id}: ${course.name}`,
                        }))}
                    mt="md" radius="lg" size="md"
                    label="Optional Courses" placeholder="For the may-maps"
                    searchable nothingFound="Nothing found"
                    clearButtonProps={{ 'aria-label': 'Clear selection' }} clearable
                    dropdownPosition="top"
                    maxDropdownHeight={200} limit={25}
                />
                <Button mt="xl" radius="lg" color="teal" fullWidth>Search!</Button>
            </form>
        </Stack>
    );
}