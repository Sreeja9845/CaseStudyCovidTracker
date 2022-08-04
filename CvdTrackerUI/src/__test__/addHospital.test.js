import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddHospital from '../components/addHospital';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});


describe("addHospital component test cases", () => {


    test('Validating addHospital with empty values', async () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<AddHospital addHospitalModal={toggleModalMock} />);
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });
    test('Validating addHospital', () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<AddHospital addHospitalModal={toggleModalMock} />);
        const name = screen.getByLabelText(/Enter Hospital Name/i);
        const type = screen.getByLabelText(/Enter Hospital Type/i);
        const zone = screen.getByLabelText(/Enter zone/i);
        fireEvent.change(name, { target: { value: "GH" } });
        fireEvent.change(type, { target: { value: "general" } });
        fireEvent.change(zone, { target: { value: "red" } });
        expect(zone.value).toBe("red");
    });

    test('Validating addHospital with values after button click', async() => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<AddHospital addHospitalModal={toggleModalMock} />);
        const name = screen.getByLabelText(/Enter Hospital Name/i);
        const type = screen.getByLabelText(/Enter Hospital Type/i);
        const zone = screen.getByLabelText(/Enter zone/i);
        fireEvent.change(name, { target: { value: "GH" } });
        fireEvent.change(type, { target: { value: "general" } });
        fireEvent.change(zone, { target: { value: "red" } });
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
    });

}); 
