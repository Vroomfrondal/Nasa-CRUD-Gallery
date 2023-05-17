# Nasa-CRUD-Gallery

A fully-responsive, infinite-scrolling NASA astronomy photo gallery complete with all CRUD operations.

## Technologies

Built with:

- TypeScript
- [Tailwind](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

## Dev Notes

- Create a '.env' file inside the root of the folder and paste your API key from [NASA's Website](https://api.nasa.gov/).

  ```
  VITE_NASA_API_KEY = "YOUR_SECRET_KEY_HERE"
  ```

- Scripts:

  ```
  npm run start // spins up project in a local development environment (Vite)
  ```

### NASA API Load Time Optimization

The UI utilizes a custom date-pagination-hook implemented to optimize the API call - because NASA's API takes 4 seconds for 7 days of images; you can't just pass in a huge date range to the API. Each time the last element on page is detected, we update the start and end date, and recall the API.
