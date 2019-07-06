import React,{Component} from 'react';


const Listitem=(props)=>{
    return <li  className="list-group-item">
    <button className="btn-sm btn-info mr-4" onClick={props.edittodo}>U</button>
          {props.item.name}
   <button className="btn-sm btn-danger ml-4" onClick={props.deletetodo}> X</button></li>
}

export default Listitem