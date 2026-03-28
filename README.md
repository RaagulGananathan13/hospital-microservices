# Hospital Management System - Microservices Assignment

Node.js/Express + MySQL implementation for IT4020 Assignment 2.

## Services

- Patient Service
- Doctor Service
- Appointment Service
- Billing Service
- API Gateway

## Ports

- API Gateway: 9000
- Patient Service: 5001
- Doctor Service: 5002
- Appointment Service: 5003
- Billing Service: 5004

## Quick Start

1. Create a MySQL database named `hospital_management_db`.
2. Run the SQL in `database/init.sql`.
3. Ensure `.env` files are present in `api-gateway` and all 4 microservices.
4. Install dependencies in each service.
5. Start all 4 microservices.
6. Start the API gateway.

## Direct Service URLs

These are service root/health endpoints.

- http://localhost:5001
- http://localhost:5002
- http://localhost:5003
- http://localhost:5004

## Direct API URLs (without Gateway)

- http://localhost:5001/patients
- http://localhost:5002/doctors
- http://localhost:5003/appointments
- http://localhost:5004/bills

## Direct Swagger URLs

- http://localhost:5001/api-docs
- http://localhost:5002/api-docs
- http://localhost:5003/api-docs
- http://localhost:5004/api-docs

## Gateway Base URL (current .env)

- http://localhost:9000

## Gateway API URLs

- http://localhost:9000/api/patients
- http://localhost:9000/api/doctors
- http://localhost:9000/api/appointments
- http://localhost:9000/api/bills

## Gateway Swagger Passthrough URLs

- http://localhost:9000/patient-service/api-docs/
- http://localhost:9000/doctor-service/api-docs/
- http://localhost:9000/appointment-service/api-docs/
- http://localhost:9000/billing-service/api-docs/
