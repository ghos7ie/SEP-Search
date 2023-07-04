import psycopg2 as pg
import credentials as cd

# connect to existing db 
conn = pg.connect(cd.conn_str)
# open cursor
cur = conn.cursor()

# ct_faculty = """
# CREATE TABLE Faculty (
# id BIGSERIAL NOT NULL PRIMARY KEY,
# name VARCHAR(30) NOT NULL
# )
# """
# cur.execute(ct_faculty)
# conn.commit()

# ct_region = """
# CREATE TABLE Region(
# id BIGSERIAL NOT NULL PRIMARY KEY,
# name VARCHAR(15) NOT NULL
# )
# """
# cur.execute(ct_region)
# conn.commit()


# ct_country = """
# CREATE TABLE Country(
# id BIGSERIAL NOT NULL PRIMARY KEY,
# region_id INT NOT NULL REFERENCES Region(id),
# name VARCHAR(15) NOT NULL
# )
# """
# cur.execute(ct_country)
# conn.commit()

# ct_nus_course = """
# CREATE TABLE NUS_Course (
# id VARCHAR(10) NOT NULL PRIMARY KEY,
# name VARCHAR(50) NULL
# )
# """
# cur.execute(ct_nus_course)
# conn.commit()

# ct_pu = """
# CREATE TABLE Partner_University(
# id BIGSERIAL NOT NULL PRIMARY KEY,
# country_id INT NOT NULL REFERENCES country(id),
# name VARCHAR(60) NOT NULL
# )
# """
# cur.execute(ct_pu)
# conn.commit()

# Create mappings table
# Map the respective id values to the respective columns
# SHOULD BE DONE THEN CAN DO API AND QUERY CALLS
ct_mappings = """
CREATE TABLE Mappings(
id BIGSERIAL NOT NULL PRIMARY KEY,
faculty_id INT NOT NULL REFERENCES Faculty(id),
country_id INT NOT NULL REFERENCES Country(id),
pu_id INT NOT NULL REFERENCES Partner_University(id),
pu_course VARCHAR(20),
pu_course_name VARCHAR(110),
pu_course_units DECIMAL, 
nus_course_id VARCHAR(10) NOT NULL REFERENCES NUS_Course(id),
nus_course_units INT NOT NULL,
pre_approved BOOLEAN NOT NULL
)
"""
cur.execute(ct_mappings)
conn.commit()
##############################
# Faculty                30.0
# Partner University     50.0
# Country                14.0
# Region                 13.0
# PU Course              18.0
# PU Course Title       100.0
# NUS Course              8.0
# NUS Course Title       30.0
# Pre-Approved?           1.0
##############################
# rmb to close cursor and db!
cur.close()
conn.close()
