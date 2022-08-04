import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EditDisease from '../components/editDisease';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});


describe("editDisease component test cases", () => {


    test('Validating editDisease with empty values', async () => {
        render(<EditDisease editDiseaseModal={toggleModalMock} diseaseId={1} diseaseNameFromDb={"corona"} 
            virusNameFromDb={"virus"} varientNameFromDb={"varient"}/>);
        const disease = screen.getByLabelText(/Update Disease Name/i);
        const virus = screen.getByLabelText(/Update Virus Name/i);
        const variant = screen.getByLabelText(/Update Varient Name/i);
        fireEvent.change(variant, { target: { value: "" } });
        fireEvent.change(disease, { target: { value: "" } });
        fireEvent.change(virus, { target: { value: "" } });
        const addButton = screen.getByRole("button", { name: /Update/i });
        fireEvent.click(addButton);
        const error = await waitFor(() => screen.getByText('Fields cannot be blank'))
        expect(error).toBeInTheDocument();
    });
    test('Validating editDisease', () => {
        render(<EditDisease editDiseaseModal={toggleModalMock} diseaseId={1} diseaseNameFromDb={"corona"} 
        virusNameFromDb={"virus"} varientNameFromDb={"varient"}/>);
        const disease = screen.getByLabelText(/Update Disease Name/i);
        const virus = screen.getByLabelText(/Update Virus Name/i);
        const variant = screen.getByLabelText(/Update Varient Name/i);
        fireEvent.change(variant, { target: { value: "variantss" } });
        fireEvent.change(disease, { target: { value: "disease" } });
        fireEvent.change(virus, { target: { value: "virus" } });
        expect(virus.value).toBe("virus");
    });

    test('Validating editDisease with values after button click', async() => {
        const mock = jest.spyOn(data, "editDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<EditDisease editDiseaseModal={toggleModalMock} diseaseId={1} diseaseNameFromDb={"corona"} 
            virusNameFromDb={"virus"} varientNameFromDb={"varient"}/>);
        const disease = screen.getByLabelText(/Update Disease Name/i);
        const virus = screen.getByLabelText(/Update Virus Name/i);
        const variant = screen.getByLabelText(/Update Varient Name/i);
        fireEvent.change(variant, { target: { value: "variantss" } });
        fireEvent.change(disease, { target: { value: "disease" } });
        fireEvent.change(virus, { target: { value: "virus" } });
        const addButton = screen.getByRole("button", { name: /Update/i });
        fireEvent.click(addButton);
    });

}); 
