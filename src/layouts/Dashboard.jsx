import React from 'react'
import Categories from './Categories'
import { Grid } from 'semantic-ui-react'
import { Route , Routes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import CartDetail from '../pages/CartDetail'
import CategoryList from '../pages/CategoryList'

export default function Dashboard() {
  return (
    <div>

      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>

            <Categories>

            </Categories>

          </Grid.Column>
          <Grid.Column width={12}>

            <Routes>
              <Route path='/' Component={ProductList} />
              <Route exact path='/products' Component={ProductList} />
              <Route path='/products/:id' Component={ProductDetail} />
              <Route path='/cart' Component={CartDetail} />
              <Route path='/categories' Component={CategoryList} />


            </Routes>


          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  )
}
