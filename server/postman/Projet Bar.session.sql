create table members (
  id integer primary key autoincrement, 
  email text unique,
  password text,
  role varchar(255)
);