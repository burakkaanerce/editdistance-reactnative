import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { MonoText } from "../components/StyledText";
import Table from "../components/Table";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              Edit Distance Finder & Spell Checker
            </Text>

            <View
              style={[styles.codeHighlightContainer, styles.titleDescContainer]}
            >
              <MonoText style={styles.descText}>
                (according to Levenshtein Distance Algorithm)
              </MonoText>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>
              This application is made for measuring the difference between two
              words by{" "}
              <Text style={{ fontWeight: "bold" }}>
                Levenshtein Distance Algorithm
              </Text>{" "}
              and spell checking of the word from a dictionary which contains
              21837 words. You can compare the edit distance between two words
              in <Text style={{ fontWeight: "bold" }}>Distance Finder</Text>{" "}
              page according to Levenshtein Distance.
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>
              <Text style={{ fontWeight: "bold" }}>
                The Levenshtein Distance
              </Text>{" "}
              between two words is the minimum number of single-character edits
              (insertions, deletions or substitutions) required to change one
              word into the other.
            </Text>
          </View>
          <Table
            data={[
              ["", "", "Letter 2"],
              ["", "A", "B"],
              ["Letter 1", "C", "D"]
            ]}
          />
          <View style={styles.mainContainer}>
            <View
              style={[styles.codeHighlightContainer, styles.titleDescContainer]}
            >
              <MonoText style={styles.descText}>
                1.) Letter 1 = Letter 2:
              </MonoText>
            </View>
            <Text style={styles.mainText}>
              If that's the case, D = A, because after the A is calculated,
              since the distance has not changed, so D will be A.
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <View
              style={[styles.codeHighlightContainer, styles.titleDescContainer]}
            >
              <MonoText style={styles.descText}>
                2.) Letter 1 != Letter 2:
              </MonoText>
            </View>
            <Text style={styles.mainText}>
              If that's the case, D = A + 1, because after the A is calculated,
              distance will be increased, so D = A + 1.
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <View
              style={[styles.codeHighlightContainer, styles.titleDescContainer]}
            >
              <MonoText style={styles.descText}>
                3.) Length(Word 1) != Length(Word 2):
              </MonoText>
            </View>
            <Text style={styles.mainText}>
              If that's the case, Letter 1 = null or Letter 2 = null. Thus, the
              algorithm will control which is null. Therefore, 1.) if Letter 1 =
              null: D = B + 1 2.) if Letter 2 = null: D = C + 1
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>
              There are some examples to explain this algorithm:
            </Text>
          </View>
          <Table
            data={[
              ["", "", "K", "I", "T", "T", "E", "N"],
              ["", "0", "1", "2", "3", "4", "5", "6"],
              ["S", "1", "1", "2", "3", "4", "5", "6"],
              ["I", "2", "2", "1", "2", "3", "4", "5"],
              ["T", "3", "3", "2", "1", "2", "3", "4"],
              ["T", "4", "4", "3", "2", "1", "2", "3"],
              ["I", "5", "5", "4", "3", "2", "2", "3"],
              ["N", "6", "6", "5", "4", "3", "3", "2"],
              ["G", "7", "7", "6", "5", "4", "4", "3"]
            ]}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>
              Thus,{" "}
              <Text style={{ fontWeight: "bold" }}>
                lev(sitting, kitten) = 3
              </Text>
            </Text>
          </View>
          <Table
            data={[
              ["", "", "F", "O", "O", "T"],
              ["", "0", "1", "2", "3", "4"],
              ["F", "1", "0", "1", "2", "3"],
              ["O", "2", "1", "0", "1", "2"],
              ["O", "3", "2", "1", "0", "1"],
              ["T", "4", "3", "2", "1", "0"],
              ["B", "5", "4", "3", "2", "1"],
              ["A", "6", "5", "4", "3", "2"],
              ["L", "7", "6", "5", "4", "3"],
              ["L", "8", "7", "6", "5", "4"]
            ]}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>
              Thus,{" "}
              <Text style={{ fontWeight: "bold" }}>
                lev(football, foot) = 4
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  titleContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20
  },
  titleText: {
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  titleDescContainer: {
    marginVertical: 7
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  descText: {
    color: "rgba(96,100,109, 0.8)",
    fontSize: 12
  },
  mainContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    alignItems: "center"
  },
  mainText: {
    fontSize: 14,
    color: "#2e78b7",
    textAlign: "center"
  },
  tableContainer: {
    marginHorizontal: 100,
    marginBottom: 10,
    alignItems: "center"
  },
  table: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row"
  },
  td: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0.5
  }
});
