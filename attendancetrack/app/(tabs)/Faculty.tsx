import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StudentDetails from './StudentDetails'
import TakeAttendance from './TakeAttendance';
import Timetable from './Timetable';
import DisciplinaryPoints from './DisciplinaryPoints';
const FacultyDashboard = ({ }) => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [facultyName, setFacultyName] = useState('FACULTY NAME');
  
  // Simulating font loading
  useEffect(() => {
    // In a real implementation, you would load your custom fonts here
    const timer = setTimeout(() => {
      setFontsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* White card with faculty info and quick links */}
      <View style={styles.facultyCard}>
        <View style={styles.facultyInfoRow}>
          <View style={styles.facultyAvatarContainer}>
            <Icon name="person-outline" size={30} color="black" />
          </View>
          <Text style={styles.facultyNameText}>
            {facultyName}
          </Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        {/* Quick action buttons */}
        <View style={styles.quickActionsContainer}>
          {/* <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="people-outline" size={24} color="black" />
            <Text style={styles.quickActionText}>Attendance</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('FacultyPermissions')}
          >
            <FontAwesome name="file-text-o" size={24} color="black" />
            <Text style={styles.quickActionText}>Permissions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="time-outline" size={24} color="black" />
            
            
            <Pressable onPress={() => navigation.navigate('Timetable')}>
            <Text style={styles.quickActionText}>Time Table</Text>
    </Pressable>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="settings-outline" size={24} color="black" />
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Dashboard Menu */}
      <Text style={styles.dashboardTitle}>Dashboard</Text>
      <View style={styles.menuGrid}>
        {/* Row 1 */}
        <View style={styles.menuRow}>
        <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('NoticeBoard')}
          >
            <Icon name="chatbubble-ellipses-outline" size={28} color="black" />
            <Text style={styles.menuItemText}>Notice Board</Text>
          </TouchableOpacity>

          
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="people-outline" size={28} color="black" />
            <Pressable onPress={() => navigation.navigate('StudentDetails')}>
            <Text style={styles.menuItemText}>Student Details</Text>
    </Pressable>
            
          </TouchableOpacity>
        </View>
        
        {/* Row 2 */}
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="calendar-check-outline" size={28} color="black" />
            <Pressable onPress={() => navigation.navigate('TakeAttendance')}>
      <Text style={styles.menuItemText}>Manage Attendance</Text>
    </Pressable>
          </TouchableOpacity>
          
          <TouchableOpacity 
  style={styles.menuItem}
  onPress={() => navigation.navigate('DisciplinaryPoints')}
>
  <FontAwesome name="exclamation-circle" size={28} color="black" />
  <Text style={styles.menuItemText}>Disciplinary points</Text>
</TouchableOpacity>
        </View>
        
        {/* Row 3 */}
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="phone" size={28} color="black" />
            <Text style={styles.menuItemText}>Contact KMIT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="log-out" size={28} color="black" />
            <Text style={styles.menuItemText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  facultyCard: {
    paddingTop: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  facultyInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  facultyAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  facultyNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  notificationButton: {
    padding: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    backgroundColor: '#000',
  },
  menuGrid: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FacultyDashboard;