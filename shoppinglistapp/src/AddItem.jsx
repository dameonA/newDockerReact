import React from 'react'

class AddItem extends React.Component {
    constructor(props) {
        super(props)
    }

    createItemObj() {
        var item = {}
        item.item = document.getElementById('item').value
        item.qty = document.getElementById('quantity').value
        item.units = document.getElementById('units').value
        this.addItemToServer(item)
        this.props.itemAdded(item)
    }

    async addItemToServer(item) {
        await fetch('http://localhost:3001/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(item)
        })
    }

    render() {
        if (this.props.addItemFlag) {
            return (
                <div>
                    <label for="item">Item</label>
                    <input type="text" id="item"></input><br></br>
                    <label for="quantity">Quantity</label>
                    <input type="text" id="quantity"></input><br></br>
                    <label for="units">Units</label>
                    <input type="text" id="units"></input><br></br>
                    <button type="submit" onClick={this.createItemObj.bind(this)}>Add</button>
                </div>
            )
        } else {
            return null
        }
    }
}

export default AddItem