This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### Prerequisites
Ensure that you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone this repository: `git clone https://github.com/ipyramiddev/carbee-frontend.git`
2. Navigate to the project directory: `cd carbee-frontend`
3. Install dependencies: `npm install`

### Configuration
To hit the backend APIs without CORS issues, add a proxy configuration to the `next.config.js` file. Refer to the [Next.js documentation](https://nextjs.org/docs/api-reference/next.config.js/rewrites) for more details.

### API Documentation 
For API documentation, refer to the [backend API documentation](https://gist.github.com/oqx/3fe35dc32796a545213d7d478452abb8).

### API Base URL
Base URL for the backend APIs: `https://backend.billowing-truth-38ad.workers.dev/`

## Usage
1. Start the development server: `npm run dev`
2. Access the application in your browser at `http://localhost:3000`

## Specifications
### Project
- Use typings with either TypeScript or JSDoc to ensure proper type checking and better code evaluation.
- Maintain clean code practices as if you are working with a team.
- Implement practical usage of algebraic data types for bonus points.

### Authentication
Feeding the backend is a pre-filled database including user information. To complete the required tasks, use the following credentials:
- Username: candidate@curbee.com
- Password: password

For this task, you need to:
1. Create a user login form with username and password fields.
2. Use the authentication endpoint to authenticate a user.

### Authorization
The backend uses JSON web tokens for authorization. Demonstrate the orchestration of the following:
1. Token management and persistence.
2. Request authorization handling in an isomorphic environment.
3. Implement auth-only pages/routes (protected routes).

### Pages
#### `/login` (public)
- Renders a login form.
- Sends a request to the authentication endpoint.
- Redirects the user to `/dashboard` on successful login.

#### `/dashboard` (protected)
- Displays appointment availability and lists times for a selected upcoming date (e.g., `2023-03-30`), starting from tomorrow.
- User can choose availability via a `<select>` component or alternative intuitive UI.
- Retrieves and displays the user's appointments.
- Supports pagination using query parameters with UI controls to fetch data for previous and next pages.
- Create a UI component to display each appointment:
  - Appointment status (Scheduled, In-Progress, etc.).
  - Start time (startTime).
  - Appointment duration.
  - CompleteTime in 12-hour format (may be empty if appointment is not yet completed).
  - Service (workOrderDto.service).

Note: The design shown below is just for guidance and not an exact representation of the payload structure.

![Appointment Preview](./public/appointment-preview.png)

## Acknowledgments
- Curbee for inspiring the Carbee project.
- [Sodapop](https://codepen.io/sodapop/pen/NWLmGqB) for providing the Curbee color