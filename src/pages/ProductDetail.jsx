import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import ProductService from '../services/productService'

export default function ProductDetail() {
    let { id } = useParams()

    const [products, SetProducts] = useState({})
    //lifecycle hook
    useEffect(() => {
        let productService = new ProductService()
        productService.getByProductId(id).then(result => SetProducts(result.data))
    }, [])

    return (
        <div>
            {id}
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>{products.name}</Card.Header>
                        <Card.Meta>{products.categoryName}</Card.Meta>
                        <Card.Description>
                            <strong>{products.userName}</strong>  tarafından yapıldı...
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}
