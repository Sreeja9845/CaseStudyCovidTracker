import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import Header from '../components/Header';

const toggleModalMock = jest.fn()
describe("Header component test cases", () => {
  test('Validating empty values', async() => {
    render(<Header loginHandler={toggleModalMock}/>);
    const title = screen.getByText(/covid tracker/i);
    expect(title).toBeInTheDocument();
  });
}); 
