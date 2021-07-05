const NFTicketize = artifacts.require("../contracts/NFTicketize.sol");

contract("NFTicketize", accounts => {
  it("...should store correct value on event.", async () => {
    const NFTicketizeInstance = await NFTicketize.deployed();

    // Set value of 89
    var value = "1111111";
    await NFTicketizeInstance.createEvent(value, "-");

    // Get stored value
    //const storedData = await simpleStorageInstance.get.call();
    const storedData = await NFTicketizeInstance.events.call(0);
    console.log(storedData);
    assert.equal(value, storedData.startDate, "The value was not stored.");
  });

  it("...should store correct value on ticketCategory.", async () => {
    const NFTicketizeInstance = await NFTicketize.deployed();

    const storedData = await NFTicketizeInstance.events.call(0);
    console.log(storedData);

    var eventId = 0;
    await NFTicketizeInstance.createTicketCategory(eventId, 10, 100, 0, 10, "-");
    // Get stored value
    //const storedData = await simpleStorageInstance.get.call();
    const storedDataNew = await NFTicketizeInstance.ticketCategories.call(0);
    console.log(storedDataNew);
    assert.equal(eventId, storedDataNew.eventId, "The value was not stored.");
  });

});
