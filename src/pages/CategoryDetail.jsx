import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';

export default function CategoryDetail() {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryService = new CategoryService();
                const result = await categoryService.getCategoryByName(name);

                if (result.data && result.data.length > 0) {
                    const selectedCategory = result.data.find(category => category.name === name);

                    if (selectedCategory) {
                        setCategory(selectedCategory);
                        const categoryId = selectedCategory.id;

                        const productService = new ProductService();
                        const productsResult = await productService.getProductsByCategoryId(categoryId);
                        setProducts(productsResult.data.products);
                    }
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchData();
    }, [name]);

    return (
        <div>
            {products && products.length > 0 ? (
                <div>
                    <h1>Kategoriye Ait Ürünler</h1>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Fotoğraf</Table.HeaderCell>
                                <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
                                <Table.HeaderCell>Ürün Sahibi</Table.HeaderCell>
                                <Table.HeaderCell>Fiyat</Table.HeaderCell>
                                <Table.HeaderCell>Kategori</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {products.map((product) => (
                                <Table.Row key={product.id}>
                                    <Table.Cell>
                                        <Image src={product.photoUrl} size="tiny" rounded />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                                    </Table.Cell>
                                    <Table.Cell>{product.userName}</Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>{product.categoryName}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <p>Kategoriye ait ürün bulunamadı.</p>
            )}
        </div>
    );
}
