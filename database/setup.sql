CREATE DATABASE IF NOT EXISTS campus_events_db;
USE campus_events_db;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    venue VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    phone VARCHAR(20),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (user_id, event_id)
);

-- Insert a default admin user (email: admin@campus.edu, password: admin123)
-- bcrypt hash for 'admin123'
INSERT IGNORE INTO Users (id, name, email, password, role) VALUES 
(1, 'System Admin', 'admin@campus.edu', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'admin');

-- Sample Events
INSERT IGNORE INTO Events (id, title, description, date, venue) VALUES 
(1, 'Tech Symposium 2026', 'Annual technology symposium featuring latest innovations.', '2026-05-15 10:00:00', 'Main Auditorium'),
(2, 'Career Fair Spring', 'Meet top recruiters from leading companies.', '2026-04-20 09:00:00', 'Campus Arena'),
(3, 'Web Development Workshop', 'Learn to build dynamic apps with modern web stack.', '2026-04-10 14:00:00', 'Computer Lab 3');
