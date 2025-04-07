import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const FacultyDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [notifications, setNotifications] = useState(2);
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'Aditya Sharma', reason: 'Medical Leave (3 days)', status: 'Pending', date: '03 Apr 2025' },
    { id: 2, name: 'Priya Mehta', reason: 'Family Emergency', status: 'Pending', date: '02 Apr 2025' },
    { id: 3, name: 'Rahul Verma', reason: 'Technical Competition', status: 'Approved', date: '01 Apr 2025' }
  ]);
  
  // Sample timetable data
  const timetableData = [
    { id: 1, day: 'Monday', classes: [
      { time: '9:00 - 10:30', subject: 'Data Structures', room: 'Room 301', section: 'CSE-A' },
      { time: '10:45 - 12:15', subject: 'Algorithms', room: 'Room 302', section: 'CSE-B' },
      { time: '1:30 - 3:00', subject: 'Programming Lab', room: 'Lab 103', section: 'CSE-C' }
    ]},
    { id: 2, day: 'Tuesday', classes: [
      { time: '9:00 - 10:30', subject: 'Database Systems', room: 'Room 303', section: 'CSE-D' },
      { time: '10:45 - 12:15', subject: 'Web Development', room: 'Lab 104', section: 'CSE-A' }
    ]},
    { id: 3, day: 'Wednesday', classes: [
      { time: '9:00 - 10:30', subject: 'Operating Systems', room: 'Room 305', section: 'CSE-B' },
      { time: '10:45 - 12:15', subject: 'Computer Networks', room: 'Room 306', section: 'CSE-C' },
      { time: '1:30 - 3:00', subject: 'Programming Lab', room: 'Lab 103', section: 'CSE-D' }
    ]},
    { id: 4, day: 'Thursday', classes: [
      { time: '9:00 - 10:30', subject: 'Software Engineering', room: 'Room 307', section: 'CSE-A' },
      { time: '10:45 - 12:15', subject: 'AI Foundations', room: 'Room 308', section: 'CSE-B' }
    ]},
    { id: 5, day: 'Friday', classes: [
      { time: '9:00 - 10:30', subject: 'Mobile App Development', room: 'Lab 105', section: 'CSE-C' },
      { time: '10:45 - 12:15', subject: 'Cloud Computing', room: 'Room 309', section: 'CSE-D' },
      { time: '1:30 - 3:00', subject: 'Project Mentoring', room: 'Conference Room', section: 'All Sections' }
    ]}
  ];
  
  // Current day statistics
  const todayStats = {
    day: 'Wednesday',
    classes: 3,
    present: 42,
    absent: 5,
    attendancePercentage: 89
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePermission = (id, status) => {
    setPermissions(permissions.map(p => p.id === id ? { ...p, status } : p));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Faculty Dashboard...</Text>
      </View>
    );
  }

  const renderTimetableItem = ({ item }) => (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayText}>{item.day}</Text>
        <Text style={styles.classCountText}>{item.classes.length} Classes</Text>
      </View>
      {item.classes.map((classItem, index) => (
        <View key={index} style={styles.classItem}>
          <View style={styles.timeContainer}>
            <FontAwesome5 name="clock" size={14} color="#007AFF" />
            <Text style={styles.timeText}>{classItem.time}</Text>
          </View>
          <View style={styles.classContent}>
            <Text style={styles.subjectText}>{classItem.subject}</Text>
            <View style={styles.classDetails}>
              <View style={styles.detailItem}>
                <FontAwesome5 name="map-marker-alt" size={12} color="#666" />
                <Text style={styles.detailText}>{classItem.room}</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome5 name="users" size={12} color="#666" />
                <Text style={styles.detailText}>{classItem.section}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPermissionItem = ({ item }) => (
    <View style={[styles.permissionItem, 
      item.status === 'Approved' ? styles.approvedItem : 
      item.status === 'Rejected' ? styles.rejectedItem : styles.pendingItem
    ]}>
      <View style={styles.permissionHeader}>
        <Text style={styles.permissionName}>{item.name}</Text>
        <Text style={styles.permissionDate}>{item.date}</Text>
      </View>
      <Text style={styles.permissionReason}>{item.reason}</Text>
      
      {item.status === 'Pending' ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.approveButton} 
            onPress={() => handlePermission(item.id, 'Approved')}
          >
            <FontAwesome5 name="check" size={14} color="white" />
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.rejectButton} 
            onPress={() => handlePermission(item.id, 'Rejected')}
          >
            <FontAwesome5 name="times" size={14} color="white" />
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statusContainer}>
          <FontAwesome5 
            name={item.status === 'Approved' ? "check-circle" : "times-circle"} 
            size={14} 
            color={item.status === 'Approved' ? "#28a745" : "#dc3545"} 
          />
          <Text style={[
            styles.statusText, 
            item.status === 'Approved' ? styles.approvedText : styles.rejectedText
          ]}>
            {item.status}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* Header */}
      <LinearGradient
        colors={['#007AFF', '#0055CC']}
        style={styles.header}
      >
        <View style={styles.facultyInfoRow}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <FontAwesome5
                name="user-tie"
                size={22}
                color="#FFF"
              />
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.facultyNameText}>Dr. Sharma</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="white" />
            {notifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Today's Summary */}
        <View style={styles.todaySummary}>
          <Text style={styles.todayTitle}>Today • {todayStats.day}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{todayStats.classes}</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{todayStats.attendancePercentage}%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{todayStats.present}</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={[styles.quickActionButton, selectedOption === 'Time Table' && styles.selectedOption]} 
            onPress={() => setSelectedOption('Time Table')}
          >
            <FontAwesome name="calendar" size={20} color="white" />
            <Text style={styles.quickActionText}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickActionButton, selectedOption === 'Permissions' && styles.selectedOption]} 
            onPress={() => setSelectedOption('Permissions')}
          >
            <FontAwesome name="file-text-o" size={20} color="white" />
            <Text style={styles.quickActionText}>Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickActionButton, selectedOption === null && styles.selectedOption]} 
            onPress={() => setSelectedOption(null)}
          >
            <FontAwesome name="th-large" size={20} color="white" />
            <Text style={styles.quickActionText}>Dashboard</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Conditional Rendering for Sections */}
      {selectedOption === 'Time Table' && (
        <FlatList
          data={timetableData}
          renderItem={renderTimetableItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {selectedOption === 'Permissions' && (
        <View style={styles.permissionsContainer}>
          <Text style={styles.sectionTitle}>Student Permissions</Text>
          <FlatList
            data={permissions}
            renderItem={renderPermissionItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.permissionsList}
          />
        </View>
      )}

      {!selectedOption && (
        <ScrollView style={styles.dashboardContent}>
          {/* Main Dashboard Options */}
          <View style={styles.menuGrid}>
            <View style={styles.menuRow}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#E3F2FD' }]}>
                  <FontAwesome5 name="clipboard-list" size={22} color="#1976D2" />
                </View>
                <Text style={styles.menuItemText}>Take Attendance</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#F3E5F5' }]}>
                  <FontAwesome5 name="user-graduate" size={22} color="#8E24AA" />
                </View>
                <Text style={styles.menuItemText}>Student Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuRow}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#E8F5E9' }]}>
                  <FontAwesome5 name="chart-bar" size={22} color="#388E3C" />
                </View>
                <Text style={styles.menuItemText}>Performance Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#FFF3E0' }]}>
                  <FontAwesome5 name="exclamation-triangle" size={22} color="#F57C00" />
                </View>
                <Text style={styles.menuItemText}>Disciplinary Points</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuRow}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#E0F7FA' }]}>
                  <FontAwesome5 name="bullhorn" size={22} color="#00ACC1" />
                </View>
                <Text style={styles.menuItemText}>Notice Board</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#FBE9E7' }]}>
                  <FontAwesome5 name="comments" size={22} color="#D84315" />
                </View>
                <Text style={styles.menuItemText}>Student Feedback</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuRow}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#F9FBE7' }]}>
                  <FontAwesome5 name="phone-alt" size={22} color="#827717" />
                </View>
                <Text style={styles.menuItemText}>Contact KMIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconContainer, { backgroundColor: '#EFEBE9' }]}>
                  <FontAwesome5 name="cog" size={22} color="#5D4037" />
                </View>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    paddingBottom: 10,
    elevation: 4,
  },
  facultyInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  facultyNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  todaySummary: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  todayTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 5,
    paddingTop: 5,
  },
  quickActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  quickActionText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  contentContainer: {
    padding: 15,
  },
  permissionsContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  permissionsList: {
    paddingBottom: 20,
  },
  dashboardContent: {
    flex: 1,
  },
  menuGrid: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '48%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  // Time Table Styles
  dayContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  classCountText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  classItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  classContent: {
    flex: 1,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  // Permission Styles
  permissionItem: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pendingItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  approvedItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  rejectedItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  permissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  permissionName: {
    fontSize: 15,
    fontWeight: '600',
  },
  permissionDate: {
    fontSize: 12,
    color: '#666',
  },
  permissionReason: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  approveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 5,
  },
  approvedText: {
    color: '#28a745',
  },
  rejectedText: {
    color: '#dc3545',
  },
});

export default FacultyDashboard;