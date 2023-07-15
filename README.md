# SEP Search
 Filtering through Edurec's site takes a long and arduous time. This site serves to speed up that process and also make it easier to search multiple universities for offerred modules.

# Motivation
1. To learn React + MERN
2. BEEF MY PORTFOLIO

# Current Features
1. Searching for PUs through the following criterias:
    - Region/Country
    - Faculty
    - Partner Universities
    - Courses

## Cleaning Edurec Excel
1. Getting unique university names and mapping them to their respective regions and countries
2. Cleaning the data
- Removed rows without partner universities
- Renamed several univeristies to be in line with GRO website
- Filled PU Module 2 with '-' for those that do not have a module code (esp from IE Business School)
- One module from National Chiao Tung University (Taiwan) removed due to lack of both partner module and NUS module code
- 32 modules from FASS and CDE removed due to no Partner University present
- Condensed all alternative mappings (141 new rows)
- Added course names to those missing + used ```No_name``` for those that can't be found either through NUSMods or Google. (ard 500 rows)
- Several courses are outdated/not offered in AY2324/have been replaced with newer ones/"upgraded" to higher level. Am deciding to leave as is. (MOSTLY LSM COURSES)
    - Course clash such as PF4202 is currently ```Work Experience Internship``` but was ```Safety, Health and Environmental Management```
    - PS Courses pulled from [this website](https://fass.nus.edu.sg/chs/wp-content/uploads/sites/3/2020/08/Cohort-2018-List-of-Recognised-Modules.pdf)

# Frontend
- Learnt once again that I do not want to do frontend work.

# Learnings
- ReactContext API
    - way to share data across multiple components without passing it through every intermediate component
    - like child 3 can access parent data without passing through child 0 to 2
- UI
    - wanted to try using Mantine UI but the change from JS to TS was a bit too much to handle (not sure how to handle getting values from multi-select etc.)
    - so dropped back to Material UI, even though it isn't as aesthetically pleasing
- Database
    - Learnt how to use IN
    - Refreshed memory on how to use table joins