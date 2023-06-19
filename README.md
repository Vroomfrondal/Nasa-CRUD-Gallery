# Nasa-CRUD-Gallery

A fully-responsive, infinite-scrolling NASA astronomy photo gallery complete with all CRUD operations.

## Technologies

Built with:

- TypeScript
- [Tailwind](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

## Dev Notes

### Spinning up locally

- Create a '.env' file inside the root of the folder and paste your API key from [NASA's Website](https://api.nasa.gov/).

  ```
  VITE_NASA_API_KEY = "YOUR_SECRET_KEY_HERE"
  ```

- Scripts:

  ```
  npm run start // spins up project in a local development environment (Vite)
  npm cypress   // spins up crypress e2e testing environment
  ```

### NASA API Load Time Optimization

The UI utilizes a custom date-pagination-hook implemented to optimize the API call - because NASA's API takes 4 seconds for 7 days of images; you can't just pass in a huge date range to the API. Each time the last element on page is detected, we update the start and end date, and recall the API.

### Libraries

- First PR was the base project complete with all vanilla react and typescript code. Each PR thereafter contains production library integrations by using:
  - [React Router v7](https://reacttraining.com/blog/react-router-v6-pre) for all client-side routing (navigating pages).
  - [Ky](https://github.com/sindresorhus/ky) for the API call's fetch.
  - [React-Query](https://tanstack.com/query/v3/) for all server-state management.
  - [TailwindCSS](https://tailwindcss.com/) for sanity.
  - [Twin.Macro](https://github.com/ben-rogerson/twin.macro/blob/master/docs/index.md) & [Styled Components](https://github.com/ben-rogerson/twin.macro) for HTML cleanup and CSS-in-JS with Tailwind.
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [Cypress](https://www.cypress.io/) for CRUD operation e2e testing (with [MSW](https://www.npmjs.com/package/msw) to mock API calls) & automation.
  - [react-i18next](https://react.i18next.com/) - multi-language support (English, Spanish currently).
  - [Framer Motion](https://www.framer.com/motion/) - animation.
  - Github actions, [LogRocket](https://ecg.atlassian.net/wiki/spaces/ECGFE/pages/1033207980/Project+2+Simple+CRUD+App#:~:text=PR%20approved%20with-,LogRocket,-integration), and [Vercel](Vercel) - CI, analysis, web-hosting & more.
