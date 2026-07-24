-- CampusFlow AI v1 Schema
-- Tables required for Timetable RL Optimization

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES programs(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(30) NOT NULL,
    semester INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'theory', 'lab'
    hours_per_week DECIMAL(3,1) NOT NULL,
    lab_required BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    name VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester_type VARCHAR(20) NOT NULL, -- 'odd', 'even'
    batch_year INTEGER NOT NULL,
    max_students INTEGER NOT NULL,
    faculty_id UUID, -- Will reference users
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    number VARCHAR(30) NOT NULL,
    name VARCHAR(100) NOT NULL,
    building VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'classroom', 'lab', 'studio'
    school_id UUID REFERENCES schools(id), -- Nullable for shared
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'superadmin', 'registrar', 'faculty', 'student'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    employee_id VARCHAR(30) UNIQUE NOT NULL,
    school_id UUID REFERENCES schools(id),
    designation VARCHAR(100) NOT NULL,
    max_hours_week INTEGER DEFAULT 18,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint to sections now that users exist
ALTER TABLE sections ADD CONSTRAINT fk_sections_faculty FOREIGN KEY (faculty_id) REFERENCES users(id);

CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    name VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_type VARCHAR(50) NOT NULL, -- 'lecture', 'break', 'lunch'
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE timetable_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    academic_year VARCHAR(20) NOT NULL,
    semester_type VARCHAR(20) NOT NULL,
    day VARCHAR(20) NOT NULL, -- 'monday', 'tuesday', etc.
    time_slot_id UUID REFERENCES time_slots(id),
    course_id UUID REFERENCES courses(id),
    section_id UUID REFERENCES sections(id),
    faculty_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    entry_type VARCHAR(50) NOT NULL, -- 'lecture', 'lab'
    generated_by VARCHAR(50) NOT NULL, -- 'manual', 'ai'
    generation_run_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
