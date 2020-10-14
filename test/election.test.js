var electionContract = artifacts.require("./Election.sol")

contract("Election contract test", (accounts) => {
    var electionInstance;

    before(async() =>{
        electionInstance = await electionContract.deployed()
    })

    describe("getting candidates data", () => {

        it("Get the first candidate", async() => {
            var candidates = await electionInstance.candidates(0);
            //console.log(candidates);
            assert.equal(candidates.name, "Jim Born", "The names aren't equal to each other")
        })

        it("Get the second candidate", async() => {
            var candidates = await electionInstance.candidates(1);
            //console.log(candidates);
            assert.equal(candidates.name, "Gavan Bush", "The names aren't equal to each other")
        })

        it("Get the third candidate", async() => {
            var candidates = await electionInstance.candidates(2);
            //console.log(candidates);
            assert.equal(candidates.name, "Lincoln Harn", "The names aren't equal to each other")
        })
    })

    describe("voting for the candidate", () => {

        it("The account is going to vote for a candidate", async() => {
            await electionInstance.vote(0, {from: accounts[0]});

            // checks if the candidate was voted for
            var candidates = await electionInstance.candidates(0);
            //console.log(candidates);
            assert.equal(candidates.votes.words[0], 1, "The candidate didn't get voted for")
        })

        it("The account can't vote twice", async() => {
            try{
                await electionInstance.vote(0, {from: accounts[0]});
                await electionInstance.vote(0, {from: accounts[0]});
            }
            catch{

                // returns when the voter votes more than once
                console.log("can't vote twice")
            }
        })

        it("closing the polls", async() => {
            await electionInstance.closePolls({from: accounts[0]});

            try{
                await electionInstance.vote(1, {from: accounts[0]})
            }
            catch{
                console.log("can't vote when the polls are closed")
            }
        })
    })
})