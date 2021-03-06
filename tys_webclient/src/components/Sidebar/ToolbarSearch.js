import React from 'react';
import Autosuggest from 'react-autosuggest';
import './ToolbarSearch.css'

var languages = [];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.watercraftName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.watercraftName;
const renderSuggestion = suggestion => (
  <div>
    {suggestion.watercraftName}
  </div>
);

class SearchWatercraft extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  componentDidMount() {
    const url = "http://localhost:8080/watercraft/getAllWaterCraft"
    const watercraftList = []
    const response = fetch(url, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((watercraftResponse)=> {
        languages = watercraftResponse.map(a => Object.assign({}, a));
        console.log(languages)
    })
    
};

  onChange = (event, { newValue }) => {
    console.log("inside onChange");
    this.setState({
      value: newValue
    })
    for (let i = 0; i < languages.length; i++){
        if(languages[i].watercraftName===newValue){
            const globalWatercraftId = languages[i].watercraftId
            console.log(globalWatercraftId)
        }
    }
    // const MyContext = React.createContext(globalWatercraftId);

  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Select Watercraft',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default SearchWatercraft;