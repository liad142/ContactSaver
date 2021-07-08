import React, {useContext, Fragment, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from '../../context/contact/contactContext'
import Spinner from "../layouts/Spinner";

const Contacts = () => {
    //כשאני מייבא את הקונטקסא תהיה לי גישה לכל הסטייט ולכל האקשנים מהוטנטקסט כאן בתוך הקומפוננטה
    const contactContext = useContext(ContactContext)
    const {contacts, filteredContacts, getContacts, loading} = contactContext

    useEffect(() => {
        getContacts()
        //eslint-disable-next-line
    }, [])

    if (contacts!==null && contacts.length === 0 && !loading) {
        return <h4>Please add a new contact</h4>
    }

    return (
        <Fragment>
            {/*בודק שקונטקנט הוא עם מידע בפנים ושזה לא LOADING אז מציג את הכול. אם הקונטקט ריק או LOADING עובד מציג את הספינר*/}
            {contacts !== null && !loading ? (<TransitionGroup>
                {/*בודק במערך של הפילטר האם יש משהו בפנים.*/}
                {filteredContacts !== null
                    // אם יש משהו בתוך המערך אז עושה עליו לופ ומציג אותו
                    ? filteredContacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames={'item'}>
                            <ContactItem contact={contact}/>
                        </CSSTransition>

                    ))
                    // אם אין כלום במערך אז מציג את הקונטקטס
                    :
                    contacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames={'item'}>
                            <ContactItem contact={contact}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>) : <Spinner/>}

        </Fragment>
    );
}
;

export default Contacts;
