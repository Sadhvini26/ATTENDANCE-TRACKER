import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from "react-native";

type Student = {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  clubs: string;
  points: number;
};

type Faculty = {
  id: string;
  name: string;
  department: string;
  designation: string;
  points: number;
};

const AdminDisciplinaryPoints = () => {
  const [selectedCategory, setSelectedCategory] = useState<"student" | "faculty" | null>(null);
  const [data, setData] = useState<Student[] | Faculty[]>([]);

  const studentData: Student[] = [
    { id: "1", name: "John Doe", rollNo: "1234", class: "10A", clubs: "Science Club", points: 5 },
    { id: "2", name: "Jane Smith", rollNo: "5678", class: "12B", clubs: "Drama Club", points: 8 },
  ];

  const facultyData: Faculty[] = [
    { id: "1", name: "Dr. Alice", department: "Physics", designation: "Professor", points: 3 },
    { id: "2", name: "Mr. Bob", department: "Math", designation: "Lecturer", points: 7 },
  ];

  const handleCategorySelection = (category: "student" | "faculty") => {
    setSelectedCategory(category);
    setData(category === "student" ? studentData : facultyData);
  };

  const handlePointChange = (id: string, newPoints: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, points: parseInt(newPoints) || 0 } : item
      )
    );
  };

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Category</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelection("student")}>
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleCategorySelection("faculty")}>
          <Text style={styles.buttonText}>Faculty</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{selectedCategory === "student" ? "Student" : "Faculty"} Disciplinary Points</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            {"rollNo" in item ? (
              <Text style={styles.cardText}>Roll No: {item.rollNo}</Text>
            ) : (
              <Text style={styles.cardText}>Department: {item.department}</Text>
            )}
            <Text style={styles.cardText}>Points:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.points.toString()}
              onChangeText={(newPoints) => handlePointChange(item.id, newPoints)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
  },
});

export default AdminDisciplinaryPoints;
