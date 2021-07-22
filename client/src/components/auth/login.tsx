import axios from "axios";
import React from "react";
import { render } from "react-dom";

type LoginState = {
    email: string,
    password: string,
};

class Registration extends React.Component<any, LoginState> {
    
    override readonly state: LoginState;

    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            password: "",
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
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        //axios.post();
    }

    override render() {
        return (
            <form>
                <label>
                    Email:
                    <input type="text" name="email" 
                        value={this.state.email}
                        onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="hidden" name="password" 
                        value={this.state.password}
                        onChange={this.handleChange} />
                </label>
            </form>
        );
    };
};

export default Registration;