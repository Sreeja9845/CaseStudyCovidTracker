import { fireEvent, render, screen } from '@testing-library/react';
import Disease from '../components/disease';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock



beforeAll(() => {
    
});

afterAll(() => {
    jest.clearAllMocks();
});


describe("Disease component test cases", () => {
    test('Validating get all Diseases', async () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<Disease/>);
        expect(await screen.findByText(/CORONA/i)).toBeInTheDocument();
        expect(mock).toHaveBeenCalledTimes(1);
        mock.mockRestore();
    });

    test('Validatingadd add new Disease button click', async () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<Disease/>);
        expect(await screen.findByText(/CORONA/i)).toBeInTheDocument();
        expect(mock).toHaveBeenCalledTimes(1);
        mock.mockRestore();
        const addDiseaseButton = screen.getByRole("button", { name: /ADD DISEASE/i });
        fireEvent.click(addDiseaseButton);
        expect(await screen.getByLabelText(/Enter Disease Name/i)).toBeInTheDocument();
    });

    test('Validating edit Disease button click', async () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<Disease/>);
        expect(await screen.findByText(/CORONA/i)).toBeInTheDocument();
        expect(mock).toHaveBeenCalledTimes(1);
        mock.mockRestore();
        const editDiseaseButton = screen.getByTestId("ModeEditIcon");
        fireEvent.click(editDiseaseButton);
        expect(await screen.getByLabelText(/Update Disease Name/i)).toBeInTheDocument();
    });
    test('Validating delete Disease button click', async () => {
        const mock = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: [{
            id: 1,
            virusName: "CORONA",
            diseaseName: "COVID-19",
            variant: "DELTA"
        }]});
        render(<Disease/>);
        expect(await screen.findByText(/CORONA/i)).toBeInTheDocument();
        const deleteMock = jest.spyOn(data, "deleteDiseases").mockResolvedValue({status: 200});
        const deleteDiseaseButton = screen.getByTestId("DeleteIcon");
        fireEvent.click(deleteDiseaseButton);
        expect(deleteMock).toHaveBeenCalledTimes(1);
        deleteMock.mockRestore();
        
    });
}); 
