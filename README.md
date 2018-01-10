# Sexual Violence Center

The SVC Application gives administrative users the tools they need to analyze, visualize, and manage volunteers, cases, and reports. Along with providing SVC advocates an organized data input process for creating and updating cases.

## Built With

- SQL
- Node.js
- Express.js
- Angular
- AngularJS Material
- Chart.js
- Moment.js
- Heroku
- Passport

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Steps to get the development environment running.

Below are the needed tables, contraints, and stored procedures for the application that need to be added to SQL, this application is originally written for plpgSQL

The schema will need to be called "public" for your database.

```sql

CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(500) NOT NULL,
	"is_admin" BOOLEAN NOT NULL DEFAULT 'false',
	"is_super_admin" BOOLEAN NOT NULL DEFAULT 'false',
	"first_name" VARCHAR(50),
	"last_name" VARCHAR(50),
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "advocates" (
	"advocate_id" serial NOT NULL,
	"advocate_first_name" varchar(100) NOT NULL,
	"advocate_last_name" varchar(100) NOT NULL,
	"is_staff" BOOLEAN DEFAULT 'false',
	"is_hcmc_approved" BOOLEAN DEFAULT 'false',
	"spanish" BOOLEAN DEFAULT 'false',
	"somali" BOOLEAN DEFAULT 'false',
	"french" BOOLEAN DEFAULT 'false',
	"german" BOOLEAN DEFAULT 'false',
	"liberian" BOOLEAN DEFAULT 'false',
	"asl" BOOLEAN DEFAULT 'false',
	"other_language" varchar(500),
	"notes" varchar(1000),
	"main_contact_phone" varchar(50),
	"allow_text" BOOLEAN DEFAULT 'false',
	"allow_call" BOOLEAN DEFAULT 'true',
	"last_contacted_date" DATE DEFAULT current_date,
	"date_entered" DATE DEFAULT current_date,
	"advocacy_start" DATE NOT NULL,
	"advocacy_end" DATE,
	"is_active" BOOLEAN DEFAULT 'true',
	CONSTRAINT advocates_pk PRIMARY KEY ("advocate_id")
) WITH (
  OIDS=FALSE
);




CREATE TABLE "location" (
	"location_id" serial NOT NULL,
	"location_name" varchar(200) NOT NULL,
	"location_county" varchar(100) NOT NULL,
	CONSTRAINT location_pk PRIMARY KEY ("location_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "monthly_location" (
	"monthly_loc_id" serial NOT NULL,
	"location_id" int NOT NULL,
	"year" int NOT NULL,
	"01" int DEFAULT '0',
	"02" int DEFAULT '0',
	"03" int DEFAULT '0',
	"04" int DEFAULT '0',
	"05" int DEFAULT '0',
	"06" int DEFAULT '0',
	"07" int DEFAULT '0',
	"08" int DEFAULT '0',
	"09" int DEFAULT '0',
	"10" int DEFAULT '0',
	"11" int DEFAULT '0',
	"12" int DEFAULT '0',
	CONSTRAINT monthly_location_pk PRIMARY KEY ("monthly_loc_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "green_form_data" (
	"green_form_id" serial NOT NULL,
	"advocate_id" INT,
	"date" DATE NOT NULL,
	"start_time" TIMESTAMP NOT NULL,
	"location_id" INT,
	"nurse" VARCHAR(500),
	"was_advocate_dispatched" BOOLEAN DEFAULT 'false',
	"green_form_notes" varchar(2000),
	CONSTRAINT green_form_data_pk PRIMARY KEY ("green_form_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "form" (
	"form_row_id" serial NOT NULL,
	"green_form_id" serial NOT NULL,
	"ma_form_id" int NOT NULL,
	"la_form_id" int NOT NULL,
	"referral_form_id" int NOT NULL,
	"release_form_id" int NOT NULL,
	"is_gs_complete" BOOLEAN DEFAULT 'false',
	"is_ys_complete" BOOLEAN DEFAULT 'false',
	"is_ma_complete" BOOLEAN DEFAULT 'false',
	"is_bor_complete" BOOLEAN DEFAULT 'false',
	"is_la_complete" BOOLEAN DEFAULT 'false',
	"is_release_complete" BOOLEAN DEFAULT 'false',
	"is_ps_complete" BOOLEAN DEFAULT 'false',
	"is_case_complete" BOOLEAN DEFAULT 'false',
	"case_start_date" DATE,
	"case_start_time" TIMESTAMP,
	"case_complete_date" DATE,
	"is_referral_complete" BOOLEAN DEFAULT 'false',
	CONSTRAINT form_pk PRIMARY KEY ("form_row_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ma_form_data" (
	"ma_id" serial NOT NULL,
	"advocate_name" VARCHAR(100),
	"advocate_name_additional" VARCHAR(100),
	"advocate_id" INT,
	"location_name" VARCHAR(200),
	"location_id" INT,
	"was_adult_sexual_assault" BOOLEAN DEFAULT 'false',
	"was_sexual_exploitation" BOOLEAN DEFAULT 'false',
	"was_minor_family" BOOLEAN DEFAULT 'false',
	"was_minor_other" BOOLEAN DEFAULT 'false',
	"was_other" BOOLEAN DEFAULT 'false',
	"additional_notes" VARCHAR(1000),
	"was_mandatory_report" BOOLEAN DEFAULT 'false',
	"reporting_advocate_name" VARCHAR(200),
	"reporting_date" DATE,
	"location_evidentiary" BOOLEAN DEFAULT 'false',
	"location_evidentiary_name" varchar(200),
	"location_evidentiary_nurse" varchar(200),
	"immediate_referral" BOOLEAN NOT NULL DEFAULT 'false',
	"immediate_referral_notes" varchar(500),
	"shelter_referral" BOOLEAN NOT NULL DEFAULT 'false',
	"shelter_referral_name" varchar(200),
	"taxi_provided" BOOLEAN DEFAULT 'false',
	"taxi_cost" money DEFAULT '0',
	"release_completed" BOOLEAN DEFAULT 'false',
	"release_completed_date" DATE,
	"release_completed_reason" VARCHAR(500),
	"mapc_followup" VARCHAR(1000),
	"debrief_complete" BOOLEAN DEFAULT 'false',
	"debrief_complete_date" DATE,
	"debrief_complete_staff" VARCHAR(200),
	"followup_complete" BOOLEAN DEFAULT 'false',
	"followup_complete_date" DATE,
	"followup_complete_agency" VARCHAR(500),
	"date_form_complete_mapc" VARCHAR(20),
	"ma_form_time" TIMESTAMP,
	"expiration_date" DATE DEFAULT current_date + INTERVAL '30 days',
	CONSTRAINT ma_form_data_pk PRIMARY KEY ("ma_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "la_form_data" (
	"la_form_id" serial NOT NULL,
	"date" DATE,
	"advocate_name" varchar(500),
	"county" varchar(500),
	"officer_involved" varchar(500),
	"officer_involved_additional" varchar(500),
	"officer_involved_additional_two" varchar(500),
	"case_number" varchar(500),
	"type_of_report" varchar(500),
	"la_form_time" TIMESTAMP,
	CONSTRAINT la_form_data_pk PRIMARY KEY ("la_form_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "referral_form_data" (
	"referral_form_id" serial NOT NULL,
	"referral_location_name" varchar(500),
	"is_first_attempt_date" DATE,
	"is_second_attempt_date" DATE,
	"is_third_attempt_date" DATE,
	"expiration_date" DATE DEFAULT current_date + INTERVAL '90 days',
	"was_shredded" BOOLEAN DEFAULT 'false',
	CONSTRAINT referral_form_data_pk PRIMARY KEY ("referral_form_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "release_form_data" (
	"release_form_id" serial NOT NULL,
	"purpose" varchar(1000),
	"was_contact_made" BOOLEAN DEFAULT FALSE,
	"contact_date" DATE,
	"contacted_by" varchar(100),
	CONSTRAINT release_form_data_pk PRIMARY KEY ("release_form_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "form_insert" (
	"green_form_id" INT,
	"advocate_id" INT,
	"location_id" INT,
	"ma_id" INT,
	"la_form_id" INT,
	"referral_form_id" INT,
	"release_form_id" INT
) WITH (
  OIDS=FALSE
);



CREATE TABLE "nurse_form_data" (
	"nurse_form_id" SERIAL NOT NULL,
	"nursing_form_date" DATE,
	"nurse_was_adv_dispatched" BOOLEAN,
	"nurse_form_location_name" VARCHAR(100),
	"nurse_form_time" TIMESTAMP,
	 CONSTRAINT nurse_form_data_pk PRIMARY KEY ("nurse_form_id")
) WITH (
  OIDS=FALSE
);
```
This function will also need to be created

