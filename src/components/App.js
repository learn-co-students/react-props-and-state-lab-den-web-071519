import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    changeType = (event) => {
      this.setState({
        filters: {
          type: event.target.value
        }
      })
    }

    findPets = (event) => {
      if (this.state.filters.type === 'all'){
        fetch('/api/pets')
          .then(response => response.json())
          .then(pets => this.setState({
            pets: pets
          }))
      } else {
        fetch(`/api/pets?type=${this.state.filters.type}`)
          .then(response => response.json())
          .then(pets => this.setState({
            pets: pets
          }))
      }
    }

    onAdoptPet = (petId) => {
      const petAction = this.state.pets.find(pet => pet.id === petId)
      petAction.isAdopted = true 
      this.setState({
        pets: [...this.state.pets, petAction]
      })
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
                <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets}/>
              </div>
              <div className="twelve wide column">
                <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default App
