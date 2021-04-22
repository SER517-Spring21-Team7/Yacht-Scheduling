import React from "react";
import Autosuggest from "react-autosuggest";
import "./ToolbarSearch.css";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

var languages = [];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        (lang) =>
          lang.watercraftName.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.watercraftName;
const renderSuggestion = (suggestion) => <div>{suggestion.watercraftName}</div>;

class SearchWatercraft extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }
  componentDidMount() {
    var url = null;
    const urlAll =
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/getAllWaterCraft";
    const urlMember =
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/getWaterCraftByMemberId/" +
      sessionStorage.getItem("userId");
    if (sessionStorage.getItem("role") === "Admin") {
      url = urlAll;
    } else {
      url = urlMember;
    }
    const watercraftList = [];
    const response = axios
      .get(url)
      .then((watercraftResponse) => {
        languages = watercraftResponse.data.map((a) => Object.assign({}, a));
        return languages;
      })
      .then((languages) => {
        var universalWatercraftId = sessionStorage.getItem(
          "globalWatercraftId"
        );
        languages.map((each) => {
          if (each.watercraftId === parseInt(universalWatercraftId)) {
            this.setState({
              value: each.watercraftName,
            });
          }
        });
      });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].watercraftName === newValue) {
        const globalWatercraftId = languages[i].watercraftId;
        this.props.parentCallback(globalWatercraftId);
      }
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Select Watercraft",
      value,
      onChange: this.onChange,
    };

    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </>
    );
  }
}
export default SearchWatercraft;
