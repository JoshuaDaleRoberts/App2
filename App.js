import react from 'react';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Switch, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; 

/*todo: make the ui more readable on the web
implement custom verbs
implement positive/negative
implement monosyllabic verbs



*/

const myApp = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  //sets three things, isEnabled is a variable that can be referenced and setIsEnabled is a function that replaces isEnabled with its value. The useState sets the initial value of isEnabled, which is, in this state, false. 
  const toggleSwitch = () => setIsEnabled(a => !a);
  //Declares toggleSwitch as a function which toggles the value of isEnabled. Doing it through setIsEnabled updates the react virtual DOM
  const [subjectIndex, setSubjectIndex] = useState(0)
  const [tenseIndex, setTenseIndex] = useState(0);
  const [verbText, setVerbText] = useState("Verb will go here")

  //initializes state change for verb output
  const [verb, onChangeText] = React.useState('tembea');
  //initializes state change for verb text input wait what the fuck
  //initializing values, reset with the selectors, to be used in the conjugateVerb() function. 
  function conjugateVerb(){
    const posSubjectArray = ["ni","u","a","tu","m","wa"]
    const negSubjectArray = ["si", "hu","ha","hatu","ham","hawa"]
    const posTenseArray = ["na","li","ta","me"]
    const negTenseArray = ["","ku","ta","ja"]
    let running = ""
    let endsWithA = false
    if (verb.charAt(verb.length - 1) === 'a'){ endsWithA = true}
    if(!isEnabled){
      //console.log("POSITIVE")
      let subjectToUse = posSubjectArray[subjectIndex]
      let tenseToUse = posTenseArray[tenseIndex];
      running += subjectToUse + tenseToUse + verb
      setVerbText(running)
    } else {
      //console.log('NEGATIVE')
      let subjectToUse = negSubjectArray[subjectIndex];
      let tenseToUse = negTenseArray[tenseIndex];
      let tempVerb = verb; 
      if (endsWithA && tenseIndex === 0) {
        tempVerb = tempVerb.substring(0, verb.length-1) + "i"; 
      }
      running += subjectToUse + tenseToUse + tempVerb
      }
    setVerbText(running)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Swahili Verb Conjugator</Text>
      <View>
        <View style={styles.inline}>
          <Text>Subject:</Text>
          <Dropdown
            onChange = {(item) => {setSubjectIndex(item.value)}}
            data = {[
              {label:"Mimi", value:0},
              {label:"Wewe", value:1},
              {label:"Yeye", value:2},
              {label:"Sisi",value:3},
              {label:"Ninyi",value:4},
              {label:"Wao",value:5}
            ]}
            labelField="label"
            valueField="value"
            value={subjectIndex}
          />
        </View>
        <View style={styles.inline}>
          <Text>Tense:</Text>
          <Dropdown
            onChange={(item) => {setTenseIndex(item.value);}}
            data={[
              {label: "Present", value:0},
              {label:"Past",value:1},
              {label:"Future",value:2},
              {label:"Past Perfect", value:3}
            ]}
            labelField="label"
            valueField="value"
            value={tenseIndex}
          />
        </View>
          <View style = {styles.inline}>
            <Text>Positive</Text>
            <Switch 
              onValueChange={toggleSwitch} 
              value={isEnabled}/>
            <Text>Negative</Text>
          </View>
        <View style={styles.inline}>
          <Text>Verb:</Text>
          <TextInput
            style={styles.textBox}
            
            onChangeText={onChangeText}
            value={verb}
            placeholder="kula"
          />
        </View>
        </View>
      <View>
        <Text>{verbText}</Text>
        <Pressable style={styles.button}>
          <Text onPress={conjugateVerb}>Conjugate!</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default myApp; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: "blue",
  },
  inline: {
    flexDirection: 'row',
    borderColor: 'purple',
    borderWidth: "3px",
    borderRadius: '5px',
    padding: 6,
    alignItems: 'center'
  },
  textBox: {
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'lightgrey',  
    borderColor: 'black',
    borderRadius: '5px',
    alignItems: 'center',
    padding: 10
  }

});

