import React, {useContext, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    //כשאני מייבא את הקונטקסא תהיה לי גישה לכל הסטייט ולכל האקשנים מהוטנטקסט כאן בתוך הקומפוננטה
    const contactContext = useContext(ContactContext)
    const {contacts, filteredContacts} = contactContext

    if (contacts.length === 0) {
        return <h4>Please add a new contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {/*בודק במערך של הפילטר האם יש משהו בפנים.*/}
                {filteredContacts !== null
                    // אם יש משהו בתוך המערך אז עושה עליו לופ ומציג אותו
                    ? filteredContacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames={'item'}>
                            <ContactItem contact={contact}/>
                        </CSSTransition>

                    ))
                    // אם אין כלום במערך אז מציג את הקונטקטס
                    :
                    contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames={'item'}>
                            <ContactItem contact={contact}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
