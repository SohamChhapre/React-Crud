import React,{Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { isTemplateElement } from '@babel/types';
import Lisitem from './Listitem';
import Listitem from './Listitem';
import Axios from 'axios';
import loadingimg from './loadingimg.gif';

class App extends Component{

  constructor(){
    super();
    this.state={
      newtodo:'',
      edit:false,
      notification:null,
      editingIndex:null,
      todos:[],
      loading:true
    };
   this.apiUrl='https://5d203cc33036a60014d68a9f.mockapi.io'

    this.addtodo=this.addtodo.bind(this);
    this.deletetodo=this.deletetodo.bind(this);
    this.updatetodo=this.updatetodo.bind(this);
    this.editlist=this.editlist.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.alert=this.alert.bind(this);
  }
  async componentDidMount(){
    const response=await axios.get(`${this.apiUrl}/todos`);
    console.log(response);
    setTimeout(()=>{this.setState({todos:response.data,loading:false});
    },3000);
    }
 
  async addtodo(){
      
       const response= await axios.post(`${this.apiUrl}/todos`,{name:this.state.newtodo});

       const oldTodos=this.state.todos;
       oldTodos.push(response.data);
       this.setState({
         todos:oldTodos,
         newtodo:''
       })
       this.alert('Todo Added Succesfully');
  }
  handlechange(event){
    this.setState({
      newtodo: event.target.value
    });
    console.log(event.target.name,event.target.value);
  }
 async deletetodo(index){
    const todos=this.state.todos;
    const todo=todos[index];    
    const response=await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];
    this.setState({ todos })
    this.alert('Todo deleted Succesfully');
  }
  editlist(index){
    console.log('edithitted');
          const todo=this.state.todos[index];
          console.log(todo);
          this.setState({
            edit:true,
            newtodo:todo.name,
            editingIndex:index
          });
          console.log(index);
  }
  alert(notification){
    this.setState({
      notification
    });
    setTimeout(()=>{this.setState({notification:null})},2000);
     
  }
  async updatetodo(){
         const todo=this.state.todos[this.state.editingIndex];
         const response=await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
           name:this.state.newtodo
         })
         todo.name=this.state.newtodo;
         const todos=this.state.todos;
         todos[this.state.editingIndex]=todo;
         this.setState({ todos ,edit:false,editingIndex:null});
         this.alert('Todo updated Succesfully');
  }
  render(){
    console.log(this.state.newtodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="container">
          {
            this.state.notification &&
          <div className="alert mt-3 alert-success">
            <p className="text-center">{this.state.notification}</p>
          </div>
          }
          <h6 className="text-center p-4">Todo App</h6>
          <input name="todo" className="my-4 form-control" placeholder="Add a new todo" onChange={this.handlechange} value={this.state.newtodo} />

               <button className="btn-success form-control mb-2" onClick={this.state.edit? this.updatetodo: this.addtodo} disabled={this.state.newtodo.length < 4}> {this.state.edit?'Update todo':'Add todo'}</button>
             { this.state.loading && <img src={loadingimg} alt="loading img" ></img>}
          { (!this.state.edit||this.state.loading) &&
          <ul className="list-group">
            {this.state.todos.map((item,index)=>{
              return <Listitem key={item.id} item={item} edittodo={()=>this.editlist(index)}
             deletetodo={()=>this.deletetodo(index)}              />
            })}
            
          </ul>
          }
        </div>
      </div>
    );
  }
  
}


export default App;
