import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Calendar from '../src/components/home/Calendario/CalendarView/Calendar'

describe('Calendar', () => {
    it('renders a heading', () => {
        render(<Calendar />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})
