import React, {useState} from 'react'
import Plot from "react-plotly.js"
import { Slider, RangeSlider } from 'rsuite';

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


function Plot1() {
    const [freq, setFreq] = useState(550e+3);
    let time = t(0,25e-6,0.01e-7);
    let ct = carrierSignal(1,freq,time)
    let mt = sin(1,100e+3,time)

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
        </div>
    )
}

export default Plot1
