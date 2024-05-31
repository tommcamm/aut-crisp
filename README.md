# CRISP

Crisp is an innovative platform designed to connect jobseekers and recruiters efficiently. Jobseekers can create personalized profiles, upload CVs and introductory videos, while recruiters can post job listings, evaluate candidates, and interact seamlessly with potential hires. This project utilizes various AWS services to ensure security, scalability, and reliability.

## Table of Contents

- [CRISP](#crisp)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [Frontend](#frontend)
    - [Requirements](#requirements)
    - [How to Build/Run](#how-to-buildrun)

## Project Overview

Crisp is designed to enable jobseekers to highlight their skills and experiences through multimedia profiles while providing recruiters with tools for efficient job listing, candidate evaluation, and communication.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, AWS (Cognito, S3, API Gateway, Lambda, DynamoDB)
- **CI/CD**: AWS Amplify
- **Testing**: Vitest, Playwright

## Architecture

Crisp leverages AWS services to enhance data privacy, ensure high availability, and facilitate seamless scalability. The architecture includes:

- **Authentication**: Amazon Cognito
- **Storage**: Amazon S3
- **APIs**: AWS API Gateway and Lambda
- **Database**: DynamoDB

## Frontend

### Requirements

- [Node.JS 18+](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/) (or equivalent)
- [Amplify CLI](https://docs.amplify.aws/gen1/javascript/tools/cli/)

### How to Build/Run

```bash
# Step 1 - Clone the repo and pull the AWS Amplify Configuration
1. git clone git@github.com:tommcamm/aut-crisp.git
2. git checkout -b dev
3. git pull origin dev
4. amplify pull 

cd aut-crisp

# Step 2 - install all node dependencies
pnpm install

# Step 3 - Build the frontend
pnpm run build

# (Optional) Step 4 - Run dev version of frontend
pnpm run dev
```