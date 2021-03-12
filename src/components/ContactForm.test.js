import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

const errors = () => screen.queryAllByTestId('error')

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstnameInput = () => screen.getByLabelText('First Name*')
    userEvent.type(firstnameInput(), 'qqq')
    await waitFor(() => {
        expect(errors()).toHaveLength(1)
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submit = () => screen.getByRole('button')
    userEvent.click(submit())
    await waitFor(() => {
        expect(errors()).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstnameInput = () => screen.getByLabelText('First Name*')
    const lastnameInput = () => screen.getByLabelText('Last Name*')
    const submit = () => screen.getByRole('button')
    userEvent.type(firstnameInput(), 'Elmer')
    userEvent.type(lastnameInput(), 'Fudd')
    userEvent.click(submit())
    await waitFor(() => {
        expect(errors()).toHaveLength(1)
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = () => screen.getByLabelText('Email*')
    userEvent.type(emailInput(), 'email')
    await waitFor(() => {
        expect(errors()[0])
            .toHaveTextContent('email must be a valid email address.')
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstnameInput = () => screen.getByLabelText('First Name*')
    const emailInput = () => screen.getByLabelText('Email*')
    const submit = () => screen.getByRole('button')
    userEvent.type(firstnameInput(), 'Elmer')
    userEvent.type(emailInput(), 'killd@wabb.it')
    userEvent.click(submit())
    await waitFor(() => {
        expect(errors()[0]).toHaveTextContent('lastName is a required field.')
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstnameInput = () => screen.getByLabelText('First Name*')
    const lastnameInput = () => screen.getByLabelText('Last Name*')
    const emailInput = () => screen.getByLabelText('Email*')
    const messageInput = () => screen.getByLabelText('Message')
    const submit = () => screen.getByRole('button')
    const firstnameDisplay = () => screen.queryByTestId('firstnameDisplay')
    const lastnameDisplay = () => screen.queryByTestId('lastnameDisplay')
    const emailDisplay = () => screen.queryByTestId('emailDisplay')
    const messageDisplay = () => screen.queryByTestId('messageDisplay')
    userEvent.type(firstnameInput(), 'Elmer')
    userEvent.type(lastnameInput(), 'Fudd')
    userEvent.type(emailInput(), 'killd@wabb.it')
    userEvent.click(submit())
    await waitFor(() => {
        expect(firstnameDisplay()).toHaveTextContent('Elmer')
        expect(lastnameDisplay()).toHaveTextContent('Fudd')
        expect(emailDisplay()).toHaveTextContent('killd@wabb.it')
        expect(messageDisplay()).not.toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstnameInput = () => screen.getByLabelText('First Name*')
    const lastnameInput = () => screen.getByLabelText('Last Name*')
    const emailInput = () => screen.getByLabelText('Email*')
    const messageInput = () => screen.getByLabelText('Message')
    const submit = () => screen.getByRole('button')
    const firstnameDisplay = () => screen.queryByTestId('firstnameDisplay')
    const lastnameDisplay = () => screen.queryByTestId('lastnameDisplay')
    const emailDisplay = () => screen.queryByTestId('emailDisplay')
    const messageDisplay = () => screen.queryByTestId('messageDisplay')
    userEvent.type(firstnameInput(), 'Elmer')
    userEvent.type(lastnameInput(), 'Fudd')
    userEvent.type(emailInput(), 'killd@wabb.it')
    userEvent.type(messageInput(), 'Be vewy, vewy qwiet . . .')
    userEvent.click(submit())
    await waitFor(() => {
        expect(firstnameDisplay()).toHaveTextContent('Elmer')
        expect(lastnameDisplay()).toHaveTextContent('Fudd')
        expect(emailDisplay()).toHaveTextContent('killd@wabb.it')
        expect(messageDisplay()).toHaveTextContent('Be vewy, vewy qwiet . . .')
    })
}); 