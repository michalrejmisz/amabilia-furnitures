import {createContext, ReactNode, useContext, useState, useEffect} from "react"
import {PRODUCTS_ALL} from "@/lib/graphql/products";
import {gql, useQuery} from "@apollo/client"
import {SideCart} from "@/components/SideCart/SideCart";
import { useCookies } from 'react-cookie';


type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    slug: string;
    quantity: number;
    price?: number;
}

type ShoppingCartContext = {
    getItemQuantity: (slug: string) => number;
    increaseCartQuantity: (slug: string, price: number) => void;
    increaseCartQuantityByNumber: (slug: string, value: number, price?: number) => void;
    decreaseCartQuantity: (slug: string, price: number) => void;
    removeFromCart: (slug: string, price:number) => void;
    handleCartValue: (cartValue:number) => void;
    handleCartClick: () => void;
    cleanCart: () => void;
    closeCart: () => void;
    openCart: () => void;
    cartQuantity: number;
    cartTotalPrice: number;
    cartItems: CartItem[];
    isOpenCart: boolean;
    cartValue: number;
}

export const PRODUCT_BY_SLUG = gql`
query Produkty($slug: ID){
  Produkty(Link: $slug) {
        Link
        Nazwa
        Cena
  }
}`

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({children} : ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [cartValue, setCartValue] = useState(0);
    const [isInit, setIsInit] = useState(true);

    function handleCartValue(cartValue:number){
        if(cartValue == 0) {localStorage.setItem('cart', JSON.stringify([]));}
        setCartValue(cartValue.toFixed(2))
    }

    function handleCartClick(){
        setIsOpenCart(!isOpenCart)
    }

    function closeCart(){
        setIsOpenCart(false)
    }

    function openCart(){
        setIsOpenCart(true)
    }

    function cleanCart(){
        setCartItems([])
    }

    // let cookiesCart = cookies.cart
    useEffect(() => {
        let localStorageCart = localStorage.getItem('cart');
        if(isInit) {
            if(localStorageCart){
                // if(localStorageCart.length > 0){
                    setCartItems(JSON.parse(localStorageCart))
                    setIsInit(false)
                // }
            }
        }
    }, [isInit])


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    // const cartTotalPrice = cartItems.reduce((price, item) => item.quantity*item + price, 0)

    const getItemQuantity = (slug: string) => {
        return cartItems.find(item => item.slug === slug)?.quantity || 0
    }

    const increaseCartQuantityByNumber = (slug: string, value: number, price: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.slug === slug) == null){
                return [...currItems, {slug, quantity: value}]
            } else {
                return currItems.map(item => {
                    if (item.slug === slug){
                        return {...item, quantity: item.quantity + value}
                    } else {
                        return item
                    }
                })
            }
        })
        setCartValue(prevState => (Number(prevState) + (value * price)).toFixed(2));
    }
    const increaseCartQuantity = (slug: string, price: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.slug === slug) == null){
                return [...currItems, {slug, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.slug === slug){
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
        setCartValue(prevState => (Number(prevState) + price).toFixed(2));

    }

    const decreaseCartQuantity = (slug: string, price: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.slug === slug)?.quantity === 1){
                return currItems.filter(item => item.slug !== slug )
            } else {
                return currItems.map(item => {
                    if (item.slug === slug){

                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
        setCartValue(prevState => (Number(prevState) - price).toFixed(2));
    }

    const removeFromCart = (slug: string, price: number) => {
        const item = cartItems.find(item => item.slug == slug)
        setCartValue(prevState => (Number(prevState) - (Number(item.quantity) * Number(price))).toFixed(2));
        setCartItems(currItems => {
            return currItems.filter(item => item.slug !== slug )
        })
    }


    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, handleCartClick, closeCart, openCart, increaseCartQuantityByNumber, setCartValue, cartQuantity, cartItems, isOpenCart, cartValue, handleCartValue, cleanCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}