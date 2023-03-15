import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [colorId, setColorId] = useState(0);
  //array to save the color(color and id in an object) and display
  const [showColor, setShowColor] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);
  const [largestCount, setLargestCount] = useState(0);

  //10 colors
  const color = [
    "lightseagreen",
    "firebrick",
    "lightpink",
    "maroon",
    "cornflowerblue",
    "burlywood",
    "darkslateblue",
    "lightcoral",
    "orange",
    "darksalmon",
  ];

  //function to select random colors
  function selectRandomColor() {
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    return randomIndex;
  }

  //function to determine the assign the color id
  function generateColorId() {
    setColorId(colorId + 1);
  }

  //function to push the color into showColor, take randomColor for random index and colorId to determine key
  function insertColor() {
    const randomColor = selectRandomColor();
    console.log("random color: " + randomColor);
    setShowColor((currentShowColor) => [
      ...currentShowColor,
      {
        colorName: color[randomColor],
        id: colorId,
      },
    ]);
  }

  useEffect(()=>{
   if (currentCount > largestCount || currentCount === largestCount) {
     setLargestCount(currentCount);
   }  
  }, [currentCount]);


  function pushHandler() {
    insertColor();
    generateColorId();
    console.log(showColor);
    console.log("Color length " + showColor.length);
    setCurrentCount(currentCount+1);
  }

  function removeHandler() {
    console.log("Remove color: " + showColor.pop().colorName);
    setShowColor((currentShowColor) => [...currentShowColor]);
    setCurrentCount(currentCount-1);
  }

  function displayAlert(name) {
    Alert.alert("Color", "This is " + name + " color", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.colorContainer}>
        <FlatList
          data={showColor}
          renderItem={(itemData) => {
            itemData.index;
            return (
              //style={{flex: 1, flexDirection: "column"}}
              <View key={itemData.item.key}>
                <Pressable
                  onPress={() => displayAlert(itemData.item.colorName)}
                  style={{
                    flex: 1,
                    backgroundColor: (itemData.item.colorName),
                    justifyContent: "center",
                    paddingHorizontal: "20%",
                    paddingVertical: "5%",
                  }}
                >
                  <View>
                    <Text style={styles.colorText}>
                      {itemData.item.colorName}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
      <View style={styles.counterContainer}>
        <View style={styles.counterSection}>
          <Text style={styles.counterText}>Current: {currentCount} item</Text>
        </View>
        <View style={styles.counterSection}>
          <Text style={styles.counterText}>Largest: {largestCount} item</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonRemove} onPress={removeHandler}>
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
        <Pressable style={styles.buttonPush} onPress={pushHandler}>
          <Text style={styles.buttonText}>Push</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  colorContainer: {
    flex: 10,
    width: "100%",
    paddingTop: "10%",
  },
  counterContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    fontWeight: "bold",
    fontSize: "5%",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#DCFFFD",
  },
  buttonRemove: {
    width: "50%",
    height: "100%",
    backgroundColor: "#DB2763",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPush: {
    width: "50%",
    height: "100%",
    backgroundColor: "#B0DB43",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontStyle: "italic",
  },
  counterSection: {
    flex: 1,
    alignItems: "center",
  },
  counterText: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  colorBox:{
    
  },
  colorText:{
    paddingHorizontal: "20%",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
