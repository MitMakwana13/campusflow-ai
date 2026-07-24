# Institutional Dataset Onboarding Guide (`DataImportGuide.md`)

CampusFlow AI is engineered to be institution-agnostic. Any university, college, or school can onboard onto CampusFlow AI by providing standard CSV files.

---

## 📁 Required CSV Files Format

Create a folder under `datasets/<your_university_name>/` containing the following files:

### 1. `rooms.csv`
```csv
id,code,name,building,capacity,room_type
rm_1,C-231,Classroom C-231,Academic Block C,60,lecture
rm_2,B-222,Classroom B-222,Academic Block B,60,lecture
```

### 2. `faculty.csv`
```csv
id,employee_id,name,email,designation,max_hours_per_week
fac_1,EMP-101,Dr. Thaker,thaker@auro.edu.in,Professor,18
```

### 3. `courses.csv`
```csv
id,code,name,program_code,semester,credits,course_type
crs_1,IMBTTO306,Database Management Systems,BSc IT,3,4,lecture
```

### 4. `timetable.csv`
```csv
id,day,time_slot_id,course_code,faculty_name,room_code,entry_type,version_type
e1,Monday,1,IMBTTO306,Dr. Thaker,C-231,lecture,MANUAL
```

---

## ⚡ Execution Command

To import a new university dataset into CampusFlow AI:

```bash
python database/imports/import_dataset.py --dataset datasets/your_university_name
```
