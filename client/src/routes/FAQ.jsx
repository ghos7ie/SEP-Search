import { Typography, Box, Stack } from '@mui/material';
import React from 'react'

const FAQ = () => {
    return (
        <Box sx={{ flexGrow: 1, height: '100%', marginTop: 2, }}>
            <Typography variant="h3">Frequently Asked Questions</Typography>
            <Stack spacing={2}>
                <div>
                    <Typography variant="h6">1. Where is the data pulled from?</Typography>
                    <Typography variant="body2">
                        <span>
                        The data is pulled from EduRec, under Academics > Global Education > Search Course Mappings.
                        </span>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">2. I cannot find the same results as when I was using EduRec's data.</Typography>
                    <Typography variant="body2">
                        <span>
                            Due to data cleaning etc., some rows of data were removed.
                            <br />
                            <ul>
                                <li>Removed rows without partner universities</li>
                                <li>Renamed several universities to be in line with GRO website</li>
                                <li>Filled PU Module 2 with &#39;-&#39; for those that do not have a module code (esp from IE Business School)</li>
                                <li>One module from National Chiao Tung University (Taiwan) removed due to lack of both partner module and NUS module code</li>
                                <li>32 modules from FASS and CDE removed due to no Partner University present</li>
                                <li>Condensed all alternative mappings (141 new rows)</li>
                                <li>Added course names to those missing + used <code>No_name</code> for those that can&#39;t be found either through NUSMods or Google. (ard 500 rows)</li>
                                <li>Several courses are outdated/not offered in AY2324/have been replaced with newer ones/&quot;upgraded&quot; to higher level. Am deciding to leave as is. (MOSTLY LSM COURSES)<ul>
                                    <li>Course clash such as PF4202 is currently <code>Work Experience Internship</code> but was <code>Safety, Health and Environmental Management</code></li>
                                    <li>PS Courses pulled from <a href="https://fass.nus.edu.sg/chs/wp-content/uploads/sites/3/2020/08/Cohort-2018-List-of-Recognised-Modules.pdf">this website</a></li>
                                </ul>
                                </li>
                            </ul>

                        </span>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">4. I would like to help improve the website!</Typography>
                    <Typography variant="body2">
                        <span>
                            Helloo, I'm open to having someone improve the frontend because I have not included any accessibility features.
                            <br />
                            There were also 2-3 features I had to forgo because I wasn't too sure on how to implement the queries on the SQL side.
                            <br />
                            Please contact me if you're keen!!
                        </span>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">5. How can I contact you?</Typography>
                    <Typography variant="body2">
                        <span>
                            You can contact me on <a href="https://old.reddit.com/user/sep-search/">reddit</a>!
                        </span>
                    </Typography>
                </div>
            </Stack>
        </Box>
    )
}

export default FAQ;