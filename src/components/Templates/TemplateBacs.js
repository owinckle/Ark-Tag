import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';

export default function TemplateBacs(props) {
    let data = props.data;
    const [ref, setRef] = useState(data.ref);
    const [produit, setProduit] = useState(data.produit);
    const [t1, setT1] = useState(data.t1);
    const [t2, setT2] = useState(data.t2);
    const [t3, setT3] = useState(data.t3);
    const save = () => {
        const templateBacs = {
            ref: ref,
            produit: produit,
            t1: t1,
            t2: t2,
            t3: t3
        }

        props.save("templateBacs", templateBacs);
        props.onClose();
    }

    return (
        <div className="modal">
            <div className="header">
                <div className="title">Modifier "Bacs"</div>
                <Close onClick={props.onClose} />
            </div>
            <div className="body">
                <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                <input type="text" value={produit} onChange={(e) => setProduit(e.target.value)} />
                <input type="text" value={t1} onChange={(e) => setT1(e.target.value)} />
                <input type="text" value={t2} onChange={(e) => setT2(e.target.value)} />
                <input type="text" value={t3} onChange={(e) => setT3(e.target.value)} />
                <DefaultButton label="Sauvegarder" action={save} />
            </div>
        </div>
    );
}