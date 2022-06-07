# App Engine With Cloud SQL

## GCP Resources

### App Engine

- provice app.yaml
  - dont define PORT env variable, because it define by app engine
- provide role to app engine service account for access cloud sql

### Cloud SQL

- provide public ip
- define authorized network

## Notes

- install sql extensions
- cant run migrate because cannot app engine full managed service
- as solution we can import database schema

## Need to Improve

in this deployment model, betwen cloud sql and app engine connected in public way.

## Deploying API at App Engine

1. Enable the App Engine Admin API
2. Enable the Cloud Build API
3. Create an app engine with node.js as language and standard as environment
4. Clone the github to cloud
```
git clone https://github.com/C22-PS001-Capstone/Vee-API.git
```
5.Change the directory to API directory
```
cd Vee-API
```
6.  Deploying the API
```
gcloud app deploy
```

## Database query

```
CREATE TABLE public.users (
	id varchar(50) NOT NULL,
	firstname text NOT NULL,
	lastname text NULL,
	email text NOT NULL,
	"password" text,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
```

```
CREATE TABLE public.activities (
	id varchar(50) NOT NULL,
	"date" date NOT NULL,
	lat float8 NULL,
	lon float8 NULL,
	km int4 NOT NULL,
	price int4 NOT NULL,
	liter float4 NOT NULL,
	"owner" varchar(50) NOT NULL,
	CONSTRAINT activities_pkey PRIMARY KEY (id)
);
```

```
ALTER TABLE public.activities ADD CONSTRAINT "fk_activities.owner_users.id" FOREIGN KEY ("owner") REFERENCES public.users(id) ON DELETE CASCADE;
```

```
CREATE TABLE public.authentications (
	"token" text NOT NULL
);
```

```
CREATE TABLE public.gasstations (
	id varchar(50) NOT NULL,
	"name" text NOT NULL,
	lat float8 NULL,
	lon float8 NULL,
	vendor text NOT NULL,
	operate bool NOT NULL,
	time_create int8 NOT NULL,
	CONSTRAINT gasstations_pkey PRIMARY KEY (id)
);
```

```
create extension cube;
create extension earthdistance;
```

```
GRANT ALL PRIVILEGES ON DATABASE veeapp TO developer;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO developer;
```
