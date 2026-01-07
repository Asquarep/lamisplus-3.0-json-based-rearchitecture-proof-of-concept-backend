INSERT INTO roles (id, created_date, name) VALUES
    ('57cd2d60-58b3-4c94-a469-3b80e4856f11', CURRENT_DATE, 'ADMIN'),
    ('9afdb786-683e-4c89-94e1-0e1ff87a5f13', CURRENT_DATE, 'USER'),
    ('12a3c7ed-f0b1-4ae7-8b8f-71f9a238c2fe', CURRENT_DATE, 'GUEST');

INSERT INTO users (id, created_date, email, name, password) VALUES
    ('e0a683d9-4ae5-40c7-8f92-1697259a7db7', CURRENT_DATE, 'admin@email.com', 'Admin Admin', '$2a$10$DJP7fEhtUXlp.GfPfmBj5eTo6/rV4VicewbbqD3Uybj9PnVTN0U6q'),
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', CURRENT_DATE, 'asquarep@yahoo.com', 'Peter Abiodun', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG'),
    ('af37de80-9c64-4d20-8f3d-67e2287846ef', CURRENT_DATE, 'rachel@email.com', 'Rachel Green', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG'),
    ('2e8931dc-25a7-4bb7-a075-94b3a95bfb48', CURRENT_DATE, 'cody@email.com', 'Cody Daniels', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG');

INSERT INTO user_roles (user_id, role_id) VALUES
    ('e0a683d9-4ae5-40c7-8f92-1697259a7db7', '57cd2d60-58b3-4c94-a469-3b80e4856f11'), 
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', '9afdb786-683e-4c89-94e1-0e1ff87a5f13'), 
    ('af37de80-9c64-4d20-8f3d-67e2287846ef', '9afdb786-683e-4c89-94e1-0e1ff87a5f13'), 
    ('2e8931dc-25a7-4bb7-a075-94b3a95bfb48', '9afdb786-683e-4c89-94e1-0e1ff87a5f13');
