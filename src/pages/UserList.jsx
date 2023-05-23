import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import UserService from '../services/userService';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let userService = new UserService()
        userService.getUsers().then(result => setUsers(result.data))
    }, [])


    return (
        <div>
            <h2>Kullanıcılar</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Ad</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email !== null ? user.email : '-'}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
