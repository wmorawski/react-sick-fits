import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
