# SEP Search
 Filtering through Edurec's site takes a long and arduous time. This site serves to speed up that process and also make it easier to search multiple universities for offerred modules.

# Current Features


# Cleaning Edurec Excel
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