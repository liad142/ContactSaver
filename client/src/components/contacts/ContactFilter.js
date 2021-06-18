import React, {useContext,useRef,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const  {filterContacts,clearFilter,filteredContacts} =contactContext

    const text = useRef('')

    useEffect(()=>{
        if(filteredContacts === null){
            text.current.value = '';


        }
    })

 const onChange = e =>{
        //text.current.value == לואליו שיש בתוך האינפוט
      if(text.current.value !== '')  {
          filterContacts(e.target.value)
      }else{
          clearFilter()
      }
 }



    return (
        <div>
            <form action="">
                <input type="text" ref={text} placeholder={'filter contact'} onChange={onChange}/>
            </form>
        </div>
    );
};

export default ContactFilter;
