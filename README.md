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

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
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
