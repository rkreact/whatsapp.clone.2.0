import React from 'react'
import { Circle } from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img
                    style={{ marginBottom: 10 }}
                    height={200}
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png'
                />
                <Circle size={60} color='#3cbc28' />
            </div>
        </center>
    )
}


export default Loading;