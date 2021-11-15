
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN NOT NULL
);

DROP TABLE user;

CREATE TABLE "courses" (
	"id" serial NOT NULL,
	"course_name" varchar(255) NOT NULL,
	CONSTRAINT "courses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO courses (course_name)
VALUES ('Fire Swamp');

INSERT INTO courses (course_name)
VALUES ('Lilliputt');

CREATE TABLE "rounds" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"course_id" int NOT NULL,
	"date_played" DATE NOT NULL,
	CONSTRAINT "rounds_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO rounds (user_id, course_id, date_played)
VALUES ('1', '1', '2021-06-01'),
		('1', '1', '2021-07-01'),
		('1', '1', '2021-08-01'),
		('1', '1', '2021-09-01'),
		('1', '2', '2021-06-15'),
		('1', '2', '2021-07-15'),
		('1', '2', '2021-08-15'),
		('1', '2', '2021-09-15');	



CREATE TABLE "holes" (
	"id" serial NOT NULL,
	"course_id" int NOT NULL,
	"hole_number" int NOT NULL,
	"par_score" int NOT NULL,
	"hole_length" int,
	CONSTRAINT "holes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO holes (course_id, hole_number, par_score, hole_length)
VALUES ('1', '1', '3', '300'),
		('1', '2', '4', '500'),
		('1', '3', '7', '1036'),
		('2', '1', '3', '189'),
		('2', '2', '3', '223'),
		('2', '3', '3', '198');

-- DROP TABLE holes;



CREATE TABLE "hole_scores" (
	"id" serial NOT NULL,
	"round_id" int NOT NULL,
	"hole_id" int NOT NULL,
	"score" int NOT NULL,
	"note_content" varchar(255),
	CONSTRAINT "hole_scores_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO hole_scores (round_id, hole_id, score, note_content)
VALUES ('1', '1', '4', 'Pit of Despair in the left rough, avoid!'),
		('1', '2', '4', 'Threw driver long, fell into lightning sand. Try midrange instead.'),
		('1', '3', '8', 'Rodents of Unusual Size near the basket, putt quickly!');
		
INSERT INTO hole_scores (round_id, hole_id, score)
VALUES ('2', '1', '3'),
		('2', '2', '5'),
		('2', '3', '5');	


-- DROP TABLE hole_scores;




CREATE TABLE "hole_notes" (
	"id" serial NOT NULL,
	"hole_score_id" int NOT NULL,
	"note_content" varchar(255) NOT NULL,
	CONSTRAINT "hole_notes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "rounds" ADD CONSTRAINT "rounds_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_fk1" FOREIGN KEY ("course_id") REFERENCES "courses"("id");

ALTER TABLE "holes" ADD CONSTRAINT "holes_fk0" FOREIGN KEY ("course_id") REFERENCES "courses"("id");

ALTER TABLE "hole_scores" ADD CONSTRAINT "hole_scores_fk0" FOREIGN KEY ("round_id") REFERENCES "rounds"("id");
ALTER TABLE "hole_scores" ADD CONSTRAINT "hole_scores_fk1" FOREIGN KEY ("hole_id") REFERENCES "holes"("id");

ALTER TABLE "hole_notes" ADD CONSTRAINT "hole_notes_fk0" FOREIGN KEY ("hole_score_id") REFERENCES "hole_scores"("id");


SELECT rounds.id, courses.course_name, SUM(hole_scores.score) - SUM(holes.par_score) as total_score FROM hole_scores
JOIN holes ON hole_scores.hole_id = holes.id
JOIN rounds ON rounds.id = hole_scores.round_id
JOIN courses ON rounds.course_id = courses.id
WHERE rounds.user_id = 1
GROUP BY rounds.id, courses.course_name;
