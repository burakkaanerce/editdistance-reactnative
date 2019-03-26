import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Table extends React.Component {
  getTextStyle = (a, b, c, d) => {
    var style = { textAlign: "center" };
    if (a === 0 || b === 0) {
      style.fontWeight = "bold";
    }
    if (a === c - 1 && b === d - 1) {
      style.color = "red";
      style.fontWeight = "bold";
    }
    return style;
  };
  renderColumn(td, i, ii, rowLength, columnLength) {
    return (
      <View style={styles.td} key={`${i}-${ii}`}>
        <Text style={this.getTextStyle(i, ii, rowLength, columnLength)}>
          {td}
        </Text>
      </View>
    );
  }
  renderRow(tr, i, rowLength, columnLength) {
    return (
      <View style={styles.tr} key={i}>
        {tr.map((td, ii) => {
          return this.renderColumn(td, i, ii, rowLength, columnLength);
        })}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {this.props.data.map((tr, i) => {
            return this.renderRow(tr, i, this.props.data.length, tr.length);
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tableContainer: {
    marginHorizontal: 100,
    marginBottom: 10,
    alignItems: "center"
  },
  table: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tr: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row"
  },
  td: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0.5
  },
  returnCell: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red"
  }
});
