import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Button, AppBar, Toolbar, useScrollTrigger, Slide, Backdrop, Container, Drawer, List, ListItem, ListItemText, Divider} from '@material-ui/core';
import { Link, useHistory, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles';
import CardItem from './card/card';
import UserProfile from '../UserProfile';
import axios from 'axios';


function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger()
    return (
        <Slide appear={false} direction="down" in={!trigger}>
          {children}
        </Slide>
      );
}

const Cards = (props) => {
    const classes = useStyles();
    const user_id = UserProfile.getId();
    const name = UserProfile.getName();
    const token = UserProfile.getToken();
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const history = useHistory();
    const [cards, setCards] = useState([]);
    const [card_filter, setFilter] = useState('all');
    const [cardsExist, setCardsExist] = useState(false);

    const re = {
        all : /[^]*/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    }


    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/cards/${user_id}`,
            {headers: {"token" : `${token}`}}
            )
            
            .then((response) => response.data)
            .then((cardData) => {
                setCards(cardData.data);
            })
          .catch((error) => console.log(error));
    }, []);
    


    const handleLogout = () => {
        UserProfile.logout();
        history.push('/') ;

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };


    const SetCardFilter = (text) => {
        var card_name = text.toLowerCase();
        setCardsExist(false)
        setFilter(card_name)
    }

    const ToggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }


    const NavBar = () => (
        <Drawer  open={openDrawer} onClose={ToggleDrawer} anchor="left">
            <div className={classes.drawer}
            role="presentation"
            onClick={ToggleDrawer}
            onKeyDown={ToggleDrawer}
            >
            <h2>Cards</h2>
            <hr/>
            <List>
            {['All','Visa', 'MasterCard', 'Maestro','Discover', 'JCB'].map((text, index) => (
            <ListItem onClick={()=>SetCardFilter(text)} button key={text}>
                <ListItemText primary={text} />
                <Divider />
            </ListItem>
            ))}
            </List>
            </div>

        </Drawer>

    )



    const CardsGrid = (props) => (
        <>
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
        {cards.map((card) => {
            if(re[props.filter].test(card.card_number)){
            setCardsExist(true)
            return(
            <Grid className={classes.card_item} item key={card.card_id} xs={12} sm={3}>
                <CardItem card={card}/>
            </Grid>
            )}
        })}
        </Grid>
        {cardsExist ? "": <NoCard />}
        </>
    )

    const NoCard = () => (
        <>
        <div className={classes.nocard_div}>
            <h1>No cards.</h1>
            <Link style={{textDecoration:"none"}}  to='/addcard'>
                <Button style={{display:"block" , backgroundColor:"#8899a6"}}  variant="contained"  size="large">+ Add Card</Button>
            </Link>
        </div>
        </>
    )


   
    



    return(
        <>
        <Helmet><title>Cards</title></Helmet>
        <div className={classes.main}>
        <HideOnScroll {...props}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
            <Toolbar>
            <MenuIcon className={classes.menuicon}onClick={ToggleDrawer}/>
            <h2 className={classes.heading} align ="center">
                Welcome {name} !
            </h2>
            <Link style={{textDecoration:"none"}}  to='/addcard'>
                <Button className={classes.addButton}  variant="contained" size="small">+ Add Card</Button>
            </Link>
            <Button className={classes.logoutButton} variant="contained" size="small" style={{marginLeft:"10px"}} onClick={handleToggle}>
                Logout</Button>
            <Backdrop  open={open} onClick={handleClose} style={{textAlign: "center"}}>
                <Container className={classes.backdrop_container}>
                <h2 className={classes.backdrop_text}>Are you sure you want to logout?</h2>
                <div className={classes.backdrop_buttons}>
                <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>
                <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                </div>
                </Container>
            </Backdrop>
            </Toolbar>
        </AppBar>
        </HideOnScroll>
        <NavBar />
        { cards.length>0 ? < CardsGrid filter={card_filter} /> : <NoCard />}
        </div>
        </>
    )
}

export default withRouter(Cards);