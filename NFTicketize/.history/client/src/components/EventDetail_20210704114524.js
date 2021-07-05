import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EnvConstant} from ".././const";
import Async from 'react-async';
import { useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { ethers } from "ethers";
import { gql } from '@apollo/client';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';
import { GetSellOrdersByItem, GetRaribleInformationAboutTicket, GetMyTickets, GetBidsByTicket, GetDetailsAboutTicket, GetTicketsForBid, GetTicketsForSell, CreateCancelOrder, SignOrderMessage, StringToBoolean, PrepareTx } from ".././UtilsData";
import { CreateMakerOrder, CreateBidOrderForCurrency, CreateBidOrderForTrade} from ".././UtilsData";
import { Asset, AssetType} from ".././UtilsData";
import { ApolloClientCustom, Provider, ERC721, enc, ETH, ZERO, ORDER_DATA_V1} from ".././UtilsData";
import TicketMarket from './TicketMarket';

// Styles template
const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  labelFormControl: {
    minWidth: 160,
  },
  labelFormControlFull: {
    minWidth: 360,
  },
}));

const NFTicketizeContractArt = require( "../contracts/NFTicketize.json");
const ExchangeV2CoreArt = require( "../contracts/rarible/ExchangeV2Core.json");

const uint8ArrayToString = require('uint8arrays/to-string');
const uint8ArrayConcat = require('uint8arrays/concat');
const all = require('it-all');

const TicketsTypesEnum = {
	MY_TICKETS: "my_tickets",
  FOR_SELL: "for_sell",
	FOR_BID: "for_bid"
};

