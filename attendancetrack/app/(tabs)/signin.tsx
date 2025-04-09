// Sign-In 2nd page
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo */}
      {/* <Image source={require("../../assets/images/kmit1.jpg")} style={styles.logo} /> */}

      {/* Title */}
      <Text style={styles.title}>KMIT ANVESHA</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120, 
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    backgroundColor: "#333",
    color: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 15,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  secondButton: {
    backgroundColor: "#555", 
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  secondButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SignInScreen;
