DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS done;
create table todo(
  t_id Serial primary key,
  description varchar(255),
  added_by varchar(255), 
  date date,
  completed CHAR(1) CHECK (completed IN ('Y', 'N'))
  );

insert into todo ( description, added_by, date, completed)
values ('First', 'Viki', '2023-08-10', 'N');

insert into todo (description, added_by, date, completed)
values ('Second', 'Viki', '2023-08-10', 'N');
insert into todo (description, added_by, date, completed)
values ('Third', 'Viki', '2023-08-10', 'N');

insert into todo (description, added_by, date, completed)
values ('Fourth', 'Viki', '2023-08-10', 'Y');

insert into todo (description, added_by, date, completed)
values ('Fifth', 'Viki', '2023-08-10', 'Y');
insert into todo (description, added_by, date, completed)
values ('Six', 'Viki', '2023-08-10', 'Y');










