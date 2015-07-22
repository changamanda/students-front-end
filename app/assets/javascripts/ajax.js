'use strict'

function getStudents(){
  $.ajax({
    method: "GET",
    url: "/students"
  })
  .done(function(studentsArray) {
    listStudents(studentsArray, '#students-list');
  });
}

function getStudent(id){
  $.ajax({
    method: "GET",
    url: "/students/" + id
  })
  .done(function(student) {
    showStudent(student);
  });
}

function getStudentsByQuery(query){
  $.ajax({
    method: "GET",
    url: "/students?q=" + query
  })
  .done(function(message) {
    $('#students-list').empty();
    listStudents(message, '#students-list');
  });
}

function getCohort(id){
  $.ajax({
    method: "GET",
    url: "/cohorts/" + id
  })
  .done(function(message) {
    replaceCohortName(message.name)
  });
}

function getStudentsForCohort(id){
  $.ajax({
    method: "GET",
    url: "/cohorts/" + id + "/students"
  })
  .done(function(message){
    $('#cohort-students-list').empty();
    listStudents(message, '#cohort-students-list');
  });
}