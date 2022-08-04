import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../components/Home';
import * as data from "../util/apiCalls";
jest.mock('axios'); // This overwrites axios methods with jest Mock
const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()

afterAll(() => {
    jest.clearAllMocks();
});


describe("Home component test cases", () => {


    test('Load home page', async () => {
        Storage.prototype.getItem = jest.fn(() => 'kkk');
        const mock = jest.spyOn(data, "getAllPatientsHistory").mockResolvedValue({data: {
            "totalCases": 6,
            "totalCasesInLast24Hrs": 0,
            "totalLabTest": 7,
            "totalConfirmedCases": 6,
            "totalIsolatedCases": 6,
            "totalRecoveredCases": 2,
            "totalDeathCases": 0
        }});
        render(
            <Router><Home /></Router>);
        const totalCases = screen.getByText("TOTAL CASES")
        expect(totalCases).toBeInTheDocument();
    });
    
}); 
