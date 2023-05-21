import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import CategoryService from '../services/categoryService';

export default function CategoryDetail() {
    //   const { name } = useParams();
    //   const [category, setCategory] = useState({});

    //   useEffect(() => {
    //     let categoryService = new CategoryService();
    //     categoryService.getCategoryByName(name)
    //       .then(result => {
    //         if (result.data.length > 0) {
    //           setCategory(result.data[0]); // İlk kategori verisini kullanıyoruz
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Hata:', error);
    //       });
    //   }, [name]);

    let { name } = useParams()

    const [categories, SetCategories] = useState({})
    //lifecycle hook
    useEffect(() => {
        let categoryService = new CategoryService()
        categoryService.getCategoryByName(name).then(result => SetCategories(result.data))
    }, [])

    return (
        <div>
            <h1>Kategori Detay Sayfası</h1>
            <Table celled>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Kategori Adı:</Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}
