import React, { useEffect } from "react";
import { Title, Card, Paragraph } from "react-native-paper";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Resources({ navigation, route }) {
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ title: "Resources", headerRight: null });
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Exploratory & Pre-Major Advising</Title>
            <Paragraph style={styles.paragraph}>
              Email ID: bdadvising@psu.edu
            </Paragraph>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6164</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Location:125 Reed Union Building (Second Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card1}>
            <Title style={styles.title}>Behrend Peer Tutoring</Title>
            <Paragraph style={styles.paragraph}>
              Email ID: dtutoring@psu.edu
            </Paragraph>
            <Paragraph style={styles.paragraph}>814-898-6164</Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              203 John M. Lilley Library (Second Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card2}>
            <Title style={styles.title}>Personal Counseling Office</Title>
            <Paragraph style={styles.paragraph}>
              Email ID: dtutoring@psu.edu
            </Paragraph>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6504</Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              1 Reed Union Building (First Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card3}>
            <Title style={styles.title}>Student Disability Resources</Title>
            <Paragraph style={styles.paragraph}>
              Email ID: DiversityBehrend@psu.edu
            </Paragraph>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6504</Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              1 Reed Union Building (First Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card4}>
            <Title style={styles.title}>
              Campus Health and Wellness Center
            </Title>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6217</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Carriage House/Burke 110
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card5}>
            <Title style={styles.title}>International Student Advising</Title>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6031</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>Perry Hall, Floor 1</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card6}>
            <Title style={styles.title}> Student Conduct</Title>
            <Paragraph style={styles.paragraph}>Phone:814-898-6111</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              155 Reed Union Building (Second Floor)
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6ec",
    flex: 1,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  card1: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  card2: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  card3: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  card4: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  card5: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  card6: {
    backgroundColor: "#3B71F3",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  title: {
    color: "#fff",
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
  },
});
