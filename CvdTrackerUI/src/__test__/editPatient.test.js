import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EditPatient from '../components/editPatient';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});

describe("editPatient component test cases", () => {


    test('Validating editPatient with empty values', async () => {
        render(<EditPatient editPatientModal={toggleModalMock} patientId={1}/>);
        const status = screen.getByText(/Enter Patient Status/i);
        const lab = screen.getByText(/Enter Lab Test/i);
       
        const addButton = screen.getByRole("button", { name: /Update/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });

}); 
