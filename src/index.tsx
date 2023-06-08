import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import '../src/styles/index.css'
import GlobalStyles from './styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyles />

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
