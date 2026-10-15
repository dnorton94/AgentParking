CREATE TABLE `phone_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`fingerprint` text NOT NULL,
	`access_hash` text NOT NULL,
	`call_id` text,
	`status` text NOT NULL,
	`purpose` text NOT NULL,
	`reference` text NOT NULL,
	`amount_pence` integer,
	`destination` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `phone_jobs_fingerprint_unique` ON `phone_jobs` (`fingerprint`);