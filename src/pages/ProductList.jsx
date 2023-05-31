import React, { useState, useEffect } from 'react';
import { Table, Button, Image } from 'semantic-ui-react';
import ProductService from '../services/productService';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../store/actions/cartActions';

export default function ProductList() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let productService = new ProductService();
        productService.getProducts().then(result => setProducts(result.data));
    }, []);

    const handleAddToCart = (product) => {
        console.log("Ürün sepete eklendi:", product);
        dispatch(AddToCart({ product: product, quantity: 1 }));
    };

    return (
        <div>
            {/* <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fotoğraf</Table.HeaderCell>
                        <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
                        <Table.HeaderCell>Ürün Fiyatı</Table.HeaderCell>
                        <Table.HeaderCell>Ürün Sahibi</Table.HeaderCell>
                        <Table.HeaderCell>Ürün Kategori</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {products?.length && products.map((product) => (
                        <Table.Row key={product.id}>
                            <Table.Cell>
                                <Image src={product.photoUrl} size="tiny" rounded />
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.userName}</Table.Cell>
                            <Table.Cell>{product.categoryName}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => handleAddToCart(product)}>Sepete Ekle</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table> */}

            {/* Alternatif kart görünümü */}
            <div className="ui link cards">
                {products?.length && products.map((product) => (
                    <div className="card" key={product.id}>
                        <div className="image" >
                            <Image src={product.photoUrl} alt={product.name} />
                        </div>
                        <div className="content">
                            <div className="header">
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </div>
                            <div className="meta">
                                <span className="category">{product.categoryName}</span>
                            </div>
                            <div className="description">
                                {product.userName} tarafından satılıyor.
                            </div>
                        </div>
                        <div class="button-area" className="extra content">
                        <Link to={`/products/${product.id}`}><Button onClick={() => handleAddToCart(product)}>Ürünü İncele</Button></Link>
                            <Button onClick={() => handleAddToCart(product)}>Sepete Ekle</Button>
                            <Button class="last-button" onClick={() => handleAddToCart(product)}>Favorilere Ekle</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
