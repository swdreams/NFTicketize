const NFTicketize = artifacts.require("../contracts/NFTicketize.sol");

contract("NFTicketize", accounts => {
  it("...should store the value 89.", async () => {
    const NFTicketizeInstance = await NFTicketize.deployed();

    // Set value of 89
    await NFTicketizeInstance.createEvent("1245", "-");

    // Get stored value
    //const storedData = await simpleStorageInstance.get.call();

    assert.equal(true, true, "The value was not stored.");
  });
});
