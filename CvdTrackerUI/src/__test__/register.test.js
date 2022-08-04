import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import Register from '../components/Register';
import * as data from "../util/apiCalls";

const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()


describe("Register component test cases", () => {
  test('Validating empty values', async() => {
    render(<Register toggleModal={toggleModalMock}/>);
    const fname = screen.getByLabelText(/First Name/i);
    const lname = screen.getByLabelText(/Last Name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Password/i);
    const mobile = screen.getByLabelText(/Contact Number/i);
    const role = screen.getByLabelText(/Role/i);
    fireEvent.change(fname, {target:{value:""}});
    fireEvent.change(lname, {target:{value:""}});
    const registerInButton = screen.getByRole("button", {name:"REGISTER"});
    fireEvent.click(registerInButton);
    const error = await waitFor(() => screen.getByText('Please fill out this field'))
        expect(error).toBeInTheDocument();
  });

  test('Validating username & password after signin button clicked', () => {
    jest.spyOn(data, "registerUser").mockResolvedValue({data: [{
        id: 1,
        email: "kk@gmail.com",
        firstName: "kk",
        lastName: "gg",
        mobile:"5464564456",
        role:"admin"
    }]});
    render(<Register toggleModal={toggleModalMock}/>);
    const fname = screen.getByLabelText(/First Name/i);
    const lname = screen.getByLabelText(/Last Name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Password/i);
    const mobile = screen.getByLabelText(/Contact Number/i);
    const role = screen.getByLabelText(/Role/i);
    fireEvent.change(fname, {target:{value:""}});
    fireEvent.change(lname, {target:{value:""}});
    const registerInButton = screen.getByRole("button", {name:"REGISTER"});
    fireEvent.change(fname, {target:{value:"fname"}});
    fireEvent.change(lname, {target:{value:"lname"}});
    fireEvent.change(email, {target:{value:"email"}});
    fireEvent.change(password, {target:{value:"password"}});
    fireEvent.change(mobile, {target:{value:"mobile"}});
    fireEvent.click(registerInButton);
  });
}); 
