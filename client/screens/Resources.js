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
          <Card.Content style={styles.card1}>
            <Title style={styles.title}>Penn State Starfish</Title>
            <Paragraph href = "https://sites.psu.edu/starfishinfo/" target = "_blank" style={styles.paragraph}>
              PennState Starfish Information
            </Paragraph>
            <Paragraph href = "https://psu.starfishsolutions.com/starfish-ops/instructor/index.html?tenantId=9045" target = "_blank" style={styles.paragraph}>
              Log into Starfish
            </Paragraph>
            <Paragraph href = "https://sites.psu.edu/starfishinfo/resources/faq/" target = "_blank" style={styles.paragraph}>
              FAQ's about Penn State Starfish
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Exploratory & Pre-Major Advising</Title>
            <Paragraph href = "https://behrend.psu.edu/academics/academic-services/academic-advising" target = "_blank" style={styles.paragraph}>
              Exploratory & Pre-Major Advising Information
            </Paragraph>
            <Paragraph href = "mailto:bdadvising@psu.edu" target = "_blank" style={styles.paragraph}>
              Email ID: bdadvising@psu.edu
            </Paragraph>
            <Paragraph href = "tel:8148986164" target = "_blank" style={styles.paragraph}>
              Phone Number: 814-898-6164
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Office: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058" target = "_blank" style={styles.paragraph}>
              125 Reed Union Building (Second Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Behrend Peer Tutoring</Title>
            <Paragraph href = "https://behrend.psu.edu/academics/academic-services/learning-resource-center-lrc/tutoring" target = "_blank" style={styles.paragraph}>
              Behrend Peer Tutoring Information
            </Paragraph>
            <Paragraph href = "mailto:bdtutor@psu.edu" target = "_blank" style={styles.paragraph}>
              Email ID: bdtutor@psu.edu
            </Paragraph>
            <Paragraph href = "tel:8148986164" target = "_blank" style={styles.paragraph}>
              Phone Number: 814-898-6164
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/4951+Behrend+College+Dr,+Erie,+PA+16563/@42.1205434,-79.9836427,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8dd0228c81:0x3106e6b4e06889e!8m2!3d42.1205434!4d-79.981454" target = "_blank" style={styles.paragraph}>
              203 John M. Lilley Library (Second Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Personal Counseling Office</Title>
            <Paragraph href = "https://behrend.psu.edu/student-life/student-services/personal-counseling" target = "_blank" style={styles.paragraph}>
              Personal Counseling Information
            </Paragraph>
            <Paragraph href = "tel:8144562014" target = "_blank" style={styles.paragraph}>
              Crisis Services 
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058" target = "_blank"style={styles.paragraph}>
              1 Reed Union Building (First Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>Student Disability Resources</Title>
            <Paragraph href = "https://behrend.psu.edu/student-life/educational-equity-and-diversity/services-for-students-with-disabilities-and-learning-differences" target = "_blank" style={styles.paragraph}>
              Student Disability Resource Information
            </Paragraph>
            <Paragraph href = "mailto:DiversityBehrend@psu.edu" target = "_blank" style={styles.paragraph}>
              Email ID: DiversityBehrend@psu.edu
            </Paragraph>
            <Paragraph href = "tel:8148987101" target = "_blank" style={styles.paragraph}>
              Phone Number: 814-898-7101
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Monday-Friday, 8:00am-5:00pm. (appointments preferred)
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/4701+College+Dr,+Erie,+PA+16563/@42.118164,-79.9847945,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d8c7199e73f:0xc33eaf4e579dd477!8m2!3d42.118164!4d-79.9826058" target = "_blank" style={styles.paragraph}>
              1 Reed Union Building (First Floor)
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title  style={styles.title}> Campus Health and Wellness Center </Title>
            <Paragraph href = "https://behrend.psu.edu/student-life/student-services/health" target = "_blank" style={styles.paragraph}>
              Campus Health and Wellness Center Information
            </Paragraph>
            <Paragraph style={styles.paragraph}>Phone: 814-898-6217</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/Burke+Center/@42.1188193,-79.9820322,17z/data=!3m1!4b1!4m5!3m4!1s0x882d7d5dcb17d6e5:0xc5c93bc7744d495b!8m2!3d42.1188193!4d-79.9798435" target = "_blank" style={styles.paragraph}>
              Carriage House/Burke 110
            </Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}>International Student Advising</Title>
            <Paragraph href = " https://behrend.psu.edu/student-life/educational-equity-and-diversity/international-students" target = "_blank" style={styles.paragraph}>
              International Student Advising Information
            </Paragraph>
            <Paragraph href = "tel:8148986031" target = "_blank" style={styles.paragraph}>Phone: 814-898-6031</Paragraph>
            <Paragraph style={styles.paragraph}>
              Office Hours: Monday-Friday, 8:00am-5:00pm
            </Paragraph>
            <Paragraph href = "https://www.google.com/maps/place/Penn+State+Behrend/@42.1180177,-79.9862938,17z/data=!4m10!1m2!2m1!1sPerry+Hall+Behrend!3m6!1s0x882d7d921e0a23a3:0x1c048d8c1b62fafd!8m2!3d42.1198964!4d-79.9827376!15sChJQZXJyeSBIYWxsIEJlaHJlbmRaFCIScGVycnkgaGFsbCBiZWhyZW5kkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSNVoweFlkV2hCUlJBQuABAA!16s%2Fg%2F113dl389w" target = "_blank" style={styles.paragraph}>Perry Hall, Floor 1</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content style={styles.card}>
            <Title style={styles.title}> Student Conduct</Title>
            <Paragraph href = "https://behrend.psu.edu/student-life/student-affairs" target = "_blank" style={styles.paragraph}>
              Student Affairs Information
            </Paragraph>
            <Paragraph href = "8148986111" target = "_blank" style={styles.paragraph}>Phone:814-898-6111</Paragraph>
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
    
  },
  title: {
    color: "#fff",
  },
  paragraph: {
    color: "#fff",
    fontSize: 16,
  },
});
