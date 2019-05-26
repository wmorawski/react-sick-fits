import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      email
      name
      permissions
    }
  }
`;

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const Permissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ error, data, loading }) => (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => (
                    <th key={permission}>{permission}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UserPermissions key={user.id} user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
  );
};

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };
  handlePermissionChange = e => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        perm => perm !== checkbox.value
      );
    }
    this.setState({
      permissions: updatedPermissions
    });
  };
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type='checkbox'
                name={`${user.id}-permission-${permission}`}
                id={`${user.id}-permission-${permission}`}
                checked={this.state.permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
