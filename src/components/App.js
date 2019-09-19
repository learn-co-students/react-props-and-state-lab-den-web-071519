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
    
    handleFilter = (filter) => {
      const filters = {...this.state.filters}
      filters.type = filter
      this.setState({filters})
    }

    adoptPet = (id) => {
      let pets = this.state.pets
      pets.map(pet => {
        if (pet.id === id){
          pet.isAdopted = true
        }
      })
      
      this.setState({ pets })
      
    }

    findPets = () => {
      let url = ``
      this.state.filters.type == 'all'
        ? url = `/api/pets`
        : url = `/api/pets?type=${this.state.filters.type}`

      fetch(url)
        .then(resp => resp.json())
        .then(pets => this.setState({ pets }))
        .catch(error => console.log('not found'))
        .then(this.renderPets)
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
              <Filters setFilter={(filter) => this.handleFilter(filter)} findPets={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdopt={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
