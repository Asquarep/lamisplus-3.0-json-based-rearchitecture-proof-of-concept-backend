INSERT INTO roles (id, created_date, name) VALUES
    ('57cd2d60-58b3-4c94-a469-3b80e4856f11', CURRENT_DATE, 'ADMIN'),
    ('9afdb786-683e-4c89-94e1-0e1ff87a5f13', CURRENT_DATE, 'USER'),
    ('12a3c7ed-f0b1-4ae7-8b8f-71f9a238c2fe', CURRENT_DATE, 'GUEST');

INSERT INTO users (id, created_date, email, name, password) VALUES
    ('e0a683d9-4ae5-40c7-8f92-1697259a7db7', CURRENT_DATE, 'admin@email.com', 'Admin Admin', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG'),
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', CURRENT_DATE, 'asquarep@yahoo.com', 'Peter Abiodun', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG'),
    ('af37de80-9c64-4d20-8f3d-67e2287846ef', CURRENT_DATE, 'rachel@email.com', 'Rachel Green', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG'),
    ('2e8931dc-25a7-4bb7-a075-94b3a95bfb48', CURRENT_DATE, 'cody@email.com', 'Cody Daniels', '$2a$10$39T7fkiAWE0Wv1ejbQPGk.u0/w4ukkALvavb6szpHadTn/aP/2KdG');

INSERT INTO user_roles (user_id, role_id) VALUES
    ('e0a683d9-4ae5-40c7-8f92-1697259a7db7', '57cd2d60-58b3-4c94-a469-3b80e4856f11'), 
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', '9afdb786-683e-4c89-94e1-0e1ff87a5f13'), 
    ('af37de80-9c64-4d20-8f3d-67e2287846ef', '9afdb786-683e-4c89-94e1-0e1ff87a5f13'), 
    ('2e8931dc-25a7-4bb7-a075-94b3a95bfb48', '9afdb786-683e-4c89-94e1-0e1ff87a5f13');

INSERT INTO events (id, available_attendees_count, created_date, name, description, date, category, user_id) VALUES
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', 250, CURRENT_DATE, 'Dev Fest Extreme', 'A week-long event and hackathon to showcase your skills as a developer.', '2024-02-12', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('af37de80-9c64-4d20-8f3d-67e2287846ef', 250, CURRENT_DATE, 'Buble on Point', 'Get the best of smooth pop and old school jams.', '2024-02-12', 'Concert', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('2e8931dc-25a7-4bb7-a075-94b3a95bfb48', 250, CURRENT_DATE, 'Mango Con', 'A conference for mango lovers.', '2024-02-12', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('7a23e25b-8b7f-4e1d-920e-5c5e97d8af6a', 250, CURRENT_DATE, 'Gamers Invade', 'A conference for gamers.', '2024-02-12', 'Game', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('d6472c29-53c9-4ec1-91c5-59a8f3d9e73f', 250, CURRENT_DATE, 'Tech Expo', 'Explore the latest technological innovations and products.', '2024-03-15', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('6fe566d1-23e3-4fc8-b181-ef6894978a09', 250, CURRENT_DATE, 'Jazz Night', 'An evening filled with the smooth tunes of jazz.', '2024-03-15', 'Concert', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('f2a1c61b-7bc8-4598-b9d8-c3c7be258b95', 250, CURRENT_DATE, 'Foodie Fiesta', 'A celebration of diverse and delicious cuisines.', '2024-02-15', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('8f06713e-5039-4d01-a5a6-5e21fcacffdb', 250, CURRENT_DATE, 'E-Sports Championship', 'Witness thrilling e-sports competitions.', '2024-02-18', 'Game', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('c34f5ac6-5577-4e0d-8cbb-1d07239d7eac', 250, CURRENT_DATE, 'Code & Coffee', 'Meet fellow developers and enjoy coding with a cup of coffee.', '2024-03-18', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('2c04fd10-00e9-4b15-9d6d-7dbd40f06d7a', 250, CURRENT_DATE, 'Rock Fest', 'A rock music extravaganza featuring top bands.', '2024-02-18', 'Concert', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('3e3efdb4-678d-47fc-b468-44c1c7e3782a', 1000, CURRENT_DATE, 'Artists Showcase', 'An exhibition of talented artists and their creations.', '2024-03-18', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('b065879a-e29d-4f01-a678-d5a7f0481b53', 1000, CURRENT_DATE, 'Board Game Night', 'Unleash your strategic skills in various board games.', '2024-03-18', 'Game', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('fbbd183a-8f32-4b54-bd5b-8cc9c6f30cd9', 500, CURRENT_DATE, 'Startup Summit', 'Connect with entrepreneurs and investors at this startup summit.', '2024-03-21', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('1d4b3a3b-1202-421b-9fb2-b30e8c22d3e2', 309, CURRENT_DATE, 'Latin Dance Night', 'A night of energetic Latin dance performances and music.', '2024-02-21', 'Concert', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('8926a8da-5f18-4fda-bfd3-149431544d49', 309, CURRENT_DATE, 'Pet Expo', 'Celebrate the love for pets with various pet-related activities.', '2024-02-21', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('30b8b1bf-0fc2-41c1-85f5-556a18c54a7d', 309, CURRENT_DATE, 'Mobile Game Tournament', 'Compete in a mobile game tournament with exciting prizes.', '2024-03-21', 'Game', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('9a6ebe16-9531-4ab0-8e4b-5d5f63d7692f', 500, CURRENT_DATE, 'AI Innovation Showcase', 'Explore the latest advancements in artificial intelligence.', '2024-02-24', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('7782e17e-69da-4d5b-946e-f7790a011ac4', 500, CURRENT_DATE, 'Country Music Festival', 'Experience the best of country music with live performances.', '2024-03-24', 'Concert', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('0a10e31e-72bf-4a08-926b-8e2271257102', 500, CURRENT_DATE, 'Fitness Expo', 'Join fitness enthusiasts and explore the latest trends in fitness.', '2024-03-24', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('41d21466-59cf-4f9f-8d99-4d7a79c9e47f', 500, CURRENT_DATE, 'Esports LAN Party', 'Gather for a fun-filled esports LAN party with friends.', '2024-02-24', 'Game', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('a1a1db6b-6bd4-4a07-8b5b-8d78c6c636ad', 500, CURRENT_DATE, 'Science Fair', 'Showcase exciting science projects and experiments.', '2024-03-27', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('4e55013f-939d-4be5-ba49-0f6a79d59c62', 1000, CURRENT_DATE, 'Reggae Vibes Night', 'Groove to the reggae beats in a night of relaxation and fun.', '2024-03-27', 'Concert', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('3f2c5b39-e799-4d19-8a65-19aaf7e13b7e', 700, CURRENT_DATE, 'Tech Talks', 'Engage in insightful talks on the latest technology trends.', '2024-03-27', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('8a2d6e67-aa92-42d5-8af5-e875ba1e0db6', 700, CURRENT_DATE, 'Virtual Reality Gaming Night', 'Experience the thrill of virtual reality gaming.', '2024-02-27', 'Game', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('7b2c1e01-5b66-4e06-81a3-6de1f6e774ec', 650, CURRENT_DATE, 'Book Lovers Meetup', 'Connect with fellow book lovers and discuss your favorite reads.', '2024-03-30', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('c2b88334-8b4d-45a8-bdf2-881bb998c5d5', 650, CURRENT_DATE, 'Indie Music Showcase', 'Discover talented indie musicians and their unique sounds.', '2024-03-30', 'Concert', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('b22ebfe5-4a6d-4c18-b97a-c23e09b8a26c', 650, CURRENT_DATE, 'Innovation Hackathon', 'Collaborate and innovate in this intense innovation hackathon.', '2024-03-30', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('8d75c91a-c7b0-4c7a-934f-30a57a128067', 650, CURRENT_DATE, 'Retro Gaming Night', 'Relive the nostalgia with classic retro games and consoles.', '2024-03-30', 'Game', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('298a4f2c-ba6e-4e58-9335-18431f862008', 700, CURRENT_DATE, 'Health and Wellness Expo', 'Explore holistic health and wellness practices and products.', '2024-04-02', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('9791a17a-5bb9-4c84-9d06-327e4a4897a5', 700, CURRENT_DATE, 'Acoustic Night', 'Enjoy a night of soothing acoustic performances and melodies.', '2024-04-02', 'Concert', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('1a4eae7f-43e7-4a5a-94db-41f5b1c21c05', 700, CURRENT_DATE, 'Tech Startup Pitch Day', 'Witness innovative tech startups pitch their ideas to investors.', '2024-04-02', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('64ce4ef8-50f1-4f82-8a0e-74e7548797b9', 700, CURRENT_DATE, 'Virtual Reality Film Screening', 'Experience immersive storytelling through virtual reality films.', '2024-04-02', 'Game', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('7c52c1bf-07f5-4f9c-9d42-3fe5b3ef9e9f', 700, CURRENT_DATE, 'Gastronomy Festival', 'Indulge in a culinary journey with diverse gastronomic delights.', '2024-04-05', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('85d7bcac-86f3-4bfc-8c96-d8943baf9c1a', 700, CURRENT_DATE, 'Folk Music Night', 'Immerse yourself in the rich melodies of folk music traditions.', '2024-04-05', 'Concert', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('4df65023-ae46-4a90-9e93-1c146c3f1a92', 700, CURRENT_DATE, 'Entrepreneurial Workshop', 'Learn key entrepreneurial skills and strategies from industry experts.', '2024-04-05', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('d1fb124a-2724-4c2a-bf08-bdb96a5e69b5', 700, CURRENT_DATE, 'Board Game Marathon', 'Challenge your friends in a day-long board game marathon.', '2024-04-05', 'Game', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('2b7aa305-891e-4c58-9b97-1e2e6f22e152', 1000, CURRENT_DATE, 'Environment Conservation Symposium', 'Discuss and explore ways to contribute to environmental conservation.', '2024-04-08', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('907083af-b21e-461e-939c-7811f1093fb8', 700, CURRENT_DATE, 'Salsa Dancing Night', 'Move to the rhythm of salsa beats in a lively dancing night.', '2024-04-08', 'Concert', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('3d4e2e5a-df4c-4e13-976a-c16b05cf36fb', 700, CURRENT_DATE, 'Digital Marketing Summit', 'Gain insights into the latest trends and strategies in digital marketing.', '2024-04-08', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('03d40d88-c779-4999-bf08-5c5417383229', 700, CURRENT_DATE, 'Esports Pub Quiz', 'Test your esports knowledge in a fun and competitive pub quiz.', '2024-04-08', 'Game', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('a9a4f7d4-5f4e-4fe5-8c6f-01c3f2e44113', 700, CURRENT_DATE, 'Art and Craft Fair', 'Explore a variety of unique artworks and handmade crafts at this fair.', '2024-04-11', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('7b697d15-6473-4ecf-a4de-eb41e8da3bd7', 1000, CURRENT_DATE, 'Blues Music Night', 'Feel the soulful vibes of blues music in a night of musical expression.', '2024-04-11', 'Concert', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('6257b3ea-3b03-46af-87bf-9aee59043b5b', 1000, CURRENT_DATE, 'Innovation Challenge', 'Participate in a hands-on innovation challenge and showcase your creativity.', '2024-04-11', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('9d8c94b4-35e3-4393-8098-cb7b7e62c8ef', 1000, CURRENT_DATE, 'Gaming Cosplay Parade', 'Showcase your favorite gaming characters in a lively cosplay parade.', '2024-04-11', 'Game', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('5eaee48c-4d1c-4ad3-aacc-3d091e10a70f', 200, CURRENT_DATE, 'TEDx City Talks', 'Engage in thought-provoking talks and discussions from local leaders.', '2024-04-14', 'Conference', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('c8688199-3fbd-4c6f-bb89-1311300045d2', 200, CURRENT_DATE, 'Reggaeton Dance Party', 'Dance the night away to the beats of reggaeton music.', '2024-04-14', 'Concert', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('50e8787e-5a88-4e9a-9b61-65f1d63c826d', 200, CURRENT_DATE, 'Cybersecurity Symposium', 'Explore the latest trends and challenges in cybersecurity.', '2024-04-14', 'Conference', 'af37de80-9c64-4d20-8f3d-67e2287846ef'),
    ('985dbd77-7945-497d-94ec-5a87b4f20bbf', 1000, CURRENT_DATE, 'Mobile Esports Tournament', 'Compete in an esports tournament featuring mobile games.', '2024-04-14', 'Game', '2e8931dc-25a7-4bb7-a075-94b3a95bfb48'),
    ('2e0f76f7-cbc1-4c32-b2ae-c68e13a4eb90', 1000, CURRENT_DATE, 'Yoga and Meditation Retreat', 'Relax and rejuvenate with a weekend retreat focusing on yoga and meditation.', '2024-04-17', 'Conference', '56c8f417-7c2d-4b56-aae2-84a71d01387e'),
    ('4711d92a-6f0d-4a2c-bbd8-4b2ac86260ad', 1000, CURRENT_DATE, 'Pop and Hip-Hop Fusion Night', 'Experience a fusion of pop and hip-hop music genres in a vibrant night.', '2024-04-17', 'Concert', 'af37de80-9c64-4d20-8f3d-67e2287846ef');


INSERT INTO ticket_request (id, attendees_count, created_date, status, booked_by, event_id) VALUES
    ('56c8f417-7c2d-4b56-aae2-84a71d01387e', 2, CURRENT_DATE, 'BOOKED', '56c8f417-7c2d-4b56-aae2-84a71d01387e', '8f06713e-5039-4d01-a5a6-5e21fcacffdb');