function TicketCategoryDetail({onReloadList, onSetOverlay, ipfs}) {  
 
  const [buyDialogOpen, setBuyDialogOpen] = React.useState(false);
  const [ticketCategoryKeyForDialog, setTicketCategoryKeyForDialog] = React.useState(-1);
  const [ticketCategoryNameForDialog, setTicketCategoryNameForDialog] = React.useState("");
  const [ticketCategoryPriceForDialog, setTicketCategoryPriceForDialog] = React.useState(0);

  const [buyTicketDialogOpen, setBuyTicketDialogOpen] = React.useState(false);
  const [sellDialogOpen, setSellDialogOpen] = React.useState(false);
  const [cancelSellDialogOpen, setCancelSellDialogOpen] = React.useState(false);
  const [forBidDialogOpen, setForBidDialogOpen] = React.useState(false);
  const [cancelForBidDialogOpen, setCancelForBidDialogOpen] = React.useState(false);
  const [bidDialogOpen, setBidDialogOpen] = React.useState(false);
  const [tokenForDialog, setTokenForDialog] =  React.useState(-1);

  const [priceForSell, setPriceForSell] = React.useState("");
  const [priceForSellValidation, setPriceForSellValidation] = React.useState(false);
  const [ticketsTypes, setTicketTypes] = React.useState("my_tickets");
  const [orderForDialog, setOrderForDialog] = React.useState(null);
  
  let location = useLocation();
  const eventKey = location.state.eventKey;
  const myEvent = location.state.myEvent;

  // Get tiers from chosen project
  const getTicketCategoriesFromEvent = async () => {
    const ticketCategoriesQuery = ` {
      ticketCategories(where: { eventId: "` + eventKey + `" }) {
        id
        eventId
        currentMintTickets
        maxTickets
        ticketPrice
        resellTicketValue
        metadataIpfsCid
      }
    }`;

    var dataFromSubGraph = await ApolloClientCustom.query({
      query: gql(ticketCategoriesQuery)
    });
    var ticketCategories = dataFromSubGraph.data.ticketCategories;
    if (ticketCategories.length > 0) {
      var data = [];
      for (var counter = 0; counter < ticketCategories.length; counter++) {
        const ipfsData = await getTicketCategoryDetail(ticketCategories[counter].metadataIpfsCid);
        if (ipfsData) {
          var buyButtonFlag = true;
          if (StringToBoolean(myEvent) === true || parseInt(ticketCategories[counter].currentMintTickets) === parseInt(ticketCategories[counter].maxTickets)) {
            buyButtonFlag = false;
          }

          data.push({
            key: parseInt(ticketCategories[counter].id),
            price: ethers.utils.formatEther(ticketCategories[counter].ticketPrice).toString(),
            sold_tickets: ticketCategories[counter].currentMintTickets,
            max_tickets: ticketCategories[counter].maxTickets,
            resell_ticket_value: ticketCategories[counter].resellTicketValue,
            name: ipfsData.categoryName,
            description: ipfsData.description,
            buy_button: buyButtonFlag
          });
        }
      }
    
      return data;
    }
    return [];
  }

  // Get tier detail from database
  const getTicketCategoryDetail = async(metadataIpfsCid) =>  {
    if (ipfs) {
      const ipfsData = uint8ArrayConcat(await all(ipfs.cat(metadataIpfsCid)));
      const ipfsDataJSON = JSON.parse(uint8ArrayToString(ipfsData));
      
      return ipfsDataJSON;
    }
    return null;
  }

  const getTickets = async () => {
    const signer = Provider.getSigner()
    const address = await signer.getAddress();
    var tickets = [];
    if (ticketsTypes === TicketsTypesEnum.MY_TICKETS) {
      tickets = await getMyTickets(address, null);
    } else if (ticketsTypes === TicketsTypesEnum.FOR_SELL) {
      tickets = await getTicketsForSell(address, null);
    } else if (ticketsTypes === TicketsTypesEnum.FOR_BID) {
      tickets = await getTicketsForBid(address);
    }

    return tickets;
  }

  //Get my tickets
  const getMyTickets = async (_address, _continuation) => {
    var data = [];
    var ticketsDataItems = await GetMyTickets(_address, null, eventKey);
    for(var counter = 0; counter < ticketsDataItems.length; counter++) {
      var obj = ticketsDataItems[counter];
      obj.buy_ticket_button = false;
      obj.date = new Date(Date.parse(obj.date)).toLocaleString();

      //Set sell and cancel_sell buttons and resell_value field 
      const ordersByItem = await GetSellOrdersByItem(obj.tokenId, null);
      //If there is order in list, user could cancel sell(cancel that order), otherwise, user could sell (set order in list)
      if(ordersByItem.length > 0) {
        obj.sell_button = false;
        obj.cancel_sell_button = true;
        obj.resell_value_flag = true;
        var price = ordersByItem[0].take.value;
        obj.resell_value = ethers.utils.formatEther(price).toString();
        if (ordersByItem[0].makePriceUsd != null) {
          obj.price_in_usd = ordersByItem[0].makePriceUsd.toFixed(2);
        } else {
          obj.price_in_usd = 0;
        }
        obj.order = ordersByItem[0];
      }
      else {
        obj.sell_button = true;
        obj.cancel_sell_button = false;
        obj.resell_value_flag = false;
        obj.resell_value = 0;
        obj.price_in_usd = 0;
        obj.order = null;
      }
      
      const ticketQuery = ` {
        tickets(where: { id: "0x` + Number(obj.tokenId).toString(16) + `" }) {
          forBid
        }
      }`;
      var dataFromSubGraph = await ApolloClientCustom.query({
          query: gql(ticketQuery)
      });
      var ticketsData = dataFromSubGraph.data.tickets;
      if (parseInt(ticketsData[0].forBid) === 0) {
        obj.for_bid = true;
        obj.cancel_for_bid = false;
      } else {
        obj.for_bid = false;
        obj.cancel_for_bid = true;
      }
      obj.bid = false;

      data.push(obj);
    }
    return data;
  }

  //Get tickets for sell
  const getTicketsForSell = async (_address, _continuation) => {
    var data = [];
    var ticketsDataItems = await GetTicketsForSell(_address, null, eventKey);
    for(var counter = 0; counter < ticketsDataItems.length; counter++) {
      var obj = ticketsDataItems[counter];
      obj.tokenId = ticketsDataItems[counter].make.assetType.tokenId;
      //Set buttons
      obj.buy_ticket_button = true;
      obj.date = new Date(Date.parse(obj.lastUpdateAt)).toLocaleString();
      obj.sell_button = false;
      obj.cancel_sell_button = false;
      obj.resell_value_flag = true;
      
      var price = obj.take.value;
      obj.resell_value = ethers.utils.formatEther(price).toString();
      if (obj.makePriceUsd != null) {
        obj.price_in_usd = obj.makePriceUsd.toFixed(2);
      } else {
        obj.price_in_usd = 0;
      }

      obj.order = obj;
      obj.for_bid = false;
      obj.cancel_for_bid = false;
      obj.bid = false;
      data.push(obj);
    }
    return data;
  }
  
  //Get tickets for bid
  const getTicketsForBid = async (_address) => {

    var ticketsForBid = await GetTicketsForBid(_address, eventKey);
    for(var counter = 0; counter < ticketsForBid.length; counter++) {
      ticketsForBid[counter].buy_ticket_button = false;
      ticketsForBid[counter].date = new Date(Date.parse(ticketsForBid[counter].date)).toLocaleString();
      ticketsForBid[counter].sell_button = false;
      ticketsForBid[counter].cancel_sell_button = false;

      ticketsForBid[counter].resell_value_flag = false;
      ticketsForBid[counter].resell_value = 0;
      ticketsForBid[counter].price_in_usd = 0;
      ticketsForBid[counter].bid = true;
    }
    return ticketsForBid;
  }

  //Get tickets for bid
  const getBids = async ({ticket}) => {
    if (ticket !== "-1") {
      var bids = await GetBidsByTicket(ticket, null);
      const signer = Provider.getSigner()
      const address = await signer.getAddress();
      var resultBids = [];
      for(var counter = 0; counter < bids.length; counter++) {
        var resultBid = {};
        var make = bids[counter].make;
        resultBid.hash = bids[counter].hash;
        resultBid.type = make.assetType.assetClass;
        resultBid.value = make.value;
        resultBid.date = new Date(Date.parse(bids[counter].createdAt)).toLocaleString(); 
        if (make.assetType.assetClass === "ERC721") {
          var detailsAboutTicket = await GetDetailsAboutTicket(make.assetType.tokenId);
          resultBid.description = detailsAboutTicket.eventName + " - " + detailsAboutTicket.ticketCategoryName + " ID#" + make.assetType.tokenId;
        }

        //Set accept bid button
        const ticketRarible = await GetRaribleInformationAboutTicket(ticket);
        if (ticketRarible.owners[0].toLowerCase() ===  address.toLowerCase()) {
          resultBid.accept_bid = true;
        } else {
          resultBid.accept_bid = false;
        }

        //Set cancel bid button
        if (bids[counter].maker.toLowerCase() === address.toLowerCase()) {
          resultBid.cancel_bid = true;
        } else {
          resultBid.cancel_bid = false;
        }
        resultBids.push(resultBid);
      }
      return resultBids;
    }
    return [];
  }

  // Dialog for buy button - open
  const buyDialogHandleOpen = (ticketCategoryKey, ticketCategoryName, ticketCategoryPrice) =>  {
    setTicketCategoryKeyForDialog(ticketCategoryKey);
    setTicketCategoryNameForDialog(ticketCategoryName);
    setTicketCategoryPriceForDialog(ticketCategoryPrice);
    setBuyDialogOpen(true);
  }

  // Dialog for buy ticket button - open
  const buyTicketDialogHandleOpen = (tokenKey, order) =>  {
    setTokenForDialog(tokenKey);
    setOrderForDialog(order);
    setBuyTicketDialogOpen(true);
  }

  // Dialog for sell button - close
  const buyTicketDialogHandleClose = () => {
    setTokenForDialog(-1)
    setOrderForDialog(null);
    setBuyTicketDialogOpen(false);
  };
  
  // Dialog for buy ticket button - open
  const sellDialogHandleOpen = (tokenKey) =>  {
    setTokenForDialog(tokenKey);
    setSellDialogOpen(true);
  }

  // Dialog for set ticket for bid - open
  const forBidDialogHandleOpen = (tokenKey) =>  {
    setTokenForDialog(tokenKey);
    setForBidDialogOpen(true);
  }

  // Dialog for set ticket for bid - open
  const cancelForBidDialogHandleOpen = (tokenKey) =>  {
    setTokenForDialog(tokenKey);
    setCancelForBidDialogOpen(true);
  }

  // Dialog for set ticket for bid - open
  const bidDialogHandleOpen = (tokenKey) =>  {
    setTokenForDialog(tokenKey);
    setBidDialogOpen(true);
  }

  // Dialog for buy ticket button - on buy click
  const buyTicketDialogHandleBuy = async() => {
    const signer = Provider.getSigner()
    const maker = await signer.getAddress();
    const preparedTx = await PrepareTx(orderForDialog.hash, maker, 1)
    const tx = {
      from: maker,
      data: preparedTx.transaction.data,
      to: preparedTx.transaction.to,
      value: "0x09184e72a000"
    }
    console.log("sending tx", tx);
   // const sendTransactionResponse = await signer.sendTransaction(tx);

    const sendTransactionResponse = await Provider.send("eth_sendTransaction", [tx]);
    console.log(sendTransactionResponse);
  }

  // Dialog for sell button - close
  const sellDialogHandleClose = () => {
    setTokenForDialog(-1)
    setSellDialogOpen(false);
  };


  // Dialog for sell button - on sell click
  const sellDialogHandleSell  = async() => {

    setSellDialogOpen(false);
    onSetOverlay(true);

    const signer = Provider.getSigner()
    const address = await signer.getAddress();
    const priceForSellWei = ethers.utils.parseEther(priceForSell);

    const form = CreateMakerOrder(address, EnvConstant.contractAddress, tokenForDialog, priceForSellWei.toString());
    const orderDataJSON = await axios.post(EnvConstant.raribleServer + "/protocol/v0.1/ethereum/order/encoder/order", form);
    const msg =orderDataJSON.data.signMessage;
    const signature = await SignOrderMessage(
      msg.struct, msg.types, msg.structType, msg.domain, form.maker
    )

    form.signature = signature;
    await axios.post(EnvConstant.raribleServer +"/protocol/v0.1/ethereum/order/orders", form);

    onReloadList(true);
    onSetOverlay(false);
  }

  // Dialog for cancel sell - open
  const cancelSellDialogHandleOpen = (tokenKey, order) =>  {
    setTokenForDialog(tokenKey);
    setOrderForDialog(order);
    setCancelSellDialogOpen(true);
  }
  
  // Dialog for cancel sell - close
  const cancelSellDialogHandleClose = () => {
    setTokenForDialog(-1);
    setOrderForDialog(null);
    setCancelSellDialogOpen(false);
  };

  // Dialog for cancel sell - on cancel sell 
  const cancelSellDialogHandleSell = async() => {
    setCancelSellDialogOpen(false);
    if (orderForDialog) {
      onSetOverlay(true);
      //Call RaribleExchange contract - cancel function
      const raribleExchangeContract = new ethers.Contract(EnvConstant.raribleExchangeContractAddress, ExchangeV2CoreArt.abi, Provider);
      const signer = Provider.getSigner()
      const raribleExchangeContractWithSigner = raribleExchangeContract.connect(signer);
      try {
        /*const cancelOrder = CreateCancelOrder(signer.getAddress(), 
          Asset(ERC20, enc(t1.address), makeAmount), ZERO, Asset(ERC20, enc(t2.address), takeAmount), 1, 0, 0, ORDER_DATA_V1, encDataLeft)*/
        const makerAddress = await  signer.getAddress();
        const cancelOrder = CreateCancelOrder(makerAddress, 
          Asset(ERC721, enc(orderForDialog.make.assetType.contract), orderForDialog.make.value), 
          ZERO, 
          Asset(ETH, enc(ZERO), orderForDialog.take.value), 
          1, 
          0, 
          0, 
          ORDER_DATA_V1, 
          {
            "dataType": "RARIBLE_V2_DATA_V1",
            "payouts": [],
            "originFees": [],
          });
        const transactionDetail = await raribleExchangeContractWithSigner.cancel(cancelOrder);
        console.log(transactionDetail);
        onReloadList(true);
        onSetOverlay(false);
      } catch (error) {
        console.log(error);
        onSetOverlay(false);
      }
    }
  }

  const handleChangeTicketsTypes = (ticketType) => {
    setTicketTypes(ticketType);
  };

  const acceptBidOffer = async(bidHash) => {

  }

  const cancelBidOffer = async(bidHash) => {

  }

  const classes = useStyles();

  return (<div>
    <Box m={2} pt={1}>
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'center'}}>
        <h5>Ticket categories</h5>
      </div>
    </Box>
    <Async promiseFn={getTicketCategoriesFromEvent}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {data => {
        return (
          <Grid container spacing={3}>
            {data.map(ticketCategory=> (
              <Grid item xs key={ticketCategory.key}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                        {ticketCategory.name}
                        <br />
                        <br />
                        </Typography>  
                        <Typography variant="body2" component="span">
                        {ticketCategory.description.split("\n").map((i, key) => {
                          return <p key={key}>{i}</p> ;
                        })}
                        <br />
                        </Typography>
                        <Typography variant="body2" component="span" color="textSecondary">
                        #Price {ticketCategory.price} ETH
                        <br />
                        </Typography>
                        <Typography variant="body2" component="span" color="textSecondary">
                        #Tickets sold {ticketCategory.sold_tickets}/{ticketCategory.max_tickets === 0 ? "Unlimited" : ticketCategory.max_tickets}
                        <br />
                        </Typography>
                        <Typography variant="body2" component="span" color="textSecondary">
                        #Resell fee (royalty) - {ticketCategory.resell_ticket_value} %
                        <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                          <Box component="div" visibility={ticketCategory.buy_button === true? "visible" : "hidden"}>
                            <Button onClick={() => { 
                              buyDialogHandleOpen(ticketCategory.key, ticketCategory.name, ticketCategory.price)
                            }} size="small">Buy</Button>
                          </Box>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
          </Grid>
        )
      }}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>

    <TicketMarket>
    </TicketMarket>
  </div>);
}

function ButtonsBox({onReloadList, onSetOverlay, onSetSnackBarMessage, ipfs}) {
  
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryNameValidation, setCategoryNameValidation] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionValidation, setDescriptionValidation] = React.useState(false);
  const [maxSubscriber, setMaxSubscriber] = React.useState(-1);
  const [price, setPrice] = React.useState(0);
  const [priceValidation, setPriceValidation] = React.useState(false);
  const [resellFeeValue, setResellFeeValue] = React.useState(0);
  const [resellFeeValueValidation, setResellFeeValueValidation] = React.useState(false);

  let location = useLocation();
  const eventKey = location.state.eventKey;

  // Create new tier button
  const createNewTicketCategory = async (eventKey, categoryName, description, maxSubscriber,
    price, resellFeeValue) => {

    onSetOverlay(true);

    const nftTicketizeContract = new ethers.Contract(EnvConstant.contractAddress, NFTicketizeContractArt.abi, Provider);

    //Insert into IPFS
    const dataForIpfs = {
      categoryName: categoryName,
      description: description
    };
    const { cid } = await ipfs.add(JSON.stringify(dataForIpfs));

    //Insert into smart contract
    const signer = Provider.getSigner()
    const nftTicketizeContractWithSigner = nftTicketizeContract.connect(signer);
    try {
      var _eventKey = parseInt(eventKey);
      var _maxSubscriber = maxSubscriber;
      var _parsePrice = ethers.utils.parseEther(price);
      var _resellFeeValue = parseInt(resellFeeValue);

      const transactionDetail = await nftTicketizeContractWithSigner.createTicketCategory(_eventKey, _maxSubscriber, _parsePrice, _resellFeeValue, cid.string);
      await ipfs.pin.add(cid.string);
      
      setOpen(false);
      await Provider.waitForTransaction(transactionDetail.hash);
      onSetSnackBarMessage("Event category is success created", "success");
      onReloadList(true);
      onSetOverlay(false);
    }
    catch (error) {
      onSetSnackBarMessage(error.message, "error");
      onSetOverlay(false);
    }
  }

  // On open create new event category
  const handleClick = () => {
    setOpen(true);
  };

  // On close create new event category
  const handleClose = () => {
    setOpen(false);
  };


  // On create new event category button dialog button
  const handleCreteNewTicketCategory = () => {
    // Validation for name
    if (!categoryName) {
      setCategoryNameValidation(true);
      return;
    } else {
      setCategoryNameValidation(false);
    }

    // validation for description
    if (!description) {
      setDescriptionValidation(true);
      return;
    } else {
      setDescriptionValidation(false);
    }

    // validation for price
    if (!price === 0) {
      setPriceValidation(true);
      return;
    } else {
      setPriceValidation(false);
    }

    if (!resellFeeValue) {
      setResellFeeValue(0);
    }

    // Call create new tier procedure
    createNewTicketCategory(eventKey, categoryName, description, maxSubscriber,
      price, resellFeeValue);
    setOpen(false);
  };

    return (
      <div>
        <div>
          <Box m={2} pt={1}>
            <Button variant="outlined" color="primary" onClick={handleClick}>
              New ticket category
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Ticket Category</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="category_name"
                label="Category name"
                required
                fullWidth
                onChange={event => {
                  setCategoryName(event.target.value);
                }}
                error={categoryNameValidation}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                required
                multiline
                rows={4}
                fullWidth
                onChange={event => {
                  setDescription(event.target.value);
                }}
                error={descriptionValidation}
              />
              <TextField
                margin="dense"
                id="total_number"
                label="Total number of limited tokens(max subscriber)?"
                fullWidth
                onChange={event => {
                  setMaxSubscriber(event.target.value);
                }}
                type="number"
                min="1"
              />
              <TextField
                margin="dense"
                id="ticket_price"
                label="Ticket price (in ETH)"
                required
                fullWidth
                onChange={event => {
                  setPrice(event.target.value);
                }}
                type="number"
                error={priceValidation}
                min="0"
              />
              <TextField
                margin="dense"
                id="resell_fee_value"
                label="Resell fee for event owner - percent (royalty)"
                required
                fullWidth
                onChange={event => {
                  setResellFeeValue(event.target.value);
                }}
                type="number"
                error={resellFeeValueValidation}
                min="0"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreteNewTicketCategory} color="primary">
                Create New
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
}


