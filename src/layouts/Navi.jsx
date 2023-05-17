import React, {useState} from 'react'
import { Container, Menu } from 'semantic-ui-react'
import CartSummary from './CartSummary'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Navi() {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const navigate = useNavigate()
    
    const cartItems = useSelector(state => state.cartItems) || [];


    function handleSignOut(params){
        setisAuthenticated(false)
        navigate('/') 
    }
    
    function handleSignIn(params){
        setisAuthenticated(true)
    }

    return (
        <div>
            <Menu inverted fixed='top' size='large'>
                <Container>


                    <Menu.Item
                        name='home'
                    />
                    <Menu.Item
                        name='messages'
                    />

                    <Menu.Menu position='right'>
                        {cartItems.length >0&&<CartSummary/>}

                        {isAuthenticated?<SignedIn signOut={handleSignOut}></SignedIn>:<SignedOut signIn={handleSignIn}></SignedOut>}   
                    </Menu.Menu>
                </Container>

            </Menu>
        </div>
    )
}
