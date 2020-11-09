import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import "./App.css";
import customData from "./candidates.json";
import Candidates from "./components/candidatesComponent"
import Index from "./components/index"

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, candidates: null, page: 0 };

  componentDidMount = async () => {
    console.log("The json data: ")
    console.dir(customData)
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance })//, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    console.log("The json data: " + customData)
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(10).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  screen(){
    if(this.state.page === 0){
      return (
        <Index storageValue = {this.state.storageValue}/>
      );
    }
    else if(this.state.page === 1){
      return(
        <Candidates data = {customData}/>
      )
    }
  }

  changeScreen(number){
    if(number === 0 && this.state.page !== 0){
      this.setState({
        state: number
      })
    }
    else if(number === 1 && this.state.page !== 1){
      this.setState({
        state: number
      })
    }
    else if(number === 2 && this.state.page !== 2){
      this.setState({
        state: number
      })
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Election</Navbar.Brand>
          <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
            {/* <Nav.Link href="#home"><h4 onClick={this.changeScreen(0)}>Home</h4></Nav.Link>
            <Nav.Link href="#Canditates"><h4 onClick={this.changeScreen(1)}>Canditates</h4></Nav.Link>
            <Nav.Link href="#votingBooth"><h4 onClick={this.changeScreen(2)}>Voting Booth</h4></Nav.Link> */}
          </Nav> 
        </Navbar>
        <Candidates data = {customData}/>
      </div>
    );
  }
}

export default App;
