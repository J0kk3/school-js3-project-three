//styles
import './Modal.css';

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

// //styles
// import './Modal.css';

// const Modal = ( props ) =>
// {

//     return (
//         <div className="Modal">
//             <h1>{ props.title }</h1>
//             <p>{ props.message }</p>
//             <button className="Button" onClick={ props.closeModal }>
//                 Dismiss
//             </button>
//         </div>
//     );

// };

// export default Modal;