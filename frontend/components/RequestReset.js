import React, { Component } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading, called }) => (
          <Form
            method='POST'
            onSubmit={async e => {
              e.preventDefault();
              try {
                const res = await requestReset();
                this.setState({ email: '' });
              } catch (_) {}
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your account</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email for a rest link.</p>
              )}
              <label htmlFor='email'>
                Email
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <button type='submit'>Reset</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default RequestReset;
