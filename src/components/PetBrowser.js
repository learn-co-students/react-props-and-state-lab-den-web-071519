import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  createPetCards = () => {
    return this.props.pets.map(pet => (<Pet onAdoptPet={this.props.onAdoptPet} pet={pet} key={pet.id}/>))
  }

  render() {
    return <div className="ui cards">{this.createPetCards()}</div>
  }
}

export default PetBrowser
