import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Switch, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; 

//todo: import more and use more to make the entire dom green.
const myApp = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  //sets three things, isEnabled is a variable that can be referenced and setIsEnabled is a function that replaces isEnabled with its value. The useState sets the initial value of isEnabled, which is, in this state, false. 
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //Declares toggleSwitch as a function which toggles the value of isEnabled. Doing it through setIsEnabled updates the react virtual DOM
  const [verbText, setVerbText] = useState("Verb will go here")
  // initializes state for verb text? Idek. 
  let subjectIndex = 0;
  let tenseIndex = 0;
  let verb = "tembea";
  //initializing values, reset with the selectors, to be used in the conjugateVerb() function. 
  function conjugateVerb(){
    const subjectArray = ["ni","u","a","tu","m","wa"]
    let subjectToUse = subjectArray[subjectIndex]
    const tenseArray = ["na","li","ta","me"]
    let tenseToUse = tenseArray[tenseIndex];
    let running = subjectToUse
    running += tenseToUse;
    running += verb;
    setVerbText(running)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Swahili Verb Conjugator</Text>
      <View>
        <Dropdown
          onChange = {(item) => {
            console.log(item.value)
            subjectIndex = item.value
          }}
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
        />
        <Dropdown
          onChange={(item) => {
            console.log(item.value)
            tenseIndex = item.value; 
          }}
          data={[
            {label: "Present", value:0},
            {label:"Past",value:1},
            {label:"Future",value:2},
            {label:"Past Perfect", value:3}
          ]}
          labelField="label"
          valueField="value"
        />
          <View style = {styles.inline}>
            <Text>Positive</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled}/>
            <Text>Negative</Text>
          </View>
        <View style={styles.inline}>
          <Text>Verb: </Text>
          <TextInput/>
        </View>
        </View>
      <View>
        <Text>{verbText}</Text>
        <Pressable>
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
  }

});

