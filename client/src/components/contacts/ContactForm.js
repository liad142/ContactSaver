import React, {useContext, useState,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    //כשאני מייבא את הקונטקסא תהיה לי גישה לכל הסטייט ולכל האקשנים מהוטנטקסט כאן בתוך הקומפוננטה
    const contactContext = useContext(ContactContext)
     const {addContact,current,clearCurrent,updateContact} = contactContext

    useEffect(()=>{
        //בודק האם יש משהו בתוך הCURRENT
        if(current!==null){
            //אם יש משהו בתוך הCURRENT אני פשו מציב אותו בתוך הסטייט וזה יציב אותו בתוך הפורם
            setContact(current)
        }else{
            // אם אין אז פשוט לאפס את הפורם
            setContact({name:'',
                phone:'',
                email:'',
                type:'personal'})
        }
    },[contactContext,current]) // מוסיך לכאן את הDEPENDENCIES כדי שלא יהיה ERR (אפשר גם לא להוסיף )

    const [contact,setContact] = useState({
        name:'',
        phone:'',
        email:'',
        type:'personal'
    });
    const {name,phone,email,type} = contact
                                                    //e.target.name מאזין ל NAME של האינפוטים
                                                    //e.target.value זה הווליו של כל אינפוט
   const onChange = (e) => setContact({...contact, [e.target.name]:e.target.value })

    const onSubmit = e =>{
        e.preventDefault()
        if (current === null){
            addContact(contact);
        }else{
            updateContact(contact)
        }

        //איפוס הפורם
        setContact({name:'',
            phone:'',
            email:'',
            type:'personal'})
    }

    const ClearAll = () =>{
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className={'text-primary'}>{current === null ? 'Add Contact': 'Update Contact'}</h2>
            <input type="text" placeholder={'Name'} name={'name'} value={name} onChange={onChange}/>
            <input type="email" placeholder={'E-Mail'} name={'email'} value={email} onChange={onChange}/>
            <input type="text" placeholder={'Phone'} name={'phone'} value={phone} onChange={onChange}/>
            <h5>Contact Type</h5>
            <input type="radio" name={type} value={'personal'} checked={type === 'personal'} onChange={onChange}/>{' '} Personal{' '}
            <input type="radio" name={type} value={'professional'} checked={type === 'professional'} onChange={onChange}/>{' '} professional
            <div>
                <input type="submit" value={current === null ? 'Add Contact': 'Update Contact'} className={'btn btn-primary btn-block'}/>
            </div>
            {current && <div>
                <button className={'btn btn-light btn-block'} onClick={ClearAll}>Clear</button>
            </div>}
        </form>
    );
};

export default ContactForm;
