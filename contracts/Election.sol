pragma solidity >=0.5.0 <0.7.0;

contract Election{

    uint public candidatesAmount = 0; // counts the amount of candidates
    bool public pollsClosed = false; // tells whether the polls are closed or not
    address owner; // saves the owner of the contract

    struct Candidate{
        uint id;
        string name;
        uint votes;
    } // is the struct for each candidate in the election

    mapping(uint => Candidate) public candidates; 
    mapping(address => bool) public voters;
    Candidate[] public allCandidates; 

    modifier canVote(){
        require(voters[msg.sender] == false, "You can only vote once");
        require(pollsClosed == false, "The polls are closed you can't vote");
        _;
    } // checks if the user has voted already and if the polls are closed

    modifier onlyOwner(){
        require(owner == msg.sender, "You must be the owner of the contract");
        _;
    }// checks if the message sender is the owner

    constructor() public{
        Candidate memory candidate1 = Candidate(candidatesAmount, "Jim Born", 0);
        candidates[candidatesAmount] = candidate1;
        allCandidates.push(candidate1);
        candidatesAmount++;

        Candidate memory candidate2 = Candidate(candidatesAmount, "Gavan Bush", 0);
        candidates[candidatesAmount] = candidate2;
        allCandidates.push(candidate2);
        candidatesAmount++;

        Candidate memory candidate3 = Candidate(candidatesAmount, "Lincoln Harn", 0);
        candidates[candidatesAmount] = candidate3;
        allCandidates.push(candidate3);
        candidatesAmount++;
        
        owner = msg.sender;
    }

    function vote(uint _candidate) canVote public returns(bool){
        candidates[_candidate].votes = candidates[_candidate].votes + 1;
        voters[msg.sender] = true;
        return(true);
    }

    function closePolls() onlyOwner public{
        pollsClosed = true;
    }

    function getCandidatesVote(uint _id) public view returns(uint){
        return candidates[_id].votes;
    }

    // function getAllCandidates() public view returns(Candidate[] memory){
    //     return(allCandidates);
    // }


}