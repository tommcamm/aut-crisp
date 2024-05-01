# CRISP

...

## Frontend

### Requirements

- [Node.JS 18+](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/) (or equivalent)

### How to build/run

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

## Terms and Concepts

A User represents a person who has signed up to our application. They will be uniquely identified by their email address. There are two types of users:
- The jobseekers are users who are searching job opportunities according to the skills they offer.
- The recruiters are users who are posting job opportunities according to the skills they look for.

A job represents an post offer created by recruiters only. A user can browse all the job correpsonding to his qualifications.