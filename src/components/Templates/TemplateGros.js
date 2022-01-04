import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';

export default function TemplateGros(props) {
    let data = props.data;
    const [ref, setRef] = useState(data.ref);
    const [refFont, setRefFont] = useState(data.refFont);
    const [refStyle, setRefStyle] = useState(data.refStyle);

    const [produit, setProduit] = useState(data.produit);
    const [prodFont, setProdFont] = useState(data.prodFont);
    const [prodStyle, setProdStyle] = useState(data.prodStyle);

    const [t1, setT1] = useState(data.t1);
    const [t2, setT2] = useState(data.t2);
    const [t3, setT3] = useState(data.t3);
    const [t1Font, setT1Font] = useState(data.t1Font);
    const [t2Font, setT2Font] = useState(data.t2Font);
    const [t3Font, setT3Font] = useState(data.t3Font);
    const [t1Style, setT1Style] = useState(data.t1Style);
    const [t2Style, setT2Style] = useState(data.t2Style);
    const [t3Style, setT3Style] = useState(data.t3Style);

    const save = () => {
        const templateGros = {
            ref: ref,
            refFont: refFont,
            refStyle: refStyle,
            produit: produit,
            prodFont: prodFont,
            prodStyle: prodStyle,
            t1: t1,
            t2: t2,
            t3: t3,
            t1Font: t1Font,
            t2Font: t2Font,
            t3Font: t3Font,
            t1Style: t1Style,
            t2Style: t2Style,
            t3Style: t3Style,
        }

        props.save("templateGros", templateGros);
        props.onClose();
    }

    return (
        <div className="modal">
            <div className="header">
                <div className="title">Modifier "Gros"</div>
                <Close onClick={props.onClose} />
            </div>
            <div className="body">

                {/* Référence */}
                <div className="separator">Référence</div>
                <div className="input-container">
                    <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                    <select value={refStyle} onChange={(e) => setRefStyle(e.target.value)}>
                        <option value="gras">Gras</option>
                        <option value="normal">Normal</option>
                        <option value="italique">Italique</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={refFont} onChange={(e) => setRefFont(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Référence */}

                {/* Désignation */}
                <div className="separator">Désignation</div>
                <div className="input-container">
                    <input type="text" value={produit} onChange={(e) => setProduit(e.target.value)} />
                    <select value={prodStyle} onChange={(e) => setProdStyle(e.target.value)}>
                        <option value="gras">Gras</option>
                        <option value="normal">Normal</option>
                        <option value="italique">Italique</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={prodFont} onChange={(e) => setProdFont(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Désignation */}

                {/* Prix T1 */}
                <div className="separator">Prix T1</div>
                <div className="input-container">
                    <input className="full-w" type="text" value={t1} onChange={(e) => setT1(e.target.value)} />
                </div>
                <div className="input-container">
                    <select value={t1Style} onChange={(e) => setT1Style(e.target.value)}>
                        <option value="gras">Gras</option>
                        <option value="normal">Normal</option>
                        <option value="italique">Italique</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={t1Font} onChange={(e) => setT1Font(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Prix T1 */}

                {/* Prix T2 */}
                <div className="separator">Prix T2</div>
                <div className="input-container">
                    <input className="full-w" type="text" value={t2} onChange={(e) => setT2(e.target.value)} />
                </div>
                <div className="input-container">
                    <select value={t2Style} onChange={(e) => setT2Style(e.target.value)}>
                        <option value="gras">Gras</option>
                        <option value="normal">Normal</option>
                        <option value="italique">Italique</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={t2Font} onChange={(e) => setT2Font(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Prix T1 */}

                {/* Prix T3 */}
                <div className="separator">Prix T3</div>
                <div className="input-container">
                    <input className="full-w" type="text" value={t3} onChange={(e) => setT3(e.target.value)} />
                </div>
                <div className="input-container">
                    <select value={t3Style} onChange={(e) => setT3Style(e.target.value)}>
                        <option value="gras">Gras</option>
                        <option value="normal">Normal</option>
                        <option value="italique">Italique</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={t3Font} onChange={(e) => setT3Font(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Prix T3 */}
                <DefaultButton label="Sauvegarder" action={save} />
            </div>
        </div>
    );
}