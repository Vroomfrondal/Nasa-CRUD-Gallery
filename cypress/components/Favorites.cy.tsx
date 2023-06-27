import React, { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MOCK_CARD, MOCK_LOCAL_STORAGE } from '../fixtures/NASA_RESPONSE'
import Favorites from '../../src/components/Pages/Favorites'

export const activePageContext = createContext<{ activePage: 'Home' | 'Favorites'; language: 'en' | 'es' }>({
  activePage: 'Home',
  language: 'en',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

describe('<Favorites /> Page Component Tests', () => {
  // Mounting Component for each test
  beforeEach(() => {
    cy.mount(
      <activePageContext.Provider value={{ activePage: 'Favorites', language: 'en' }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </QueryClientProvider>
      </activePageContext.Provider>
    )
  })

  // Set Local Storage for first test
  before(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify([MOCK_CARD]))
  })

  it('Displays the Favorites page with at least one liked image', () => {
    // Expect one liked image assertion
    cy.findByRole('img').should('exist')

    // Expect local storage to be populated with that image assertion
    cy.getAllLocalStorage().then((result) => {
      expect(JSON.stringify(result)).to.deep.equal(JSON.stringify(MOCK_LOCAL_STORAGE))
    })
  })
})
