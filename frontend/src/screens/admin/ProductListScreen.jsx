import React from 'react'
import { useCreateProductMutation, useGetProductsQuery } from '../../slices/productsApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    /**************************************** Important *************************************************/
    /* You must destructure refetch product so get the new product just after create it without refresh */
    /****************************************************************************************************/
    const {data: products, refetch, isLoading, error } = useGetProductsQuery();
    const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();

    const deleteHandler = (id) => {
        console.log(id);
    }

    const createProductHandler = async() => {
        if(window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-e' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && isLoading ? <Loader /> : 
            error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm mx-2'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant='warning' className='btn-sm'
                                    onClick={() => deleteHandler(product._id)}>
                                    <FaTrash style={{color:'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen