
USE Sysfore_DB;

CREATE TABLE StudentDetails (
    student_id INT IDENTITY(1,1) PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    branch VARCHAR(50),
    phone_number BIGINT,
    join_year INT,
    current_sem INT,

    created_on DATETIME DEFAULT GETDATE(),
    created_by VARCHAR(50) DEFAULT 'Admin',
    updated_on DATETIME DEFAULT GETDATE(),
    updated_by VARCHAR(50) DEFAULT 'Admin',
    is_active BIT DEFAULT 1
);

CREATE TABLE PlacementDrives (
    drive_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    company_name VARCHAR(100) NOT NULL,
    package_lpa DECIMAL(5,2),
    interview_rounds INT,
    result_status VARCHAR(30),
    drive_date DATE,

    created_on DATETIME DEFAULT GETDATE(),
    created_by VARCHAR(50) DEFAULT 'Admin',
    updated_on DATETIME DEFAULT GETDATE(),
    updated_by VARCHAR(50) DEFAULT 'Admin',
    is_active BIT DEFAULT 1,

    FOREIGN KEY (student_id)
    REFERENCES StudentDetails(student_id)
);

INSERT INTO StudentDetails
(student_name,email,branch,phone_number,join_year,current_sem)
VALUES
('Rohit Sharma','rohit@gmail.com','Computer Science',9876543210,2023,6),
('Rama Krishna','rama@gmail.com','Mechanical',9876543211,2022,8),
('Manan Sharma','manan@gmail.com','Information Science',9876543212,2023,6),
('Kiara Anand','kiara@gmail.com','Electronics',9876543213,2024,4),
('Arjun Mehta','arjun@gmail.com','Civil',9876543214,2022,8);

INSERT INTO PlacementDrives
(student_id,company_name,package_lpa,interview_rounds,result_status,drive_date)
VALUES
(1,'Infosys',5.50,3,'Selected','2026-05-01'),
(2,'TCS',4.20,2,'Rejected','2026-05-03'),
(3,'Accenture',6.80,4,'Selected','2026-05-05'),
(4,'Wipro',3.90,2,'Pending','2026-05-07'),
(5,'Capgemini',4.80,3,'Selected','2026-05-10');

SELECT * FROM StudentDetails;

SELECT * FROM PlacementDrives;

SELECT * FROM StudentDetails
WHERE branch = 'Computer Science';

SELECT * FROM PlacementDrives
WHERE package_lpa >= 5
AND result_status = 'Selected';

SELECT * FROM StudentDetails
WHERE branch = 'Information Science'
OR branch = 'Electronics';

SELECT * FROM StudentDetails
WHERE student_name LIKE 'A%';

SELECT * FROM StudentDetails
WHERE branch LIKE 'E%';

SELECT * FROM PlacementDrives
ORDER BY package_lpa DESC;

UPDATE StudentDetails
SET
    phone_number = 9999999999,
    updated_on = GETDATE(),
    updated_by = 'Admin'
WHERE student_id = 2;


UPDATE StudentDetails
SET
    phone_number = 9999999999,
    is_active = 0,
    updated_by = 'Admin'
WHERE student_id = 2;


SELECT * FROM StudentDetails
WHERE student_id = 1;

DELETE FROM PlacementDrives
WHERE drive_id = 5;

SELECT * FROM PlacementDrives;

UPDATE StudentDetails
SET
    is_active = 0,
    updated_on = GETDATE(),
    updated_by = 'user'
WHERE student_id = 4;

SELECT * FROM StudentDetails;

SELECT COUNT(*) FROM StudentDetails WHERE student_name = 'Rohit Sharma';