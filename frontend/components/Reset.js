import React, { Component } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class RequestReset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: '',
    confirmPassword: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{ ...this.state, resetToken: this.props.resetToken }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          }
        ]}
      >
        {(requestReset, { error, loading, called }) => (
          <Form
            method='POST'
            onSubmit={async e => {
              e.preventDefault();
              try {
                const res = await requestReset();
                this.setState({ password: '', confirmPassword: '' });
              } catch (_) {}
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your account</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Your password has been changed.</p>
              )}
              <label htmlFor='password'>
                Password
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor='confirmPassword'>
                Confirm Password
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm password'
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <button type='submit'>Change</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default RequestReset;
