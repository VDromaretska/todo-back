DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS done;
create table todo(
  t_id Serial primary key,
  description varchar(255),
  added_by varchar(255), 
  date date,
  completed CHAR(1) CHECK (completed IN ('Y', 'N'))
  );

insert into todo (t_id, description, added_by, date, completed)
values (1, 'First', 'Viki', '2023-08-10', 'N');

insert into todo (t_id, description, added_by, date, completed)
values (2, 'Second', 'Viki', '2023-08-10', 'N');
insert into todo (t_id, description, added_by, date, completed)
values (3, 'Third', 'Viki', '2023-08-10', 'N');

insert into todo (t_id, description, added_by, date, completed)
values (4, 'Fourth', 'Viki', '2023-08-10', 'Y');

insert into todo (t_id, description, added_by, date, completed)
values (5, 'Fifth', 'Viki', '2023-08-10', 'Y');
insert into todo (t_id, description, added_by, date, completed)
values (6, 'Six', 'Viki', '2023-08-10', 'Y');
