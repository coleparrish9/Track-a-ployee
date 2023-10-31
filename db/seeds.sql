INSERT INTO departments (name)
VALUES ("Book keeping"),
       ("Shop"),
       ("Glassing"),
       ("Board packing"),
       ("Shaping");

INSERT INTO roles (title,salary,department_id)
VALUES ("Sales Lead",100000,3),
       ("Sales Person",80000,3),
       ("Lead Shaper",150000,4),
       ("Board Packer",120000,4),
       ("Boss",120000,2),
       ("Accountant",90000,2),
       ("Sanding",125000,5),
       ("Painting",85000,5),
       ("Shaper",80000,1),
       ("Junior Shaper",75000,1);

INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES ("Calvin","Ortiz",9,NULL),
       ("Tim","Roach",5,NULL),
       ("Sophie","Phillips",1,NULL),
       ("Bill","Woods",3,NULL),
       ("Eric","Watson",7,NULL),
       ("Van","Hurley",8,5),
       ("Marleigh","Shah",4,4),
       ("Kaia","Huber",2,3),
       ("Dane","Reynolds",2,3),
       ("Jack","Mathis",10,1),
       ("Kaleb","McKay",10,1),
       ("Bonnie","Walton",10,1),
       ("Zoie","Cain",6,2),
       ("Peyton","Odom",6,2);