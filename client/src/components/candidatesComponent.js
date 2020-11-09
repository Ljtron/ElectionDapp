import React, { Component } from "react";
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

class Candidate extends Component{

    render(){
        return(
            <div class="container" style={{paddingTop: "3%"}}>
                <div class="row">
                    <div class="col-4">
                        <img src={this.props.person.image}/>
                    </div>
                    <div class="col">
                        <h1>{this.props.person.name}</h1>
                        <br />
                        <h4>{this.props.person.description}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

class Candidates extends Component{
    
    render(){
        return(
            <div>
                {this.props.data.candidates.map((user) => (
                    <Candidate person={user}/>
                    //<h1>{user.name}</h1>
                    // <User
                    //     name={`${user.name.first} ${user.name.last}`}
                    //     avatar={user.picture.thumbnail}
                    //     email={user.email}
                    //     key={user.id.value}
                    // />
                ))}
            </div>
                // <div class = "card-complete">{cardval}</div>
        )
    }
}

export default Candidates;


