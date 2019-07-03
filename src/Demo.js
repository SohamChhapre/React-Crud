import React ,{Component} from 'react';
import ReactDom from 'react-dom';

class Demo extends Component{
             render(){
                 return <div>
                 <h1>Hello {this.props.name}</h1>
                 <p>welcome to my app</p>
                 </div>
             }
}

export default Demo;