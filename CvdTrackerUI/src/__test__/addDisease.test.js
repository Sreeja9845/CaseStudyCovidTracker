import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddDisease from '../components/addDisease';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});


describe("addDisease component test cases", () => {


    test('Validating addDisease with empty values', async () => {
        render(<AddDisease addDiseaseModal={toggleModalMock} />);
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });
    test('Validating addDisease', () => {
        render(<AddDisease addDiseaseModal={toggleModalMock} />);
        const disease = screen.getByLabelText(/Enter Disease Name/i);
        const virus = screen.getByLabelText(/Enter Virus Name/i);
        const variant = screen.getByLabelText(/Enter Varient Name/i);
        fireEvent.change(variant, { target: { value: "variantss" } });
        fireEvent.change(disease, { target: { value: "disease" } });
        fireEvent.change(virus, { target: { value: "virus" } });
        expect(virus.value).toBe("virus");
    });

    test('Validating addDisease with values after button click', async() => {
        const mock = jest.spyOn(data, "addDisease").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<AddDisease addDiseaseModal={toggleModalMock} />);
        const disease = screen.getByLabelText(/Enter Disease Name/i);
        const virus = screen.getByLabelText(/Enter Virus Name/i);
        const variant = screen.getByLabelText(/Enter Varient Name/i);
        fireEvent.change(variant, { target: { value: "variantss" } });
        fireEvent.change(disease, { target: { value: "disease" } });
        fireEvent.change(virus, { target: { value: "virus" } });
        const addButton = screen.getByRole("button", { name: /Add/i });
        fireEvent.click(addButton);
    });

}); 
