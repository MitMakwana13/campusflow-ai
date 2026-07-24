-- Analytical Views for AURO Campus Operations

CREATE OR REPLACE VIEW v_room_utilization AS
SELECT 
    r.code AS room_code,
    r.name AS room_name,
    r.capacity,
    r.room_type,
    COUNT(te.id) AS total_slots_booked,
    ROUND((COUNT(te.id)::DECIMAL / 36.0) * 100, 2) AS utilization_percent
FROM rooms r
LEFT JOIN timetable_entries te ON r.id = te.room_id
GROUP BY r.id, r.code, r.name, r.capacity, r.room_type;

CREATE OR REPLACE VIEW v_faculty_workload AS
SELECT 
    f.employee_id,
    f.name AS faculty_name,
    f.designation,
    f.max_hours_per_week,
    COUNT(te.id) AS assigned_hours_per_week,
    (f.max_hours_per_week - COUNT(te.id)) AS remaining_capacity
FROM faculty f
LEFT JOIN timetable_entries te ON f.id = te.faculty_id
GROUP BY f.id, f.employee_id, f.name, f.designation, f.max_hours_per_week;
