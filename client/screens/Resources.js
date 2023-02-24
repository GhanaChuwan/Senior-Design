import React, { useEffect } from "react";
import { Title, Card, Paragraph } from "react-native-paper";
import { SafeAreaView, ScrollView, StyleSheet, Linking, Text, View} from "react-native";

export default function Resources({ navigation, route }) {
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ title: "Resources", headerRight: null });
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>Penn State Starfish</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL("https://sites.psu.edu/starfishinfo/")
              }
              target="_blank"
              style={styles.paragraph}
            >
           <Text style={styles.underline}>PennState Starfish Information</Text>
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://psu.starfishsolutions.com/starfish-ops/instructor/index.html?tenantId=9045"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
             <Text style={styles.underline}>Log into Starfish</Text> 
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://sites.psu.edu/starfishinfo/resources/faq/"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
               <Text style={styles.underline}>FAQ's about Penn State Starfish</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>Exploratory & Pre-Major Advising</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/academics/academic-services/academic-advising"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>Exploratory & Pre-Major Advising Information</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("mailto:bdadvising@psu.edu")}
              target="_blank"
              style={styles.paragraph}
            >
            Email:  <Text style={styles.underline}>bdadvising@psu.edu</Text>  
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8148986164")}
              target="_blank"
              style={styles.paragraph}
            >
               Phone Number: <Text style={styles.underline}>814-898-6164</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Office: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>125 Reed Union Building (Second Floor)</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>Behrend Peer Tutoring</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/academics/academic-services/learning-resource-center-lrc/tutoring"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
             <Text style={styles.underline}>Behrend Peer Tutoring Information</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("mailto:bdtutor@psu.edu")}
              target="_blank"
              style={styles.paragraph}
            >
              Email: <Text style={styles.underline}>bdtutor@psu.edu</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8148986164")}
              target="_blank"
              style={styles.paragraph}
            >
              Phone Number: <Text style={styles.underline}>814-898-6164</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/4951+Behrend+College+Dr,+Erie,+PA+16563/@42.1205434,-79.9836427,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8dd0228c81:0x3106e6b4e06889e!8m2!3d42.1205434!4d-79.981454"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
             <Text style={styles.underline}> 203 John M. Lilley Library (Second Floor)</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>Personal Counseling Office</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/student-life/student-services/personal-counseling"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
               <Text style={styles.underline}>Personal Counseling Information</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8144562014")}
              target="_blank"
              style={styles.paragraph}
            >
              Phone Number:<Text style={styles.underline}> 814-456-2014</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
               <Text style={styles.underline}>1 Reed Union Building (First Floor)</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>Student Disability Resources</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/student-life/educational-equity-and-diversity/services-for-students-with-disabilities-and-learning-differences"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>Student Disability Resource Information</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("mailto:DiversityBehrend@psu.edu")}
              target="_blank"
              style={styles.paragraph}
            >
              Email: <Text style={styles.underline}>DiversityBehrend@psu.edu</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8148987101")}
              target="_blank"
              style={styles.paragraph}
            >
              Phone Number:<Text style={styles.underline}> 814-898-7101</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>1 Reed Union Building (First Floor)</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>
             
            Campus Health and Wellness Center
            </Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/student-life/student-services/health"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
               <Text style={styles.underline}>Campus Health and Wellness Center Information</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
            Phone Number: <Text style={styles.underline}>814-898-6217</Text> 
              </Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/Burke+Center/@42.1188193,-79.9820322,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d5dcb17d6e5:0xc5c93bc7744d495b!8m2!3d42.1188193!4d-79.9798435"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
             <Text style={styles.underline}>Carriage House/Burke 110</Text>  
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}>International Student Advising</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/student-life/educational-equity-and-diversity/international-students"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>International Student Advising Information</Text>  
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8148986031")}
              target="_blank"
              style={styles.paragraph}
            >
              Phone Number: <Text style={styles.underline}>814-898-6031</Text>  
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/Penn+State+Behrend/@42.1180177,-79.9862938,17z/data=!4m10!1m2!2m1!1sPerry+Hall+Behrend!3m6!1s0x882d7d921e0a23a3:0x1c048d8c1b62fafd!8m2!3d42.1198964!4d-79.9827376!15sChJQZXJyeSBIYWxsIEJlaHJlbmRaFCIScGVycnkgaGFsbCBiZWhyZW5kkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSNVoweFlkV2hCUlJBQuABAA!16s%2Fg%2F113dl389w"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
              <Text style={styles.underline}>Perry Hall, Floor 1</Text> 
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <Title style={styles.title}> Student Conduct</Title>
            <Paragraph
              onPress={() =>
                Linking.openURL(
                  "https://behrend.psu.edu/student-life/student-affairs"
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
                <Text style={styles.underline}>Student Affairs Information</Text> 
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL("tel:8148986111")}
              target="_blank"
              style={styles.paragraph}
            >
              Phone Number:<Text style={styles.underline}> 814-898-6111</Text> 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph style={styles.paragraph}>
            <Text style={styles.underline}>155 Reed Union Building (Second Floor)</Text> 
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
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: "#3B71F3",
    marginVertical: 5,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
  },
  title: {
    color: "#fff",
    
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
