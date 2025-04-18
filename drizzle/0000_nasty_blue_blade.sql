CREATE TYPE "public"."statuses" AS ENUM('pending', 'uploaded', 'failed');--> statement-breakpoint
CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "statuses" DEFAULT 'pending',
	"url" text NOT NULL,
	"file_name" text NOT NULL,
	"google_drive_file_url" text,
	"created_at" timestamp DEFAULT now()
);
