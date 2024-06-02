import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe("LoginForm", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  it("captures user input in email and password fields", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const emailInput = getByLabelText("Email address", { exact: false });
    const passwordInput = getByLabelText("Password", { exact: false });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const passwordInput = getByLabelText("Password");
    const toggleButton = getByText("Show");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("submits form with correct input", async () => {
    const mockLogin = jest.fn();
    useAuth.mockReturnValue({ login: mockLogin });
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it('resets input fields on error', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credential'));
    const mockUseAuth = jest.fn().mockReturnValue({ login: mockLogin });
    useAuth.mockReturnValue(mockUseAuth);

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = getByLabelText('Email address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });
});
