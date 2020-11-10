import React, {useState} from 'react'
import Plot from "react-plotly.js"
import { Slider } from 'rsuite';
import "../CSS/plot1.css"

let messageFreq = 100e+3;

function t(start,end,delt) {
    let xvalues = [];
    for(let i = start;i <= end;i = i + delt) {
        xvalues.push(i);
    }
    return xvalues;
}
function carrierSignal(A,freq,t) {
    let yvalues = [];
    for(let i = 0;i <= t.length ;i++) {
        yvalues.push(A*Math.cos(2*Math.PI*t[i]*freq));
    }
    return yvalues;
}
function sin(A,freq,t) {
    let yvalues = [];
    for(let i = 0;i <= t.length ;i++) {
        yvalues.push(A*Math.sin(2*Math.PI*t[i]*freq));
    }
    return yvalues;
}

function DSBSC(c,m) { //c => carrier signal m => message signal 
    let modulatedSignal = [];
    for(let i = 0;i <= m.length;i++) {
        modulatedSignal.push(m[i]*c[i])
    }
    return modulatedSignal;
}

function AM(c,m,a) { //c => carrier signal m => message signal 
    let modulatedSignal = [];
    for(let i = 0;i <= m.length;i++) {
        modulatedSignal.push((1+(a*m[i]))*c[i])
    }
    return modulatedSignal;
}

function USSBSC(t,mt,ct,cfreq) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < t.length; i++){
        ssb.push((mt[i]*ct[i])-(mht[i]*cht[i]));
    }
    return ssb
}

function LSSBSC(t,mt,ct,cfreq) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < mt.length; i++){
        ssb.push((mt[i]*ct[i])+(mht[i]*cht[i]));
    }
    return ssb
}

function USSB(t,mt,ct,cfreq,a) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < t.length; i++){
        ssb.push(((1+a*mt[i])*ct[i])-(mht[i]*cht[i]));
    }
    return ssb
}


function LSSB(t,mt,ct,cfreq,a) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < mt.length; i++){
        ssb.push(((1+a*mt[i])*ct[i])+(mht[i]*cht[i]));
    }
    return ssb
}


// function FM(t,AmplitudeOfMt,AmplitudeOfCt,cFreq,b){
//     let fm = [];
//     let pi = Math.PI;
//     for(let i = 0;i < t.length;i++) {
//         fm.push(AmplitudeOfCt*Math.cos((2*pi*cFreq*t) + (AmplitudeOfMt*b*Math.sin(2*pi*messageFreq*t))))
//     }
//     return fm
// }

function Plot1() {
    let AmplitudeOfMt = 1
    let AmplitudeOfCt = 1
    const [freq, setFreq] = useState(550e+3);
    let time = t(0,25e-6,0.01e-7);
    let ct = carrierSignal(AmplitudeOfCt,freq,time)
    let mt = sin(AmplitudeOfMt,messageFreq,time)
    function handleChangeStart(freq){
        return setFreq(freq)
    };

    
    return (
        <div className="Plot1">
            <div className='slider'>
                Frequency
                <Slider 
                    barClassName = "slider"
                    min= {550e+3}
                    max = {1720e+3}
                    step = {1e+3}
                    style={{ width: 200,color: "red",backgroundColor: "black" }}
                    value = {freq}
                    onChange = {handleChangeStart}
                />
                <hr />
            </div>
            <Plot
                data={[
                {
                    x: time,
                    y: ct,
                    marker: {color: 'blue'},
                }
                ]}
                layout={{
                    width: 400, 
                    height: 400, 
                    title: 'Carrier signal', 
                }}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: mt,
                    marker: {color: 'green'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'Message signal'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: DSBSC(ct,mt),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'DSBSC signal'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: AM(ct,mt,1),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'Conventional AM signal'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: USSBSC(time,mt,ct,freq),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB-SC-upper'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: LSSBSC(time,mt,ct,freq),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB-SC-lower'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: USSB(time,mt,ct,freq,1),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB upper'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: LSSB(time,mt,ct,freq,1),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB lower'}}
            />
        </div>
    )
}

export default Plot1

