import pandas as pd
import psycopg2 as pg
import credentials as cd

df= pd.read_excel('merged.xlsx')

# pu = df.drop_duplicates(subset=['Country', 'Partner University'])
# pu = pu[['Country', 'Partner University']]
# faculty = df['Faculty'].unique()
# fregion = df['Region'].unique()
# country = df.drop_duplicates(subset=['Region', 'Country'])
# country = country[['Region', 'Country']]
# course = df.drop_duplicates(subset=['NUS Course', 'NUS Course Title'])
# course = course[['NUS Course', 'NUS Course Title']]
# print(faculty)
# print(country)
# print(region)
# print(mod)
## Exclude columns by indexing
#exclude_columns = [6, 9]  # Index positions of the columns to exclude

# get longest length of each column for table creation
# max_lengths = df.drop(df.columns[exclude_columns], axis=1).apply(lambda x: x.str.len().max())
# print(max_lengths)
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

# connect to existing db 
conn = pg.connect(cd.conn_str)
# open cursor
cur = conn.cursor()

# query = "INSERT INTO Faculty (name) VALUES (%s)"

# for fac in faculty:
#     cur.execute(query, (fac,))

# conn.commit()

# query = "INSERT INTO Region (name) VALUES (%s)"

# for reg in region:
#     cur.execute(query, (reg,))

# conn.commit()

# ## mapping id to respective regions
# query = "SELECT * FROM Region"
# df = pd.read_sql(query, conn)

# print(df)

# country= country.merge(df, left_on='Region', right_on='name', how='left')
# print(country)
# country = country.drop(['Region','name'], axis=1)
# country = country[['id', 'Country']]
# print(country)

# for _, row in country.iterrows():
#     query = "INSERT INTO Country (region_id, name) VALUES (%s, %s)"
#     values = tuple(row)
#     cur.execute(query, values)
# conn.commit()

# for _, row in course.iterrows():
#     query = "INSERT INTO nus_course (id, name) VALUES (%s, %s)"
#     values = tuple(row)
#     cur.execute(query, values)
# conn.commit()

# query = "SELECT * FROM country"
# c_df = pd.read_sql(query, conn)
# pu = pu.merge(c_df, left_on='Country', right_on='name', how='left')
# pu = pu[['id', 'Partner University']]

# for _, row in pu.iterrows():
#     query = "INSERT INTO partner_university (country_id, name) VALUES (%s, %s)"
#     values = tuple(row)
#     cur.execute(query, values)
# conn.commit()

# pulling all data

# query = "SELECT * FROM nus_course"
# n_df = pd.read_sql(query, conn)

# query = "SELECT * FROM faculty"
# f_df = pd.read_sql(query, conn)

# query = "SELECT * FROM country"
# c_df = pd.read_sql(query, conn)

# query = "SELECT * FROM partner_university"
# p_df = pd.read_sql(query, conn)

# ## mapping id to their respective columns
# df = df.merge(f_df, left_on='Faculty', right_on="name", how='left')
# df = df.drop(['Faculty', 'name'], axis=1)
# df = df.rename(columns={"id": "faculty_id"})
# df = df.drop(['NUS Course Title'], axis=1)
# df = df.rename(columns={"NUS Course": "nus_course_id"})
# df = df.merge(p_df, left_on='Partner University', right_on='name', how='left')
# df = df.rename(columns={'id':'pu_id', 'name':'pu_name'})
# df = df[['faculty_id', 'country_id', 'pu_id', 'PU Course', 'PU Course Title', 'PU Course Units', 'nus_course_id', 'NUS Course Units', 'Pre-Approved?']]
# mapping = {'Y': True, 'N': False}
# df['Pre-Approved?'] = df['Pre-Approved?'].map(mapping)

# for _, row in df.iterrows():
#     query = "INSERT INTO mappings (faculty_id, country_id, pu_id, pu_course, pu_course_name, pu_course_units, nus_course_id, nus_course_units, pre_approved) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
#     values = tuple(row)
#     cur.execute(query, values)
# conn.commit()

# rmb to close cursor and db!
cur.close()
conn.close()