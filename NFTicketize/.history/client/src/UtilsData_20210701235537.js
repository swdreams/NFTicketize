import { EnvConstant} from "./const";
import axios from 'axios';

export async function GetSellOrdersByItem(_ticketId, _continuation)  {
    var tickets;
    var newTickets;
    if (_continuation == null) {
        const itemsByOwner =  await axios.get(EnvConstant.raribleServer +"/protocol/v0.1/ethereum/order/orders/sell/byItem?contract=" + EnvConstant.contractAddress +"&tokenId=" + _ticketId + "&size=100");
        if (itemsByOwner.data.items.length > 0) {
            tickets = itemsByOwner.data.items;
            newTickets = await GetSellOrdersByItem(_ticketId, itemsByOwner.data.continuation);
            if (newTickets.length > 0) {
                tickets.push(newTickets);
            }
            return tickets;
        }
    } else {
        const itemsByOwner =  await axios.get(EnvConstant.raribleServer +"/protocol/v0.1/ethereum/order/orders/sell/byItem?contract=" + EnvConstant.contractAddress +"&tokenId=" + _ticketId + "&size=100&continuation=" + _continuation);
        if (itemsByOwner.data.items.length > 0) {
            tickets = itemsByOwner.data.items;
            newTickets = await GetSellOrdersByItem(_ticketId, itemsByOwner.data.continuation);
            if (newTickets.length > 0) {
                tickets.push(newTickets);
            }
            return tickets;
        } 
    }
    return [];
}