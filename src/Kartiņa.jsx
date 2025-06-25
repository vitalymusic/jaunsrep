import './kartiņa.css';
function Kartiņa(props) {
    let stils = "card " + props.fons; 

    return ( 
        <div className={stils}>
            <h3>{props.nosaukums}</h3>
            <p>{props.apraksts}</p>
            <img src={props.attēls} alt={props.nosaukums} />
            <button>Ielikt grozā</button>
        </div>
     );
}

export default Kartiņa;