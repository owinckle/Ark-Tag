import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';

export default function TemplateLots(props) {
    let data = props.data;
    const [ref, setRef] = useState(data.ref);
    const [produit, setProduit] = useState(data.produit);
    const [t1, setT1] = useState(data.t1);
    const save = () => {
        const templateLots = {
            ref: ref,
            produit: produit,
            t1: t1
        }

        props.save("templateLots", templateLots);
        props.onClose();
    }

    return (
        <div className="modal">
            <div className="header">
                <div className="title">Modifier "Lots"</div>
                <Close onClick={props.onClose} />
            </div>
            <div className="body">
                <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                <input type="text" value={produit} onChange={(e) => setProduit(e.target.value)} />
                <input type="text" value={t1} onChange={(e) => setT1(e.target.value)} />
                <DefaultButton label="Sauvegarder" action={save} />
            </div>
        </div>
    );
}