# Vee-API

- [API Documentation](./dokumentasi/api%20doc/API%20Dokumentasi.pdf)
- [Deployment with App Engine and Cloud Sql](./dokumentasi/deployment/app%20engine.md)
- [Database ERD](./dokumentasi/erd/v1.0.0.png)

## GCP Resources

- App Engine : to host api
- Cloud SQL : to host postgre sql
- cloud build : ci/cd
- cloud repository : ci/cd
- secret manager : save key or credential

## Action need to do

- add extension to postgre sql

```
create extension cube;
create extension earthdistance;
```
