CREATE TABLE "group"(
"id" serial PRIMARY KEY,
"name" varchar(255) NOT NULL
);

CREATE TABLE task(
"id" serial PRIMARY KEY,
"group_id" INTEGER REFERENCES "group"(id),
"task" text NOT NULL,
"dependencyIds" INTEGER [],
"completedAt" TIMESTAMP
);