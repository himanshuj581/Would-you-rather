import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Form,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { setAuthUser } from '../actions/authUser';

class LoginPage extends Component {
    state = {
      loading: false
    };
    handleLoading = () => {
      this.setState({ loading: true });
    };
  
    render() {
      return (
        <Fragment>
            <Segment.Group>
                <Header as="h4" block inverted textAlign="center" color='grey'>
                    <Header.Content>Welcome to the Pokemon Would You Rather App!</Header.Content>
                    <Header.Subheader>Create or Answer Pokemon Polls</Header.Subheader>
                </Header>
                <LoginGridLayout
                image={<Image src="/images/pokemon.png" size="medium" centered />}
                form={<ConnectedLoginForm onLoading={this.handleLoading} />}
                loading={this.state.loading}
                />
          </Segment.Group>
        </Fragment>
      );
    }
  }
 
  const LoginGridLayout = ({ image, form, loading }) => (
    <div>
      <Grid padded textAlign="center">
        <Grid.Row>
          <Grid.Column width={16}>
            {loading === true && (
              <Dimmer active inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            )}
            {image}
            <br />
            {form}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
    
  class LoginForm extends Component {
    static propTypes = {
      onLoading: PropTypes.func.isRequired
    };
    state = {
      value: ''
    };
    onChange = (e, { value }) => {
      this.setState({ value });
    };
    handleSubmit = e => {
      e.preventDefault();
      const { onLoading, setAuthUser } = this.props;
      const authUser = this.state.value;
  
      new Promise((res, rej) => {
        onLoading();
        setTimeout(() => res(), 500);
      }).then(() => setAuthUser(authUser));
    };
    generateDropdownData = () => {
      const { users } = this.props;
      return users.map(user => ({
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL }
      }));
    };
    render() {
      const { value } = this.state;
      const disabled = value === '' ? true : false;
  
      return (
        <Form onSubmit={this.handleSubmit}>
          <Header as="h2" color="blue">
            Choose your Pokemon
          </Header>
          <Form.Dropdown 
            placeholder="Select a Pokemon"
            fluid
            selection
            scrolling
            options={this.generateDropdownData()}
            value={value}
            onChange={this.onChange}
            required
          />
          <Form.Button content="Login" color='blue' disabled={disabled} fluid  />
        </Form>
      );
    }
  }
  
  const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthUser }
  )(LoginForm);
  
  function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
  }
  
  export default LoginPage;
  