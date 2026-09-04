const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

const newReg = `
import { doc, setDoc } from 'firebase/firestore';

export async function registerStudentFirestore(payload: RegisterPayload): Promise<{ success: boolean; message: string; user?: UserAccount }> {
  try {
    const name = payload.studentName.trim();
    const pen = payload.penNo.trim();
    const pin = payload.pin.trim();

    if (!name || name.length < 2) {
      return { success: false, message: 'Please enter a valid student full name.' };
    }
    if (!pen || pen.length < 6) {
      return { success: false, message: 'Please enter a valid 11-Digit PEN / Hall Ticket Number.' };
    }
    if (!pin || pin.length < 4) {
      return { success: false, message: 'Please create a 4-digit Exam Security PIN.' };
    }
    if (!payload.school || !payload.school.udiseCode) {
      return { success: false, message: 'Please select a valid school and UDISE code.' };
    }

    const allStudents = getAllRegisteredStudents();
    const existingIndex = allStudents.findIndex(s => s.penNo === pen);
    
    // Use penNo as the unique identifier for anonymous users in Firestore
    const newStudent: UserAccount = {
      id: existingIndex >= 0 ? allStudents[existingIndex].id : \`std_\${Date.now()}_\${Math.random().toString(36).substr(2, 5)}\`,
      studentName: name,
      penNo: pen,
      mobile: payload.mobile?.trim() || undefined,
      email: payload.email?.trim() || undefined,
      section: payload.section || 'A',
      pin: pin,
      udiseCode: payload.school.udiseCode,
      district: payload.school.district,
      mandal: payload.school.mandal,
      schoolDetails: {
        schoolName: payload.school.schoolName,
        districtName: payload.school.district,
        mandalName: payload.school.mandal,
        management: payload.school.management,
        category: payload.school.category,
      },
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    // Save to Firestore (Both users and registered_students collections)
    await setDoc(doc(db, 'users', newStudent.id), newStudent).catch(e => console.error(e));
    await setDoc(doc(db, 'registered_students', newStudent.penNo), newStudent).catch(e => console.error(e));

    let updatedList;
    if (existingIndex >= 0) {
      updatedList = allStudents.map((s, idx) => idx === existingIndex ? newStudent : s);
    } else {
      updatedList = [newStudent, ...allStudents];
    }
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(updatedList));
    setCurrentUser(newStudent);

    return {
      success: true,
      message: 'Registration successful! Candidate profile activated.',
      user: newStudent
    };
  } catch (e: any) {
    return { success: false, message: e.message || 'Registration failed.' };
  }
}
`;

code = code.replace("export function registerStudent(payload: RegisterPayload): { success: boolean; message: string; user?: UserAccount } {", newReg + "\nexport function registerStudent(payload: RegisterPayload): { success: boolean; message: string; user?: UserAccount } {");
fs.writeFileSync('src/services/authService.ts', code);
