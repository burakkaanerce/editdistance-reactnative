import React from "react";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import EditDistance from "../_helpers/algorithms";

export default class DFinderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      firstWord: "",
      secondWord: "",
      result: null,
      execTime: null,
      loading: false
    };
  }

  _handlefirstWord = word => {
    this.setState({
      firstWord: word
    });
  };

  _handlesecondWord = word => {
    this.setState({
      secondWord: word
    });
  };

  _handleResult(firstWord, secondWord) {
    if (!!firstWord & !!secondWord) {
      this.setState({
        loading: true
      });
      setTimeout(() => {
        const t0 = global.nativePerformanceNow();
        const editDistance = new EditDistance(firstWord, secondWord);
        const t1 = global.nativePerformanceNow();
        const response = {
          result: editDistance.result,
          timer: (t1 - t0) / 1000
        };
        this.setState({
          result: response.result,
          execTime: response.timer,
          loading: false
        });
      }, 500);
    } else {
      this.setState({
        result: null,
        execTime: null
      });
    }
  }

  _renderResult = () => {
    if (!!this.state.loading) {
      return (
        <Grid>
          <Row>
            <Col>
              <ActivityIndicator size="large" color="#0000ff" />
            </Col>
          </Row>
        </Grid>
      );
    }
    if (!!this.state.result) {
      return (
        <Grid>
          <Row>
            <Col>
              <Text style={{ textAlign: "center" }}>
                According to Levenshtein Distance Algorithm,
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                lev({this.state.firstWord}, {this.state.secondWord}) = {this.state.result}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={{ textAlign: "center" }}>
                execution time ={" "}
                <Text style={{ fontWeight: "bold" }}>
                  {this.state.execTime}
                </Text>{" "}
                sec
              </Text>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            paddingTop: 40,
            paddingHorizontal: 10
          }}
        >
          <Grid>
            <Row style={{ height: 80 }}>
              <Col>
                <Item floatingLabel>
                  <Label>First Word</Label>
                  <Input
                    value={this.state.firstWord}
                    onChangeText={this._handlefirstWord}
                    required
                  />
                </Item>
              </Col>
            </Row>
            <Row style={{ height: 80 }}>
              <Col>
                <Item floatingLabel>
                  <Label>Second Word</Label>
                  <Input
                    value={this.state.secondWord}
                    onChangeText={this._handlesecondWord}
                    required
                  />
                </Item>
              </Col>
            </Row>
            <Row style={{ height: 80 }}>
              <Col>
                <Button
                  block
                  primary
                  onPress={() =>
                    this._handleResult(
                      this.state.firstWord,
                      this.state.secondWord
                    )
                  }
                >
                  <Text> Calculate </Text>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>{this._renderResult()}</Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
