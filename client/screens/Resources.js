import React, { useEffect } from "react";
import { Title, Card, Paragraph } from "react-native-paper";
import { SafeAreaView, ScrollView, StyleSheet, Linking, Text, View} from "react-native";
import contactInfo from "./contactInfo.json"
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
              <Title style={styles.title}>{"Penn State Starfish"}</Title>
              <Paragraph
                onPress={() =>
                  Linking.openURL("record.infoLink")
                }
                target="_blank"
                style={styles.paragraph}
              >
             
             <Text style={styles.underline}>{"Penn State Starfish Information"}</Text>
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
               <Text style={styles.underline}>{"Log into Starfish"}</Text> 
              </Paragraph>
              {/* <Paragraph
                onPress={() =>
                  Linking.openURL(
                    record.faqLink
                  )
                }
                target="_blank"
                style={styles.paragraph}
              >
                 <Text style={styles.underline}>{record.faq}</Text> 
              </Paragraph> */}
              <Paragraph
             
             >

             </Paragraph>
 


             
            </Card.Content>
          </Card>
      {
        contactInfo.map( record => {
          return(
            
           
<Card style={styles.card}>
            <Card.Content style={styles.cardContainer}>
              <Title style={styles.title}>{record.title}</Title>
              <Paragraph
                onPress={() =>
                  Linking.openURL(record.infoLink)
                }
                target="_blank"
                style={styles.paragraph}
              >
             
             <Text style={styles.underline}>{record.info}</Text>
              </Paragraph>
              <Paragraph
                onPress={() =>
                  Linking.openURL(
                    record.loginLink
                  )
                }
                target="_blank"
                style={styles.paragraph}
              >
               <Text style={styles.underline}>{record.login}</Text> 
              </Paragraph>
              {/* <Paragraph
                onPress={() =>
                  Linking.openURL(
                    record.faqLink
                  )
                }
                target="_blank"
                style={styles.paragraph}
              >
                 <Text style={styles.underline}>{record.faq}</Text> 
              </Paragraph> */}
              <Paragraph
             
             >
              {record.contactUs  && <Title style={styles.contact}>{record.contactUs}</Title>}

             </Paragraph>
              <Paragraph
              onPress={() => Linking.openURL(record.emailLink)}
              target="_blank"
              style={styles.paragraph}
            >
            <Text style={styles.underline}>{record.email}</Text>  
            </Paragraph>
            <Paragraph
              onPress={() => Linking.openURL(record.phoneLink)}
              target="_blank"
              style={styles.paragraph}
            >
               <Text style={styles.underline}>{record.phone}</Text> 
            </Paragraph>
            <Paragraph
             
             >
             <Title style={styles.paragraph}>{record.hours}</Title> 
             </Paragraph>
             <Paragraph
              onPress={() =>
                Linking.openURL(
                  record.addressLink
                )
              }
              target="_blank"
              style={styles.paragraph}
            >
             <Text style={styles.underline}>{record.address}</Text> 
            </Paragraph>
             
            </Card.Content>
          </Card>
          )
        })
      }
     
      
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
    fontSize: 23,
    
  },
  
  paragraph: {
    color: "#fff",
    fontSize: 18,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
