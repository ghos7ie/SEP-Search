require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

// takes json from req and converts it to normal js object
app.use(express.json());
app.use(cors());

/**************************
 **************************
 * API Routes
 **************************
 **************************/

// get all form fields
// runs when the page is first opened
app.get("/api/v1", async (req, res) => {
    try {
        const region = await db.query(`SELECT * FROM region ORDER BY name ASC;`);
        const country = await db.query(`
        SELECT country.id as id, region.id as region_id, country.name as name 
        FROM country
        JOIN region ON country.region_id = region.id
        ORDER BY name ASC;
        `);
        const pu = await db.query("SELECT * FROM partner_university ORDER BY name ASC;");
        const faculty = await db.query("SELECT * FROM faculty ORDER BY name ASC;");
        const courses = await db.query("SELECT * FROM nus_course ORDER BY id ASC;");
        res.status(200).json({
            status: "success",
            region_count: region.rows.length,
            country_count: country.rows.length,
            faculty_count: faculty.rows.length,
            pu_count: pu.rows.length,
            courses_count: courses.rows.length,
            data: {
                region: region.rows,
                country: country.rows,
                faculty: faculty.rows,
                pu: pu.rows,
                courses: courses.rows,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            data: "something went wrong!",
            ex: err
        });
    }
});

app.post("/api/v1/mappings", async (req, res) => {
    try {
        const query = req.body;
        const region = query.region;
        const country = query.country;
        const faculty = query.faculty;
        const pu = query.pu;
        const courses = query.courses;

        console.log(query);
        const base = `
            SELECT region.name as region, country.name as country, faculty.name as faculty, partner_university.name as pu, 
                pu_course, pu_course_name, pu_course_units, nus_course_id, nus_course.name, nus_course_units, pre_approved
            FROM mappings
            JOIN country ON country.id = country_id
            JOIN region ON country.region_id = region.id
            JOIN faculty ON faculty_id = faculty.id
            JOIN partner_university ON pu_id = partner_university.id
            JOIN nus_course ON nus_course_id = nus_course.id
        `;

        if ([region, country, faculty, pu, courses].every(field => field.length === 0)) {
            res.status(500).json({
                status: "error",
                data: "Please fill in at least 1 field!"
            });
        }
        else {
            let append = "WHERE ";
            // checks if there was any previous clauses added
            let prev = false;
            if (region.length != 0) {
                if (prev) {
                    append += "AND "
                }
                append += `region_id IN (${region.map(i => `'${i}'`).join(', ')}) `;
                prev = true;
            }
            if (country.length != 0) {
                if (prev) {
                    append += "AND "
                }
                append += `country_id IN (${country.map(i => `'${i}'`).join(', ')}) `;
                prev = true;
            }
            if (faculty.length != 0) {
                if (prev) {
                    append += "AND "
                }
                append += `faculty_id IN (${faculty.map(i => `'${i}'`).join(', ')}) `;
                prev = true;
            }
            if (pu.length != 0) {
                if (prev) {
                    append += "AND "
                }
                append += `pu_id IN (${pu.map(i => `'${i}'`).join(', ')}) `;
                prev = true;
            }
            if (courses.length != 0) {
                if (prev) {
                    append += "AND "
                }
                append += `nus_course_id IN (${courses.map(i => `'${i}'`).join(', ')}) `;
                prev = true;
            }
            const results = await db.query(base + append);
            const groupedData = results.rows.reduce((result, obj) => {
                const pu = obj.pu;
                if (!result[pu]) {
                    result[pu] = [];
                }
                result[pu].push(obj);
                return result;
            }, {});
            const sortedData = Object.entries(groupedData).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
            // Convert the sorted array back into an object
            const sortedObject = Object.fromEntries(sortedData);
            console.log(groupedData);
            res.status(200).json({
                status: "success",
                results_count: Object.keys(sortedData).length,
                data: {
                    results: sortedObject
                },
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            data: "something went wrong!"
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server up and listening on port ${PORT}`)
});
