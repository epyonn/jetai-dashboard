# Jet Comparison App

## Overview

This Next.js application allows users to compare jets based on various criteria using the OpenAI API for dynamic comparisons. It fetches jet data from a PostgreSQL database using Prisma ORM, providing an interactive and informative experience.
## Features

- **Jet Data Display**: Lists jets with details including ID, name, wingspan, engines, and year.
- **Dynamic Comparisons**: Users can select jets and comparison criteria (e.g., Top Speed, Fuel Efficiency, Maximum Seats) to generate comparisons using the OpenAI API.
- **Server-Side Data Fetching**: Utilizes Next.js' `getServerSideProps` for pre-rendering jet data with server-side logic.
- **Prisma ORM Integration**: Manages database interactions for efficient data retrieval and manipulation.
- **Utilize PrismaClient**: Ensures optimal database connection management across the application.

## Setup and Installation

### Prerequisites

- Node.js (LTS version)
- PostgreSQL
- An OpenAI API key

### Getting Started

1. Clone the repository:
- git clone https://github.com/epyonn/jetai-dashboard.git
- cd jetai-dashboard 

2. Install dependencies:
-   npm install

3. Setup .env file:
- DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
- OPENAI_API_KEY="your_openai_api_key"

4. Setup development server:
- npm run dev