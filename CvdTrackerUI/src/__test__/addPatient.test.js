import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddPatient from '../components/addPatient';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});

let diseaseList=[{
    id: 1,
    virusName: "CORONA",
    diseaseName: "COVID-19",
    variant: "DELTA"
}];
let patients = {
    id: 89,
    patientName: "test",
    patientStatus: "confirmed",
    address: {
        id: 1,
        street: "test st",
        city: "test city",
        state: "KA"
    },
    disease: {
        id: 1,
        virusName: "CORONA",
        diseaseName: "COVID-19",
        variant: "DELTA"
    }
}
describe("addPatient component test cases", () => {


    test('Validating addPatient with empty values', async () => {
        const mock = jest.spyOn(data, "addPatients").mockResolvedValue({data: patients});
        render(<AddPatient hospitalId={1} addPatientModal={toggleModalMock} diseaseList={diseaseList} />);
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });
    test('Validating addPatient', () => {
        const mock = jest.spyOn(data, "addPatients").mockResolvedValue({data: patients});
        render(<AddPatient hospitalId={1} addPatientModal={toggleModalMock} diseaseList={diseaseList} />);
        const name = screen.getByLabelText(/Enter Patient Name/i);
        const status = screen.getByLabelText(/Enter Patient Status/i);
        const age = screen.getByLabelText(/Enter age/i);
        fireEvent.change(name, { target: { value: "patient" } });
        fireEvent.change(status, { target: { value: "confirmed" } });
        fireEvent.change(age, { target: { value: 22 } });
        expect(age.value).toBe("22");
    });

    test('Validating addPatient with values after button click', async() => {
        const mock = jest.spyOn(data, "addPatients").mockResolvedValue({data: patients});
        render(<AddPatient hospitalId={1} addPatientModal={toggleModalMock} diseaseList={diseaseList} />);
        const name = screen.getByLabelText(/Enter Patient Name/i);
        const status = screen.getByLabelText(/Enter Patient Status/i);
        const age = screen.getByLabelText(/Enter age/i);
        fireEvent.change(name, { target: { value: "patient" } });
        fireEvent.change(status, { target: { value: "confirmed" } });
        fireEvent.change(age, { target: { value: 22 } });
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
    });

}); 
