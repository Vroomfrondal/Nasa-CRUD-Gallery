# Nasa-CRUD-Gallery

A fully-responsive, infinitely scrolling NASA photo gallery complete with all CRUD operations.

## Technologies

Frontend built with:

- TypeScript
- [Tailwind](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

Backend built with:

- [Express](https://github.com/Vroomfrondal/NASA-CRUD-PROXY) Proxy server handling HTTP requests, email CORS policies, and hiding API keys.

### Libraries & Features

- First PR was the base project complete with all vanilla react and typescript code. Each PR thereafter contains production library integrations by using:
  - [React Router v7](https://reacttraining.com/blog/react-router-v6-pre) for all client-side routing (navigating pages).
  - [Ky](https://github.com/sindresorhus/ky) for the API call's fetch.
  - [React-Query](https://tanstack.com/query/v3/) for all server-state management (useFetchImages custom hook).
  - [TailwindCSS](https://tailwindcss.com/) for sanity.
  - [Twin.Macro](https://github.com/ben-rogerson/twin.macro/blob/master/docs/index.md) & [Styled Components](https://github.com/ben-rogerson/twin.macro) for HTML cleanup and CSS-in-JS with Tailwind.
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [Cypress](https://www.cypress.io/) and [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) for CRUD operation e2e testing (with [MSW](https://www.npmjs.com/package/msw) to mock API calls).
  - [react-i18next](https://react.i18next.com/) - multi-language support (English, Spanish currently).
  - [Framer Motion](https://www.framer.com/motion/) - animation.
  - Github actions, [LogRocket](https://logrocket.com/), and [Vercel](Vercel) - CI, analysis, web-hosting & more.

## Dev Notes

### Spinning up locally

- [Method1] Create a '.env' file inside the root of the folder and paste your API key from [NASA's Website](https://api.nasa.gov/).

  ```
  VITE_NASA_API_KEY = "YOUR_SECRET_KEY_HERE"
  ```

- Scripts:

  ```
  npm run start                   // spins up project in a local development environment (Vite)
  npm run cypress:dev             // starts cypress GUI w/ local server for testing-development
  npm run cypress:e2e-ci          // used in github action CI or terminal for running cypress tests with headless UI
  ```

### Testing

- Continious integration E2E & Component tests utilizing [Cypress](https://www.cypress.io/), [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/), and a Github Actions pipeline. See above scripts.

### Backend Proxy Server

I wrote a small express backend for handling HTTP requests for the <NewsLetter/> functionality and hiding keys. You can view that code [here](https://github.com/Vroomfrondal/NASA-CRUD-PROXY).

Sanitized via front-end input validation as well as rate limiting on backend.

### NASA API Load Time Optimization

The UI utilizes a custom date-pagination-hook implemented to optimize the API call - because NASA's API takes 4 seconds for 7 days of images; you can't just pass in a huge date range to the API. Each time the last element on page is detected, we update the start and end date, and recall the API.
