describe('Navigation Tests', () => {
  // clear liked images on local storage
  before(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
  })

  it('Navigates between pages', () => {
    cy.visit('https://nasa-photo-gallery.vercel.app/')

    // Go to favorites page
    cy.findByRole('link', { name: 'Favorites' }).click()

    // Vanilla assertion
    cy.url().should('include', '/Favorites')

    // Test Language Switcher
    cy.findByRole('button', { name: 'ES' }).click()
    cy.findByRole('button', { name: 'EN' }).click()

    // Go back home via home page via unliked photos link
    cy.findByText('home page').click()
  })
})

// describe('CRUD test suite', () => {
//   beforeEach(() => {
//     cy.visit('https://nasa-photo-gallery.vercel.app/')
//   })
// })
