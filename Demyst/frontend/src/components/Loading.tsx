import React from "react"

const spinnerContainerStyle = {
    padding: '32px, 0'
}
const spinnerStyle = {
    border: "8px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "8px solid #3498db",
    width: "80px",
    height: "80px",
    animation: "spin 2s linear infinite",
    margin: "auto"
}



const Loading = () => <div style={spinnerContainerStyle} data-testid="loading-spiner" >
    <div style={spinnerStyle}></div>
</div >


export default Loading