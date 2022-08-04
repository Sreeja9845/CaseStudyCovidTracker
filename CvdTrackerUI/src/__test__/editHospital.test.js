import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EditHospital from '../components/editHospital';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});


describe("editHospital component test cases", () => {


    test('Validating editHospital with empty values', async () => {
        render(<EditHospital editHospitalModal={toggleModalMock} hospitalId={1} efreeBeds={2} 
        egeneralBeds={2} eicuBeds={2}/>);
        const free = screen.getByLabelText(/Update Free Beds/i);
            const general = screen.getByLabelText(/Update General Beds/i);
            const icu = screen.getByLabelText(/Update ICU Beds/i);
            fireEvent.change(free, { target: { value: '' } });
            fireEvent.change(general, { target: { value: '' } });
            fireEvent.change(icu, { target: { value: '' } });
        const addButton = screen.getByRole("button", { name: /Update/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });
    test('Validating editHospital', () => {
        render(<EditHospital editHospitalModal={toggleModalMock} hospitalId={1} efreeBeds={2} 
            egeneralBeds={2} eicuBeds={2}/>);
            const free = screen.getByLabelText(/Update Free Beds/i);
            const general = screen.getByLabelText(/Update General Beds/i);
            const icu = screen.getByLabelText(/Update ICU Beds/i);
            fireEvent.change(free, { target: { value: 1 } });
            fireEvent.change(general, { target: { value: 0 } });
            fireEvent.change(icu, { target: { value: 2 } });
        expect(icu.value).toBe("2");
    });

    test('Validating editHospital with values after button click', async() => {
        const mock = jest.spyOn(data, "editHospitals").mockResolvedValue({data: [{
            id: 1,
            hospitalName: "GH",
            hospitalType: "General",
            zoneType: "red",
            freeBeds: 1,
            icuBeds: 1,
            generalBeds: 1
        }]});
        render(<EditHospital editHospitalModal={toggleModalMock} hospitalId={1} efreeBeds={2} 
            egeneralBeds={2} eicuBeds={2}/>);
        const free = screen.getByLabelText(/Update Free Beds/i);
        const general = screen.getByLabelText(/Update General Beds/i);
        const icu = screen.getByLabelText(/Update ICU Beds/i);
        fireEvent.change(free, { target: { value: 1 } });
        fireEvent.change(general, { target: { value: 0 } });
        fireEvent.change(icu, { target: { value: 2 } });
        const addButton = screen.getByRole("button", { name: /Update/i });
        fireEvent.click(addButton);
    });

}); 
