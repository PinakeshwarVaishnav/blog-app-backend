-- Create the blogs table:
CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author VARCHAR(255),
	url VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	likes INT DEFAULT 0
);

-- Add blogs to the table:
INSERT INTO blogs (author, url, title, likes) VALUES
	('Test it', 'examples.com', 'test title', 10),
	('Another test blog', 'anotherexample.com', 'another test', 20);

