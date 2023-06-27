import React from 'react'
import Loading from '../../src/components/Loading'

describe('<Loading /> Component Tests', () => {
  it('Displays the loader user sees whilest loading API call / images', () => {
    // Mounting Component
    cy.mount(<Loading />)

    // Assertion
    cy.findByRole('heading', { name: 'Loading...' }).should('exist')
  })
})
