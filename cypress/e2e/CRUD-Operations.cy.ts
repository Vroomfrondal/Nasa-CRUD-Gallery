describe('Navigation Tests', () => {
  // clear liked images on local storage
  before(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
  })

  // Navigate between Home and Favorites page using various methods
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

describe('CRUD test suite', () => {
  beforeEach(() => {
    // cy.visit('https://nasa-photo-gallery.vercel.app/')
    cy.visit('http://127.0.0.1:5173/')
  })

  it('likes an image from inside the modal and creates an item in DB', () => {
    // Click on the first <Card />
    cy.findAllByRole('img', { timeout: 60 })
    cy.findAllByRole('img').eq(2).click()

    // Find the heart icon
    cy.findByTestId('like-button').should('exist')

    // like the heart icon
    cy.findByTestId('like-button').click()
    cy.findByTestId('close-modal').click()

    // is our local storage now populated?
    cy.getAllLocalStorage().then((res) => expect(res).exist)
  })
})
