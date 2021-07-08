import React, {useReducer} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import contactContext from "./contactContext";
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'

const ContactState = props => {
    const initalState = {
        contacts: null,
        current: null,
        filteredContacts: null,
        error: null
    };
    //הSTATE נותן לנו גישה לסטייט
    // הDISPATCH מאפשר לנו לשגר אובייקטים לREDUCER
    const [state, dispatch] = useReducer(contactReducer, initalState)


    //Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')

            //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה res.data
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }


    //Add contact
    const addContact = async contact => {
        //מג'נרט ID בעזרת הפקג' uuid
        //לאחר חיבור המונגו לא צריכים להשתמש בזה כי מונגו מג'נרט UID לבד
        // contact.id = uuidv4()
        const config = {
            headers: {
                'Conteny-Type': 'application/js'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)

            //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה res.data
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Delete contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`)

            //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה CONTACT
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

    }

    //update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Conteny-Type': 'application/js'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)

            //שולח לREDUCER את הTYPE ואת הדאטא שזה בעצם ה res.data
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }


    }

    //set current contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    //filter contacts
    const filterContacts = (text) => {
        dispatch({type: FILTER_CONTACT, payload: text})
    }
    //clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    //clear contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS})
    }

    return (
        //כל פונקציה שרושמים חייבים לייצא אותה כאן בפרובידר
        <contactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filteredContacts: state.filteredContacts,
            error: state.error,
            addContact, deleteContact, updateContact, filterContacts,
            setCurrent, clearCurrent, clearFilter, getContacts, clearContacts

        }}>
            {props.children}
        </contactContext.Provider>
    )
}
export default ContactState

