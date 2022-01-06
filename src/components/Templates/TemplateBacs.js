import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';

export default function TemplateBacs(props) {
    let data = props.data;
    const [ref, setRef] = useState(data.ref);
    const [refFont, setRefFont] = useState(data.refFont);
    const [refStyle, setRefStyle] = useState(data.refStyle);
    const [refHighlight, setRefHighlight] = useState(data.refHighlight);
    const [refColor, setRefColor] = useState(data.refColor);

    const [produit, setProduit] = useState(data.produit);
    const [prodFont, setProdFont] = useState(data.prodFont);
    const [prodStyle, setProdStyle] = useState(data.prodStyle);
    const [prodHighlight, setProdHighlight] = useState(data.prodHighlight);
    const [prodColor, setProdColor] = useState(data.prodColor);

    const [t1, setT1] = useState(data.t1);
    const [t2, setT2] = useState(data.t2);
    const [t3, setT3] = useState(data.t3);
    const [t1Font, setT1Font] = useState(data.t1Font);
    const [t2Font, setT2Font] = useState(data.t2Font);
    const [t3Font, setT3Font] = useState(data.t3Font);
    const [t1Style, setT1Style] = useState(data.t1Style);
    const [t2Style, setT2Style] = useState(data.t2Style);
    const [t3Style, setT3Style] = useState(data.t3Style);
    const [t1Highlight, setT1Highlight] = useState(data.t1Highlight);
    const [t2Highlight, setT2Highlight] = useState(data.t2Highlight);
    const [t3Highlight, setT3Highlight] = useState(data.t3Highlight);
    const [t1Color, setT1Color] = useState(data.t1Color);
    const [t2Color, setT2Color] = useState(data.t2Color);
    const [t3Color, setT3Color] = useState(data.t3Color);

    const save = () => {
        const templateBacs = {
            ref: ref,
            refFont: refFont,
            refStyle: refStyle,
            refHighlight: refHighlight,
            refColor: refColor,
            produit: produit,
            prodFont: prodFont,
            prodStyle: prodStyle,
            prodHighlight: prodHighlight,
            prodColor: prodColor,
            t1: t1,
            t2: t2,
            t3: t3,
            t1Font: t1Font,
            t2Font: t2Font,
            t3Font: t3Font,
            t1Style: t1Style,
            t2Style: t2Style,
            t3Style: t3Style,
            t1Highlight: t1Highlight,
            t2Highlight: t2Highlight,
            t3Highlight: t3Highlight,
            t1Color: t1Color,
            t2Color: t2Color,
            t3Color: t3Color
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

                {/* Référence */}
                <div className="separator">Référence</div>
                <div className="input-container">
                    <input className="full-w" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                </div>
                <div className="input-container">
                    <select value={refStyle} onChange={(e) => setRefStyle(e.target.value)}>
                        <option value="normal">Style</option>
                        <option value="gras">Gras</option>
                        <option value="italique">Italique</option>
                    </select>
                    <select value={refHighlight} onChange={(e) => setRefHighlight(e.target.value)}>
                        <option value="transparent">Surlignage</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <select value={refColor} onChange={(e) => setRefColor(e.target.value)}>
                        <option value="black">Texte</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
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
                </div>
                <div className="input-container">
                    <select value={prodStyle} onChange={(e) => setProdStyle(e.target.value)}>
                        <option value="normal">Style</option>
                        <option value="gras">Gras</option>
                        <option value="italique">Italique</option>
                    </select>
                    <select value={prodHighlight} onChange={(e) => setProdHighlight(e.target.value)}>
                        <option value="transparent">Surlignage</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <select value={prodColor} onChange={(e) => setProdColor(e.target.value)}>
                        <option value="black">Texte</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
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
                        <option value="normal">Style</option>
                        <option value="gras">Gras</option>
                        <option value="italique">Italique</option>
                    </select>
                    <select value={t1Highlight} onChange={(e) => setT1Highlight(e.target.value)}>
                        <option value="transparent">Surlignage</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <select value={t1Color} onChange={(e) => setT1Color(e.target.value)}>
                        <option value="black">Texte</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
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
                        <option value="normal">Style</option>
                        <option value="gras">Gras</option>
                        <option value="italique">Italique</option>
                    </select>
                    <select value={t2Highlight} onChange={(e) => setT2Highlight(e.target.value)}>
                        <option value="transparent">Surlignage</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <select value={t2Color} onChange={(e) => setT2Color(e.target.value)}>
                        <option value="black">Texte</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
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
                        <option value="normal">Style</option>
                        <option value="italique">Italique</option>
                    </select>
                    <select value={t3Highlight} onChange={(e) => setT3Highlight(e.target.value)}>
                        <option value="transparent">Surlignage</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <select value={t3Color} onChange={(e) => setT3Color(e.target.value)}>
                        <option value="black">Texte</option>
                        <option value="red">Rouge</option>
                        <option value="yellow">Jaune</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="gray">Gris</option>
                    </select>
                    <div className="metric-container">
                        <input type="number" value={t3Font} onChange={(e) => setT3Font(e.target.value)} />
                        <span className="metric">px</span>
                    </div>
                </div>
                {/* End Prix T3 */}
            </div>
            <div className="separator"></div>
            <DefaultButton label="Sauvegarder" action={save} />
        </div>
    );
}