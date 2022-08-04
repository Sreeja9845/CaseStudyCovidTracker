import { fireEvent, render, screen } from '@testing-library/react';
import Hospital from '../components/hospital';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock



let resp = [{
    id: 1,
    hospitalName: "GH",
    hospitalType: "general",
    zoneType: "red",
    freeBeds:0,
    generalBeds:10,
    icuBeds:20,
    diseases: [{
        id: 1,
        virusName: "CORONA",
        diseaseName: "COVID-19",
        variant: "DELTA"
    }],
    address: {
        id: 1,
        street: "test st",
        city: "test city",
        state: "KA"
    },
    patients: [{
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
    }]
}];

let diseaseResp = [{
    id: 1,
    virusName: "CORONA",
    diseaseName: "COVID-19",
    variant: "DELTA"
}];

afterAll(() => {
    jest.clearAllMocks();
});


describe("Hospital component test cases", () => {
    test('Validating get all Hospitals', async () => {
        const mockDiseases = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: diseaseResp});
        const mockHospitals = jest.spyOn(data, "getAllHospitals").mockResolvedValue({data: resp});
        render(<Hospital/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
        expect(mockHospitals).toHaveBeenCalledTimes(1);
        mockHospitals.mockRestore();
    });

    test('Validatingadd add new Hospital button click', async () => {
        const mockDiseases = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: diseaseResp});
        const mockHospitals = jest.spyOn(data, "getAllHospitals").mockResolvedValue({data: resp});
        render(<Hospital/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
        expect(mockHospitals).toHaveBeenCalledTimes(1);
        mockHospitals.mockRestore();
        const addHospitalButton = screen.getByRole("button", { name: /ADD HOSPITAL/i });
        fireEvent.click(addHospitalButton);
        expect(await screen.getByLabelText(/Enter Hospital Name/i)).toBeInTheDocument();
    });

    test('Validating edit Hospital button click', async () => {
        const mockDiseases = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: diseaseResp});
        const mockHospitals = jest.spyOn(data, "getAllHospitals").mockResolvedValue({data: resp});
        render(<Hospital/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
        expect(mockHospitals).toHaveBeenCalledTimes(1);
        mockHospitals.mockRestore();
        const editHospitalButton = screen.getByTestId("ModeEditIcon");
        fireEvent.click(editHospitalButton);
        expect(await screen.getByLabelText(/Update Free Beds/i)).toBeInTheDocument();
    });
    test('Validating delete Hospital button click', async () => {
        const mockDiseases = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: diseaseResp});
        const mockHospitals = jest.spyOn(data, "getAllHospitals").mockResolvedValue({data: resp});
        render(<Hospital/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
        const deleteMock = jest.spyOn(data, "deleteHospitals").mockResolvedValue({status: 200});
        const deleteHospitalButton = screen.getByTestId("DeleteIcon");
        fireEvent.click(deleteHospitalButton);
        expect(deleteMock).toHaveBeenCalledTimes(1);
        deleteMock.mockRestore();
        
    });

    test('Validating view Hospital button click', async () => {
        const mockDiseases = jest.spyOn(data, "getAllDiseases").mockResolvedValue({data: diseaseResp});
        const mockHospitals = jest.spyOn(data, "getAllHospitals").mockResolvedValue({data: resp});
        render(<Hospital/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
        const deleteMock = jest.spyOn(data, "getHospitalById").mockResolvedValue({data: resp[0]});
        const viewHospitalButton = screen.getByTestId("AppsIcon");
        fireEvent.click(viewHospitalButton);
        expect(deleteMock).toHaveBeenCalledTimes(1);
        deleteMock.mockRestore();
        
    });
}); 
