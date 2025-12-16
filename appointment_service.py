# appointment_service.py
# Backend service for managing appointments - simulates Aurora/AppSync

from datetime import datetime

# Mock data - pretending this came from Aurora PostgreSQL database
# In real scenario this would be fetched from DB
appointments_data = [
    {
        "id": 1,
        "name": "Rahul Sharma",
        "date": "2025-12-16",
        "time": "09:00",
        "duration": 30,
        "doctorName": "Dr. Priya Patel",
        "status": "Confirmed",
        "mode": "In-Person"
    },
    {
        "id": 2,
        "name": "Anita Desai",
        "date": "2025-12-16",
        "time": "09:30",
        "duration": 45,
        "doctorName": "Dr. Amit Kumar",
        "status": "Scheduled",
        "mode": "Video Call"
    },
    {
        "id": 3,
        "name": "Vikram Singh",
        "date": "2025-12-16",
        "time": "10:15",
        "duration": 30,
        "doctorName": "Dr. Priya Patel",
        "status": "Upcoming",
        "mode": "In-Person"
    },
    {
        "id": 4,
        "name": "Meera Reddy",
        "date": "2025-12-17",
        "time": "11:00",
        "duration": 60,
        "doctorName": "Dr. Sanjay Gupta",
        "status": "Scheduled",
        "mode": "In-Person"
    },
    {
        "id": 5,
        "name": "Arjun Nair",
        "date": "2025-12-17",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Amit Kumar",
        "status": "Confirmed",
        "mode": "Video Call"
    },
    {
        "id": 6,
        "name": "Sunita Verma",
        "date": "2025-12-15",
        "time": "10:00",
        "duration": 45,
        "doctorName": "Dr. Priya Patel",
        "status": "Cancelled",
        "mode": "In-Person"
    },
    {
        "id": 7,
        "name": "Kiran Joshi",
        "date": "2025-12-15",
        "time": "15:30",
        "duration": 30,
        "doctorName": "Dr. Sanjay Gupta",
        "status": "Confirmed",
        "mode": "Phone Call"
    },
    {
        "id": 8,
        "name": "Deepak Malhotra",
        "date": "2025-12-18",
        "time": "09:00",
        "duration": 30,
        "doctorName": "Dr. Amit Kumar",
        "status": "Upcoming",
        "mode": "In-Person"
    },
    {
        "id": 9,
        "name": "Pooja Agarwal",
        "date": "2025-12-18",
        "time": "11:30",
        "duration": 45,
        "doctorName": "Dr. Priya Patel",
        "status": "Scheduled",
        "mode": "Video Call"
    },
    {
        "id": 10,
        "name": "Ravi Shankar",
        "date": "2025-12-19",
        "time": "16:00",
        "duration": 30,
        "doctorName": "Dr. Sanjay Gupta",
        "status": "Upcoming",
        "mode": "In-Person"
    },
    {
        "id": 11,
        "name": "Neha Kapoor",
        "date": "2025-12-14",
        "time": "10:30",
        "duration": 30,
        "doctorName": "Dr. Amit Kumar",
        "status": "Confirmed",
        "mode": "Phone Call"
    },
    {
        "id": 12,
        "name": "Amit Tiwari",
        "date": "2025-12-16",
        "time": "14:30",
        "duration": 45,
        "doctorName": "Dr. Sanjay Gupta",
        "status": "Confirmed",
        "mode": "In-Person"
    }
]


def get_appointments(date=None, status=None):
    """
    Fetches appointments with optional filtering
    
    In real app this would be a GraphQL query like:
    query GetAppointments($date: String, $status: String) {
        getAppointments(date: $date, status: $status) {
            id
            name
            date
            time
            duration
            doctorName
            status
            mode
        }
    }
    
    Args:
        date: filter by specific date (format: YYYY-MM-DD)
        status: filter by status (Confirmed/Scheduled/Upcoming/Cancelled)
    
    Returns:
        list of appointments matching the filters
    """
    result = appointments_data.copy()
    
    # filter by date if provided
    if date:
        result = [apt for apt in result if apt["date"] == date]
    
    # filter by status if provided
    if status:
        result = [apt for apt in result if apt["status"] == status]
    
    return result


def update_appointment_status(appointment_id, new_status):
    """
    Updates the status of an appointment
    
    In production this would:
    1. Trigger an AppSync Mutation like:
       mutation UpdateAppointment($id: ID!, $status: String!) {
           updateAppointmentStatus(id: $id, status: $status) {
               id
               status
           }
       }
    
    2. The mutation resolver would do a transactional write to Aurora:
       BEGIN TRANSACTION;
       UPDATE appointments SET status = $new_status WHERE id = $appointment_id;
       INSERT INTO appointment_logs (appointment_id, action, timestamp) 
           VALUES ($appointment_id, 'STATUS_CHANGE', NOW());
       COMMIT;
    
    3. After successful update, AppSync Subscription would notify all clients:
       subscription OnAppointmentUpdate {
           onAppointmentUpdate {
               id
               status
           }
       }
       This pushes real-time updates to connected frontends
    
    Args:
        appointment_id: the id of appointment to update
        new_status: new status value
    
    Returns:
        updated appointment or None if not found
    """
    for apt in appointments_data:
        if apt["id"] == appointment_id:
            apt["status"] = new_status
            # In real scenario: AppSync subscription triggers here
            # All connected clients would receive the update
            return apt
    
    return None


# helper function to get appointments by relative date
def get_appointments_by_period(period):
    """
    Get appointments based on time period
    period can be: 'today', 'upcoming', 'past'
    """
    today = datetime.now().strftime("%Y-%m-%d")
    
    if period == "today":
        return [apt for apt in appointments_data if apt["date"] == today]
    elif period == "upcoming":
        return [apt for apt in appointments_data if apt["date"] > today]
    elif period == "past":
        return [apt for apt in appointments_data if apt["date"] < today]
    else:
        return appointments_data


# for testing
if __name__ == "__main__":
    print("All appointments:")
    print(get_appointments())
    
    print("\nToday's appointments:")
    print(get_appointments(date="2025-12-16"))
    
    print("\nConfirmed appointments:")
    print(get_appointments(status="Confirmed"))
    
    print("\nUpdating appointment 1 to Cancelled:")
    print(update_appointment_status(1, "Cancelled"))
