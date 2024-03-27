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