import { render, screen } from '../../utils/test-utils'
import { Home } from './Home'

describe('Home', () => {
  it('should display simple welcome message if user is not connected', () => {
    // Act
    render(<Home />)

    // Assert
    expect(screen.getByText('i18n-welcome')).toBeInTheDocument()
  })

  it('should display welcome message and username if user is connected', () => {
    // Arrange
    const initialState = {
      user: {
        currentUser: {
          _id: '',
          username: 'johndoe',
          token: '',
        },
      },
    }

    // Act
    render(<Home />, { preloadedState: initialState })

    // Assert
    expect(screen.getByText(/^i18n-welcomeName.+johndoe/)).toBeInTheDocument()
  })
})
