CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`details` text NOT NULL,
	`ip_hash` text NOT NULL
);