```




CREATE OR REPLACE FUNCTION form_creation(id INT) 
    RETURNS void AS $$
    
   
    /* Created by Laura for the sole purpose of making Alex's life easier.
    Function should insert rows into all form and data tables after insert of greenform */
    
    TRUNCATE "form_insert";    --drop temp table everytime this runs for recreation
    
     
    		  
    		  /* Medical Advocacy Form, all defaults */
	
	INSERT INTO "public"."ma_form_data" 
	VALUES(DEFAULT) 
	RETURNING "ma_id"
			  , "advocate_name"
			  , "advocate_name_additional"
			  , "location_name"
			  , "was_adult_sexual_assault"
			  , "was_sexual_exploitation"
			  , "was_minor_family"
			  , "was_minor_other"
			  , "was_other"
			  , "additional_notes"
			  , "was_mandatory_report"
			  , "reporting_advocate_name"
			  , "reporting_date"
			  , "location_evidentiary"
			  , "location_evidentiary_name"
			  , "location_evidentiary_nurse"
			  , "immediate_referral"
			  , "immediate_referral_notes"
			  , "shelter_referral"
			  , "shelter_referral_name"
			  , "taxi_provided"
			  , "taxi_cost"
			  , "release_completed"
			  , "release_completed_date"
			  , "release_completed_reason"
			  , "mapc_followup"
			  , "debrief_complete"
			  , "debrief_complete_date"
			  , "debrief_complete_staff"
			  , "followup_complete"
			  , "followup_complete_date"
			  , "followup_complete_agency"
			  , "date_form_complete_mapc"
			  , "expiration_date";


/*  Insert for legal advocacy form
	replace green_form_id with id that should already exist*/

INSERT INTO "public"."la_form_data" 
VALUES(DEFAULT
	  ,current_date
	  , (SELECT "advocate_first_name" || ',' || "advocate_last_name" 
	  	 FROM "advocates" a 
	  	 	INNER JOIN "green_form_data" g ON g."advocate_id" = a."advocate_id" 
	  	 WHERE g."green_form_id" = id)
	  ,(SELECT l."location_county" 
	   FROM "location" l 
	   		INNER JOIN "green_form_data" g ON g."location_id" = l."location_id" 
	   WHERE g."green_form_id" = id)
	  ,DEFAULT) 
RETURNING "la_form_id"
		  , "date"
		  , "advocate_name"
		  , "county"
		  , "officer_involved"
		  , "officer_involved_additional"
		  , "officer_involved_additional_two"
		  , "case_number"
		  , "type_of_report";


/* Row insert for referral form */

INSERT INTO "public"."referral_form_data" 
VALUES(DEFAULT) 
RETURNING "referral_form_id"
		  , "referral_location_name"
		  , "is_first_attempt_date"
		  , "is_second_attempt_date"
		  , "is_third_attempt_date"
		  , "expiration_date"
		  , "was_shredded";
		  

/* Row insert for release form */
		  
INSERT INTO "public"."release_form_data" 
VALUES(DEFAULT) 
RETURNING "release_form_id"
		  , "purpose"
		  , "was_contact_made"
		  , "contact_date"
		  , "contacted_by";


    
/* Creation of a temp table for for IDs */
    
INSERT INTO "public"."form_insert" (
						"green_form_id"
						,"advocate_id"
						,"location_id"
						,"ma_id"
						,"la_form_id"
						,"referral_form_id"
						,"release_form_id"
					 )
		SELECT MAX(g."green_form_id")
       		,(SELECT "advocate_id" 
       			FROM "green_form_data" 
       			WHERE "green_form_id" = id) 
       		,(SELECT "location_id" 
       		  FROM "green_form_data" 
       		  WHERE "green_form_id" = id) 
       		,(SELECT MAX(m."ma_id")
       		  FROM "ma_form_data" m 
       		  	LEFT JOIN "form" f ON f."ma_form_id" = m."ma_id" 
       		  WHERE f."form_row_id" IS NULL) 
       		,(SELECT MAX(la."la_form_id")
       		  FROM "la_form_data" la 
       		  	LEFT JOIN "form" f ON f."la_form_id" = la."la_form_id" 
       		  WHERE f."form_row_id" IS NULL)
       		,(SELECT MAX(reff."referral_form_id")
       		  FROM "referral_form_data" reff 
       		  	LEFT JOIN "form" f ON f."referral_form_id" = reff."referral_form_id" 
       		  WHERE f."form_row_id" IS NULL) 
       		,(SELECT MAX(rel."release_form_id")
       		  FROM "release_form_data" rel 
       		  	LEFT JOIN "form" f ON f."release_form_id" = rel."release_form_id" 
       		  WHERE f."form_row_id" IS NULL) 
       		FROM "green_form_data" g
       			LEFT JOIN "form" f ON f."green_form_id" = g."green_form_id"
       		WHERE f."green_form_id" IS NULL;
 
/* insert into form from temp table */
	
	INSERT INTO "form" (
						"green_form_id"
						,"ma_form_id"
						,"la_form_id"
						,"referral_form_id"
						,"release_form_id"
						,"case_start_date"
						,"case_start_time"
					   )
	SELECT t."green_form_id"
	      ,t."ma_id"
	      ,t."la_form_id"
	      ,t."referral_form_id"
	      ,t."release_form_id"
	      ,g."date"
	      ,g."start_time"
	FROM "form_insert" t
		INNER JOIN "public"."green_form_data" g ON g."green_form_id" = t."green_form_id";
   
   
    
    
    
    
    $$ LANGUAGE SQL;
    
    
    

```



## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

- [Official Scope](https://docs.google.com/document/d/10ea3sJL2vFYip9U-cArUktH0k0BJ-HrILp8gBc3NkjQ/edit?usp=sharing)

### Completed Features

High level list of items completed.

- [x] Advocate Management (CRUD)
- [x] Case Management (CRU & sorting)
- [x] Nursing Reports (CRUD)
- [x] Data Visualization
- [x] Dispatch Abilities (Select, Search, Dispatch)
- [x] Admin Management (CRUD)
- [x] Password Reset Abilities (Admin & Advocate)

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Add Twilio 

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Hanna Nguyen
* Emi Chen
* Alex Bliss
* Laura Goetz
