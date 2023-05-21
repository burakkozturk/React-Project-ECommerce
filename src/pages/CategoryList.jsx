import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react'
import CategoryService from '../services/categoryService';
import { Link } from 'react-router-dom';

export default function Categories() {
    //   const [categories, setCategories] = useState([]);
    //   const navigate = useNavigate();

    //   useEffect(() => {
    //     fetchCategories();
    //   }, []);

    //   const fetchCategories = async () => {
    //     try {
    //       const response = await CategoryService.getCategories();
    //       setCategories(response.data);
    //     } catch (error) {
    //       console.error('Error retrieving categories:', error);
    //     }
    //   };

    const [categories, setCategories] = useState([])

    useEffect(() => {
        let categoryService = new CategoryService();
        categoryService.getCategories()
            .then(result => {
                setCategories(result.data);
                console.log(result.data); // Kategorilerin veri yapısını kontrol etmek için
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    }, []);




    //   const handleCategoryClick = (categoryId) => {
    //     navigate(`/categories/${categoryId}`);
    //   };

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Kategori Adı</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {categories.map((category) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>
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
