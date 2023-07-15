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
                            You can check my <a href="https://github.com/ghos7ie/SEP-Search">repository page</a> for more information on data removed!
                        </span>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">3. Why is your FAQ so bare?</Typography>
                    <Typography variant="body2">
                        <span>
                            I don't know what else to put.
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
                            Contact me at <a href="mailto:elyreumcode@gmail.com">elyreumcode@gmail.com</a>
                        </span>
                    </Typography>
                </div>
            </Stack>
        </Box>
    )
}

export default FAQ;