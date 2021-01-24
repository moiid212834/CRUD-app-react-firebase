import firebase from "../firebase";

const db = firebase.ref("/students");

class StudentDataService {
  getAll() {
    return db;
  }

  create(Student) {
    return db.push(Student);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }

  getStudent(key){
    return db.child(key);
  }
}

export default new StudentDataService();
