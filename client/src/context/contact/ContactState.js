import React, {useReducer} from "react";
import { v4 as uuidv4 } from "uuid";
import contactContext from "./contactContext";
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initalState = {
        contacts: [
            {
                id: 1,
                name: 'liad ohayon',
                email: 'liad142@gmail.com',
                phone: '123456789',
                type: 'personal'
            },
            {
                id: 2,
                name: 'liad asdsad',
                email: 'fdgdfgfasdfas@gmail.com',
                phone: '987456321',
                type: 'personal'
            },
            {
                id: 3,
                name: 'liad gfhgfh',
                email: 'fdgsafasd@gmail.com',
                phone: '987654321',
                type: 'professional'
            }
        ],
        current:null,
        filteredContacts:null
    };
    //הSTATE נותן לנו גישה לסטייט
    // הDISPATCH מאפשר לנו לשגר אובייקטים לREDUCER
    const [state, dispatch] = useReducer(contactReducer, initalState)

    //Add contact
    const addContact  = (contact) =>{
        //מג'נרט ID בעזרת הפקג' uuid
        contact.id = uuidv4()
        //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה CONTACT
        dispatch({type:ADD_CONTACT,payload:contact})
    }

    //Delete contact
    const deleteContact  = (id) =>{
        //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה CONTACT
        dispatch({type:DELETE_CONTACT,payload:id})
    }
    //set current contact
    const setCurrent  = (contact) =>{
        dispatch({type:SET_CURRENT,payload:contact})
    }

    //clear current contact
    const clearCurrent  = () =>{
        dispatch({type:CLEAR_CURRENT})
    }
    //update contact
    const updateContact  = (contact) =>{
        dispatch({type:UPDATE_CONTACT,payload:contact})
    }
    //filter contacts
    const filterContacts  = (text) =>{
        dispatch({type:FILTER_CONTACT,payload:text})
    }
    //clear filter
    const clearFilter  = () =>{
        dispatch({type:CLEAR_FILTER})
    }

    return (
        //כל פונקציה שרושמים חייבים לייצא אותה כאן בפרובידר
        <contactContext.Provider value={{
            contacts:state.contacts,
            current:state.current,
            filteredContacts: state.filteredContacts,
            addContact,deleteContact,updateContact,filterContacts,
            setCurrent,clearCurrent,clearFilter

        }}>
            {props.children}
        </contactContext.Provider>
    )
}
export default ContactState
