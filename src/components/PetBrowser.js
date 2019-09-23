import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  renderPet = () => {
    return this.props.pets.map((pet, i) => {
      return <Pet pet={pet} key={i} onAdoptPet={this.props.onAdoptPet} isAdopted={pet.isAdopted}/>
    })
  }
  
  render() {
    return (
        <div className="ui cards">
            {this.renderPet()}
        </div>
        )
  }
}

export default PetBrowser
