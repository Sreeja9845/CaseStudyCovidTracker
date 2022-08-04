import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';


const toggleModalMock = jest.fn()
const loginButtonMock = jest.fn()


describe("Login component test cases", () => {
  test('Validating username & password values', () => {
    render(<Login toggleModal={toggleModalMock} loginButton={loginButtonMock} isEmployee={false} />);
    const userName = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    fireEvent.change(userName, {target:{value:"myusername"}});
    fireEvent.change(password, {target:{value:"mypassword"}});
    expect(userName.value).toBe("myusername");
    expect(password.value).toBe("mypassword");
  });

  test('Validating username & password after signin button clicked', () => {
    render(<Login toggleModal={toggleModalMock} loginButton={loginButtonMock} isEmployee={false} />);
    const userName = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    const loginInButton = screen.getByRole("button", {name:"SIGNIN"});
    fireEvent.change(userName, {target:{value:"myusername"}});
    fireEvent.change(password, {target:{value:"mypassword"}});
    fireEvent.click(loginInButton);
    expect(userName.value).toBe("myusername");
    expect(password.value).toBe("mypassword");
  });
}); 
