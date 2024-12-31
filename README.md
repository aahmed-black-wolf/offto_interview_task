# OFFTO Frontend Engineer Assessment

## Description
This project is a frontend application designed for the OFFTO assessment. It replicates a provided design and integrates with specific APIs for destination and hotel search functionality.

## Features
- **Localization Support:** Integration with `next-intl` for Arabic and English languages for every thing even the validation messages.
- **Responsive UI:** A user-friendly interface for searching hotels and destinations dosn't match the provided screens 100% beauce this is not a figma design so i tried my best.
- **Dynamic Search:** Real-time search functionality for cities and hotels and implemented depouncing the search for the cities.
- **Room and Passenger Selection:** Users can specify room details and the number of passengers.
- **Validations and toaster mesages:** Built-in validation for input fields and custom error messages.
- **API Integration:** Interact with APIs for destination and hotel search.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd offto_interview_task
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed. Then run:
   ```bash
   pnpm add
   ```

3. **Environment Variables**
   Create a `.env` file based on the provided `.env.example` and fill in the required variables.

4. **Run the Development Server**
   ```bash
   pnpm dev
   ```

5. **Access the Application**
   Open your browser and go to `http://localhost:3000`.

## Assumptions
- You have Node.js and npm installed on your machine.
- The project is built using Next.js and TypeScript.

## Usage
- Use the search bar to enter a destination and select a city.
- Select check-in and check-out dates.
- Specify the number of rooms and passengers.
- Click the search button to view available hotels.
