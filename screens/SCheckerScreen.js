import React from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
  Card,
  CardItem,
  Body
} from "native-base";
import { ActivityIndicator, FlatList } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import EditDistance from "../_helpers/algorithms";
import dictionary from "../_helpers/dictionary";

export default class SCheckerScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      word: "",
      result: null,
      isIncluded: false,
      loading: false
    };
  }

  _handleWord = word => {
    this.setState({
      word: word
    });
  };

  _handleResult(word) {
    if (!!word) {
      this.setState({
        loading: true
      });
      setTimeout(() => {
        const t0 = global.nativePerformanceNow();
        const words = dictionary();
        var response;
        if (words.includes(word)) {
          const t1 = global.nativePerformanceNow();
          response = {
            result: null,
            isIncluded: true,
            timer: (t1 - t0) / 1000
          };
        } else {
          var calculatedList = new Array();
          words.forEach(x => {
            const editDistance = new EditDistance(word, x);
            const calculated = {
              word: x,
              result: editDistance.result
            };
            calculatedList.push(calculated);
          });
          calculatedList.sort((a, b) => a.result - b.result);
          const t1 = global.nativePerformanceNow();
          response = {
            result: calculatedList.slice(0, 10),
            isIncluded: false,
            timer: (t1 - t0) / 1000
          };
        }

        this.setState({
          result: response.result,
          isIncluded: response.isIncluded,
          execTime: response.timer,
          loading: false
        });
      }, 500);
    } else {
      this.setState({
        result: null,
        isIncluded: false,
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
    if (!this.state.isIncluded && !!this.state.result) {
      return (
        <Grid>
          <Row>
            <Col>
              <Text style={{ textAlign: "center" }}>
                This word is not correct. Did you mean,
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <FlatList
                      data={this.state.result}
                      renderItem={({ item }) => (
                        <Text style={{ textAlign: "center" }}>{item.word}</Text>
                      )}
                      keyExtractor={item => item.word}
                    />
                  </Body>
                </CardItem>
              </Card>
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
    } else if (!!this.state.isIncluded) {
      return (
        <Grid>
          <Row>
            <Col>
              <Text style={{ textAlign: "center" }}>
                This word is CORRECT !
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
                  <Label>Word</Label>
                  <Input
                    value={this.state.word}
                    onChangeText={this._handleWord}
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
                  onPress={() => this._handleResult(this.state.word)}
                >
                  <Text> Check </Text>
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
