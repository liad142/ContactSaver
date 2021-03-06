import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext)
    const {deleteContact, setCurrent, clearCurrent} = useContext(ContactContext)
    const {name, email, phone, _id, type} = contact

    const onDelete = () => {
        deleteContact(_id)
        clearCurrent()
    }

    return (
        <div className={'card bg-light'}>
            <h3 className="text-primary text-left">
                {name}{' '} <span style={{float: 'right'}}
                                  className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {/*//type.charAt(0).toUpperCase() הופך את האות הראשונה לאות גדולה*/}
                {/*//type.slice(1) הופך את שאר האותיות לאותיות רגילות ככה הTYPE לא נפגע*/}
            </span>
            </h3>
            <ul className={'list'}>
                {email && (<li>
                    <i className={'fas fa-envelope-open'}>

                    </i> {email}
                </li>)}

                {phone && (<li>
                    <i className={'fas fa-phone'}>

                    </i> {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    );
};
ContactItem.protoTypes = {
    contact: PropTypes.object.isRequired
}
export default ContactItem;
