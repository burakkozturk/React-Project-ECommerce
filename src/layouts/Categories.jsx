import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import CategoryService from '../services/categoryService';

export default function Categories() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let categoryService = new CategoryService()
    categoryService.getCategories().then(result => setCategory(result.data))
  }, [])


  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>  
          {category.map(category => (
            <Table.Row key={category.id}>
              <Table.Cell>{category.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
