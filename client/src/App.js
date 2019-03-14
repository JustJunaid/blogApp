import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Messages} from 'primereact/messages';
import {Sidebar} from 'primereact/sidebar';
var _ = require('lodash');

class App extends Component {
  invalidInput = ''
  BUILDING_INIT = 1

  state = {
    buildingName: 'Building Number 1',
    floors: '',
    units: [],
    message: 'Data Submitted Successfully'
  }

  showSuccess = () => {
    this.messages.show({ severity: 'success', summary: 'Success Message', detail: this.state.message });
  }
  
  showWarn() {
    this.messages.show({ severity: 'warn', summary: 'Warn Message', detail: 'Invalid Input' });
  }

  showError() {
      this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  }

  invalidMessageReset = () => {
    const message = document.getElementById('message')
    message.innerHTML = ''
  }

  generateRandomCategory = () => {
    const category = ['Reserved', 'Occupied', 'Available', 'To be Available']
    const randomIndex = Math.floor(Math.random() * category.length)
    return category[randomIndex]
  }

  submitForm = async event => {
    event.preventDefault()
    const buildingName = event.target[3].value? event.target[3].value: event.target[0].innerText.slice(0, 17)
    const unitsInput = event.target[2].value
    const unitsInString = unitsInput.split(',')
    const unitsInNumbers = unitsInString.map(i => i = parseInt(i))
    const floors = parseInt(event.target[1].value)

    const unitsInNumbersWithCategories = unitsInNumbers.map(unit => { 
      const obj = {}
      obj[unit] = this.generateRandomCategory()
      return obj
     })

    const response = await fetch('/api/addData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { 'name': buildingName,
          'floors': floors, 
          'flats': unitsInNumbersWithCategories
        }
      ),
    });
    const body = await response.text();
    const resp = JSON.parse(body)
    if (resp.result === 'Success') {
      this.BUILDING_INIT += 1
      this.showSuccess()
    }

    if (floors !== unitsInNumbers.length || unitsInput[unitsInput.length - 1] === ',') {
      this.showWarn()
    } 
    
    this.setState({
      buildingName: buildingName,
      floors: floors,
      units: unitsInNumbers
    })
  }

  // callApi = async () => {
  //   const response = await fetch('/getData')
  //   const body = await response.json()
  //   if (response.status !== 200) throw Error(body.message)
  //   return response.statusText
  // };

  componentDidUpdate() {
    // this.callApi()
    // .then(res => this.setState({ buildingName: res }))
    // .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='App'>
      <Sidebar visible={this.state.visible} onHide={(e) => this.setState({visible:false})}>
          Content
      </Sidebar>
      <Button icon="pi pi-arrow-right" onClick={(e) => this.setState({visible:true})}/>
        <form action="" method="GET" onSubmit={this.submitForm}>
        <Messages ref={(el) => this.messages = el}></Messages>
          <Fieldset legend={`Building Number ${this.BUILDING_INIT}`}>
            <div className="p-grid">
              <div className="p-col-12 p-md-4">
                <div className="input">
                  <i className="pi pi-number">Total Number Of Floors: </i>
                  <div className="p-inputgroup">
                    <InputText type="number" autoFocus={true} name="floors" placeholder="Enter Here.."/>
                  </div>
                </div>

                <div className="input">
                  <i className="pi pi-number">Units On Each Floor: </i>
                  <div className="p-inputgroup">
                    <InputText name="units" placeholder="Enter Here.."/>
                  </div>
                </div>

                <div className="input">
                  <i className="pi pi-number">Building Name(Optional): </i>
                  <div className="p-inputgroup">
                    <InputText type="text" name="name" placeholder="Enter Here.."/>
                  </div>
                </div>

                <div className="input">
                  <Button type="submit" label="Submit" className="p-button-raised p-button-rounded" tooltip="Click to proceed" />
                </div>

                {(this.state.floors === this.state.units.length) &&
                (
                  <div className="p-inplace p-component">
                  <div className="p-inplace-content">
                      <div className="p-datatable p-component">
                        <div className="p-datatable-wrapper">
                            <table>
                              <thead className="p-datatable-thead">
                                  <tr>
                                    <th width="10%" className=""><span className="p-column-title">Floor</span></th>
                                    <th className=""><span className="p-column-title">Units</span></th>
                                  </tr>
                              </thead>
                              <tbody className="p-datatable-tbody">
                                  {this.state.units.map((NoOfFlats, i) => {
                                    return (
                                      <tr>
                                        <td key={i}>{i+1}</td>
                                        <td key={i+1}>
                                          <div className="p-grid">
                                            <div className="p-col" style={{float: 'left'}}>
                                            {_.times(NoOfFlats, () => (<div className="box"><p style={{color: '#333333', marginTop: '15px'}}>F. No.</p></div>))}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  })}
                              </tbody>
                            </table>
                        </div>
                      </div>
                  </div>
                </div>
                )}

              </div>
            </div>
          </Fieldset>
        </form>
      </div>
    );
  }
}

export default App;
