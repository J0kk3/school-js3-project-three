//styles
import './Modal.css';

//TODO add three birthday fields instead of one date field

const Modal = ( props ) =>
{
    return (
        <div className="Modal">
            <h1>{ props.title }</h1>
            <p>{ props.message }</p>
            <div>
                { props.children }
            </div>
            <div className='closeModal' onClick={ props.closeModal } >
                <p>Click here to close...</p>
            </div>
        </div>
    );

};

export default Modal;