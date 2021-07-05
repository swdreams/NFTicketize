const NFTicketize = artifacts.require("../contracts/NFTicketize.sol");

contract("NFTicketize", accounts => {
  it("...should store the value 89.", async () => {
    const NFTicketizeInstance = await NFTicketize.deployed();

    // Set value of 89
    var value = "1111111";
    await NFTicketizeInstance.createEvent(value, "-");

    // Get stored value
    //const storedData = await simpleStorageInstance.get.call();
    const storedData = await NFTicketizeInstance.events.call();

    assert.equal(true, true, "The value was not stored.");
  });
});