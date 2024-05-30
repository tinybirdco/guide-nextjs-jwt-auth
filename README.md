# Demo JWT

### Prerequisites

- Node.js >= v18

## Instructions

Follow these instructions to deploy the working version of this application.

### Install dependencies

Install app dependencies and datagen dependencies. From the root of the repo:

```bash
npm install
```

### Add your Tinybird parameters

First create a new file `.env.local`
```bash
cp .env.example .env.local
```

You need to copy your Tinybird host and token to the `.env.local` file in your directory:

```bash
TINYBIRD_AUTH_TOKEN=your_tinybird_admin_token
TINYBIRD_HOST=your_tinybird_host
TINYBIRD_WORKSPACE=your_tinybird_admin_token
```

## Run the dashboard locally

To view the dashboard on your machine, run it locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
