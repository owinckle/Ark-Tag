import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';

export default function TemplateLots(props) {
    let data = props.data;
    const [ref, setRef] = useState(data.ref);
    const [refFont, setRefFont] = useState(data.refFont);
    const [produit, setProduit] = useState(data.produit);
    const [prodFont, setProdFont] = useState(data.prodFont);
    const [labelFont, setLabelFont] = useState(data.labelFont);
    const [t1, setT1] = useState(data.t1);

    const save = () => {
        const templateLots = {
            ref: ref,
            refFont: refFont,
            produit: produit,
            prodFont: prodFont,
            labelFont: labelFont,
            t1: t1,
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
                <div className="input-container">
                    <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                    <input type="number" value={refFont} onChange={(e) => setRefFont(e.target.value)} />
                    <span className="metric">px</span>
                </div>
                <div className="input-container">
                    <input type="text" value={produit} onChange={(e) => setProduit(e.target.value)} />
                    <input type="number" value={prodFont} onChange={(e) => setProdFont(e.target.value)} />
                    <span className="metric">px</span>
                </div>
                <div className="input-container">
                    <input type="text" value={t1} onChange={(e) => setT1(e.target.value)} />
                    <input type="number" value={labelFont} onChange={(e) => setLabelFont(e.target.value)} />
                    <span className="metric">px</span>
                </div>
                <DefaultButton label="Sauvegarder" action={save} />
            </div>
        </div>
    );
}