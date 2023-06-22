// clear liked images on local storage
before(() => {
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
})

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/') // https://nasa-photo-gallery.vercel.app/
  })

  it('Visits the Home Page', () => {
    cy.url().should('deep.equal', 'http://127.0.0.1:5173/')
  })

  it('Visits the Favorites Page', () => {
    // Go to favorites page
    cy.findByRole('link', { name: 'Favorites' }).click()

    // assertion
    cy.url().should('include', '/Favorites')

    // Go back home via home page via unliked photos link
    cy.findByText('home page').click()
  })

  it('Tests Language Switcher', () => {
    cy.findByRole('button', { name: 'ES' }).click()
    cy.findByRole('button', { name: 'EN' }).click()
  })
})

describe('CRUD test suite', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/') // https://nasa-photo-gallery.vercel.app/
  })

  it('(Create) likes an image from inside the cards modal', () => {
    // Click on the first <Card /> on HomePage
    cy.findAllByRole('img', { timeout: 30000 })
    cy.findAllByRole('img', { timeout: 30000 }).eq(2).should('exist').click()

    // Assert that heart button exists in Modal
    cy.findByTestId('like-button-modal').should('exist')

    // like the heart icon & close modal
    cy.findByTestId('like-button-modal').click()
    cy.findByTestId('close-modal').click()

    // assert that our local storage is now populated
    cy.getAllLocalStorage().then((res) => expect(res['http://127.0.0.1:5173']['nasa-liked-images']).exist)
  })

  it('(Create) likes an image by hovering a card on the HomePage', () => {
    // Locate cards, and for first one click the like button without opening modal
    cy.findAllByTestId('card', { timeout: 30000 })
      .should('exist')
      .each((card, index) => {
        if (index === 0) {
          cy.wrap(card).findByTestId('like-button').click({ force: true })
        }
      })

    // Assert that local storage contains an item
    cy.getAllLocalStorage().then((res) => {
      expect(res['http://127.0.0.1:5173']['nasa-liked-images']).to.not.deep.equal([])
    })
  })

  // it('(Delete) Unlikes an image from the Favorites Page, HomePage, or Card Modal', () => {

  // })
})