function EventDetailInner({ipfs}) {
  const { enqueueSnackbar } = useSnackbar();
  const [reloadList, setReloadList] = React.useState(false);
  const [isActiveOverlay, setIsActiveOverlay] = React.useState(false);

  const reloadListFunc = () => {
    setReloadList(true);
  }

  const setOverlayFunc = (value) => {
    setIsActiveOverlay(value);
  }

  // Set Snackbar message
  const setSnackBarMessage = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant, persist: false });
  };

  useEffect(() => {
    setReloadList(false);
  }, [reloadList]);

  let location = useLocation();
  const myEvent = location.state.myEvent;
  const eventName = location.state.eventName;
  if (myEvent === "true") {
    return (
      <LoadingOverlay
        active={isActiveOverlay}
        spinner
        text='Waiting for response...'
        styles={{
          wrapper: {
            overflow: isActiveOverlay ? 'hidden' : 'visible'
          }
        }}
      >
        <div>
          <Box m={2} pt={1}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h4>Event "{eventName}" detail</h4>
            </div>
          </Box>
          <ButtonsBox onReloadList={reloadListFunc} onSetOverlay={setOverlayFunc} onSetSnackBarMessage = {setSnackBarMessage} ipfs = {ipfs}>
          </ButtonsBox>
          <TicketCategoryDetail onReloadList={reloadListFunc} onSetOverlay={setOverlayFunc} ipfs = {ipfs}>
          </TicketCategoryDetail>
        </div>
      </LoadingOverlay>
    ); 
  } else {
    return (
      <LoadingOverlay
        active={isActiveOverlay}
        spinner
        text='Waiting for response...'
        styles={{
          wrapper: {
            overflow: isActiveOverlay ? 'hidden' : 'visible'
          }
        }}
      >
        <div>
          <Box m={2} pt={1}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h4>Event "{eventName}" detail</h4>
            </div>
          </Box>
          <TicketCategoryDetail onReloadList={reloadListFunc} onSetOverlay={setOverlayFunc} ipfs = {ipfs}>
          </TicketCategoryDetail>
        </div>
      </LoadingOverlay>
    );
  }
}

export default function EventDetail(props) {
  const ipfs = props.ipfs;
  return (
    <SnackbarProvider maxSnack={3}>
      <EventDetailInner ipfs = {ipfs} />
    </SnackbarProvider>
  );
}