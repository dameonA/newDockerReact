import './App.css';
import React from 'react'
import AddItem from './AddItem'
//import DeleteItem from './DeleteItem'
const fs = require('fs')

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      addItemFlag: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/list')
    const json = await response.json()
    this.setState({items: json})
  }

  async itemAdded(item) {
    this.setState({addItemFlag: false})
    this.state.items.push(item)
  }

  render() {
    return (
    <div>
      <h3>Shopping List</h3>
      <table border="5">
        {
          this.state.items.map(
            item =>
              <tr>
                <td> {item.qty+' '+item.units+' of '+item.item} </td>
                <td><button type='button' onClick={async function () {
                        alert(item.item)
                        await fetch('http://localhost:3001/list', {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                            body: JSON.stringify(item)
                      })
                      var index;
                      var list = this.state.items
                      for (var i = 0; i < list.length; i++) {
                          if (list[i].item === item.item) {
                              index = i;
                          }
                      }
                      this.state.items.splice(this.state.items.indexOf(index), 1)
                  }}>Delete</button></td>
              </tr>
          )
        }
      </table>
      <br></br>
      <button type='button' onClick={() => this.setState({addItemFlag: true})}>Add Item</button>
      <AddItem 
        addItemFlag = {this.state.addItemFlag}
        itemAdded = {this.itemAdded.bind(this)}
      />
    </div>)
  }
}

export default App;
