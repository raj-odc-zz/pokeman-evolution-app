import React from 'react';

import Api from '../../api';
import Utils from '../../utils';
import './SpeciesComponent.scss';
import LoaderComponent from '../LoaderComponent/LoaderComponent';

export default class SpeciesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciesList: null,
      originalList: null,
      isLoading: false,
    };

    this.handleEvolutionClick = this.handleEvolutionClick.bind(this);
    this.handleJsonObject = this.handleJsonObject.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortDescending = this.sortDescending.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    Api.getAllSpecies().then((res) => {
      this.setState({
        speciesList: res.results,
        originalList: res.results,
        isChild: false,
      });
    });
  }

  sortAscending() {
    const { speciesList } = this.state;
    const sortedList = speciesList.sort(Utils.objectCompare('asc'));
    this.setState({ speciesList: sortedList });
  }


  sortDescending() {
    const { speciesList } = this.state;
    const sortedList = speciesList.sort(Utils.objectCompare('desc'));
    this.setState({ speciesList: sortedList });
  }


  handleJsonObject(parent, results) {
    parent && parent.map((child) => {
      results.push(child.species);
      if (child.evolves_to.length > 0) {
        this.handleJsonObject(child.evolves_to, results);
      }
    });
    return results;
  }

  handleEvolutionClick(event) {
    this.setState({ isLoading: true });
    Api.getSpeciesInfo({ url: event.target.dataset.url }).then((res) => {
      Api.getSpeciesEvolution({ url: res.evolution_chain.url }).then((evolutionResponse) => {
        const results = [];
        results.push(evolutionResponse.chain.species);
        const evolves = evolutionResponse.chain.evolves_to;
        this.handleJsonObject(evolves, results);
        this.setState({
          originalList: results,
          speciesList: results,
          isLoading: false,
          isChild: true,
        });
      });
    });
  }

  filterList(event) {
    const updatedList = this.state.originalList.filter((item) => {
      return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      speciesList: updatedList,
    });
  }

  handleBack() {
    this.getInitialData();
  }

  render() {
    const { speciesList, isChild, isLoading } = this.state;
    return (
      <div>
        <h2>Species List</h2>
        <div className="species">
          <div>
            <input type="text" className="species--search" placeholder="Search Pokemon" onChange={this.filterList} />
            <button className="species--asc" onClick={this.sortAscending}>Ascending</button>
            <button className="species--desc" onClick={this.sortDescending}>Descending</button>
          </div>
          <ul className="species__list species__list--ul">
            {speciesList && speciesList.map((species) => {
              return (
                <li key={species.name} className="species__list species__list--li">
                  <h4>{species.name}</h4>
                  <button
                    data-url={species.url}
                    onClick={this.handleEvolutionClick}
                    className="btn btn-default species__list species__list--evolution"
                  >
                    Show Evolution Chain
                  </button>
                </li>
              );
            }) }
          </ul>
          { isChild && <button onClick={this.handleBack}>Go to Species List</button>}
        </div>
        { isLoading && <LoaderComponent /> }
      </div>
    );
  }
}
