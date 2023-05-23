import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CategoryService from '../services/categoryService';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryService = new CategoryService();
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kategoriler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category.id}>
              <Table.Cell textAlign="center">
                <Link to={`/categories/${category.name}`}>
                  {category.name}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
