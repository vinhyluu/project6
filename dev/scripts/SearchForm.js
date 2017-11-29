import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class SearchForm extends React.Component {
    constructor() {
        super();

        this.state = {
            searchByBrand: "",
            searchByType: "",
            searchResults: [],
        }
        this.handleBrand = this.handleBrand.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBrand(e) {
        this.setState({
            searchByBrand: e.target.value,
        })
    }

    handleType(e) {
        this.setState({
            searchByType: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const brand = this.state.searchByBrand;
        const type = this.state.searchByType;
        const searchQuery = [];
        const apiUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json?'

        if (brand === null) {
            searchQuery.push(`${apiUrl}product_type=${type}`);
    
        } else if (type === null) {
            searchQuery.push(`${apiUrl}brand=${brand}`);
           
        } else {
            searchQuery.push(`${apiUrl}brand=${brand}&product_type=${type}`);
        }
        axios.get(`${searchQuery}`)
            .then((results) => {
                this.setState({
                    searchResults: results,
                })
            })
        }


    render() {
        return (
            <div>
                <div>
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="searchContainer">

                            <div className="brandContainer">
                                <input type="text" name="brand" value={this.state.searchByBrand} onChange={this.handleBrand} />
                            </div>

                            <div className="typeContainer">
                                <input type="text" name="type" value={this.state.searchByType} onChange={this.handleType} />
                            </div>

                            <div className="submitContainer">
                                <input type="submit" name="submit" />
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    
                </div> 
            </div>
        )
    }
}

export default SearchForm