import React, { Component } from 'react';
import CategoryList from './CategoryList'

const categories = [
  {
      "name": "react",
      "path": "react"
  },
  {
      "name": "redux",
      "path": "redux"
  },
  {
      "name": "udacity",
      "path": "udacity"
  }
]

class App extends Component {
  render() {
    return (
      <div>
        <CategoryList categories={categories} />
      </div>
    );
  }
}

export default App;
