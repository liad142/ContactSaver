import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                //מעתיק את מה שיש בסטייט כדי שלא יימחק
                ...state,
                // מעתיק את הסטייט הקיים ומוסיף את מה ששלחנו מהFORM
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                //מעבירים מContactState את הID הספציפי שרוצים למחוק
                //הפילטר יחזיר לנו את כל הCONTACTS חוץ מהקונטקט עם הID שבחרנו וכך הוא נמחק
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                //במערך של הקונטקט אנחנו בודקים האם הCONATC ID והACTION PAYLOAD ID הם אותו אחד
                // אם כן אז מחזירים את הACTION PAY LOAD המעודכן אחרי UPDATE אם לא מחזירים את CONTACT
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filteredContacts: state.contacts.filter(contact =>{
                    //רגולר אקספרשין ובודק את הטקסט שהוא בעצם ACTION.PAYLOAD
                    //gi מאפשר בעצם לבדוק גם אותיות גדולות וקטנות
                    const regex = new RegExp(`${action.payload}`,'gi');
                    //מחזיר אם הNAME או הEMAIL תואמים לרגקס
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filteredContacts: null
            }


        default:
            return state
    }
}
