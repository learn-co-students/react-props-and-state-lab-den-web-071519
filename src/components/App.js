import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      },
      count: 0
    }
  }

  changeFilter = (input) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: input.target.value
      }
    })
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true } : pet
    })
    this.setState({ pets })
  }

  findPetsClick = () => {
    if(this.state.filters.type === 'all'){
      fetch('/api/pets')
        .then(response => response.json())
        .then(res => this.setState({
          ...this.state,
          pets: res,
          count: this.state.count + 1
        }))
    } else {
        fetch(`/api/pets?type=${this.state.filters.type}`)
          .then(response => response.json())
          .then(res => this.setState({
            ...this.state,
            pets: res
          }))
    }
  }

  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters changeFilter={this.changeFilter} findPetsClick={this.findPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
