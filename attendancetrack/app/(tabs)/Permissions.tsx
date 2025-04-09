// Admin -> Permissions
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";

interface LeaveRequest {
  id: string;
  name: string;
  role: "student" | "faculty";
  reason: string;
  letter: string;
  status: "new" | "approved" | "rejected";
}

const sampleRequests: LeaveRequest[] = [
  { id: "1", name: "Bhargavi", role: "student", reason: "Medical", letter: "I am not feeling well due to high fever. So, please grant me half day leave.", status: "new" },
  { id: "2", name: "Mrs K.Anandi", role: "faculty", reason: "Conference", letter: "I have to attend a seminar organized by a big tech company.", status: "new" },
  { id: "3", name: "Sadhvini", role: "student", reason: "Conference", letter: "I have to attend a seminar...", status: "new" },
];

const Permissions = () => {
  const [activeTab, setActiveTab] = useState<"student" | "faculty">("student");
  const [statusFilter, setStatusFilter] = useState<"new" | "approved" | "rejected">("new");
  const [requests, setRequests] = useState<LeaveRequest[]>(sampleRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // Handle leave decision
  const handleDecision = (id: string, decision: "approved" | "rejected") => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
    setSelectedRequest(null);
  };

  // Refresh function to update the list
  const refreshList = () => {
    setRequests([...requests]);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Permissions</Text>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "student" && styles.activeTab]}
          onPress={() => setActiveTab("student")}
        >
          <Text style={[styles.tabText, activeTab === "student" && styles.activeTabText]}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "faculty" && styles.activeTab]}
          onPress={() => setActiveTab("faculty")}
        >
          <Text style={[styles.tabText, activeTab === "faculty" && styles.activeTabText]}>Faculty</Text>
        </TouchableOpacity>
      </View>

      {/* Status Filter Buttons */}
      <View style={styles.filterContainer}>
        {["new", "approved", "rejected"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, statusFilter === status && styles.activeFilter]}
            onPress={() => setStatusFilter(status as "new" | "approved" | "rejected")}
          >
            <Text style={[styles.filterText, statusFilter === status && styles.activeFilterText]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshList}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      {/* Requests List */}
      <FlatList
        data={requests.filter((req) => req.role === activeTab && req.status === statusFilter)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.requestCard} onPress={() => setSelectedRequest(item)}>
            <Text style={styles.requestName}>{item.name}</Text>
            <Text style={styles.requestReason}>{item.reason}</Text>
            <Text style={[styles.requestStatus, styles[item.status]]}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noRequests}>No {statusFilter} requests</Text>}
      />

      {/* Modal for Leave Letter */}
      <Modal visible={!!selectedRequest} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRequest && (
              <>
                <Text style={styles.modalTitle}>{selectedRequest.name}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Reason:</Text> {selectedRequest.reason}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Letter:</Text> {selectedRequest.letter}</Text>

                {/* Approve/Reject Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.approveButton} onPress={() => handleDecision(selectedRequest.id, "approved")}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.rejectButton} onPress={() => handleDecision(selectedRequest.id, "rejected")}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedRequest(null)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8f8f8" 
},
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 30,
    marginBottom: 30, 
    textAlign: 'center'
},
  tabContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 15 
},
  tab: { 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 20, 
    backgroundColor: "#ddd" 
},
  activeTab: { 
    backgroundColor: "#000000" 
},
  tabText: { 
    fontSize: 16, 
    color: "#333" 
},
  activeTabText: { 
    color: "#fff", 
    fontWeight: "bold" 
},
  filterContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 15 
},
  filterButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 15, 
    backgroundColor: "#ddd" 
},
  activeFilter: { 
    backgroundColor: "#000000" 
},
  filterText: { 
    fontSize: 14, 
    color: "#333" 
},
  activeFilterText: { 
    color: "#fff", 
    fontWeight: "bold" 
},

  refreshButton: { 
    backgroundColor: "#000000", 
    padding: 10, 
    borderRadius: 10, 
    alignItems: "center", 
    marginBottom: 10 
},
  refreshButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
},
  requestCard: { 
    backgroundColor: "#fff", 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 10, 
    elevation: 3 
},
  requestName: { 
    fontSize: 18, 
    fontWeight: "bold" 
},
  requestReason: { fontSize: 14, color: "#666" },
  requestStatus: { fontSize: 12, fontWeight: "bold", textAlign: "right" },
  new: { color: "#ff9800" },
  approved: { color: "#28a745" },
  rejected: { color: "#dc3545" },
  noRequests: { textAlign: "center", color: "#666", marginTop: 20 },

  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: "bold" },

  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  approveButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  rejectButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
  closeButton: { 
    marginTop: 10, 
    backgroundColor: "#888", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center" 
  },
  closeButtonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  
});

export default Permissions;
