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
    message: 'Data Submitted Successfully',
    buildingData: [],
    sideBarButtons: ['aaasd', 'basdf', 'casdf', 'Building Number 1'],
    searchBuildingByName: ''
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

  generateRandomColor = () => {
    const colors = ['blue', 'green', 'yellow', 'red']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  getApi = async () => {
    const response = await fetch(`/getData`,{
      method: 'GET',
      params: {'junaid': 'name'},
    })
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body
  };

  deleteApi = async () => {
    const response = await fetch('/deleteData')
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body 
  }

  openSidebar = () => {
    this.setState({visible:true})
    this.getApi()
    .then(res => {
      this.setState({buildingData: JSON.stringify(res)})
    })
    .catch(err => console.log(err))
  }

  changeStateBuildingNameSearch = (e) => {
    console.log(e.target.innerText)
    // this.setState({searchBuildingByName: e.target.innerText})
    console.log(this.state)
  }

  submitForm = async event => {
    event.preventDefault()
    const buildingName = event.target[3].value? event.target[3].value: event.target[0].innerText.slice(0, 17)
    const unitsInput = event.target[2].value
    const unitsInString = unitsInput.split(',')
    const unitsInNumbers = unitsInString.map(i => i = parseInt(i))
    console.log(unitsInNumbers)
    const floors = parseInt(event.target[1].value)

    const unitsInNumbersWithCategories = unitsInNumbers.map(unit => { 
      const obj = {}
      obj[unit] = this.generateRandomCategory()
      return obj
     })

     if (floors !== unitsInNumbers.length || unitsInput[unitsInput.length - 1] === ',') {
      this.showWarn()
      return
    } 

    const response = await fetch('/addData', {
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
      this.setState({sideBarButtons: [...this.state.sideBarButtons, this.state.buildingName]})
    }
    
    this.setState({
      buildingName: buildingName,
      floors: floors,
      units: unitsInNumbers
    })
  }

  // componentDidMount() {
  //   changeStateSearchByValue = (e) => this.setState({searchBuildingByName: e.target.innerHTML})
  // }

  render() {
    return (
      <div className='App'>
        <div className='col-2 col-md-12' style={{ width: '20%' }}>
          <div className="p-card" style={{width: '90%'}}>
            <div className="p-card-title" style={{fontWeight: '300'}}>Get Info</div>
            <div style={{overflowX: 'scroll', height: '70vh'}}>
              {this.state.sideBarButtons.map((buildingName) => <Button style={{margin: '10px 5%', display: 'block'}} 
              className="p-button-secondary p-button-rounded" icon="pi pi-arrow-right" label={buildingName} 
              onClick={this.openSidebar} onMouseOver={this.changeStateBuildingNameSearch}
            />)}
            </div>
          </div>
          <Sidebar visible={this.state.visible} style={{width:'30em'}} onHide={(e) => this.setState({visible:false})}>
              {this.state.buildingData}
          </Sidebar>
        </div>
        <div className='col-10 col-md-12' style={{ width: '80%' }}>
          <form action="" method="GET" onSubmit={this.submitForm}>
          <Messages ref={(el) => this.messages = el}></Messages>
            <Fieldset legend={`Building Number ${this.BUILDING_INIT}`}>
            <Button label={'Delete All Data'} className="p-button-info p-button-rounded" style={{cursor: 'pointer', float: 'right', marginTop: '-12%'}} onClick={this.deleteApi} className="deleteButton"/>
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
                                              {_.times(NoOfFlats, () => (<div style={{
                                                backgroundColor: this.generateRandomColor(),
                                                height: '50px',
                                                width: '60px',
                                                borderRadius: '5px',
                                                display: 'inline-block',
                                                margin: '0 5px'
                                              }}><p style={{color: '#fff', marginTop: '15px'}}>F. No.</p></div>))}
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
      </div>
    );
  }
}

export default App;
