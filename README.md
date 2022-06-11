# Vee-API

## Background

We as Indonesian people usually still calculate the expense that comes from our vehicle manually, by gathering all bills that came from gas stations. We usually calculate the total expenses from all bills at the end of the month. Our problem led us to our ideas in this project. To build an integrated mobile app for tracking the expenses from our vehicle. Later on, this app will be our everyday’s partner when using our vehicle.

## Documentation

- [API Documentation](https://documenter.getpostman.com/view/14640466/Uz5MFZqa#55535879-eec6-49a0-899d-de696afce2c0)
- [Database ERD](./dokumentasi/erd/v1.0.0.png)

## TODO

- [x] Gethering requirements for cloud solutions, design, and architectures
- [x] Developing API Backend using NodeJs
- [x] Configuring GCP Project, budget, and API
- [x] Hosting database Postgre SQL to Cloud SQL
- [x] Deploy API Backend to APP engine
- [x] Build CI/CD for API Backend Development using Cloud BUild
- [x] Deploy Machine Learning to Compute Engine with Load Balancer
- [x] Monitoring running resources from GCP

## GCP Resources

- App Engine : to host api
- Cloud SQL : to host postgre sql
- cloud build : ci/cd
- cloud repository : ci/cd
- secret manager : save key or credential
- Monitoring : creating alert for sql and app engine cpu utilization
- API Places : search nearby gas station
- Cloud Run : deploy api for ml
- Compute Engine : deploy api for ml mode (more low latency)

## Installation Instructions

Fork and clone the forked repository:

```shell
git clone git://github.com/<your_fork>/Vee-API
```

Navigate into cloned repository:

```shell
cd Vee-API
```

Install all required packages:

```shell
npm install
```

Run the NodeJS API:

```shell
npm run start
```

API will run on [http://localhost:5000](http://localhost:5000)
