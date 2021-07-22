import axios from "axios";
import React from "react";
import { render } from "react-dom";

type RegistrationState = {
    email: string,
    password: string,
    confirmPassword: string,
};

class Registration extends React.Component<any, RegistrationState> {
    
    override readonly state: RegistrationState;

    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        //axios.post();
    };

    validate() {

    };

    override render() {
        return (
            <form>
                <label>Email:</label>
                <input type="text" name="email" 
                    value={this.state.email}
                    onChange={this.handleChange} />
                <label>Password:</label>
                <input type="hidden" name="password" 
                    value={this.state.password}
                    onChange={this.handleChange} />
                <label>Confirm Password:</label>
                <input type="hidden" name="confirmPassword" 
                    value={this.state.confirmPassword} 
                    onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    };
};

export default Registration;