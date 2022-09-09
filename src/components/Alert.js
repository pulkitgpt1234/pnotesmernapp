import React from 'react'

export default function Alert(props) {
  const capitalize=(string)=>{
    const str2 = string.charAt(0).toUpperCase() + string.slice(1);
    return str2;
  }
  return (
      <div style={{height:'50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show`} role="alert">
            <strong>{(props.alert.alertType==="danger"?"Error":capitalize(props.alert.alertType))+"!"}</strong> {props.alert.message+"."}
        </div>}
      </div>
  )
}