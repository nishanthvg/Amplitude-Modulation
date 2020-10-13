import React, {useState} from 'react'
import Plot from "react-plotly.js"
import { Slider } from 'rsuite';
import "../CSS/plot1.css"
import {fft} from 'fft-js';

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

function AM(c,m) { //c => carrier signal m => message signal 
    let modulatedSignal = [];
    for(let i = 0;i <= m.length;i++) {
        modulatedSignal.push(m[i]*c[i])
    }
    return modulatedSignal;
}

function DSBSC(c,m,a) { //c => carrier signal m => message signal 
    let modulatedSignal = [];
    for(let i = 0;i <= m.length;i++) {
        modulatedSignal.push((1+(a*m[i]))*c[i])
    }
    return modulatedSignal;
}

function USSB(t,mt,ct,cfreq) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < mt.length; i++){
        ssb.push((mt[i]*ct[i])-(mht[i]*cht[i]));
    }
    return ssb
}

function LSSB(t,mt,ct,cfreq) {
    let ssb = [];
    let mht = carrierSignal(1,messageFreq,t);
    let cht = sin(1,cfreq,t);
    for(let i =0;i < mt.length; i++){
        ssb.push((mt[i]*ct[i])+(mht[i]*cht[i]));
    }
    return ssb
}

function fftMagnitude (signal){
    let mag = [];
    let fft1 = fft(signal);
    for(let i = 0;i<fft1.length;i++){
        mag.push(fft[i][0]);
    }
    return mag;
}

function fftFrequencies(signal) {
    let freq = [];
    let fft1 = fft(signal);
    for(let i = 0;i<fft1.length;i++){
        freq.push(fft[i][0]);
    }
    return freq;
}

function Plot1() {
    const [freq, setFreq] = useState(550e+3);
    let time = t(0,25e-6,0.01e-7);
    let ct = carrierSignal(1,freq,time)
    let mt = sin(1,messageFreq,time)
    let ussb = USSB(time,mt,ct,freq);
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
                    y: AM(ct,mt),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'AM signal'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: DSBSC(ct,mt,1),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'DSBSC-AM signal'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: USSB(time,mt,ct,freq),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB-upper'}}
            />
            <Plot
                data={[
                {
                    x: time,
                    y: USSB(time,mt,ct,freq),
                    marker: {color: 'red'},
                }
                ]}
                layout={{width: 400, height: 400, title: 'SSB-lower'}}
            />
        </div>
    )
}

export default Plot1
