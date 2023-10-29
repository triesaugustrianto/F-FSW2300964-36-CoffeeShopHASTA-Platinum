const {render, screen} = require('@testing-library/react')
import About from "../pages/landing/About"

describe('about page', () => {
    test('render corectly', () => {
        render(<About />)
        expect(screen.getByText(/Tentang HastaCoffee/i)).toBeInTheDocument()
    })
})