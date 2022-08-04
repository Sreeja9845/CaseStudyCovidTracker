import { fireEvent, render, screen } from '@testing-library/react';
import ViewHospital from '../components/viewhospital';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()


let resp = {
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
};

let diseaseResp = [{
    id: 1,
    virusName: "CORONA",
    diseaseName: "COVID-19",
    variant: "DELTA"
}];

afterAll(() => {
    jest.clearAllMocks();
});


describe("View Hospital component test cases", () => {
    
    test('Validating view Hospital modal', async () => {
        const deleteMock = jest.spyOn(data, "getHospitalById").mockResolvedValue({data: resp});
        render(<ViewHospital viewHospitalModal={toggleModalMock} hospitalInfo={resp}/>);
        expect(await screen.findByText(/GH/i)).toBeInTheDocument();
    });
}); 
