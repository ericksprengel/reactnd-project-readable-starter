import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from '../actions/categories'
import CategoryList from './CategoryList'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadCategories())
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <CategoryList categories={categories} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}

export default connect(mapStateToProps)(App)
